import React from "react";
import axios from "axios";

import { Alert, Box, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import './classes.css';
import LineChartPrecoHist from "./LineChartPrecoHist";
import PieChartPrecoHist from "./PieChartPrecoHist";
import SubmitButton from "./SubmitButton";
import DeleteButton from "../GerenciarEstoque/DeleteButton";
import UpdateButton from "./UpdateButton";
import CancelButton from "../GerenciarEstoque/CancelButton";

const colunas = [
    { field: "data", headerName: "Data", width: 180 },
    { field: "receita", headerName: "Receita", width: 110 },
    { field: "custo", headerName: "Custo", width: 110 },
    { field: "lucro", headerName: "Lucro", width: 90 },
];

const formatarData = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
    };

function GereciarReceita() {
    // Para ler os inputs do usuario
    const [ano, setAno] = React.useState(new Date().getUTCFullYear());
    const [receita, setReceita] = React.useState("");
    const [data, setData] = React.useState(formatarData(new Date()));
    const [chartBens, setChartBens] = React.useState([]);

    // Para manipulações em relação ao backend
    const [listaFinanceiro, setListaFinanceiro] = React.useState([]);
    const [valorTotalAno, setValorTotalAno] = React.useState(0);

    // Para selecionar a row da dataGrid
    const [selectionModel, setSelectionModel] = React.useState([]);

    // Para manipulação das caixas de texto
    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    React.useEffect(() => {
        getData();
    }, [ano]);

    async function getData() {
        try {
            const receita = await axios.get(`/financeiro?ano=${ano}`);

            console.log(receita.data);

            let acumV = 0;

            for (let i = 0; i < receita.data.length; i++) {
                if (receita.data[i].receita !== null) {
                    acumV = acumV + parseFloat(receita.data[i].receita);
                } else {
                    receita.data[i].lucro = receita.data[i].custo * -1;
                }

                if (receita.data[i].custo === null) {
                    receita.data[i].lucro = receita.data[i].receita;
                }
            }

            setValorTotalAno(`R$ ${acumV}`);

            setListaFinanceiro(receita.data);

            if (ano !== '') {

                const parseDate = (dateString) => {
                    const [day, month, year] = dateString.split('/');
                    return new Date(`${year}-${month}-${day}`);
                };

                const getMonthInitials = (date) => {
                    const monthNames = ['Jan', 'Fev', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                    return monthNames[date.getMonth()];
                };

                const listaAgrupada = receita.data.reduce((agrupado, item) => {
                    const data = parseDate(item.data);
                    const chave = getMonthInitials(data);

                    if (!agrupado[chave]) {
                        agrupado[chave] = { mes: chave, lucro: 0.0 };
                    }

                    agrupado[chave].lucro += parseFloat(item.lucro);

                    return agrupado;
                }, {});

                const listaFinal = Object.values(listaAgrupada);

                console.log(listaFinal);

                setChartBens(listaFinal);
            }

        } catch (error) {
            setListaFinanceiro([]);
        }
    }

    function getRowId(row) {
        return row.data;
    }

    function getRowClassName(params) {
        const { receita } = params.row;

        if (receita === null) {
            return 'linha-vermelha';
        }

        return '';
    }

    React.useEffect(() => {
        const fetchData = async () => {
            if (selectionModel.length === 1) {

                for (let i = 0; i < listaFinanceiro.length; i++) {
                    if (selectionModel[0] === listaFinanceiro[i].data) {
                        setData(listaFinanceiro[i].data);
                        setReceita(listaFinanceiro[i].receita);
                    }
                }

            } else {
                setData(formatarData(new Date()));
            }
        }
        fetchData();
    }, [selectionModel]);

    const handleSelectionModelChange = (newSelectionModel) => {
        console.log('New Selection Model:', newSelectionModel);
        setSelectionModel(newSelectionModel);
    };

    function clearForm() {
        setReceita("");
        setData(formatarData(new Date()));
    }
    async function handleSubmit() {
        console.log(`Data: ${data} - Receita: ${receita}`);
        if (data !== "" && receita !== "") {
            try {
                await axios.post("/financeiro", {
                    data: data,
                    receita: receita,
                });

                setMessageText("Registro financeiro cadastrado com sucesso!");
                setMessageSeverity("success");
                clearForm();
            } catch (error) {
                console.log(error);
                setMessageText("Falha no cadastro do registro financeiro!");
                setMessageSeverity("error");
            } finally {
                setOpenMessage(true);
                setTimeout(async () => {
                    await getData();
                }, 100);
            }
        } else {
            setMessageText("Dados do registro financeiro inválidos!");
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

    async function handleDelete() {
        if (selectionModel.length !== 0) {
            try {
                await axios.delete("/financeiro", {
                    data: { idsToDelete: selectionModel }
                });

                setMessageText("Registros deletados com sucesso!");
                setMessageSeverity("success");
                clearForm();

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
            setMessageText("Selecine os registros financeiros desejadas!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    async function handleUpdate() {
        if (selectionModel.length === 1) {
            try {

                await axios.put("/financeiro", {
                    data: selectionModel[0],
                    receita: receita,
                });

                setMessageText("Registro financeiro editado com sucesso!");
                setMessageSeverity("success");
                setOpenMessage(true);
                getData();
            } catch (error) {
                console.log(error);
                setMessageText("Falha ao executar!");
                setMessageSeverity("error");
            }
        } else {
            setMessageText("Selecine um registro financeiro para editar!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    function handleCancelClick() {
        if (receita !== "") {
            setMessageText("Cadastro no registro financeiro cancelado!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
        clearForm();
    }

    return (
        <Box>
            <h3>Gerenciamento de receita:</h3>

            <Stack spacing={2} direction='row'>

                <Stack spacing={2}>

                    <Stack spacing={2}>
                        <Stack direction='row' spacing={3}>

                            <TextField
                                required
                                id="ano-input"
                                label="Ano"
                                size="small"
                                onChange={(e) => setAno(e.target.value)}
                                value={ano}
                                style={{ width: '200px', marginTop: '16px' }}
                            />

                            <TextField
                                required
                                id="receita-input"
                                label="Data"
                                size="small"
                                onChange={(e) => setData(e.target.value)}
                                value={data}
                                style={{ width: '200px', marginTop: '16px' }}
                            />

                            <TextField
                                required
                                id="receita-input"
                                label="Receita"
                                size="small"
                                onChange={(e) => setReceita(e.target.value)}
                                value={receita}
                                style={{ width: '200px', marginTop: '16px' }}
                            />


                        </Stack>

                        <Stack direction='row' spacing={3} alignItems='baseline'>

                           <SubmitButton handleSubmit={handleSubmit}/>

                           <DeleteButton handleDelete={handleDelete}/>

                           <UpdateButton handleUpdate={handleUpdate} />

                            <CancelButton handleCancelClick={handleCancelClick} />

                        </Stack>

                        <Box style={{ height: "650px", width: "610px" }}>
                            <Typography>Registro financeiro:</Typography>
                            <DataGrid
                                rows={listaFinanceiro}
                                columns={colunas}
                                getRowId={getRowId}
                                getRowClassName={getRowClassName}
                                checkboxSelection
                                onRowSelectionModelChange={handleSelectionModelChange}
                                selectionModel={selectionModel}
                            />
                        </Box>
                    </Stack>

                </Stack>

                <Stack spacing={2} >
                    <Typography>Lucro total no ano: {valorTotalAno}</Typography>

                    <LineChartPrecoHist chartBens={chartBens} />
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

export default GereciarReceita;