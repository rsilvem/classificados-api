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

    getMarcasByTipo: async function(tipo) {
        const client = new Client(credentials);
        await client.connect();
        const params = [tipo];
        const rows = await client.query("SELECT DISTINCT codigo_marca, marca FROM fipe WHERE tipo_veiculo = $1", params);
        await client.end();
      
        return rows;
    },
    getByTipoAndMarca: async function(tipo, codigoMarca) {
        const client = new Client(credentials);
        await client.connect();
        const params = [tipo, codigoMarca];
        const rows = await client.query("SELECT * FROM fipe WHERE tipo_veiculo = $1 AND codigo_marca = $2", params);
        await client.end();
      
        return rows;
    },
    getByTipoAndMarcaAndModelo: async function(tipo, marca, modelo) {
        const client = new Client(credentials);
        await client.connect();
        const params = [tipo, marca, modelo];
        const rows = await client.query("SELECT * FROM fipe WHERE tipo_veiculo = $1 AND marca = $2 AND modelo = $3", params);
        await client.end();
      
        return rows;
    },
    getByTipoAndMarcaAndModeloAndAno: async function(tipo, marca, modelo, ano) {
        const client = new Client(credentials);
        await client.connect();
        const params = [tipo, marca, modelo, ano];
        const rows = await client.query("SELECT * FROM fipe WHERE tipo_veiculo = $1 AND marca = $2 AND modelo = $3 AND ano_modelo = $4", params);
        await client.end();
      
        return rows;
    },
    getByTipoAndMarcaAndCodigo: async function(tipo, marca, codigoModelo) {
        const client = new Client(credentials);
        await client.connect();
        const params = [tipo, marca, codigoModelo];
        const rows = await client.query("SELECT * FROM fipe WHERE tipo_veiculo = $1 AND marca = $2 AND codigo_fipe = $3", params);
        await client.end();
      
        return rows;
    },
    getByTipoAndMarcaAndCodigoAndAno: async function(tipo, marca, codigoModelo, ano) {
        const client = new Client(credentials);
        await client.connect();
        const params = [tipo, marca, codigoModelo, ano];
        const rows = await client.query("SELECT * FROM fipe WHERE tipo_veiculo = $1 AND marca = $2 AND codigo_fipe = $3 AND ano_modelo = $4", params);
        await client.end();
      
        return rows;
    },
};