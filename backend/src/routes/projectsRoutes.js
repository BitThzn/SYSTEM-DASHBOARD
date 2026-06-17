const express = require('express');
const router = express.Router();

const {
    getProjects,
    createProject,
    deleteProject,
    updateProject
} = require('../controllers/projectsController');


router.get('/projects', getProjects);
router.post('/projects', createProject);
router.delete('/projects/:id', deleteProject);
router.put('/projects/:id', updateProject);

module.exports = router;