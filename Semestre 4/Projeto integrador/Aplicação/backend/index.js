const express = require("express");
const cors = require("cors");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { Strategy, ExtractJwt } = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const pgp = require("pg-promise")({});
// npm install pg-promise

const usuario = "postgres";
const senha = "postgres";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/integrador`);

const app = express();
app.use(cors());
app.use(express.json());

app.use(
	session({
		secret: '"alguma_frase_muito_doida_pra_servir_de_SECRET',
		resave: false,
		saveUninitialized: false,
		cookie: { secure: true },
	}),
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		async (username, password, done) => {
			try {
				// busca o usuário no banco de dados
				const user = await db.oneOrNone(
					"SELECT * FROM usuario WHERE nome = $1;",
					[username],
				);

				// se não encontrou, retorna erro
				if (!user) {
					return done(null, false, { message: "Usuário incorreto." });
				}

				// verifica se o hash da senha bate com a senha informada
				const passwordMatch = await bcrypt.compare(
					password,
					user.senha,
				);

				// se senha está ok, retorna o objeto usuário
				if (passwordMatch) {
					console.log("Usuário autenticado!");
					return done(null, user);
				} else {
					// senão, retorna um erro
					return done(null, false, { message: "Senha incorreta." });
				}
			} catch (error) {
				return done(error);
			}
		},
	),
);

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: "your-secret-key",
		},
		async (payload, done) => {
			try {
				const user = await db.oneOrNone(
					"SELECT * FROM usuario WHERE nome = $1;",
					[payload.username],
				);

				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (error) {
				done(error, false);
			}
		},
	),
);

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, {
			user_id: user.nome,
			username: user.nome,
		});
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

const requireJWTAuth = passport.authenticate("jwt", { session: false });



app.listen(3010, () => console.log("Servidor rodando na porta 3010."));

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.post("/login",
	passport.authenticate("local", { session: false }),
	(req, res) => {

		// Cria o token JWT
		const token = jwt.sign({ username: req.body.username }, "your-secret-key", {
			expiresIn: "1h",
		});

		res.json({ message: "Login successful", token: token });
	},
);

app.post("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

app.post("/novoUsuario", async (req, res) => {
	const saltRounds = 10;
	try {
		const userRg = req.body.rg;
		const userNome = req.body.nome;
		const userPasswd = req.body.passwd;
		const userAdm = req.body.adm;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPasswd = bcrypt.hashSync(userPasswd, salt);

		console.log(`Nome: ${userNome} - Passwd: ${hashedPasswd} - ADM: ${userAdm}`);
		db.none("INSERT INTO usuario (rg, nome, senha, adm) VALUES ($1, $2, $3, $4);", [
			userRg,
			userNome,
			hashedPasswd,
			userAdm,
		]);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.get("/usuario", async (req, res) => {
	try {
		const usuario = await db.any(`SELECT rg, nome FROM usuario;`);

		console.log(`Retornando usuarios`);

		res.json(usuario).status(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.put("/usuario", async (req, res) => {
	try {
		const rg = req.body.rg;
		const nome = req.body.nome;

		console.log(`Nome: ${nome}`);
		await db.none(
			"UPDATE usuario SET nome = $1 WHERE rg = $2;",
			[nome, rg]
		);

		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.delete("/usuario", async (req, res) => {
	const ids = req.body.idsToDelete;
	try {

		// Deleta da database
		for (let i = 0; i < ids.length; i++) {
			await db.none(
				"DELETE FROM usuario WHERE rg = $1",
				[ids[i]]
			);

		}
		console.log(`RGs deletados: ${ids}`);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});


// Get para obter uma lista de matéria-primas
app.get("/estoque", async (req, res) => {
	try {
		const estoque = await db.any(`
            SELECT 
                m.id, 
                m.nome, 
                m.qtd, 
                b.un_med, 
                m.preco_total, 
                m.marca, 
                m.data_val, 
                m.data_cad, 
                b.qtd_seg 
            FROM 
                materia_prima m 
            NATURAL JOIN 
                bem b;
        `);

		for (let i = 0; i < estoque.length; i++) {
			let dataVal = new Date(estoque[i].data_val);
			let diaV = dataVal.getDate().toString().padStart(2, '0');
			let mesV = (dataVal.getMonth() + 1).toString().padStart(2, '0');
			let anoV = dataVal.getFullYear();
			estoque[i].data_val = `${diaV}/${mesV}/${anoV}`;
		}

		for (let i = 0; i < estoque.length; i++) {
			let dataCad = new Date(estoque[i].data_cad);
			let diaC = dataCad.getDate().toString().padStart(2, '0');
			let mesC = (dataCad.getMonth() + 1).toString().padStart(2, '0');
			let anoC = dataCad.getFullYear();
			estoque[i].data_cad = `${diaC}/${mesC}/${anoC}`;
		}

		console.log(`Retornando lista de matérias-primas`);

		res.json(estoque).status(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

//Postar uma nova metéria-prima
app.post("/estoque", async (req, res) => {
	try {
		const nome = req.body.nome;
		const marca = req.body.marca;
		const qtd = req.body.qtd;
		const data_val = req.body.data_val;
		const preco_total = req.body.preco_total;
		const data_cad = new Date();

		const formatarData = (data) => {
			const dia = String(data.getDate()).padStart(2, '0');
			const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
			const ano = data.getFullYear();
			return `${dia}/${mes}/${ano}`;
		};

		const data_cad_formatada = formatarData(data_cad);

		console.log(`Nome: ${nome} - Marca: ${marca} - DataV: ${data_val} - qtd: ${qtd} - preco_total: ${preco_total} - data_cad: ${data_cad_formatada}`);
		await db.none(
			"INSERT INTO materia_prima (nome, data_val, marca, preco_total, data_cad, qtd) VALUES ($1, $2, $3, $4, $5, $6);",
			[nome, data_val, marca, preco_total, data_cad_formatada, qtd]
		);
		await db.none(
			"INSERT INTO reg_entrada (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4);",
			[data_cad, qtd, preco_total, nome]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.delete("/remover", async (req, res) => {
	const nome = req.body.nome;
	let qtd = req.body.qtd;

	const qtd_total = await db.one(
		"SELECT sum(qtd) FROM materia_prima WHERE nome = $1",
		[nome]
	);

	console.log(`Quantidade: ${qtd}`);
	console.log(qtd_total);

	// Retorna erro se não houver o suficiente em estoque
	if (qtd_total.sum === null) {
		res.sendStatus(400);

	} else if (parseInt(qtd_total.sum) < qtd) {
		res.sendStatus(416);

	} else {
		console.log("Operação válida");
		try {

			const data_cad = new Date();

			const formatarData = (data) => {
				const dia = String(data.getDate()).padStart(2, '0');
				const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
				const ano = data.getFullYear();
				return `${dia}/${mes}/${ano}`;
			};

			const data_cad_formatada = formatarData(data_cad);

			let listaEstoque = await db.any(
				"SELECT id, nome, qtd, data_val, preco_total FROM materia_prima WHERE nome = $1 ORDER BY data_cad ASC",
				[nome]
			);

			let i = 0;
			let qtd_alt = [];
			while (qtd > 0) {
				qtd = qtd - listaEstoque[i].qtd

				if (qtd < 0) {
					// Salva a quantidade que foi alterada
					qtd_alt.push(listaEstoque[i].qtd + qtd);
				} else {
					qtd_alt.push(listaEstoque[i].qtd)
				}

				i++;
			}

			console.log(qtd_alt);

			// Deleta da database
			for (let i = 0; i < qtd_alt.length; i++) {

				// Cria o reg_financeiro se não existe
				const reg_financeiro = await db.oneOrNone(
					"SELECT * FROM reg_financeiro WHERE data = $1",
					[data_cad_formatada]
				)

				if (!reg_financeiro) {
					await db.none(
						"INSERT INTO reg_financeiro (data) VALUES ($1)",
						[data_cad_formatada]
					);
				}
				console.log(listaEstoque[i].qtd - qtd_alt[i]);
				if (listaEstoque[i].qtd - qtd_alt[i] > 0) {
					// Obtem o preco_alt com regra de 3
					let preco_qtd_alt = (qtd_alt[i] * listaEstoque[i].preco_total) / listaEstoque[i].qtd;

					// Insere no registro de saída
					await db.none(
						"INSERT INTO reg_saida (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4)",
						[data_cad_formatada, qtd_alt[i], preco_qtd_alt, listaEstoque[i].nome]
					);

					// Atualiza na tabela
					console.log(`ID atualizado: ${listaEstoque[i].id} - Qtd: ${listaEstoque[i].qtd - qtd_alt[i]} - Preco: ${listaEstoque[i].preco_total - preco_qtd_alt}`);
					await db.none(
						"UPDATE materia_prima SET preco_total = $1, qtd = $2 WHERE id = $3;",
						[listaEstoque[i].preco_total - preco_qtd_alt, listaEstoque[i].qtd - qtd_alt[i], listaEstoque[i].id]
					);
				} else {
					// Insere no registro de saída
					await db.none(
						"INSERT INTO reg_saida (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4)",
						[data_cad_formatada, qtd_alt[i], listaEstoque[i].preco_total, listaEstoque[i].nome]
					);

					console.log(`ID deletado: ${listaEstoque[i].id} - Qtd: TOTAL`);
					await db.none(
						"DELETE FROM materia_prima WHERE id = $1",
						[listaEstoque[i].id]
					);

				}
			}
			res.sendStatus(200);
		} catch (error) {
			console.log(error);
			res.sendStatus(400);
		}
	}
});

app.delete("/intervalo", async (req, res) => {
	const nome = req.body.nome;
	const qtdI = req.body.qtd;

	const qtd_total = await db.one(
		"SELECT sum(qtd) FROM materia_prima WHERE nome = $1",
		[nome]
	);

	let qtd = parseInt(qtd_total.sum) - qtdI;

	// Retorna erro se não houver o suficiente em estoque
	if (qtd_total.sum === null) {
		res.sendStatus(400);

	} else if (parseInt(qtd_total.sum) < qtd || qtd < 0) {
		res.sendStatus(416);

	} else {
		console.log("Operação válida");
		try {

			const data_cad = new Date();

			const formatarData = (data) => {
				const dia = String(data.getDate()).padStart(2, '0');
				const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
				const ano = data.getFullYear();
				return `${dia}/${mes}/${ano}`;
			};

			const data_cad_formatada = formatarData(data_cad);

			let listaEstoque = await db.any(
				"SELECT id, nome, qtd, data_val, preco_total FROM materia_prima WHERE nome = $1 ORDER BY data_cad ASC",
				[nome]
			);

			let i = 0;
			let qtd_alt = [];
			while (qtd > 0) {
				qtd = qtd - listaEstoque[i].qtd

				if (qtd < 0) {
					// Salva a quantidade que foi alterada
					qtd_alt.push(listaEstoque[i].qtd + qtd);
				} else {
					qtd_alt.push(listaEstoque[i].qtd)
				}

				i++;
			}

			console.log(qtd_alt);

			// Deleta da database
			for (let i = 0; i < qtd_alt.length; i++) {

				// Cria o reg_financeiro se não existe
				const reg_financeiro = await db.oneOrNone(
					"SELECT * FROM reg_financeiro WHERE data = $1",
					[data_cad_formatada]
				)

				if (!reg_financeiro) {
					await db.none(
						"INSERT INTO reg_financeiro (data) VALUES ($1)",
						[data_cad_formatada]
					);
				}
				console.log(listaEstoque[i].qtd - qtd_alt[i]);
				if (listaEstoque[i].qtd - qtd_alt[i] > 0) {
					// Obtem o preco_alt com regra de 3
					let preco_qtd_alt = (qtd_alt[i] * listaEstoque[i].preco_total) / listaEstoque[i].qtd;

					// Insere no registro de saída
					await db.none(
						"INSERT INTO reg_saida (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4)",
						[data_cad_formatada, qtd_alt[i], preco_qtd_alt, listaEstoque[i].nome]
					);

					// Atualiza na tabela
					console.log(`ID atualizado: ${listaEstoque[i].id} - Qtd: ${listaEstoque[i].qtd - qtd_alt[i]} - Preco: ${listaEstoque[i].preco_total - preco_qtd_alt}`);
					await db.none(
						"UPDATE materia_prima SET preco_total = $1, qtd = $2 WHERE id = $3;",
						[listaEstoque[i].preco_total - preco_qtd_alt, listaEstoque[i].qtd - qtd_alt[i], listaEstoque[i].id]
					);
				} else {
					// Insere no registro de saída
					await db.none(
						"INSERT INTO reg_saida (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4)",
						[data_cad_formatada, qtd_alt[i], listaEstoque[i].preco_total, listaEstoque[i].nome]
					);

					console.log(`ID deletado: ${listaEstoque[i].id} - Qtd: TOTAL`);
					await db.none(
						"DELETE FROM materia_prima WHERE id = $1",
						[listaEstoque[i].id]
					);

				}
			}
			res.sendStatus(200);
		} catch (error) {
			console.log(error);
			res.sendStatus(400);
		}
	}
});

app.delete("/estoque", async (req, res) => {
	const ids = req.body.idsToDelete;
	try {

		const data_cad = new Date();

		const formatarData = (data) => {
			const dia = String(data.getDate()).padStart(2, '0');
			const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
			const ano = data.getFullYear();
			return `${dia}/${mes}/${ano}`;
		};

		const data_cad_formatada = formatarData(data_cad);


		// Cria o reg_financeiro se não existe
		const reg_financeiro = await db.oneOrNone(
			"SELECT * FROM reg_financeiro WHERE data = $1",
			[data_cad_formatada]
		)

		if (!reg_financeiro) {
			await db.none(
				"INSERT INTO reg_financeiro (data) VALUES ($1)",
				[data_cad_formatada]
			);
		}

		// Deleta da database
		for (let i = 0; i < ids.length; i++) {

			const itemRemover = await db.one(
				"SELECT qtd, preco_total, nome FROM materia_prima WHERE id = $1",
				[ids[i]]
			);

			await db.none(
				"INSERT INTO reg_saida (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4)",
				[data_cad_formatada, itemRemover.qtd, itemRemover.preco_total, itemRemover.nome]
			);

			await db.none(
				"DELETE FROM materia_prima WHERE id = $1",
				[ids[i]]
			);

		}
		console.log(`IDs deletados: ${ids}`);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

//Atualizar uma nova matéria-prima
app.put("/estoque", async (req, res) => {
	try {
		const id = req.body.id;
		const nome = req.body.nome;
		const marca = req.body.marca;
		const qtd = req.body.qtd;
		const data_val = req.body.data_val;
		const preco_total = req.body.preco_total;
		const data_cad = new Date();

		const formatarData = (data) => {
			const dia = String(data.getDate()).padStart(2, '0');
			const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
			const ano = data.getFullYear();
			return `${dia}/${mes}/${ano}`;
		};

		const data_cad_formatada = formatarData(data_cad);

		// Adiciona no registro de saida
		const itemRemover = await db.one(
			"SELECT qtd, preco_total, nome FROM materia_prima WHERE id = $1",
			[id]
		);

		try {
			await db.none(
				"INSERT INTO reg_saida (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4)",
				[data_cad_formatada, itemRemover.qtd, itemRemover.preco_total, itemRemover.nome]
			);
		} catch (error) {
			await db.none(
				"INSERT INTO reg_financeiro (data) VALUES ($1)",
				[data_cad_formatada]
			);
			await db.none(
				"INSERT INTO reg_saida (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4)",
				[data_cad_formatada, itemRemover.qtd, itemRemover.preco_total, itemRemover.nome]
			);
		}

		// Atualiza o valor
		console.log(`Nome: ${nome} - Marca: ${marca} - DataV: ${data_val} - qtd: ${qtd} - preco_total: ${preco_total} - data_cad: ${data_cad_formatada}`);
		await db.none(
			"UPDATE materia_prima SET nome = $1, data_val = $2, marca = $3, preco_total = $4, data_cad = $5, qtd = $6 WHERE id = $7;",
			[nome, data_val, marca, preco_total, data_cad_formatada, qtd, id]
		);
		await db.none(
			"INSERT INTO reg_entrada (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4);",
			[data_cad_formatada, qtd, preco_total, nome]
		);

		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});



//Get para obter os bens cadastrados
app.get("/estoque/bem", async (req, res) => {
	try {
		const bens = await db.any("select * from bem;");

		console.log(`Retornando lista de bens`);

		res.json(bens).status(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

//Postar um novo bem
app.post("/estoque/bem", async (req, res) => {
	try {
		const nome = req.body.nome;
		const qtd_seg = req.body.qtd_seg;
		const un_med = req.body.un_med;

		console.log(`Nome: ${nome} - qtd_seg: ${qtd_seg} - un_med: ${un_med}`);
		await db.none(
			"INSERT INTO bem (nome, qtd_seg, un_med) VALUES ($1, $2, $3);",
			[nome, qtd_seg, un_med]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

// Deletar um bem
app.delete("/estoque/bem", async (req, res) => {
	const nomes = req.body.nomes;
	try {
		// Deleta da database
		for (let i = 0; i < nomes.length; i++) {
			await db.none(
				"DELETE FROM bem WHERE nome = $1",
				[nomes[i]]
			);
		}
		console.log(`Bens deletados: ${nomes}`);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

//Atualizar um bem
app.put("/estoque/bem", async (req, res) => {
	try {
		const pk = req.body.pk;
		const nome = req.body.nome;
		const qtd_seg = req.body.qtd_seg;
		const un_med = req.body.un_med;

		console.log(`Nome: ${nome} - qtd_seg: ${qtd_seg} - un_med: ${un_med}`);
		await db.none(
			"UPDATE bem SET nome = $1, qtd_seg = $2, un_med = $3 WHERE nome = $4;",
			[nome, qtd_seg, un_med, pk]
		);

		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});


app.get("/dashboard/estoque", async (req, res) => {
	try {
		const dia = req.query.dia;

		const sqlQuery = `
		WITH qtd_val_entrada AS (
			SELECT 
				nome, 
				COALESCE(SUM(qtd_alt), 0) AS qtd_entrada, 
				COALESCE(SUM(preco_total), 0) AS val_entrada 
			FROM reg_entrada 
			WHERE data <= $1
			GROUP BY nome
		), 
		qtd_val_saida AS (
			SELECT 
				nome, 
				COALESCE(SUM(qtd_alt), 0) AS qtd_saida, 
				COALESCE(SUM(preco_total), 0) AS val_saida,
				COALESCE(COUNT(reg_saida.id), 0) AS reg_freq
			FROM reg_saida 
			WHERE data <= $1
			GROUP BY nome
		) 
		SELECT 
			bem.nome AS nome, 
			CAST(COALESCE(qe.qtd_entrada, 0) - COALESCE(qs.qtd_saida, 0) AS numeric(12,2)) AS qtd_total, 
			CAST(COALESCE(qe.val_entrada, 0) - COALESCE(qs.val_saida, 0) AS numeric(12,2)) AS val_total, 
			COALESCE(CAST((COALESCE(qe.val_entrada, 0) - COALESCE(qs.val_saida, 0)) / NULLIF(COALESCE(qe.qtd_entrada, 0) - COALESCE(qs.qtd_saida, 0), 0) AS numeric(12,2)), 0) AS val_un,
			COALESCE(MIN(materia_prima.data_val), '0001-01-01') AS data_m, 
			CAST(bem.qtd_seg AS numeric(12,2)) AS qtd_seg,
			bem.un_med AS un_med,
			COALESCE(qs.reg_freq, 0) AS reg_freq
		FROM 
			bem 
		LEFT JOIN 
			qtd_val_entrada qe ON bem.nome = qe.nome 
		LEFT JOIN 
			qtd_val_saida qs ON bem.nome = qs.nome 
		LEFT JOIN 
			materia_prima ON bem.nome = materia_prima.nome 
		LEFT JOIN 
			reg_saida ON bem.nome = reg_saida.nome AND reg_saida.data <= $1
		GROUP BY 
			bem.nome, bem.qtd_seg, bem.un_med, qe.qtd_entrada, qs.qtd_saida, qe.val_entrada, qs.val_saida, qs.reg_freq;
		
        `;

		const bens = await db.any(sqlQuery, [dia]);

		for (let i = 0; i < bens.length; i++) {
			let dataCad = new Date(bens[i].data_m);
			let diaC = dataCad.getDate().toString().padStart(2, '0');
			let mesC = (dataCad.getMonth() + 1).toString().padStart(2, '0');
			let anoC = dataCad.getFullYear();
			bens[i].data_m = `${diaC}/${mesC}/${anoC}`;
		}

		console.log(`Retornando lista de bens`);

		res.json(bens).status(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});


//Get para obter as receitas
app.get("/culinaria", async (req, res) => {
	try {
		const receitas = await db.any("select idr, preco, modo_prep, nomer as nome from rec_produtos;");

		console.log(`Retornando lista de receitas`);

		res.json(receitas).status(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.post("/culinaria", async (req, res) => {
	try {
		const nome = req.body.nome;
		const preco = req.body.preco;
		const modo_prep = req.body.modo_prep;
		const ingredientes = req.body.listaIngredientes;

		console.log(`Nome: ${nome} - preco: ${preco} - ModoPrep: ${modo_prep}`);

		await db.none(
			"INSERT INTO rec_produtos (nomer, preco, modo_prep) VALUES ($1, $2, $3);",
			[nome, preco, modo_prep]
		);

		const idr = await db.one("select idr from rec_produtos where nomer = $1 and preco = $2 and modo_prep = $3;",
			[nome, preco, modo_prep]
		);

		for (let ingrediente of ingredientes) {
			await db.none(
				"INSERT INTO ingrediente (idr, nome, qtd) VALUES ($1, $2, $3);",
				[idr.idr, ingrediente.nome, ingrediente.qtd]
			);
		}

		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.delete("/culinaria", async (req, res) => {
	const ids = req.body.idsToDelete;
	try {
		// Deleta da database
		for (let i = 0; i < ids.length; i++) {

			await db.none(
				"DELETE FROM ingrediente WHERE idr = $1",
				[ids[i]]
			);

			await db.none(
				"DELETE FROM rec_produtos WHERE idr = $1",
				[ids[i]]
			);

		}
		console.log(`IDs deletados: ${ids}`);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.put("/culinaria", async (req, res) => {
	try {
		const idr = req.body.idr;
		const nome = req.body.nome;
		const preco = req.body.preco;
		const modo_prep = req.body.modo_prep;
		const ingredientes = req.body.listaIngredientes;

		console.log(`Nome: ${nome} - preco: ${preco} - ModoPrep: ${modo_prep} - idr: ${idr}`);
		await db.none(
			"UPDATE rec_produtos SET nomer = $1, preco = $2, modo_prep = $3 WHERE idr = $4;",
			[nome, preco, modo_prep, idr]
		);

		await db.none(
			"DELETE FROM ingrediente WHERE idr = $1",
			[idr]
		);

		for (let ingrediente of ingredientes) {
			await db.none(
				"INSERT INTO ingrediente (idr, nome, qtd) VALUES ($1, $2, $3);",
				[idr, ingrediente.nome, ingrediente.qtd]
			);
		}

		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.get("/culinaria/ingrediente", async (req, res) => {
	try {
		const idr = req.query.idr;

		const ingredientes = await db.any("select nome, qtd from ingrediente where idr = $1;",
			[idr]
		);

		console.log(`Retornando lista de ingredientes para idr: ${idr}`);

		res.json(ingredientes).status(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});



app.get("/financeiro", async (req, res) => {
	try {
		const ano = req.query.ano;

		// Criação de tabelas temporárias
		const createTempReceita = 'CREATE TEMPORARY TABLE temp_receita AS SELECT data, SUM(receita) AS receita_total FROM reg_financeiro GROUP BY data;';
		const createTempCusto = `
			CREATE TEMPORARY TABLE temp_custo AS
			SELECT data, COALESCE(SUM(preco_total), 0) AS custo_total
			FROM reg_saida
			GROUP BY data;
		`;


		// Consulta final combinando as tabelas temporárias
		const sqlQuery = `
			SELECT
				COALESCE(tr.data, tc.data) AS data,
				SUM(tr.receita_total) AS receita,
				SUM(tc.custo_total) AS custo,
				SUM(tr.receita_total) - SUM(tc.custo_total) AS lucro
			FROM temp_receita tr
			LEFT JOIN temp_custo tc ON tr.data = tc.data
			WHERE EXTRACT(YEAR FROM COALESCE(tr.data, tc.data)::DATE) = $1
			GROUP BY COALESCE(tr.data, tc.data);
		`;

		// Execução das queries
		await db.none(createTempReceita);
		await db.none(createTempCusto);
		const financeiroResult = await db.any(sqlQuery, [ano]);

		// Limpeza das tabelas temporárias
		const dropTempTables = 'DROP TABLE IF EXISTS temp_receita; DROP TABLE IF EXISTS temp_custo;';
		await db.none(dropTempTables);

		// Formatação da data
		financeiroResult.forEach((item) => {
			let dataCad = new Date(item.data);
			let diaC = dataCad.getDate().toString().padStart(2, '0');
			let mesC = (dataCad.getMonth() + 1).toString().padStart(2, '0');
			let anoC = dataCad.getFullYear();
			item.data = `${diaC}/${mesC}/${anoC}`;
		});

		console.log(`Retornando lista financeiro`);
		res.json(financeiroResult).status(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});


app.post("/financeiro", async (req, res) => {
	try {
		const data = req.body.data;
		const receita = req.body.receita;

		console.log(`Data: ${data} - Receita: ${receita}`);

		await db.none(
			"INSERT INTO reg_financeiro (data, receita) VALUES ($1, $2);",
			[data, receita]
		);

		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.delete("/financeiro", async (req, res) => {
	const ids = req.body.idsToDelete;
	try {
		// Deleta da database
		for (let i = 0; i < ids.length; i++) {

			await db.none(
				"DELETE FROM reg_financeiro WHERE data = $1",
				[ids[i]]
			);

		}
		console.log(`Datas deletadas: ${ids}`);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.put("/financeiro", async (req, res) => {
	try {
		const data = req.body.data;
		let receita = req.body.receita;
		
		if (receita === ''){
			receita = null;
		}

		console.log(`Data: ${data} - Receita: ${receita}`);
		await db.none(
			"UPDATE reg_financeiro SET receita = $1 WHERE data = $2;",
			[receita, data]
		);

		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});