
exports.post = (req, res, next) => {
    
    req.on('data', chunk => {

        let data = JSON.parse(chunk);
        console.log(data);

        const dao = require('../database/opcionalVeiculoDao');
        (async () => {
            try {
                const result = await dao.createOpcional(data);
                res.status(201).send(result.rows[0]);
            } catch (exception) {
                console.log(exception);
                res.status(500).send(exception);
            }
        })();
    });
};

exports.list = (req, res, next) => {

    const dao = require('../database/opcionalVeiculoDao');
    (async () => {
        try {
            const result = await dao.getListaOpcionais();
            if (result.rows) {
                res.status(200).send(result.rows);
            } else {
                res.status(202).send({"status": "Not Found"});
            }
        } catch (exception) {
            console.log(exception);
            res.status(500).send(exception);
        }
    })();
}