const { Client } = require("pg");

var crypto = require("crypto");

require('dotenv/config');
const credentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

module.exports = {

    insertUser: async function(data) {
        const client = new Client(credentials);
        await client.connect();

        var shaPass = crypto.createHash("sha256").update(data.password).digest("hex");

        const params = [data.username, shaPass];
        await client.query(
          "INSERT INTO oauth_users("+
            "username, user_password) "+
          "VALUES ($1, $2)", 
          params
        );
  
        const params2 = [data.username];
        const rows = await client.query("SELECT * FROM oauth_users WHERE username = $1 ORDER BY id DESC LIMIT 1", params2);
  
        await client.end();
      
        return rows;
    },



};