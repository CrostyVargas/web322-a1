/******************************************************************************** 
*  WEB322 – Assignment 02
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
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from /public
app.use(express.static("public"));


// Routes

// Home page
app.get("/", (req, res) => {
  res.render("home", { page: "home" });
});

// About page
app.get("/about", (req, res) => {
  res.render("about", { page: "about" });
});

// Projects list (with optional ?sector= query)
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;

  const dataPromise = sector
    ? projectData.getProjectsBySector(sector)
    : projectData.getAllProjects();

  dataPromise
    .then((projects) => {
      res.render("projects", { projects, page: "projects" });
    })
    .catch((err) => {
      res.status(404).render("404", { message: err });
    });
});

// Single project details
app.get("/solutions/projects/:id", (req, res) => {
  const id = parseInt(req.params.id);

  projectData
    .getProjectById(id)
    .then((project) => {
      res.render("project", { project, page: "projects" });
    })
    .catch((err) => {
      res.status(404).render("404", { message: err });
    });
});

// 404 catch-all (must be last)
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found" });
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
