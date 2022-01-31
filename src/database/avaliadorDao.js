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

    getAvaliadores: async function () {
        const client = new Client(credentials);
        await client.connect();
        const rows = await client.query("SELECT * FROM avaliador");
        await client.end();
      
        return rows;
    },
    getAvaliador: async function(id) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id];
        const rows = await client.query("SELECT * FROM avaliador WHERE id = $1", params);
        await client.end();
      
        return rows;
    },
    deleteAvaliador: async function(id) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id];
        const deleted = await client.query("DELETE FROM avaliador WHERE id = $1", params);
        await client.end();
      
        return deleted;
    },
    createAvaliador: async function(data) {
        const client = new Client(credentials);
        await client.connect();
        const params = [data.cpf, data.nome, md5(data.senha), data.nascimento, data.email, data.celular,
                        data.cidade, data.estado,  data.valor_avaliacao];
        await client.query(
          "INSERT INTO avaliador("+
                "cpf, nome, senha, data_nascimento, email, celular, "+
                "cidade, estado, data_cadastro, valor_avaliacao) "+
          "VALUES ($1, $2, $3, $4, $5, $6, "+
                "$7, $8, now(), $9 )",
          params
        );
  
        const params2 = [data.cpf];
        const rows = await client.query("SELECT * FROM avaliador WHERE cpf = $1 ORDER BY id DESC LIMIT 1", params2);
  
        await client.end();
      
        return rows;
    },
    updateAvaliador: async function(id,data) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id, data.cpf, data.nome, md5(data.senha), data.nascimento, data.email, data.celular,
                        data.cidade, data.estado, data.valor_avaliacao];
        await client.query(
          "UPDATE avaliador "+
          "SET cpf = $2, nome = $3, senha = $4, data_nascimento = $5, email = $6, celular = $7, "+
              "cidade = $8, estado = $9, valor_avaliacao = $10 "+
          "WHERE id = $1", 
          params
        );
  
        const params2 = [id];
        const rows = await client.query("SELECT * FROM avaliador WHERE id = $1", params2);
  
        await client.end();
      
        return rows;
    }
};