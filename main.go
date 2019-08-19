package main

import (
	"database/sql/driver"
	"fmt"
	"github.com/appleboy/gin-jwt/v2"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"log"
	"net/http"
	"strings"
	"time"
)

// User represents a user
type User struct {
	ID        uint   `json:"id" gorm:"primary_key"`
	Username  string `json:"name"`
	Password  string
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// login represents a login request
type login struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Bookmark represents a bookmark
type Bookmark struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	Name      string    `json:"name"`
	URL       string    `json:"url"`
	Tags      Tags      `json:"tags" gorm:"type:string[]"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Tags []string

func (t Tags) Value() (driver.Value, error) {
	return strings.Join(t, ","), nil
}

func (t *Tags) Scan(value interface{}) error {
	s, ok := value.(string)
	if !ok {
		return fmt.Errorf("invalid type for tags")
	}
	tags := strings.Split(s, ",")
	for _, tag := range tags {
		*t = append(*t, tag)
	}
	return nil
}

func main() {

	db, err := gormDB()
	migrate(db)

	if err != nil {
		panic(err)
	}

	r := gin.Default()

	corsMiddleware := cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
		AllowWebSockets:  true,
		AllowFiles:       true,
	})
	r.Use(corsMiddleware)

	auth, err := authMiddleware()
	if err != nil {
		log.Fatal(err)
	}

	v1 := r.Group("/api/v1")

	v1.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	v1.POST("/login", auth.LoginHandler)

	r.NoRoute(auth.MiddlewareFunc(), func(c *gin.Context) {
		claims := jwt.ExtractClaims(c)
		log.Printf("NoRoute claims: %#v\n", claims)
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	// Refresh time can be longer than token timeout
	v1.GET("/refresh_token", auth.RefreshHandler)

	v1.Use(auth.MiddlewareFunc())
	{
		v1.GET("/bookmarks", func(c *gin.Context) {
			var bookmarks []Bookmark
			if err := db.Find(&bookmarks).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			}

			c.JSON(http.StatusOK, bookmarks)
		})

		v1.GET("/bookmarks/:id", func(c *gin.Context) {
			id := c.Param("id")
			var bookmark Bookmark
			if err := db.First(&bookmark, "id = ?", id).Error; err != nil {
				if gorm.IsRecordNotFoundError(err) {
					c.JSON(http.StatusNotFound, gin.H{"message": "resource not found"})
					return
				}
				c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
				return
			}

			c.JSON(http.StatusOK, bookmark)
		})

		v1.POST("/bookmarks", func(c *gin.Context) {
			var req Bookmark
			if err := c.ShouldBindJSON(&req); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"message": "bad request"})
			}

			if err := db.Save(&req).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			}

			c.JSON(http.StatusCreated, req)
		})

		v1.PUT("/bookmarks/:id", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "not implemented",
			})
		})

		v1.DELETE("/bookmarks/:id", func(c *gin.Context) {
			id := c.Param("id")
			if err := db.Delete(&Bookmark{}, "id = ?", id).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
			}

			c.JSON(http.StatusOK, gin.H{"message": "ok"})
		})
	}

	r.Run("127.0.0.1:8585")
}

func authMiddleware() (*jwt.GinJWTMiddleware, error) {
	identityKey := "id"
	// the jwt middleware
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "attag",
		Key:         []byte("secret key"),
		Timeout:     time.Hour,
		MaxRefresh:  time.Hour,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*User); ok {
				return jwt.MapClaims{
					identityKey: v.Username,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			return &User{
				Username: claims["id"].(string),
			}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var loginVals login
			if err := c.ShouldBindJSON(&loginVals); err != nil {
				return "", jwt.ErrMissingLoginValues
			}
			userID := loginVals.Username
			password := loginVals.Password

			if (userID == "admin" && password == "admin") || (userID == "test" && password == "test") {
				return &User{
					Username: userID,
				}, nil
			}

			return nil, jwt.ErrFailedAuthentication
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			if v, ok := data.(*User); ok && v.Username == "admin" {
				return true
			}

			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		// TokenLookup is a string in the form of "<source>:<name>" that is used
		// to extract token from the request.
		// Optional. Default value "header:Authorization".
		// Possible values:
		// - "header:<name>"
		// - "query:<name>"
		// - "cookie:<name>"
		// - "param:<name>"
		TokenLookup: "header: Authorization, query: token, cookie: jwt",
		// TokenLookup: "query:token",
		// TokenLookup: "cookie:token",

		// TokenHeadName is a string in the header. Default value is "Bearer"
		TokenHeadName: "Bearer",

		// TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
		TimeFunc: time.Now,
	})

	return authMiddleware, err
}
