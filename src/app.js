const express = require('express');

const app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index');
const anuncianteRoute = require('./routes/anuncianteRoute');
const opcionaisRoute = require('./routes/opcionaisRoute');
const usuarioRoute = require('./routes/usuarioRoute');
const anuncioRoute = require('./routes/anuncioRoute');

app.use('/', index);
app.use('/anunciante', anuncianteRoute);
app.use('/opcionais', opcionaisRoute);
app.use('/usuario', usuarioRoute);
app.use('/anuncio', anuncioRoute);

module.exports = app;
