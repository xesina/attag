package main

import (
	"database/sql/driver"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"net/http"
	"strings"
	"time"
)

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
	v1 := r.Group("/api/v1")

	v1.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

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
				c.JSON(http.StatusNotFound, gin.H{"message":"resource not found"})
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

	r.Run("127.0.0.1:8585")
}
