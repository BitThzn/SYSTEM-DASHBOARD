const express = require('express');
const cors = require('cors');

const app = express();

const projectRoutes = require('./routes/projectsRoutes');
const logsRoutes = require('./routes/logsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use(cors());
app.use(express.json());

app.use(projectRoutes);
app.use(logsRoutes);
app.use(dashboardRoutes);

module.exports = app;