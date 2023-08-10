
exports.post = (req, res, next) => {
    
    req.on('data', chunk => {

        let data = JSON.parse(chunk);
        console.log(data);

        const dao = require('../database/usuarioDao');
        (async () => {
            try {
                const baseUsu = await dao.getUsuarioByEmail(data.email);
                if (baseUsu.rows[0]!=undefined) {
                    res.status(500).send({"status": "E-mail already exists"});
                } else {
                    const result = await dao.createUsuario(data);
                    res.status(201).send(result.rows[0]);
                }
            } catch (exception) {
                console.log(exception);
                res.status(500).send(exception);
            }
        })();
    });
};

exports.put = (req, res, next) => {
    let id = req.params.id;

    req.on('data', chunk => {

        let data = JSON.parse(chunk);
        console.log(data);

        const dao = require('../database/usuarioDao');
        (async () => {
            try {

                const baseUsu = await dao.getUsuarioByEmail(data.email);
                if (baseUsu.rows[0]!=undefined) {
                    if (baseUsu.rows[0].id != id)
                    res.status(500).send({"status": "E-mail already exists"});
                } else {
                    const result = await dao.updateUsuario(id, data);
                    res.status(202).send(result.rows[0]);
                }
            } catch (exception) {
                console.log(exception);
                res.status(500).send(exception);
            }
        })();
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    
    const dao = require('../database/usuarioDao');
    (async () => {
        try {
            const result = await dao.deleteUsuario(id);
            console.log(result);
            if (result) {
                if (result.rowCount>0) {
                    res.status(202).send({"status": "Deleted"});
                } else {
                    res.status(202).send({"status": "Not Found"});
                }
            } else {
                res.status(202).send({"status": "Not Found"});
            }
        } catch (exception) {
            console.log(exception);
            res.status(500).send(exception);
        }
    })();
};

exports.get = (req, res, next) => {
    
    let id = req.params.id;
    
    const dao = require('../database/usuarioDao');
    (async () => {
        try {
            const result = await dao.getUsuario(id);
            if (result.rows[0]) {
                res.status(200).send(result.rows[0]);
            } else {
                res.status(202).send({"status": "Not Found"});
            }
        } catch (exception) {
            console.log(exception);
            res.status(500).send(exception);
        }
    })();
}

exports.list = (req, res, next) => {

    const dao = require('../database/usuarioDao');
    (async () => {
        try {
            const result = await dao.getUsuarios();
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