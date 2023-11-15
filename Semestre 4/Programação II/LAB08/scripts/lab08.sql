DROP DATABASE lab08;

CREATE DATABASE lab08;

\c lab08

CREATE TABLE curso
(
    idc SERIAL PRIMARY KEY,
    nome VARCHAR UNIQUE not null,
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
INSERT INTO horarios (idc, semestre) VALUES (1, 2);
INSERT INTO horarios (idc, semestre) VALUES (1, 3);
INSERT INTO horarios (idc, semestre) VALUES (1, 4);
INSERT INTO horarios (idc, semestre) VALUES (1, 5);
INSERT INTO horarios (idc, semestre) VALUES (1, 6);
INSERT INTO horarios (idc, semestre) VALUES (1, 7);
INSERT INTO horarios (idc, semestre) VALUES (1, 8);

INSERT INTO horarios (idc, semestre) VALUES (2, 1);
INSERT INTO horarios (idc, semestre) VALUES (2, 2);
INSERT INTO horarios (idc, semestre) VALUES (2, 3);
INSERT INTO horarios (idc, semestre) VALUES (2, 4);
INSERT INTO horarios (idc, semestre) VALUES (2, 5);
INSERT INTO horarios (idc, semestre) VALUES (2, 6);
INSERT INTO horarios (idc, semestre) VALUES (2, 7);
INSERT INTO horarios (idc, semestre) VALUES (2, 8);
INSERT INTO horarios (idc, semestre) VALUES (2, 9);
INSERT INTO horarios (idc, semestre) VALUES (2, 10);

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

INSERT INTO grade (idh, hora, seg, ter, qua) VALUES (1, '07:30', 'Algoritmos e programação', 'Programação II', 'Cálculo 1');
INSERT INTO grade (idh, hora) VALUES (1, '10:20');
INSERT INTO grade (idh, hora) VALUES (1, '13:30');
INSERT INTO grade (idh, hora) VALUES (1, '16:00');
INSERT INTO grade (idh, hora) VALUES (1, '19:10');
INSERT INTO grade (idh, hora) VALUES (1, '21:00');

INSERT INTO grade (idh, hora) VALUES (2, '07:30');
INSERT INTO grade (idh, hora) VALUES (2, '10:20');
INSERT INTO grade (idh, hora) VALUES (2, '13:30');
INSERT INTO grade (idh, hora) VALUES (2, '16:00');
INSERT INTO grade (idh, hora) VALUES (2, '19:10');
INSERT INTO grade (idh, hora) VALUES (2, '21:00');

INSERT INTO grade (idh, hora) VALUES (3, '07:30');
INSERT INTO grade (idh, hora) VALUES (3, '10:20');
INSERT INTO grade (idh, hora) VALUES (3, '13:30');
INSERT INTO grade (idh, hora) VALUES (3, '16:00');
INSERT INTO grade (idh, hora) VALUES (3, '19:10');
INSERT INTO grade (idh, hora) VALUES (3, '21:00');

INSERT INTO grade (idh, hora) VALUES (4, '07:30');
INSERT INTO grade (idh, hora) VALUES (4, '10:20');
INSERT INTO grade (idh, hora) VALUES (4, '13:30');
INSERT INTO grade (idh, hora) VALUES (4, '16:00');
INSERT INTO grade (idh, hora) VALUES (4, '19:10');
INSERT INTO grade (idh, hora) VALUES (4, '21:00');

INSERT INTO grade (idh, hora) VALUES (5, '07:30');
INSERT INTO grade (idh, hora) VALUES (5, '10:20');
INSERT INTO grade (idh, hora) VALUES (5, '13:30');
INSERT INTO grade (idh, hora) VALUES (5, '16:00');
INSERT INTO grade (idh, hora) VALUES (5, '19:10');
INSERT INTO grade (idh, hora) VALUES (5, '21:00');

INSERT INTO grade (idh, hora) VALUES (6, '07:30');
INSERT INTO grade (idh, hora) VALUES (6, '10:20');
INSERT INTO grade (idh, hora) VALUES (6, '13:30');
INSERT INTO grade (idh, hora) VALUES (6, '16:00');
INSERT INTO grade (idh, hora) VALUES (6, '19:10');
INSERT INTO grade (idh, hora) VALUES (6, '21:00');

INSERT INTO grade (idh, hora) VALUES (7, '07:30');
INSERT INTO grade (idh, hora) VALUES (7, '10:20');
INSERT INTO grade (idh, hora) VALUES (7, '13:30');
INSERT INTO grade (idh, hora) VALUES (7, '16:00');
INSERT INTO grade (idh, hora) VALUES (7, '19:10');
INSERT INTO grade (idh, hora) VALUES (7, '21:00');

INSERT INTO grade (idh, hora) VALUES (8, '07:30');
INSERT INTO grade (idh, hora) VALUES (8, '10:20');
INSERT INTO grade (idh, hora) VALUES (8, '13:30');
INSERT INTO grade (idh, hora) VALUES (8, '16:00');
INSERT INTO grade (idh, hora) VALUES (8, '19:10');
INSERT INTO grade (idh, hora) VALUES (8, '21:00');

INSERT INTO grade (idh, hora) VALUES (9, '07:30');
INSERT INTO grade (idh, hora) VALUES (9, '10:20');
INSERT INTO grade (idh, hora) VALUES (9, '13:30');
INSERT INTO grade (idh, hora) VALUES (9, '16:00');
INSERT INTO grade (idh, hora) VALUES (9, '19:10');
INSERT INTO grade (idh, hora) VALUES (9, '21:00');

INSERT INTO grade (idh, hora) VALUES (10, '07:30');
INSERT INTO grade (idh, hora) VALUES (10, '10:20');
INSERT INTO grade (idh, hora) VALUES (10, '13:30');
INSERT INTO grade (idh, hora) VALUES (10, '16:00');
INSERT INTO grade (idh, hora) VALUES (10, '19:10');
INSERT INTO grade (idh, hora) VALUES (10, '21:00');

INSERT INTO grade (idh, hora) VALUES (11, '07:30');
INSERT INTO grade (idh, hora) VALUES (11, '10:20');
INSERT INTO grade (idh, hora) VALUES (11, '13:30');
INSERT INTO grade (idh, hora) VALUES (11, '16:00');
INSERT INTO grade (idh, hora) VALUES (11, '19:10');
INSERT INTO grade (idh, hora) VALUES (11, '21:00');

INSERT INTO grade (idh, hora) VALUES (12, '07:30');
INSERT INTO grade (idh, hora) VALUES (12, '10:20');
INSERT INTO grade (idh, hora) VALUES (12, '13:30');
INSERT INTO grade (idh, hora) VALUES (12, '16:00');
INSERT INTO grade (idh, hora) VALUES (12, '19:10');
INSERT INTO grade (idh, hora) VALUES (12, '21:00');

INSERT INTO grade (idh, hora) VALUES (13, '07:30');
INSERT INTO grade (idh, hora) VALUES (13, '10:20');
INSERT INTO grade (idh, hora) VALUES (13, '13:30');
INSERT INTO grade (idh, hora) VALUES (13, '16:00');
INSERT INTO grade (idh, hora) VALUES (13, '19:10');
INSERT INTO grade (idh, hora) VALUES (13, '21:00');

INSERT INTO grade (idh, hora) VALUES (14, '07:30');
INSERT INTO grade (idh, hora) VALUES (14, '10:20');
INSERT INTO grade (idh, hora) VALUES (14, '13:30');
INSERT INTO grade (idh, hora) VALUES (14, '16:00');
INSERT INTO grade (idh, hora) VALUES (14, '19:10');
INSERT INTO grade (idh, hora) VALUES (14, '21:00');

INSERT INTO grade (idh, hora) VALUES (15, '07:30');
INSERT INTO grade (idh, hora) VALUES (15, '10:20');
INSERT INTO grade (idh, hora) VALUES (15, '13:30');
INSERT INTO grade (idh, hora) VALUES (15, '16:00');
INSERT INTO grade (idh, hora) VALUES (15, '19:10');
INSERT INTO grade (idh, hora) VALUES (15, '21:00');

INSERT INTO grade (idh, hora) VALUES (16, '07:30');
INSERT INTO grade (idh, hora) VALUES (16, '10:20');
INSERT INTO grade (idh, hora) VALUES (16, '13:30');
INSERT INTO grade (idh, hora) VALUES (16, '16:00');
INSERT INTO grade (idh, hora) VALUES (16, '19:10');
INSERT INTO grade (idh, hora) VALUES (16, '21:00');

INSERT INTO grade (idh, hora) VALUES (17, '07:30');
INSERT INTO grade (idh, hora) VALUES (17, '10:20');
INSERT INTO grade (idh, hora) VALUES (17, '13:30');
INSERT INTO grade (idh, hora) VALUES (17, '16:00');
INSERT INTO grade (idh, hora) VALUES (17, '19:10');
INSERT INTO grade (idh, hora) VALUES (17, '21:00');

INSERT INTO grade (idh, hora) VALUES (18, '07:30');
INSERT INTO grade (idh, hora) VALUES (18, '10:20');
INSERT INTO grade (idh, hora) VALUES (18, '13:30');
INSERT INTO grade (idh, hora) VALUES (18, '16:00');
INSERT INTO grade (idh, hora) VALUES (18, '19:10');
INSERT INTO grade (idh, hora) VALUES (18, '21:00');

-- SELECT * FROM curso;
