const db = require('../database/connection');

const getDashboard = (req, res) => {

    db.query(
        `
        SELECT
            COUNT(*) AS totalProjects,
            SUM(status = 'active') AS activeProjects,
            SUM(status = 'inactive') AS inactiveProjects
        FROM projects
        `,
        (err, statsResult) => {

            if (err) {
                return res.status(500).json(err);
            }

            db.query(
                `
                SELECT name
                FROM projects
                ORDER BY created_at DESC
                LIMIT 5
                `,
                (err, projectsResult) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    const recentProjects = projectsResult.map(
                        project => project.name
                    );

                    res.json({
                        totalProjects: statsResult[0].totalProjects,
                        activeProjects: statsResult[0].activeProjects || 0,
                        inactiveProjects: statsResult[0].inactiveProjects || 0,
                        recentProjects
                    });

                }
            );

        }
    );

};

module.exports = {
    getDashboard
};