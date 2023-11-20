import React from "react";
import axios from "axios";

import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const colunas = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "nome", headerName: "Nome", width: 90 },
    { field: "qtd", headerName: "Quantidade", width: 90 },
    { field: "un_med", headerName: "Medida", width: 90 },
    { field: "preco_total", headerName: "Valor", width: 90 },
    { field: "marca", headerName: "Marca", width: 90 },
    { field: "data_val", headerName: "Vencimento", width: 200 },
    { field: "data_cad", headerName: "Cadastrado em:", width: 130 },
    { field: "qtd_seg", headerName: "Mínimo", width: 90 },
];

function CadastroEstoque() {
    const [nome, setNome] = React.useState("");
    const [marca, setMarca] = React.useState("");
    const [data_val, setData_val] = React.useState("");
    const [preco_total, setPreco_total] = React.useState("");
    const [qtd, setQtd] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    const [listaEstoque, setListaEstoque] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const res = await axios.get("/estoque");
            setListaEstoque(res.data);
            console.log(res.data);
        } catch (error) {
            setListaEstoque([]);
        }
    }

    function clearForm() {
        setNome("");
        setMarca("");
        setData_val("");
        setPreco_total("");
        setQtd("");
    }

    function handleCancelClick() {
        if (nome !== "" || qtd !== "") {
            setMessageText("Cadastro no estoque cancelado!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
        clearForm();
    }

    async function handleSubmit() {
        if (nome !== "" && qtd !== "") {
            try {
                await axios.post("/estoque", {
                    nome: nome,
                    marca: marca,
                    data_val: data_val,
                    preco_total: preco_total,
                    qtd: qtd,
                });
                console.log(`Nome: ${nome} - Marca: ${marca} - DataV: ${data_val} - Preco: ${preco_total} - Qtd: ${qtd}`);
                setMessageText("Matéria-prima cadastrada com sucesso!");
                setMessageSeverity("success");
                clearForm(); // limpa o formulário apenas se cadastrado com sucesso
            } catch (error) {
                console.log(error);
                setMessageText("Falha no cadastro no estoque!");
                setMessageSeverity("error");
            } finally {
                setOpenMessage(true);
                setTimeout(async () => {
                    await getData();
                }, 100);
            }
        } else {
            setMessageText("Dados da matéria prima inválidos!");
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
                    <h3>Cadastrar matéria-prima:</h3>
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
                        id="marca-input"
                        label="Marca"
                        size="small"
                        onChange={(e) => setMarca(e.target.value)}
                        value={marca}
                    />
                    <TextField
                        required
                        id="qtd-input"
                        label="Quantidade"
                        size="small"
                        onChange={(e) => setQtd(e.target.value)}
                        value={qtd}
                    />
                    <TextField
                        required
                        id="data_val-input"
                        label="Data de validade"
                        size="small"
                        onChange={(e) => setData_val(e.target.value)}
                        value={data_val}
                    />
                    <TextField
                        required
                        id="preco_total-input"
                        label="Preço"
                        size="small"
                        onChange={(e) => setPreco_total(e.target.value)}
                        value={preco_total}
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
                    <DataGrid rows={listaEstoque} columns={colunas} />
                </Box>

            </Stack>
        </Box>
    );
}

export default CadastroEstoque;
