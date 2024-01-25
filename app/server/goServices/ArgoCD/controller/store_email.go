// pipeline_name.go
package controller

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func updateDotenvEmail(key, value string) error {
	// Read the content of the dotenv file
	content, err := ioutil.ReadFile(".env")
	if err != nil {
		return err
	}

	// Split the content into lines
	lines := strings.Split(string(content), "\n")
	fmt.Println("lines : ", lines)

	// Find and update the key-value pair
	found := false
	for i, line := range lines {
		pair := strings.SplitN(line, "=", 2)
		if len(pair) == 2 && pair[0] == key {
			lines[i] = fmt.Sprintf("%s=%s", key, value)
			found = true
			break
		}
	}

	// If key is not found, add a new key-value pair
	if !found {
		newLine := fmt.Sprintf("%s=%s", key, value)
		lines = append(lines, newLine)
	}

	// Join the lines back into a string
	newContent := strings.Join(lines, "\n")

	// Write the updated content back to the dotenv file
	err = ioutil.WriteFile(".env", []byte(newContent), 0644)
	if err != nil {
		return err
	}

	return nil
}

func StoreEmail(c *gin.Context, email string) {
	//update the dotenv file
	err := updateDotenvEmail("USER_EMAIL", email)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Email Saved successfully")
	c.JSON(http.StatusOK, gin.H{"message": "Email Saved successfully"})
}
