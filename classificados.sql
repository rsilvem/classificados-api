/************ Update: Tables ***************/

/******************** Add Table: "public"."anunciante" ************************/

/* Build Table Structure */
CREATE TABLE "public"."anunciante"
(
	id SERIAL NOT NULL,
	cpf VARCHAR(15) NULL,
	nome VARCHAR(255) NOT NULL,
	senha VARCHAR(64) NOT NULL,
	nascimento DATE NOT NULL,
	genero VARCHAR(1) NULL,
	email VARCHAR(255) NOT NULL,
	celular VARCHAR(15) NOT NULL,
	telefone VARCHAR(15) NULL,
	logradouro VARCHAR(255) NULL,
	numero VARCHAR(10) NULL,
	complemento VARCHAR(255) NULL,
	bairro VARCHAR(255) NULL,
	cidade VARCHAR(255) NOT NULL,
	estado VARCHAR(2) NOT NULL,
	cep VARCHAR(9) NULL,
	ativo BOOL NOT NULL,
	recebe_news BOOL NOT NULL,
	data_cadastro TIMESTAMP DEFAULT now() NOT NULL
);

/* Add Primary Key */
ALTER TABLE "public"."anunciante" ADD CONSTRAINT pkanunciante
	PRIMARY KEY (id);


/******************** Add Table: "public"."favoritos" ************************/

/* Build Table Structure */
CREATE TABLE "public"."favoritos"
(
	id_usuario INTEGER NOT NULL,
	id_anuncio INTEGER NOT NULL
);

/* Add Primary Key */
ALTER TABLE "public"."favoritos" ADD CONSTRAINT pkfavoritos
	PRIMARY KEY (id_usuario, id_anuncio);


/******************** Add Table: "public"."fipe" ************************/

/* Build Table Structure */
CREATE TABLE "public"."fipe"
(
	id SERIAL NOT NULL,
	codigo_tabela_referencia integer,
	mes_referencia date,
	codigo_marca integer,
	marca text,
	codigo_modelo integer,
	modelo text,
	codigo_tipo_veiculo integer,
	ano_modelo integer,
	codigo_tipo_combustivel integer,
	combustivel text,
	valor numeric(15,2),
	codigo_fipe varchar(25),
	codigo integer,
	tipo_veiculo text
);

/* Add Primary Key */
ALTER TABLE "public"."fipe" ADD CONSTRAINT pkfipe
	PRIMARY KEY (id);


/******************** Add Table: "public"."fotos_anuncio" ************************/

/* Build Table Structure */
CREATE TABLE "public"."fotos_anuncio"
(
	id SERIAL NOT NULL,
	base64 TEXT NOT NULL,
	descricao VARCHAR(255) NULL,
	id_anuncio INTEGER NOT NULL
);

/* Add Primary Key */
ALTER TABLE "public"."fotos_anuncio" ADD CONSTRAINT pkfotos_anuncio
	PRIMARY KEY (id);


/******************** Add Table: "public"."item_opcional" ************************/

/* Build Table Structure */
CREATE TABLE "public"."item_opcional"
(
	id SERIAL NOT NULL,
	nome VARCHAR(255) NOT NULL
);

/* Add Primary Key */
ALTER TABLE "public"."item_opcional" ADD CONSTRAINT pkitem_opcional
	PRIMARY KEY (id);


/******************** Add Table: "public"."opcionais_veiculo" ************************/

/* Build Table Structure */
CREATE TABLE "public"."opcionais_veiculo"
(
	id_veiculo INTEGER NOT NULL,
	id_opcional INTEGER NOT NULL
);

/* Add Primary Key */
ALTER TABLE "public"."opcionais_veiculo" ADD CONSTRAINT pkopcionais_veiculo
	PRIMARY KEY (id_opcional, id_veiculo);


/******************** Add Table: "public"."usuario" ************************/

/* Build Table Structure */
CREATE TABLE "public"."usuario"
(
	id SERIAL NOT NULL,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	senha VARCHAR(64) NOT NULL,
	celular VARCHAR(15) NULL,
	cidade VARCHAR(255) NOT NULL,
	estado VARCHAR(2) NOT NULL,
	data_cadastro TIMESTAMP NOT NULL
);

/* Add Primary Key */
ALTER TABLE "public"."usuario" ADD CONSTRAINT pkusuario
	PRIMARY KEY (id);


/******************** Add Table: "public"."veiculo_anuncio" ************************/

