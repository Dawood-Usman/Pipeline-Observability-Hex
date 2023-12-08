package main

import (
	"fmt"
	"net/http"

	"github.com/QuestraDigital/goServices/ArgoCD/controller"

	"github.com/gin-contrib/cors" // Import the cors package from gin-contrib
	"github.com/gin-gonic/gin"
	"github.com/robfig/cron"
)

type ErrorResponse struct {
	Error   string `json:"error"`
	Code    int    `json:"code"`
	Message string `json:"message"`
}

// Run Cron Job
func runAllPipelinesStatusCronJob() {
	// Create a new cron scheduler
	c := cron.New()

	// Define your cron job
	job := cron.FuncJob(controller.AllPipelinesStatus)

	// Add the cron job to the scheduler
	c.AddJob("*/5 * * * * *", job) // This cron syntax means every 5 seconds

	// Start the scheduler
	c.Start()
}

func main() {
	r := gin.Default()

	// Add CORS middleware
	r.Use(cors.Default())

	// run cron job
	runAllPipelinesStatusCronJob()
	// Define your routes here
	// get all the pipelines
	r.GET("/get_all_pipelines", func(c *gin.Context) {
		availble_pipelines, err := controller.GetAllPipelineNames()
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"Error": "Token error"})
			return
		}
		fmt.Println("Available Pipelines : ", availble_pipelines)
		c.JSON(http.StatusOK, gin.H{
			"available_pipeline": availble_pipelines,
		})
	})

	// store token in db
	r.POST("/api/storetoken", func(c *gin.Context) {
		// Parse request body to get the "token" value
		var requestBody map[string]string
		if err := c.BindJSON(&requestBody); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
			return
		}

		token := requestBody["token"]
		controller.StoreToken(c, "ranaadil571@gmail.com", token)
	})

	// get current state of pipeline
	r.GET("/pipeline_state", func(c *gin.Context) {
		controller.DataPipelineState(c)
	})

	// get the history of pipeline
	r.GET("/pipeline_history", func(c *gin.Context) {
		controller.PipelineHistory(c)
	})

	// Run the server
	if err := r.Run(":8000"); err != nil {
		fmt.Println("Error starting server:", err)
	}
	// Keep the program running to allow cron jobs to execute
	select {}
}
