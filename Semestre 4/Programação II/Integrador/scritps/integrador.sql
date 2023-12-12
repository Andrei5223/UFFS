drop database integrador;

create database integrador;

\c integrador

create table bem (
    nome varchar(20),
    qtd_seg integer not null,
    un_med varchar(20) not null,
    constraint pk_bem primary key (nome)
);

insert into bem (nome, qtd_seg, un_med)
       values ('Farrinha de trigo', 10,'KG'),
              ('Ovos de galinha', 5,'Duzias'),
              ('Fermento', 200,'MG'),
              ('Farrinha de milho',10,'KG'),
              ('Polvilho',5,'KG');

create table usuario(
    rg       integer,
    nome     varchar(20) not null,
    senha    varchar not null,
    adm      char not null,
    constraint pk_usuario primary key (rg)
);

create table materia_prima(
    id serial,
    qtd integer not null,
    data_val date not null,
    marca varchar(20),
    preco_total float not null,
    data_cad date not null,
    nome varchar(20) not null,
    constraint pk_materia_prima primary key (id),
    constraint fk_materia_prima_bem foreign key (nome) references bem(nome) ON UPDATE CASCADE
);

insert into materia_prima (qtd, data_val, marca, preco_total, data_cad, nome)
       values (15, '25/12/2023', 'Marca1', '150', '19/11/2023', 'Farrinha de trigo'),
              (5, '02/01/2024', 'Marca2', '35', '19/11/2023', 'Ovos de galinha'),
              (20, '21/05/2024', 'Marca4', '200', '19/11/2023', 'Farrinha de trigo'),
              (8, '21/05/2024', 'Marca4', '40', '19/11/2023', 'Polvilho'),
              (1000, '15/08/2024', 'Marca3', '49', '19/11/2023', 'Fermento');

create table reg_entrada(
    id serial,
    data date,
    qtd_alt integer not null,
    preco_total float not null,
    nome varchar(20) not null,
    constraint pk_reg_entrada primary key (id),
    constraint fk_reg_entrada_bem foreign key (nome) references bem(nome) ON UPDATE CASCADE
);

insert into reg_entrada (data, qtd_alt, preco_total, nome)
       values ('19/11/2023', '15', '150', 'Farrinha de trigo'),
              ('19/11/2023', '5', '35', 'Ovos de galinha'),
              ('19/11/2023', '20', '200', 'Farrinha de trigo'),
              ('19/11/2023', '1000', '49', 'Fermento'),
              ('19/11/2023', '10', '50', 'Polvilho');

create table reg_financeiro (
    receita integer,
    data date,
    constraint pk_reg_financeiro primary key (data)
);

insert into reg_financeiro (receita, data)
       values (100, '19/11/2023');

create table reg_saida(
    id serial,
    data date,
    qtd_alt integer not null,
    preco_total float not null,
    nome varchar(20) not null,
    constraint pk_reg_saida primary key (id),
    constraint fk_reg_saida_bem foreign key (nome) references bem(nome) ON UPDATE CASCADE,
    constraint fk_reg_saida_reg_financeiro foreign key (data) references reg_financeiro(data)
);

insert into reg_saida (data, qtd_alt, preco_total, nome)
       values ('19/11/2023', '2', '10', 'Polvilho');

create table rec_produtos (
    idr serial,
    modo_prep varchar(512),
    preco float not null,
    nomer varchar(20),
    constraint pk_rec_produtos primary key (idr)
);

insert into rec_produtos (preco, modo_prep, nomer)
       values (10.5, 'Misture e cozinhe tudo!', 'Receita teste');

create table ingrediente (
    id  serial,  
    idr integer not null,
    nome varchar(20) not null,
    qtd varchar(20) not null,
    constraint pq_ingrediente primary key (id),
    constraint fk_ingrediente_rec_produtos foreign key (idr) references rec_produtos(idr),
    constraint fk_ingrediente_bem foreign key (nome) references bem(nome) ON UPDATE CASCADE
);

insert into ingrediente (idr, nome, qtd)
       values (1, 'Farrinha de trigo', '2 xicaras');
