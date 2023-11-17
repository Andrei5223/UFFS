import React from "react";
import axios from "axios";

import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const colunas = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "curso", headerName: "Curso", width: 180 },
    { field: "nome", headerName: "Nome", width: 240 },
    { field: "descr", headerName: "Descrição", width: 320 },
];

function CadastroCCR() {
    const [curso, setCurso] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [descr, setDescr] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    const [listaCCR, setListaCCR] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const res = await axios.get("/ccrs");
            setListaCCR(res.data);
            console.log(res.data);
        } catch (error) {
            setListaCCR([]);
        }
    }

    function clearForm() {
        setNome("");
        setDescr("");
        setCurso("");
    }

    function handleCancelClick() {
        if (nome !== "" || descr !== "" || curso !== "") {
            setMessageText("Cadastro de CCR cancelado!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
        clearForm();
    }

    async function handleSubmit() {
        if (nome !== "" && descr !== "" && curso !== "") {
            try {
                await axios.post("/ccr", {
                    nome: nome,
                    descr: descr,
                    curso: curso,
                });
                console.log(`Nome: ${nome} - Descr: ${descr} - Curso: ${curso}`);
                setMessageText("CCR cadastrada com sucesso!");
                setMessageSeverity("success");
                clearForm(); // limpa o formulário apenas se cadastrado com sucesso
            } catch (error) {
                console.log(error);
                setMessageText("Falha no cadastro da CCR!");
                setMessageSeverity("error");
            } finally {
                setOpenMessage(true);
                setTimeout(async () => {
                    await getData();
                }, 100);
            }
        } else {
            setMessageText("Dados da CCR inválidos!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    function handleCloseMessage(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    }

    return (
        <Box>
            <Stack spacing={2}>
                <Stack>
                    <h3>Cadastrar CCR:</h3>
                </Stack>
                <Stack spacing={2}>
                    <TextField
                        required
                        id="nome-input"
                        label="Nome"
                        size="small"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                    />
                    <TextField
                        required
                        id="descr-input"
                        label="Descrição"
                        size="small"
                        onChange={(e) => setDescr(e.target.value)}
                        value={descr}
                    />
                    <TextField
                        required
                        id="curso-input"
                        label="Curso correspondente"
                        size="small"
                        onChange={(e) => setCurso(e.target.value)}
                        value={curso}
                    />
                </Stack>
                <Stack direction="row" spacing={3}>
                    <Button
                        variant="contained"
                        style={{
                            maxWidth: "100px",
                            minWidth: "100px",
                        }}
                        onClick={handleSubmit}
                        type="submit"
                        color="primary"
                    >
                        Enviar
                    </Button>
                    <Button
                        variant="outlined"
                        style={{
                            maxWidth: "100px",
                            minWidth: "100px",
                        }}
                        onClick={handleCancelClick}
                        color="error"
                    >
                        Cancelar
                    </Button>
                </Stack>

                <Snackbar
                    open={openMessage}
                    autoHideDuration={6000}
                    onClose={handleCloseMessage}
                >
                    <Alert
                        severity={messageSeverity}
                        onClose={handleCloseMessage}
                    >
                        {messageText}
                    </Alert>
                </Snackbar>
                <Box style={{ height: "500px" }}>
                    <DataGrid rows={listaCCR} columns={colunas} />
                </Box>
            </Stack>
        </Box>
    );
}

export default CadastroCCR;
