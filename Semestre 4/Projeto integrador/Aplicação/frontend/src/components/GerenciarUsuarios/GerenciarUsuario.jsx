import React from "react";
import axios from "axios";

import { Alert, Box, Button, Snackbar, Stack, TextField, Autocomplete } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import DeleteButton from './DeleteButton';
import UpdateButton from "./UpdateButton";
import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";

const colunas = [
    { field: "rg", headerName: "RG", width: 20 },
    { field: "nome", headerName: "Nome", width: 180 },
];

function GerenciarUsuario() {
    // Para ler os inputs do usuario
    const [rg, setRg] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [senha, setSenha] = React.useState("");

    // Para manipulação das caixas de texto
    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    // Para manipulações em relação ao backend
    const [listaUsuario, setListaUsuario] = React.useState([]);

    // Para selecionar a row da dataGrid
    const [selectionModel, setSelectionModel] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const usuario = await axios.get("/usuario");

            setListaUsuario(usuario.data)

            console.log(usuario.data);
        } catch (error) {
            setListaUsuario([]);
        }
    }

    function clearForm() {
        setNome("");
        setRg("");
        setSenha("");
    }

    function handleCancelClick() {
        if (nome !== "" || rg !== "" || senha !== "") {
            setMessageText("Cadastro de usuário cancelada!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
        clearForm();
    }

    async function handleSubmit() {
        console.log(`Nome: ${nome} - Rg: ${rg}`);
        if (nome !== "" && rg !== "") {
            try {
                await axios.post("/novoUsuario", {
                    nome: nome,
                    rg: rg,
                    passwd: senha,
                    adm: 'Y',
                });

                setMessageText("Usuário cadastrado com sucesso!");
                setMessageSeverity("success");
                clearForm(); // limpa o formulário apenas se cadastrado com sucesso
            } catch (error) {
                console.log(error);
                setMessageText("Falha no cadastro de usuário!");
                setMessageSeverity("error");
            } finally {
                setOpenMessage(true);
                setTimeout(async () => {
                    await getData();
                }, 100);
            }
        } else {
            setMessageText("Dados do usuário inválidos!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    async function handleDelete() {
        if (selectionModel.length !== 0) {
            try {
                await axios.delete("/usuario", {
                    data: { idsToDelete: selectionModel }
                });

                setMessageText("Usuário deletado com sucesso!");
                setMessageSeverity("success");
                clearForm(); // limpa o formulário apenas se cadastrado com sucesso

            } catch (error) {
                console.log(error);
                setMessageText("Falha ao deletar!");
                setMessageSeverity("error");
            } finally {
                setOpenMessage(true);
                setTimeout(async () => {
                    await getData();
                }, 100);
            }
        } else {
            setMessageText("Selecine os usuários desejados!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    async function handleUpdate() {
        if (selectionModel.length === 1) {
            try {

                await axios.put("/usuario", {
                    rg: selectionModel[0],
                    nome: nome,
                });

                setMessageText("Usuário editado com sucesso!");
                setMessageSeverity("success");
                setOpenMessage(true);
                getData();
            } catch (error) {
                console.log(error);
                setMessageText("Falha ao executar!");
                setMessageSeverity("error");
            }
        } else {
            setMessageText("Selecine um usuário para editar!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    const handleSelectionModelChange = (newSelectionModel) => {
        console.log('New Selection Model:', newSelectionModel);
        setSelectionModel(newSelectionModel);
    };

    function handleCloseMessage(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    }

    React.useEffect(() => {
        const fetchData = async () => {
            if (selectionModel.length === 1) {
                let user;
                for (let i = 0; i < listaUsuario.length; i++) {
                    if (selectionModel[0] === listaUsuario[i].rg) {
                        user = listaUsuario[i];
                        break;
                    }
                }


                setNome(user.nome);
                setRg(user.rg);
            } else {
                clearForm();
            }
        };

        fetchData();
    }, [selectionModel]);

    return (
        <Box>
            <h3>Gerenciar usuários:</h3>



                <Stack spacing={2}>

                    <Stack spacing={2} paddingTop={2}>

                        <TextField
                            required
                            id="nome-input"
                            label="Nome do usuário"
                            size="small"
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                        />

                        <TextField
                            required
                            id="RG-input"
                            label="RG"
                            size="small"
                            onChange={(e) => setRg(e.target.value)}
                            value={rg}
                        />

                        <TextField
                            required
                            id="modo_prep-input"
                            label="Senha"
                            size="small"
                            onChange={(e) => setSenha(e.target.value)}
                            value={senha}
                        />

                    </Stack>

                    <Stack direction="row" spacing={3}>
                        <SubmitButton handleSubmit={handleSubmit} />

                        <DeleteButton handleDelete={handleDelete} />

                        <UpdateButton handleUpdate={handleUpdate} />

                        <CancelButton handleCancelClick={handleCancelClick} />
                    </Stack>

                    <Box style={{ height: "520px" }}>
                        <DataGrid
                            rows={listaUsuario}
                            columns={colunas}
                            checkboxSelection
                            onRowSelectionModelChange={handleSelectionModelChange}
                            selectionModel={selectionModel}
                            getRowId={(e) => e.rg}
                        />
                    </Box>

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
        </Box>
    );
}

export default GerenciarUsuario;