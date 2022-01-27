const express = require('express');

const app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index');
const anuncianteRoute = require('./routes/anuncianteRoute');

app.use('/', index);
app.use('/anunciante', anuncianteRoute);

module.exports = app;
