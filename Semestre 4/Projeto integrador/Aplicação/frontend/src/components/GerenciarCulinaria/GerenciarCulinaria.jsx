import React from "react";
import axios from "axios";

import { Alert, Box, Button, Snackbar, Stack, TextField, Autocomplete } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import DeleteButton from './DeleteButton';
import UpdateButton from "./UpdateButton";
import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";

const colunasReceitas = [
    { field: "idr", headerName: "ID", width: 20 },
    { field: "nome", headerName: "Nome", width: 180 },
    { field: "preco", headerName: "Preço", width: 90 },
    { field: "modo_prep", headerName: "Preparo", width: 700 },
];

const colunasIngredientes = [
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "qtd", headerName: "Quantidade", width: 150 },
];

function GerenciarCulinaria() {
    // Para ler os inputs do usuario
    const [nome, setNome] = React.useState("");
    const [modo_prep, setModo_prep] = React.useState("");
    const [preco, setPreco] = React.useState("");

    const [nomeIngrediente, setNomeIngrediente] = React.useState("");
    const [qtd, setQtd] = React.useState("");

    // Para manipulação das caixas de texto
    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    // Para manipulações em relação ao backend
    const [listaCulinaria, setListaCulinaria] = React.useState([]);
    const [listaIngredientes, setListaIngredientes] = React.useState([]);
    const [listaBensNome, setListaBensNome] = React.useState([]);
    const [listaBens, setListaBens] = React.useState([]);

    // Para selecionar a row da dataGrid
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionModelIngrediente, setSelectionModelIngrediente] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {

            const culinaria = await axios.get("/culinaria");
            const bens = await axios.get("/estoque/bem");

            setListaCulinaria(culinaria.data);
            setListaBens(bens.data)

            const nomesDosBens = [];

            for (let i = 0; i < bens.data.length; i++) {
                nomesDosBens.push(bens.data[i].nome);
            }

            setListaBensNome(nomesDosBens);

            console.log(culinaria.data);
        } catch (error) {
            setListaCulinaria([]);
            setListaBens([]);
            setListaBensNome([]);
        }
    }

    function clearForm() {
        setNome("");
        setNomeIngrediente("");
        setPreco("");
        setModo_prep("");
        setQtd("");
    }

    function handleCancelClick() {
        if (nome !== "" || modo_prep !== "" || preco !== "") {
            setMessageText("Cadastro de receita culinária cancelada!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
        clearForm();
    }

    function handleAdd() {
        if (nomeIngrediente !== "" && qtd !== "") {
            let ingrediente = { nome: nomeIngrediente, qtd: qtd };

            // Crie uma cópia do array usando o método slice()
            let listaTemp = listaIngredientes.slice();

            listaTemp.push(ingrediente);

            setListaIngredientes(listaTemp);

            setMessageText("Ingrediente adicionado!");
            setMessageSeverity("success");
            setOpenMessage(true);
            setNomeIngrediente('');
            setQtd('');
        }
    }


    function handleDeleteIngrediente() {
        if (selectionModelIngrediente.length !== 0) {
            // Filtra a lista para manter apenas os ingredientes cujos nomes NÃO estão em selectionModelIngrediente
            const novaListaIngredientes = listaIngredientes.filter(ingrediente =>
                !selectionModelIngrediente.includes(ingrediente.nome)
            );

            setListaIngredientes(novaListaIngredientes);

            setMessageText("Ingredientes removidos!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }


    async function handleSubmit() {
        console.log(`Nome: ${nome} - Preco: ${preco} - ModoPrep: ${modo_prep}`);
        if (nome !== "" && preco !== "" && modo_prep !== "") {
            try {
                await axios.post("/culinaria", {
                    nome: nome,
                    preco: preco,
                    modo_prep: modo_prep,
                    listaIngredientes: listaIngredientes,
                });

                setMessageText("Receita culinária cadastrada com sucesso!");
                setMessageSeverity("success");
                clearForm(); // limpa o formulário apenas se cadastrado com sucesso
                setListaIngredientes([]);
            } catch (error) {
                console.log(error);
                setMessageText("Falha no cadastro de receita culinária!");
                setMessageSeverity("error");
            } finally {
                setOpenMessage(true);
                setTimeout(async () => {
                    await getData();
                }, 100);
            }
        } else {
            setMessageText("Dados da receita culinária inválidos!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    async function handleDelete() {
        if (selectionModel.length !== 0) {
            try {
                await axios.delete("/culinaria", {
                    data: { idsToDelete: selectionModel }
                });

                setMessageText("Receita culinária deletada com sucesso!");
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
            setMessageText("Selecine as receitas culinárias desejadas!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    async function handleUpdate() {
        if (selectionModel.length === 1) {
            try {

                await axios.put("/culinaria", {
                    idr: selectionModel[0],
                    nome: nome,
                    preco: preco,
                    modo_prep: modo_prep,
                    listaIngredientes: listaIngredientes,
                });

                setMessageText("Receita editada com sucesso!");
                setMessageSeverity("success");
                setOpenMessage(true);
            } catch (error) {
                console.log(error);
                setMessageText("Falha ao executar!");
                setMessageSeverity("error");
            }
        } else {
            setMessageText("Selecine uma receita culinária para editar!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    const handleSelectionModelChange = (newSelectionModel) => {
        console.log('New Selection Model:', newSelectionModel);
        setSelectionModel(newSelectionModel);
    };

    const handleSelectionModelChangeIngrediente = (newSelectionModel) => {
        console.log('New Selection Model Ingrediente:', newSelectionModel);
        setSelectionModelIngrediente(newSelectionModel);
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
                let receita;
                for (let i = 0; i < listaCulinaria.length; i++) {
                    if (selectionModel[0] === listaCulinaria[i].idr) {
                        receita = listaCulinaria[i];
                        break;
                    }
                }

                const response = await axios.get(`/culinaria/ingrediente?idr=${receita.idr}`);
                const ingredientes = response.data;
                setListaIngredientes(ingredientes);

                setNome(receita.nome);
                setPreco(receita.preco);
                setModo_prep(receita.modo_prep);
            } else {
                clearForm();
                setListaIngredientes([]);
            }
        };

        fetchData();
    }, [selectionModel]);


    return (
        <Box>
            <h3>Gerenciar receitas culinárias:</h3>

            <Stack direction='row' spacing={3}>

                <Stack spacing={2}>

                    <Stack spacing={2} paddingTop={2}>

                        <TextField
                            required
                            id="nome-input"
                            label="Nome da receita"
                            size="small"
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                        />

                        <TextField
                            required
                            id="preco-input"
                            label="Preço"
                            size="small"
                            onChange={(e) => setPreco(e.target.value)}
                            value={preco}
                        />

                        <TextField
                            multiline
                            required
                            id="modo_prep-input"
                            label="Modo de preparo"
                            size="small"
                            onChange={(e) => setModo_prep(e.target.value)}
                            value={modo_prep}
                        />

                    </Stack>

                    <Stack direction="row" spacing={3}>
                        <SubmitButton handleSubmit={handleSubmit} />

                        <DeleteButton handleDelete={handleDelete} />

                        <UpdateButton handleUpdate={handleUpdate} />

                        <CancelButton handleCancelClick={handleCancelClick} />
                    </Stack>



                    <Box style={{ height: "520px", width: "700px" }}>
                        <DataGrid
                            rows={listaCulinaria}
                            columns={colunasReceitas}
                            checkboxSelection
                            onRowSelectionModelChange={handleSelectionModelChange}
                            selectionModel={selectionModel}
                            getRowId={(e) => e.idr}
                        />
                    </Box>

                </Stack>

                <Stack spacing={2}>
                    Incluir ingredientes:

                    <Stack spacing={2}>
                        <Box flex={6} paddingTop={2}>
                            <Autocomplete
                                disablePortal
                                id="combobox-nome"
                                options={listaBensNome}
                                size="small"
                                onChange={(event, newValue) => {
                                    setNomeIngrediente(newValue || '');
                                }}
                                value={nomeIngrediente}
                                renderInput={(params) => <TextField {...params}
                                    label="Nome"
                                    id="nome-input"
                                    required
                                />}
                            />
                        </Box>

                        <TextField
                            required
                            id="qtd-input"
                            label="Quantidade"
                            size="small"
                            onChange={(e) => setQtd(e.target.value)}
                            value={qtd}
                        />
                    </Stack>

                    <Stack direction='row' spacing={2}>
                        <Button
                            variant="contained"
                            style={{
                                maxWidth: '200px',
                                minWidth: '100px',
                            }}
                            onClick={handleAdd}
                            type="submit"
                            color="primary"
                        >
                            Adicionar
                        </Button>

                        <DeleteButton handleDelete={handleDeleteIngrediente} />
                    </Stack>

                    <Box style={{ height: "100%", width: "350px" }} flex={1}>
                        <DataGrid
                            rows={listaIngredientes}
                            columns={colunasIngredientes}
                            checkboxSelection
                            onRowSelectionModelChange={handleSelectionModelChangeIngrediente}
                            selectionModel={selectionModelIngrediente}
                            getRowId={(e) => e.nome}
                        />
                    </Box>


                </Stack>

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

export default GerenciarCulinaria;