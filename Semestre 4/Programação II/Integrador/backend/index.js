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

app.post(
	"/login",
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


// Get para obter uma lista de matéria-primas
app.get("/estoque", async (req, res) => {
    try {
        const estoque = await db.any("select m.id, m.nome, m.qtd, b.un_med, m.preco_total, m.marca, m.data_val, m.data_cad, b.qtd_seg from materia_prima m natural join bem b;");

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
        db.none(
            "INSERT INTO materia_prima (nome, data_val, marca, preco_total, data_cad, qtd) VALUES ($1, $2, $3, $4, $5, $6);",
            [nome, data_val, marca, preco_total, data_cad_formatada, qtd]
        );
        db.none(
            "INSERT INTO reg_entrada (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4);",
            [data_cad, qtd, preco_total, nome]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

// TODO: Reformular deletar. Receber lista de tuplas a deletar (com todos atributos) e deletar um a um verificando a quantidade. Se a quantidade a ser removida != da quantidade na tupla deve fazer um update para remover
app.delete("/estoque", async (req, res) => {
    const ids = req.body.idsToDelete;
    try {
        // Deleta da database
        for (let i = 0; i < ids.length; i++){
            await db.none(
                "DELETE FROM materia_prima WHERE id = $1",
                [ids[i]]
            );
 
			await db.none(
				"INSERT INTO reg_saida (data, qtd_alt, preco_total, nome) VALUES ($1, $2, $3, $4)",
				[data_cad_formatada, itemRemover.qtd, itemRemover.preco_total, itemRemover.nome]
			);
        }
        console.log(`IDs deletados: ${ids}`);
        res.sendStatus(200);
    } catch {
        console.log(error);
        res.sendStatus(400);
    }
});

//Atualizar uma nova metéria-prima
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
		} catch (error){
			await db.none(
				"INSERT INTO reg_financeiro (receita, data) VALUES (0, $1)",
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
        const un_med = req.body.data_val;

        console.log(`Nome: ${nome} - qtd_seg: ${qtd_seg} - un_med: ${un_med}`);
        db.none(
            "INSERT INTO bem (nome, qtd_seg, un_med) VALUES ($1, $2, $3);",
            [nome, qtd_seg, un_med]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});