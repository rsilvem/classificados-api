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

    getAnuncios: async function () {
        const client = new Client(credentials);
        await client.connect();
        const rows = await client.query("SELECT * FROM veiculo_anuncio");
        await client.end();
      
        return rows;
    },
    getAnuncio: async function(id) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id];
        const rows = await client.query("SELECT * FROM veiculo_anuncio WHERE id = $1", params);
        await client.end();
      
        return rows;
    },
    getFotosAnuncio: async function(idAnuncio) {
        const client = new Client(credentials);
        await client.connect();
        const params = [idAnuncio];
        const rows = await client.query("SELECT base64, descricao FROM fotos_anuncio WHERE id_anuncio = $1", params);
        await client.end();
      
        return rows;
    },
    getOpcionaisAnuncio: async function(idAnuncio) {
        const client = new Client(credentials);
        await client.connect();
        const params = [idAnuncio];
        const rows = await client.query("SELECT nome as opcional FROM opcionais_veiculo INNER JOIN item_opcional ON item_opcional.id = opcionais_veiculo.id_opcional WHERE opcionais_veiculo.id_veiculo = $1", params);
        await client.end();
        
        return rows;
    },
    deleteAnuncio: async function(id) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id];
        const deleted = await client.query("DELETE FROM veiculo_anuncio WHERE id = $1", params);
        await client.end();
      
        return deleted;
    },
    createAnuncio: async function(data) {
        const client = new Client(credentials);
        await client.connect();
        const params = [data.id_anunciante, data.id_fipe, data.historia, data.historia_resumida, 
                        data.valor, data.kilometragem, data.final_placa, data.tipo_cambio,
                        data.cor, data.ano_fabricacao, data.financiado, data.bloqueio_judicial, data.ipva_pago, 
                        data.licenciado, data.possui_debitos, data.pontuacao, data.tipo_anuncio, 
                        data.ativo, data.placa_preta];
        await client.query(
          "INSERT INTO veiculo_anuncio ("+
              "id_anunciante, "+
              "id_fipe, "+
              "historia, "+
              "historia_resumida, "+
              "valor, "+
              "kilometragem, "+
              "final_placa, "+
              "tipo_cambio, "+
              "cor, "+
              "ano_fabricacao, "+
              "financiado, "+
              "bloqueio_judicial, "+
              "ipva_pago, "+
              "licenciado, "+
              "possui_debitos, "+
              "pontuacao, "+
              "tipo_anuncio, "+
              "ativo, "+
              "placa_preta "+
          ") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)", 
          params
        );

        const params2 = [data.id_anunciante];
        const rows = await client.query("SELECT * FROM veiculo_anuncio WHERE id_anunciante = $1 ORDER BY id DESC LIMIT 1", params2);

        await client.end();
      
        return rows;
    },
    updateAnuncio: async function(id, data) {
        const client = new Client(credentials);
        await client.connect();
        const params = [data.id_anunciante, data.id_fipe, data.historia, data.historia_resumida, 
                        data.valor, data.kilometragem, data.final_placa, data.tipo_cambio,
                        data.cor, data.ano_fabricacao, data.financiado, data.bloqueio_judicial, data.ipva_pago, 
                        data.licenciado, data.possui_debitos, data.pontuacao, data.tipo_anuncio, 
                        data.ativo, data.placa_preta, id];
        await client.query(
          "UPDATE veiculo_anuncio SET "+
              "id_anunciante = $1, "+
              "id_fipe = $2, "+
              "historia = $3, "+
              "historia_resumida = $4, "+
              "valor = $5, "+
              "kilometragem = $6, "+
              "final_placa = $7, "+
              "tipo_cambio = $8, "+
              "cor = $9, "+
              "ano_fabricacao = $10, "+
              "financiado = $11, "+
              "bloqueio_judicial = $12, "+
              "ipva_pago = $13, "+
              "licenciado = $14, "+
              "possui_debitos = $15, "+
              "pontuacao = $16, "+
              "tipo_anuncio = $17, "+
              "ativo = $18, "+
              "placa_preta = $19 "+
          "WHERE id = $20", 
          params
        );

        const params2 = [id];
        const rows = await client.query("SELECT * FROM veiculo_anuncio WHERE id = $1", params2);

        await client.end();
      
        return rows;
    },
    updateScoreAnuncio: async function(id, score) {
        const client = new Client(credentials);
        await client.connect();
        const params = [score, id];
        await client.query(
          "UPDATE veiculo_anuncio SET "+
              "pontuacao = $1 "+
          "WHERE id = $2", 
          params
        );

        const params2 = [id];
        const rows = await client.query("SELECT * FROM veiculo_anuncio WHERE id = $1", params2);

        await client.end();
      
        return rows;
    },
    activateAnuncio: async function(id) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id];
        await client.query(
          "UPDATE veiculo_anuncio SET "+
              "ativo = true "+
          "WHERE id = $1", 
          params
        );

        const params2 = [id];
        const rows = await client.query("SELECT * FROM veiculo_anuncio WHERE id = $1", params2);

        await client.end();
      
        return rows;
    },
    deactivateAnuncio: async function(id) {
        const client = new Client(credentials);
        await client.connect();
        const params = [id];
        await client.query(
          "UPDATE veiculo_anuncio SET "+
              "ativo = false "+
          "WHERE id = $1", 
          params
        );

        const params2 = [id];
        const rows = await client.query("SELECT * FROM veiculo_anuncio WHERE id = $1", params2);

        await client.end();
      
        return rows;
    },
    addFotoAnuncio: async function(idAnuncio, fotoBase64, descricao) {
        const client = new Client(credentials);
        await client.connect();
        const params = [fotoBase64, descricao, idAnuncio];
        await client.query(
          "INSERT INTO fotos_anuncio (base64, descricao, id_anuncio) VALUES ($1, $2, $3)", 
          params
        );

        const params2 = [idAnuncio, descricao];
        const rows = await client.query("SELECT * FROM fotos_anuncio WHERE id_anuncio = $1 AND descricao = $2", params2);

        await client.end();
      
        return rows;
    },
    addItemOpcionalAnuncio: async function(idAnuncio, idItem) {
        const client = new Client(credentials);
        await client.connect();
        const params = [idAnuncio, idItem];
        await client.query(
          "INSERT INTO opcionais_veiculo (id_veiculo, id_opcional) VALUES ($1, $2)", 
          params
        );

        const params2 = [idAnuncio, idItem];
        const rows = await client.query("SELECT * FROM opcionais_veiculo WHERE id_veiculo = $1 AND id_opcional = $2", params2);

        await client.end();
          
        return rows;
    },
    
};