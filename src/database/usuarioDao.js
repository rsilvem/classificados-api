
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

    getUsuarios: async function () {
        const client = new Client(credentials);
        await client.connect();
        const rows = await client.query("SELECT * FROM usuario");
        await client.end();
    
        return rows;
    },
    getUsuario: async function(id) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id];
        const rows = await client.query("SELECT * FROM usuario WHERE id = $1", params);
        await client.end();
    
        return rows;
    },
    getUsuarioByEmail: async function(email) {
        const client = new Client(credentials);
        await client.connect();
        const params = [email];
        const rows = await client.query("SELECT * FROM usuario WHERE email = $1", params);
        await client.end();
    
        return rows;
    },
    deleteUsuario: async function(id) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id];
        const deleted = await client.query("DELETE FROM usuario WHERE id = $1", params);
        await client.end();
    
        return deleted;
    },
    createUsuario: async function(data) {
        const client = new Client(credentials);
        await client.connect();
        const params = [data.nome, data.email, md5(data.senha), data.celular, data.cidade, data.estado];
        await client.query(
            "INSERT INTO usuario ("+
                "nome, "+
                "email, "+
                "senha, "+
                "celular, "+
                "cidade, "+
                "estado, "+
                "data_cadastro "+
            ") VALUES ($1, $2, $3, $4, $5, $6, now())", 
            params
        );

        const params2 = [data.email];
        const rows = await client.query("SELECT * FROM usuario WHERE email = $1 ORDER BY id DESC LIMIT 1", params2);

        await client.end();
    
        return rows;
    },
    updateUsuario: async function(id, data) {
        const client = new Client(credentials);
        await client.connect();
        const params = [data.nome, data.email, md5(data.senha), data.celular, data.cidade, data.estado, id];
        await client.query(
            "UPDATE usuario SET "+
                "nome = $1, "+
                "email = $2, "+
                "senha = $3, "+
                "celular = $4, "+
                "cidade = $5, "+
                "estado = $6 "+
            "WHERE id = $7", 
            params
        );

        const params2 = [id];
        const rows = await client.query("SELECT * FROM usuario WHERE id = $1", params2);

        await client.end();
    
        return rows;
    }

};