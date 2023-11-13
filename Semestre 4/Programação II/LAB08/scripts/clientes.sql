DROP DATABASE lab08;

CREATE DATABASE lab08;

\c lab08

CREATE TABLE curso
(
    idc SERIAL PRIMARY KEY,
    nome VARCHAR not null,
    descr VARCHAR not null
);
INSERT INTO curso (nome, descr) VALUES ('Ciência da computação', 'Um curso de computação +/- bacana :-)');
INSERT INTO curso (nome, descr) VALUES ('Medicina', 'Um dos cursos de medicina');

CREATE TABLE ccr
(
    idd SERIAL PRIMARY KEY,
    idc integer not null,
    nome VARCHAR not null,
    descr VARCHAR not null,
    constraint fk_ccr_curso foreign key (idc) references curso(idc)
);

INSERT INTO ccr (idc, nome, descr) VALUES (1, 'Algoritmos e programação', 'Sem descrição');
INSERT INTO ccr (idc, nome, descr) VALUES (1, 'Introdução à filosofia', 'Sem descrição');
INSERT INTO ccr (idc, nome, descr) VALUES (1, 'Programação II', 'Sem descrição');
INSERT INTO ccr (idc, nome, descr) VALUES (2, 'Introdução à filosofia', 'Sem descrição');

CREATE TABLE horarios
(
    idh SERIAL PRIMARY KEY,
    idc integer,
    semestre integer,
    constraint fk_horarios_curso foreign key (idc) references curso(idc)
);

INSERT INTO horarios (idc, semestre) VALUES (1, 1);

CREATE TABLE grade
(
    idg SERIAL PRIMARY KEY,
    idh integer,
    hora VARCHAR not null,
    seg VARCHAR,
    ter VARCHAR,
    qua VARCHAR,
    qui VARCHAR,
    sex VARCHAR,
    sab VARCHAR,
    constraint fk_grade_horario foreign key (idh) references horarios(idh)
);

INSERT INTO grade (idh, hora, seg, ter) VALUES (1, '07:30', 'Algoritmos e programação', 'Programação II');
INSERT INTO grade (idh, hora) VALUES (1, '10:20');
INSERT INTO grade (idh, hora) VALUES (1, '13:30');
INSERT INTO grade (idh, hora) VALUES (1, '16:00');
INSERT INTO grade (idh, hora) VALUES (1, '19:10');
INSERT INTO grade (idh, hora) VALUES (1, '21:00');
-- SELECT * FROM curso;
