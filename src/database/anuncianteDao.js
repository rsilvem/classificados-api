const { Client } = require("pg");
var md5 = require("md5");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "classificados",
  password: "postgres",
  port: 5432,
};

module.exports = {

  getAnunciantes: async function () {
      const client = new Client(credentials);
      await client.connect();
      const rows = await client.query("SELECT * FROM anunciante");
      await client.end();
    
      return rows;
  },
  getAnunciante: async function(id) {
      const client = new Client(credentials);
      await client.connect();
      const params = [id];
      const rows = await client.query("SELECT * FROM anunciante WHERE id = $1", params);
      await client.end();
    
      return rows;
  },
  deleteAnunciante: async function(id) {
      const client = new Client(credentials);
      await client.connect();
      const params = [id];
      const deleted = await client.query("DELETE FROM anunciante WHERE id = $1", params);
      await client.end();
    
      return deleted;
  },
  createAnunciante: async function(data) {
      const client = new Client(credentials);
      await client.connect();
      const params = [data.cpf, data.nome, md5(data.senha), data.nascimento, data.genero, data.email, data.celular, data.telefone,
                      data.logradouro, data.numero, data.complemento, data.bairro, data.cidade, data.estado, data.cep,
                      data.ativo, data.recebe_news];
      await client.query(
        "INSERT INTO anunciante("+
          "cpf, nome, senha, nascimento, genero, email, celular, telefone, "+
          "logradouro, numero, complemento, bairro, cidade, estado, cep, "+
          "ativo, recebe_news) "+
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, "+
          "$9, $10, $11, $12, $13, $14, $15, "+
          "$16, $17)", 
        params
      );

      const params2 = [data.cpf];
      const rows = await client.query("SELECT * FROM anunciante WHERE cpf = $1 ORDER BY id DESC LIMIT 1", params2);

      await client.end();
    
      return rows;
  },
  updateAnunciante: async function(id,data) {
      const client = new Client(credentials);
      await client.connect();
      const params = [id, data.cpf, data.nome, md5(data.senha), data.nascimento, data.genero, data.email, data.celular, data.telefone,
                      data.logradouro, data.numero, data.complemento, data.bairro, data.cidade, data.estado, data.cep,
                      data.ativo, data.recebe_news];
      await client.query(
        "UPDATE anunciante "+
        "SET cpf = $2, nome = $3, senha = $4, nascimento = $5, genero = $6, email = $7, celular = $8, telefone = $9, "+
            "logradouro = $10, numero = $11, complemento = $12, bairro = $13, cidade = $14, estado = $15, cep = $16, "+
            "ativo = $17, recebe_news = $18 "+ 
        "WHERE id = $1", 
        params
      );

      const params2 = [id];
      const rows = await client.query("SELECT * FROM anunciante WHERE id = $1", params2);

      await client.end();
    
      return rows;
  }
  
};
