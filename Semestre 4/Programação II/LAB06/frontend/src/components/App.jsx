import React from "react";
import axios from "axios";
import Titulo from "./Titulo";
import SubTitulo from "./Subtitulo";
import Button from "./Button";
import Acordeao from "./Acordeao";
import { Grid, useTheme, useMediaQuery } from '@mui/material';

axios.defaults.baseURL = "http://localhost:3010/";
axios.defaults.headers.common["Content-Type"] =
    "application/json;charset=utf-8";

function App() {
    // Faz a requisição dos horarios de CC ao backend
    const [listaHorariosCC, setListaHorariosCC] = React.useState([]);
    const [dadosCC, setDadosCC] = React.useState([]);

    React.useEffect(() => {
        const res = axios.get(`/horarios?id=1100`);
        res.then((query) => {
            setListaHorariosCC(query.data);
            console.log(query.data);
        });
    }, []);

    React.useEffect(() => {
        const res = axios.get(`/cursos?id=1100`);
        res.then((query) => {
            setDadosCC(query.data);
            console.log(query.data);
        });
    }, []);

    // Faz a requisição dos horarios de Med ao backend
    const [listaHorariosMed, setListaHorariosMed] = React.useState([]);
    const [dadosMed, setDadosMed] = React.useState([]);

    React.useEffect(() => {
        const res = axios.get(`/horarios?id=1101`);
        res.then((query) => {
            setListaHorariosMed(query.data);
            console.log(query.data);
        });
    }, []);

    React.useEffect(() => {
        const res = axios.get(`/cursos?id=1101`);
        res.then((query) => {
            setDadosMed(query.data);
            console.log(query.data);
        });
    }, []);

    // Torna o padding responsivo
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));

    const containerStyles = {
        padding: isSmallScreen ? '0 20px' : '0 200px',
        height: '15vh'
    };
    
    return (
        <div>
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={containerStyles}>
                <Grid item lg={3}>
                    <img src="logoUFFS.png" alt="Logo UFFS" />
                </Grid>
                <Grid item lg={2}>
                    <Button />
                </Grid>
                <Grid item lg={7}>
                    <Titulo mensagem = 'Universidade Federal da Fronteira Sul'/>
                </Grid>
            </Grid>
                
            <Grid container spacing={2} justifyContent="center" style={containerStyles}>
                <Grid item lg={6}>
                    <SubTitulo mensagem = {dadosCC.nome}/>
                    <Acordeao listaHorarios = {listaHorariosCC}/>
                </Grid>
                <Grid item lg = {6}>
                <SubTitulo mensagem = {dadosMed.nome}/>
                    <Acordeao listaHorarios = {listaHorariosMed}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
