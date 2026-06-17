const db = require('../database/connection');

const createLog = (type, action) => {

    db.query(
        'INSERT INTO logs (type, action) VALUES (?, ?)',
        [type, action],
        (err) => {
            if(err){
                console.error(err);
            }
        }
    );
};

const getLogs =(req, res) => {
    db.query(
        'SELECT * FROM logs ORDER BY created_at DESC LIMIT 50',
        (err, result) => {
            if(err){
                return res.status(500).json(err)
            }
            res.json(result);
        }
    );
};

module.exports = {
    createLog,
    getLogs
};