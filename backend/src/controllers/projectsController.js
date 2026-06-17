const db = require('../database/connection');
const { createLog } = require('./logsController');


const getProjects = (req, res) => {
    db.query(
        'SELECT * FROM projects',
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(result);
        }
    );
};


const createProject = (req, res) => {
    const { name, description, status } = req.body;

    db.query(
        'INSERT INTO projects (name, description, status) VALUES (?, ?, ?)',
        [name, description, status],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            
            createLog(
                'PROJECT',
                `PROJECT CREATED: ${name}`
            );

            res.status(201).json({
                message: 'Projeto criado',
                id: result.insertId
            });
        }
    );
};


const deleteProject = (req, res) => {
    const { id } = req.params;

    db.query(
        'SELECT * FROM projects WHERE id = ?',
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Projeto não encontrado'
                });
            }

            const name = result[0].name;

            db.query(
                'DELETE FROM projects WHERE id = ?',
                [id],
                (err) => {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    createLog(
                        'PROJECT',
                        `PROJECT DELETED: ${name}`
                    );

                    res.status(200).json({
                        message: `Projeto ${name} foi deletado`
                    });
                }
            );
        }
    );
};

const updateProject = (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;

    db.query(
        'SELECT status, name FROM projects WHERE id = ?',
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Projeto não encontrado' });
            }

            const projetoAntigo = result[0];
            const nomeProjeto = projetoAntigo.name; 
            db.query(
                'UPDATE projects SET name = ?, description = ?, status = ? WHERE id = ?',
                [name, description, status, id],
                (err, updateResult) => {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    
                    if (projetoAntigo.status !== status) {
                        const acaoLog = status === 'active' || status === 1 
                            ? `PROJECT ACTIVATED: ${nomeProjeto}` 
                            : `PROJECT DEACTIVATED: ${nomeProjeto}`;

                        createLog('PROJECT', acaoLog);
                    } else {
                        
                        createLog('PROJECT', `PROJECT UPDATED: ${nomeProjeto}`);
                    }

                    res.status(200).json({
                        message: `O Projeto ${nomeProjeto} foi atualizado.`
                    });
                }
            );
        }
    );
};

module.exports = {
    getProjects,
    createProject,
    deleteProject,
    updateProject
};