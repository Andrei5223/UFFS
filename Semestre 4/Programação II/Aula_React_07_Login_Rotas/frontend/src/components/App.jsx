import React from "react";
import axios from "axios";

import { Route, Routes, useNavigate } from "react-router-dom";

import {
	Box,
	Button,
	Container,
	CssBaseline,
	Grid,
	Stack,
} from "@mui/material";

import Titulo from "./Titulo";
import Clientes from "./Clientes";
import Login from "./Login";

axios.defaults.baseURL = "http://localhost:3010/";
axios.defaults.headers.common["Content-Type"] =
	"application/json;charset=utf-8";

function App() {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	const navigate = useNavigate();

	React.useEffect(() => {
		// verifica se já está logado
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		// Clear the token from localStorage
		localStorage.removeItem("token");
		setIsLoggedIn(false);
	};

	return (
		<Box>
			{isLoggedIn ? (
				<Container sx={{ flexGrow: 1 }} maxWidth="lg">
					<CssBaseline />
					<Button
						variant="link"
						onClick={() => {
							navigate("/");
						}}
					>
						Início
					</Button>
					<Button
						variant="link"
						onClick={() => {
							navigate("/clientes");
						}}
					>
						Clientes
					</Button>
					<Button variant="text" onClick={handleLogout}>
						Logout
					</Button>
					<Grid container justifyContent="center" spacing={2}>
						<Grid >
							<Routes>
								<Route
									path="login"
									element={<Login onLogin={handleLogin} />}
								/>
								<Route
									path="/"
									element={
										<Titulo
											mensagem={
												"Hello World of PostgreSQL!"
											}
											image="postgresql_logo.png"
											alternative="Logo do PostgreSQL."
										/>
									}
								/>
								<Route
									path="clientes"
									element={
										<Box>
											<Stack spacing={2}>
												<Titulo
													mensagem={
														"Cadastro de clientes"
													}
												/>
												<Clientes />
											</Stack>
										</Box>
									}
								/>
							</Routes>
						</Grid>
					</Grid>
				</Container>
			) : (<Login onLogin={handleLogin} />)}
		</Box>
	);
}

export default App;
