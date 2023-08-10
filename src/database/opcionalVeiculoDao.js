const { Client } = require("pg");

require('dotenv/config');
const credentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

module.exports = {

    getListaOpcionais: async function () {
        const client = new Client(credentials);
        await client.connect();
        const rows = await client.query("SELECT * FROM item_opcional");
        await client.end();
        
        return rows;
    },
    createOpcional: async function(data) {
      const client = new Client(credentials);
      await client.connect();
      const params = [data.nome_opcional];
      await client.query(
        "INSERT INTO item_opcional ("+
          "nome) "+
        "VALUES ($1)", 
        params
      );

      const params2 = [data.nome_opcional];
      const rows = await client.query("SELECT * FROM item_opcional WHERE nome = $1 ORDER BY id DESC LIMIT 1", params2);

      await client.end();
    
      return rows;
  },
  getByNome: async function(nome) {
    const client = new Client(credentials);
    await client.connect();
    const params = [nome];
    const rows = await client.query("SELECT * FROM item_opcional WHERE nome = $1", params);
    await client.end();

    return rows;
},
};