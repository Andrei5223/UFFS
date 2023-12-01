DROP TABLE clientes;
DROP TABLE users;
DROP TABLE usuario;

CREATE TABLE clientes
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR,
    email VARCHAR
);

CREATE TABLE users(
  user_id varchar(50) primary key,
  user_password varchar,
  user_token varchar
);

CREATE TABLE usuario(
  nome varchar(50) primary key,
  senha varchar
);

INSERT INTO clientes (nome, email) VALUES ('Edimar', 'edimar@uffs.edu.br');
INSERT INTO clientes (nome, email) VALUES ('Gian', 'gian@uffs.edu.br');

-- SELECT * FROM clientes;