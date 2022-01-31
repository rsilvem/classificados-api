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

};