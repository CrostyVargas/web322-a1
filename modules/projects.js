// modules/projects.js

// Load JSON data
const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

// Array to store processed projects
let projects = [];

// Initialize projects with sector names
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = projectData.map(proj => {
                // Find sector name using sector_id
                const sectorObj = sectorData.find(sec => sec.id === proj.sector_id);
                return {
                    ...proj,
                    sector: sectorObj ? sectorObj.sector_name : "Unknown"
                };
            });
            resolve();
        } catch (err) {
            reject("Error initializing project data: " + err);
        }
    });
}

// Return all projects
function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects available");
        }
    });
}

// Return project by ID
function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            resolve(project);
        } else {
            reject("Unable to find project with ID: " + projectId);
        }
    });
}

// Return projects by sector (case-insensitive, partial match)
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const result = projects.filter(p =>
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );
        if (result.length > 0) {
            resolve(result);
        } else {
            reject("Unable to find projects for sector: " + sector);
        }
    });
}

// Export functions
module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