/* Build Table Structure */
CREATE TABLE "public"."veiculo_anuncio"
(
	id SERIAL NOT NULL,
	id_anunciante INTEGER NOT NULL,
	id_fipe INTEGER NOT NULL,
	historia TEXT NULL,
	historia_resumida TEXT NULL,
	valor NUMERIC(17, 2) NOT NULL,
	kilometragem INTEGER NOT NULL,
	final_placa INTEGER NOT NULL,
	tipo_cambio VARCHAR(255) NOT NULL,
	cor BIGINT NOT NULL,
	ano_fabricacao INTEGER NULL,
	financiado BOOL NOT NULL,
	bloqueio_judicial BOOL NOT NULL,
	ipva_pago BOOL NOT NULL,
	licenciado BOOL NOT NULL,
	possui_debitos BOOL NOT NULL,
	pontuacao INTEGER NULL,
	tipo_anuncio VARCHAR(20) NOT NULL,
	data_cadastro TIMESTAMP DEFAULT now() NOT NULL
);
ALTER TABLE veiculo_anuncio ADD COLUMN ativo boolean default false;
ALTER TABLE veiculo_anuncio ADD COLUMN placa_preta boolean;


/* Add Primary Key */
ALTER TABLE "public"."veiculo_anuncio" ADD CONSTRAINT pkveiculo_anuncio
	PRIMARY KEY (id);


CREATE TABLE "public"."proposta"
(
	id SERIAL NOT NULL primary key,
	id_anuncio integer,
	id_usuario integer,
	valor_proposta numeric(17,2),
	data_cadastro timestamp default now(),
	tipo_negociacao varchar(1), -- A - avaliacao profissional, D - negociacao direta
	aceita boolean,
	data_aceita_rejeitada date,
	id_avaliador integer
);


CREATE TABLE "public"."avaliador"
(
	id SERIAL NOT NULL primary key,
	nome VARCHAR(255) NOT NULL,
	cpf varchar(15),
	data_nascimento date,
	email VARCHAR(255) NOT NULL,
	senha VARCHAR(64) NOT NULL,
	celular VARCHAR(15) NULL,
	cidade VARCHAR(255) NOT NULL,
	estado VARCHAR(2) NOT NULL,
	valor_avaliacao numeric(17,2),
	data_cadastro TIMESTAMP NOT NULL
);





/************ Add Foreign Keys ***************/

ALTER TABLE "public"."proposta" ADD CONSTRAINT fk_proposta_avaliador
	FOREIGN KEY (id_avaliador) REFERENCES "public"."avaliador" (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "public"."proposta" ADD CONSTRAINT fk_proposta_usuario
	FOREIGN KEY (id_usuario) REFERENCES "public"."usuario" (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "public"."proposta" ADD CONSTRAINT fk_proposta_anuncio
	FOREIGN KEY (id_anuncio) REFERENCES "public"."veiculo_anuncio" (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_favoritos_usuario */
ALTER TABLE "public"."favoritos" ADD CONSTRAINT fk_favoritos_usuario
	FOREIGN KEY (id_usuario) REFERENCES "public"."usuario" (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_favoritos_veiculo_anuncio */
ALTER TABLE "public"."favoritos" ADD CONSTRAINT fk_favoritos_veiculo_anuncio
	FOREIGN KEY (id_anuncio) REFERENCES "public"."veiculo_anuncio" (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_foto_anuncio_veiculo_anuncio */
ALTER TABLE "public"."fotos_anuncio" ADD CONSTRAINT fk_foto_anuncio_veiculo_anuncio
	FOREIGN KEY (id_anuncio) REFERENCES "public"."veiculo_anuncio" (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_opcional_veiculo_item_opcional */
ALTER TABLE "public"."opcionais_veiculo" ADD CONSTRAINT fk_opcional_veiculo_item_opcional
	FOREIGN KEY (id_opcional) REFERENCES "public"."item_opcional" (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_opcional_veiculo_veiculo_anuncio */
ALTER TABLE "public"."opcionais_veiculo" ADD CONSTRAINT fk_opcional_veiculo_veiculo_anuncio
	FOREIGN KEY (id_veiculo) REFERENCES "public"."veiculo_anuncio" (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_veiculo_anuncio_anunciante */
ALTER TABLE "public"."veiculo_anuncio" ADD CONSTRAINT fk_veiculo_anuncio_anunciante
	FOREIGN KEY (id_anunciante) REFERENCES "public"."anunciante" (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_veiculo_anuncio_fipe */
ALTER TABLE "public"."veiculo_anuncio" ADD CONSTRAINT fk_veiculo_anuncio_fipe
	FOREIGN KEY (id_fipe) REFERENCES "public"."fipe" (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;