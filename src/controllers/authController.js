exports.registerUser = (req, res, next) => {
    
    req.on('data', chunk => {

        let data = JSON.parse(chunk);
        console.log(data);

        const dao = require('../database/authDao');
        (async () => {
            try {
                const result = await dao.insertUser(data);
                res.status(201).send(result.rows[0]);
            } catch (exception) {
                console.log(exception);
                res.status(500).send(exception);
            }
        })();
    });
};

exports.login = (query, res) => {}