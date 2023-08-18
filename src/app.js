const express = require('express');

const app = express();
const router = express.Router();

const pgPool = require("./database/pgWrapper");
const tokenDB = require("./database/tokenDB")(pgPool);
const userDB = require("./database/userDB")(pgPool);

const oAuthService = require("./services/tokenService")(userDB, tokenDB);
const oAuth2Server = require("node-oauth2-server");
app.oauth = oAuth2Server({
    model: oAuthService,
    grants: ["password"],
    debug: true,
});

//Rotas
const index = require('./routes/index');
const anuncianteRoute = require('./routes/anuncianteRoute');
const opcionaisRoute = require('./routes/opcionaisRoute');
const usuarioRoute = require('./routes/usuarioRoute');
const anuncioRoute = require('./routes/anuncioRoute');
const authRoute = require('./routes/authRoute')(
    router,
    app
);

app.use('/', index);
app.use('/auth', authRoute);
app.use('/anunciante', anuncianteRoute);
app.use('/opcionais', opcionaisRoute);
app.use('/usuario', usuarioRoute);
app.use('/anuncio', anuncioRoute);

module.exports = app;
