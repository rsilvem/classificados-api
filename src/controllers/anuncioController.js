exports.get = (req, res, next) => {
    
    let id = req.params.id;
    
    const dao = require('../database/anuncioDao');
    (async () => {
        try {
            const result = await dao.getAnuncio(id);
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

    const dao = require('../database/anuncioDao');
    (async () => {
        try {
            const result = await dao.getAnuncios();
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

exports.getFoto = (req, res, next) => {
    
    let id = req.params.id;
    
    const dao = require('../database/anuncioDao');
    (async () => {
        try {
            const result = await dao.getFotosAnuncio(id);
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

exports.getOpcionais = (req, res, next) => {
    
    let id = req.params.id;
    
    const dao = require('../database/anuncioDao');
    (async () => {
        try {
            const result = await dao.getOpcionaisAnuncio(id);
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

exports.post = (req, res, next) => {
    
    req.on('data', chunk => {

        let data = JSON.parse(chunk);
        console.log(data);

        const dao = require('../database/anuncioDao');
        (async () => {
            try {
                const result = await dao.createAnuncio(data);
                res.status(201).send(result.rows[0]);
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

        const dao = require('../database/anuncioDao');
        (async () => {
            try {
                const result = await dao.updateAnuncio(id, data);
                res.status(202).send(result.rows[0]);
            } catch (exception) {
                console.log(exception);
                res.status(500).send(exception);
            }
        })();
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    
    const dao = require('../database/anuncioDao');
    (async () => {
        try {
            const result = await dao.deleteAnuncio(id);
            console.log(result);
            if (result) {
                if (result.rowCount>0) {
                    res.status(202).send({"status": "Deleted"});
                } else {
                    res.status(404).send({"status": "Not Found"});
                }
            } else {
                res.status(404).send({"status": "Not Found"});
            }
        } catch (exception) {
            console.log(exception);
            res.status(500).send(exception);
        }
    })();
};

exports.putScore = (req, res, next) => {
    let id = req.params.id;

    req.on('data', chunk => {

        let data = JSON.parse(chunk);
        console.log(data);

        const dao = require('../database/anuncioDao');
        (async () => {
            try {
                const result = await dao.updateScoreAnuncio(id, data.score);
                res.status(202).send(result.rows[0]);
            } catch (exception) {
                console.log(exception);
                res.status(500).send(exception);
            }
        })();
    });
};

exports.activate = (req, res, next) => {
    let id = req.params.id;

    req.on('data', chunk => {

        //let data = JSON.parse(chunk);
       // console.log(data);

        const dao = require('../database/anuncioDao');
        (async () => {
            try {
                const result = await dao.activateAnuncio(id);
                res.status(202).send(result.rows[0]);
            } catch (exception) {
                console.log(exception);
                res.status(500).send(exception);
            }
        })();
    });
};

exports.deactivate = (req, res, next) => {
    let id = req.params.id;

    req.on('data', chunk => {

        //let data = JSON.parse(chunk);
       // console.log(data);

        const dao = require('../database/anuncioDao');
        (async () => {
            try {
                const result = await dao.deactivateAnuncio(id);
                res.status(202).send(result.rows[0]);
            } catch (exception) {
                console.log(exception);
                res.status(500).send(exception);
            }
        })();
    });
};

exports.addFoto = (req, res, next) => {
    let id = req.params.id;

    req.on('data', chunk => {

        let data = JSON.parse(chunk);
        console.log(data);

        const dao = require('../database/anuncioDao');
        (async () => {
            try {
                const result = await dao.addFotoAnuncio(id, data.foto_base_64, data.descricao);
                res.status(202).send(result.rows[0]);
            } catch (exception) {
                console.log(exception);
                res.status(500).send(exception);
            }
        })();
    });
};

exports.addOpcional = (req, res, next) => {
    let id = req.params.id;

    req.on('data', chunk => {

        let data = JSON.parse(chunk);
        console.log(data);

        const dao = require('../database/anuncioDao');
        const daoOpcionais = require('../database/opcionalVeiculoDao');
        (async () => {
            try {

                const opcional = daoOpcionais.getByNome(data.nome);
                if (opcional.rows[0]!=undefined) {
                    const result = await dao.addItemOpcionalAnuncio(id, opcional.id);
                    res.status(202).send(result.rows[0]);
                } else {
                    res.status(404).send({"status": "Item not found"});
                }
            } catch (exception) {
                console.log(exception);
                res.status(500).send(exception);
            }
        })();
    });
};