const { Client } = require("pg");
var md5 = require("md5");

require('dotenv/config');
const credentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

module.exports = {

    getPropostasAnuncio: async function(idAnuncio) {
        const client = new Client(credentials);
        await client.connect();
        const params = [idAnuncio];
        const rows = await client.query("SELECT * FROM propostas WHERE id_anuncio = $1", params);
        await client.end();
      
        return rows;
    },

    getPropostasUsuario: async function(idUsuario) {
        const client = new Client(credentials);
        await client.connect();
        const params = [idUsuario];
        const rows = await client.query("SELECT * FROM propostas WHERE id_usuario = $1", params);
        await client.end();
      
        return rows;
    },

    createProposta: async function(data) {
        const client = new Client(credentials);
        await client.connect();
        const params = [data.id_anuncio, data.id_usuario, data.valor_proposta, data.tipo_negociacao];
        await client.query(
          "INSERT INTO propostas ("+
              "id_anuncio, "+
              "id_usuario, "+
              "valor_proposta, "+
              "tipo_negociacao "+
          ") VALUES ($1, $2, $3, $4)", 
          params
        );

        const params2 = [data.id_anuncio, data.id_usuario];
        const rows = await client.query("SELECT * FROM propostas WHERE id_anuncio = $1 and id_usuario = $2 ORDER BY id DESC LIMIT 1", params2);

        await client.end();
      
        return rows;
    },

    aceitarProposta: async function(id) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id];
        await client.query(
          "UPDATE propostas SET "+
              "aceita = true, "+
          "WHERE id = $1", 
          params
        );

        const params2 = [id];
        const rows = await client.query("SELECT * FROM propostas WHERE id = $1", params2);

        await client.end();
      
        return rows;
    },

    rejeitarProposta: async function(id) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id];
        await client.query(
          "UPDATE propostas SET "+
              "aceita = false, "+
          "WHERE id = $1", 
          params
        );

        const params2 = [id];
        const rows = await client.query("SELECT * FROM propostas WHERE id = $1", params2);

        await client.end();
      
        return rows;
    },

};