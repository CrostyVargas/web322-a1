/******************************************************************************** 
*  WEB322 – Assignment 01 
*  
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: Cristian Vargas 
*  Student ID: 184658235
*  Date: 2025-10-02 
* 
********************************************************************************/

const express = require("express");
const projectData = require("./modules/projects");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Routes
app.get("/", (req, res) => {
    res.send("Assignment 1: Cristian Vargas - 184658235");
});

app.get("/solutions/projects", (req, res) => {
    projectData.getAllProjects()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err));
});

app.get("/solutions/projects/id-demo", (req, res) => {
    // Usa un ID que exista en tu JSON, por ejemplo 9
    projectData.getProjectById(9)
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
});

app.get("/solutions/projects/sector-demo", (req, res) => {
    // Usa un sector que exista, ej: "agriculture"
    projectData.getProjectsBySector("agriculture")
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
});

// Initialize & start server
projectData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("Server listening on port: " + HTTP_PORT);
        });
    })
    .catch(err => {
        console.log("Failed to start server: " + err);
    });
