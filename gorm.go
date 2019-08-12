package main

import "github.com/jinzhu/gorm"

func gormDB() (*gorm.DB, error)  {
	// TODO: read from config
	db, err := gorm.Open("sqlite3", "attag.db")
	if err != nil {
		return nil, err
	}

	// TODO: read from config
	db.LogMode(true)

	return db, nil
}

func migrate(db *gorm.DB) {
	db.AutoMigrate(&Bookmark{})
}