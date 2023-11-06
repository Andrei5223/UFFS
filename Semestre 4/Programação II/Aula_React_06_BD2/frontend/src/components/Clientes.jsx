import React from "react";
import axios from "axios";

import {  Box, Button, Stack, TextField } from "@mui/material";

function Clientes() {

    //Baixar template completo para ter o codigo de aula

    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');

    function cancelaFormulario(){
        limpaFormulario();
    }

    function limpaFormulario(){
        if (nome !== '' || email !== ''){
            setNome('');
            setEmail('');
        }
    }

    async function enviarFormulario(){
        if (nome !== '' && email !== ''){
            try{
                await axios.post("/cliente", {
                    nome: nome,
                    email: email,
                });
                console.log('Gravou no banco de daos');
                limpaFormulario();
            } catch(error){
                console.log('Não gravou no banco de dados');
                console.log(error);
            }
        }
    }

    return (
        <Box>
            <Stack spacing={2}>
                <Stack spacing={2}>
                    <TextField
                        required
                        id="nome-input"
                        label="Nome"
                        size="small"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                    />
                    <TextField
                        required
                        id="email-input"
                        label="E-mail"
                        size="small"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Stack>
                <Stack direction="row" spacing={3}>
                    <Button
                        variant="contained"
                        style={{
                            maxWidth: "100px",
                            minWidth: "100px",
                        }}
                        color="primary"
                        onClick={enviarFormulario}
                    >
                        Enviar
                    </Button>
                    <Button
                        variant="outlined"
                        style={{
                            maxWidth: "100px",
                            minWidth: "100px",
                        }}
                        color="error"
                        onClick={cancelaFormulario}
                    >
                        Cancelar
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Clientes;
