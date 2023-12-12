import React from "react";
import axios from "axios";

import { Alert, Box, Button, Snackbar, Stack, TextField, Autocomplete } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import DeleteButton from './DeleteButton';
import UpdateButton from "./UpdateButton";
import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";
import RemoveButton from "./RemoveButton";
import BetweenButton from "./BetweenButton";

import ModalUpdate from "./ModalUpdate";
import ModalRemove from "./ModalRemove";
import ModalBetween from "./ModalBetween";
import GerenciarBens from "./GerenciarBens";

const colunas = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "nome", headerName: "Nome", width: 180 },
    { field: "qtd", headerName: "Quantidade", width: 90 },
    { field: "un_med", headerName: "Medida", width: 90 },
    { field: "preco_total", headerName: "Valor (R$)", width: 90 },
    { field: "marca", headerName: "Marca", width: 120 },
    { field: "data_val", headerName: "Vencimento", width: 120 },
    { field: "data_cad", headerName: "Cadastrado em:", width: 120 },
    { field: "qtd_seg", headerName: "Minimo", width: 90 },
];

function CadastroEstoque() {
    // Para ler os inputs do usuario
    const [nome, setNome] = React.useState("");
    const [marca, setMarca] = React.useState("");
    const [data_val, setData_val] = React.useState("");
    const [preco_total, setPreco_total] = React.useState("");
    const [qtd, setQtd] = React.useState("");

    // Para manipulação das caixas de texto
    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    // Para manipulações em relação ao backend
    const [listaEstoque, setListaEstoque] = React.useState([]);
    const [listaBensNome, setListaBensNome] = React.useState([]);
    const [listaBens, setListaBens] = React.useState([]);
    const [bemMed, setBemMed] = React.useState([]);
    const [itemUpdate, setItemUpdate] = React.useState([]);

    // Para controle dos modais
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openRemove, setOpenRemove] = React.useState(false);
    const [openBetween, setOpenBetween] = React.useState(false);
    const [openGbens, setOpenGbens] = React.useState(false);

    // Para selecionar a row da dataGrid
    const [selectionModel, setSelectionModel] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            setBemMed(" - ");

            const estoque = await axios.get("/estoque");
            const bens = await axios.get("/estoque/bem");

            setListaEstoque(estoque.data);
            setListaBens(bens.data)

            const nomesDosBens = [];

            for (let i = 0; i < bens.data.length; i++) {
                nomesDosBens.push(bens.data[i].nome);
            }

            setListaBensNome(nomesDosBens);

            console.log(estoque.data);
        } catch (error) {
            setListaEstoque([]);
            setListaBens([]);
            setListaBensNome([]);
            setBemMed(" - ");
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
        console.log(`Nome: ${nome} - Marca: ${marca} - DataV: ${data_val} - Preco: ${preco_total} - Qtd: ${qtd}`);
        if (nome !== "" && qtd !== "" && data_val !== "" && preco_total !== "") {
            try {
                await axios.post("/estoque", {
                    nome: nome,
                    marca: marca,
                    data_val: data_val,
                    preco_total: preco_total,
                    qtd: qtd,
                });
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

    async function handleDelete() {
        if (selectionModel.length !== 0) {
            try {
                await axios.delete("/estoque", {
                    data: { idsToDelete: selectionModel }
                });

                setMessageText("Matéria-prima deletada com sucesso!");
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
            setMessageText("Selecine as matéria-primas desejadas!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    async function handleUpdate() {
        if (selectionModel.length === 1) {
            try {
                const id = selectionModel[0];

                for (let i = 0; i < listaEstoque.length; i++) {
                    if (listaEstoque[i].id === id)
                        setItemUpdate(listaEstoque[i]);
                }

                setTimeout(async () => {
                    await setOpenUpdate(true);
                }, 100);

            } catch (error) {
                console.log(error);
                setMessageText("Falha ao executar!");
                setMessageSeverity("error");
            }
        } else {
            setMessageText("Selecine uma matéria-prima para editar!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    async function handleRemove() {
        if (selectionModel.length === 1) {
            try {
                const id = selectionModel[0];

                for (let i = 0; i < listaEstoque.length; i++) {
                    if (listaEstoque[i].id === id)
                        setItemUpdate(listaEstoque[i]);
                }

                setTimeout(async () => {
                    await setOpenRemove(true);
                }, 100);

            } catch (error) {
                console.log(error);
                setMessageText("Falha ao executar!");
                setMessageSeverity("error");
            }
        } else {
            setItemUpdate('');
            setOpenRemove(true);
        }
    }

    async function handleBetween() {
        if (selectionModel.length === 1) {
            try {
                const id = selectionModel[0];

                for (let i = 0; i < listaEstoque.length; i++) {
                    if (listaEstoque[i].id === id)
                        setItemUpdate(listaEstoque[i]);
                }

                setTimeout(async () => {
                    await setOpenBetween(true);
                }, 100);

            } catch (error) {
                console.log(error);
                setMessageText("Falha ao executar!");
                setMessageSeverity("error");
            }
        } else {
            setItemUpdate('');
            setOpenBetween(true);
        }
    }

    const handleSelectionModelChange = (newSelectionModel) => {
        console.log('New Selection Model:', newSelectionModel);
        setSelectionModel(newSelectionModel);

        // Now 'newSelectionModel' contains the IDs of the selected rows
    };

    function handleCloseMessage(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    }

    React.useEffect(() => {
        if (nome !== "") {
            for (let i = 0; i < listaBens.length; i++) {
                if (listaBens[i].nome === nome) {
                    setBemMed(listaBens[i].un_med);
                }
            }
        } else {
            setBemMed(" - ");
        }
    }, [nome, listaBens]);

    return (
        <Box>
            <Stack spacing={2}>
                <Stack>
                    <h3>Cadastrar matéria-prima:</h3>
                </Stack>

                <Stack spacing={2}>

                    <Stack spacing={2} direction="row" justifyContent="space-between">
                        <Box flex={6}>
                            <Autocomplete
                                disablePortal
                                id="combobox-nome"
                                options={listaBensNome}
                                size="small"
                                onChange={(event, newValue) => {
                                    setNome(newValue || '');
                                }}
                                value={nome}
                                renderInput={(params) => <TextField {...params}
                                    label="Nome"
                                    id="nome-input"
                                    required
                                />}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            style={{
                                maxWidth: "160px",
                                minWidth: "160px",
                            }}
                            onClick={(e) => setOpenGbens(true)}
                            type="submit"
                            color="primary"
                        >
                            Gerenciar bens
                        </Button>
                    </Stack>

                    <TextField
                        id="marca-input"
                        label="Marca"
                        size="small"
                        onChange={(e) => setMarca(e.target.value)}
                        value={marca}
                    />

                    <Stack spacing={2} direction="row" alignItems="center">
                        <Box flex={1}>
                            <TextField
                                required
                                id="qtd-input"
                                label="Quantidade"
                                size="small"
                                onChange={(e) => setQtd(e.target.value)}
                                value={qtd}
                                style={{ width: '100%' }}
                            />
                        </Box>
                        <Box flex={0} paddingRight={2}>
                            {bemMed}
                        </Box>
                    </Stack>

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
                    <SubmitButton handleSubmit={handleSubmit} />

                    <DeleteButton handleDelete={handleDelete} />

                    <UpdateButton handleUpdate={handleUpdate} />

                    <RemoveButton handleRemove={handleRemove} />

                    <BetweenButton handleBetween={handleBetween} />

                    <CancelButton handleCancelClick={handleCancelClick} />
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
                    <DataGrid
                        rows={listaEstoque}
                        columns={colunas}
                        checkboxSelection
                        onRowSelectionModelChange={handleSelectionModelChange}
                        selectionModel={selectionModel}
                    />
                </Box>

            </Stack>
            <ModalUpdate
                open={openUpdate}
                setOpen={setOpenUpdate}
                listaBensNome={listaBensNome}
                listaBens={listaBens}
                itemUpdate={itemUpdate}
                getData={getData}
                openMessage={openMessage}
                setOpenMessage={setOpenMessage}
                messageText={messageText}
                setMessageText={setMessageText}
                messageSeverity={messageSeverity}
                setMessageSeverity={setMessageSeverity}
                handleCloseMessage={handleCloseMessage}
            />

            <ModalRemove
                open={openRemove}
                setOpen={setOpenRemove}
                listaBensNome={listaBensNome}
                listaBens={listaBens}
                itemUpdate={itemUpdate}
                listaEstoque={listaEstoque}
                getData={getData}
                openMessage={openMessage}
                setOpenMessage={setOpenMessage}
                messageText={messageText}
                setMessageText={setMessageText}
                messageSeverity={messageSeverity}
                setMessageSeverity={setMessageSeverity}
                handleCloseMessage={handleCloseMessage}
            />

            <ModalBetween
                open={openBetween}
                setOpen={setOpenBetween}
                listaBensNome={listaBensNome}
                listaBens={listaBens}
                itemUpdate={itemUpdate}
                listaEstoque={listaEstoque}
                getData={getData}
                openMessage={openMessage}
                setOpenMessage={setOpenMessage}
                messageText={messageText}
                setMessageText={setMessageText}
                messageSeverity={messageSeverity}
                setMessageSeverity={setMessageSeverity}
                handleCloseMessage={handleCloseMessage}
            />

            <GerenciarBens
                open={openGbens}
                setOpen={setOpenGbens}
                listaBens={listaBens}
                itemUpdate={itemUpdate}
                getData={getData}
                openMessage={openMessage}
                setOpenMessage={setOpenMessage}
                messageText={messageText}
                setMessageText={setMessageText}
                messageSeverity={messageSeverity}
                setMessageSeverity={setMessageSeverity}
                handleCloseMessage={handleCloseMessage}
            />
        </Box>
    );
}

export default CadastroEstoque;

/* 
<Button
    variant="contained"
    style={{
        maxWidth: "100px",
        minWidth: "100px",
    }}
    onClick={handleDelete}
    type="submit"
    color="primary"
>
    Deletar
</Button>
*/