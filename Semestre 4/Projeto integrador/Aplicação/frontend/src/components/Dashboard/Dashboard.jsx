import React from "react";
import axios from "axios";
import dayjs from 'dayjs';

import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import './classes.css';
import ColetarData from "./ColetarData";
import LineChartPrecoHist from "./LineChartPrecoHist";
import PieChartPrecoHist from "./PieChartPrecoHist";

const colunas = [
    { field: "nome", headerName: "Nome", width: 180 },
    { field: "qtd_total", headerName: "Quantidade", width: 110 },
    { field: "qtd_seg", headerName: "Mínimo", width: 110 },
    { field: "un_med", headerName: "Medida", width: 90 },
    { field: "val_total", headerName: "Valor total (R$)", width: 140 },
    { field: "val_un", headerName: "Custo unitario (R$)", width: 140 },
    { field: "data_m", headerName: "Vencimento", width: 120 },
    { field: "reg_freq", headerName: "Frequência (%)", width: 110 },
];

function Dashboard() {
    // Para ler os inputs do usuario
    const [dia, setDia] = React.useState(dayjs()); // Defina o valor inicial como a data atual
    const [nome, setNome] = React.useState("");
    const [ano, setAno] = React.useState("");
    const [chartBens, setChartBens] =  React.useState([]);

    // Para manipulações em relação ao backend
    const [listaBens, setListaBens] = React.useState([]);
    const [valorTotal, setValorTotal] = React.useState(0);

    React.useEffect(() => {
        getData();
    }, [dia]);

    async function getData() {
        try {
            const bens = await axios.get(`/dashboard/estoque?dia=${dia}`);

            console.log(bens.data);

            let acumV = 0;
            let acumF = 0;

            for (let i = 0; i < bens.data.length; i++) {
                acumV = acumV + parseFloat(bens.data[i].val_total);
                acumF = acumF + parseFloat(bens.data[i].reg_freq);

                if (bens.data[i].data_m === '01/01/1') {
                    bens.data[i].data_m = ''
                }
            }

            for (let i = 0; i < bens.data.length; i++) {
                bens.data[i].reg_freq = ((bens.data[i].reg_freq / acumF) * 100).toFixed(2);
            }

            setValorTotal(`R$ ${acumV}`);

            setListaBens(bens.data);
        } catch (error) {
            setListaBens([]);
        }
    }

    function getRowId(row) {
        return row.nome;
    }
    
    function getRowClassName(params) {
        const { qtd_total, qtd_seg, data_m } = params.row;
    
        const isQuantidadeMenor = parseFloat(qtd_total) < parseFloat(qtd_seg);
    
        const parts = data_m.split('/');
        const dataValidade = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    
        const umMesDepois = new Date();
        umMesDepois.setMonth(umMesDepois.getMonth() + 1);
    
        const menosDeUmMesRestante = dataValidade < umMesDepois;
    
        if (isQuantidadeMenor) {
            return 'linha-vermelha';
        } else if (menosDeUmMesRestante) {
            return 'linha-vermelha-validade';
        }
    
        return '';
    }
    
    React.useEffect(() => {
        const fetchData = async () => {
            if (ano !== '' && nome !== '') {
                let chart = [];

                const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'];

                for (let i = 0; i < meses.length; i++) {
                    let dia = `${String(ano)}-${String(i + 1)}-28`;

                    const bens = await axios.get(`/dashboard/estoque?dia=${dia}`);
                    const bem = bens.data.find(item => item.nome === nome);

                    chart.push({ mes: meses[i], val_un: bem ? parseFloat(bem.val_un) : 0 });
                }

                setChartBens(chart);
                console.log(chart);
            }
        };

        fetchData();
    }, [ano, nome]);


    return (
        <Box>
            <h3>Registro histórico de bens:</h3>

            <Stack spacing={2} direction='row'>

                <Stack spacing={2} paddingTop={3}>

                    <Stack spacing={2}>
                        <Stack direction='row' spacing={3} alignItems='center'>
                            <ColetarData value={dia} setValue={setDia} />
                            <Typography>Valor total dos bens: {valorTotal}</Typography>
                        </Stack>

                        <Box style={{ height: "650px", width: "1010px" }}>
                            <Typography>Bens em estoque:</Typography>
                            <DataGrid
                                rows={listaBens}
                                columns={colunas}
                                getRowId={getRowId}
                                getRowClassName={getRowClassName}
                                disableHover={true}
                                checkboxSelection={false}
                                disableSelectionOnClick={true}
                            />
                        </Box>
                    </Stack>
                    
                </Stack>

                <Stack spacing={2} >
                    Custo histórico do bem:
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Box flex={1}>
                            <Autocomplete
                                style={{ marginTop: '16px' }}
                                disablePortal
                                id="combobox-nome"
                                options={listaBens.map((item) => item.nome)}
                                size="medium"
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

                        <Box flex={1}>
                            <TextField
                                required
                                id="ano-input"
                                label="Ano"
                                size="medium"
                                onChange={(e) => setAno(e.target.value)}
                                value={ano}
                                style={{ width: '100%', marginTop: '16px' }}
                            />
                        </Box>

                    </Stack>

                    <LineChartPrecoHist chartBens={chartBens}/>
                    <PieChartPrecoHist chartBens={chartBens} />

                </Stack>
            </Stack>
        </Box>
    );
}

export default Dashboard;