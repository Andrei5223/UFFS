import { Modal, Stack, Box, Autocomplete, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import React from 'react'
import styled from "@emotion/styled";
import axios from 'axios';

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

const UpdateM = (props) => {

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

    const [bemMed, setBemMed] = React.useState([]);

    React.useEffect(() => {
        console.log(props.itemUpdate);
        setNome(props.itemUpdate.nome);
        setMarca(props.itemUpdate.marca);
        setData_val(props.itemUpdate.data_val);
        setQtd(props.itemUpdate.qtd);
        setPreco_total(props.itemUpdate.preco_total);
    }, [props.itemUpdate]);

    async function handleSubmit() {
        console.log(`Nome: ${nome} - Marca: ${marca} - DataV: ${data_val} - Preco: ${preco_total} - Qtd: ${qtd}`);
        if (nome !== "" && props.qtd !== "") {
            try {
                await axios.put("/estoque", {
                    id: props.itemUpdate.id,
                    nome: nome,
                    marca: marca,
                    data_val: data_val,
                    preco_total: preco_total,
                    qtd: qtd,
                });

                props.setMessageText("Matéria-prima atualizada com sucesso!");
                props.setMessageSeverity("success");
                props.setOpen(false);
            } catch (error) {
                console.log(error);
                props.setMessageText("Falha na atualização do estoque!");
                props.setMessageSeverity("error");
            } finally {
                setOpenMessage(true);
                setTimeout(async () => {
                    await props.getData();
                }, 100);
            }
        } else {
            props.setMessageText("Dados da matéria prima inválidos!");
            props.setMessageSeverity("warning");
            props.setOpenMessage(true);
        }
    }

    React.useEffect(() => {
        if (nome !== "") {
            for (let i = 0; i < props.listaBens.length; i++) {
                if (props.listaBens[i].nome === nome) {
                    setBemMed(props.listaBens[i].un_med);
                }
            }
        } else {
            setBemMed(" - ");
        }
    }, [nome, props.listaBens]);

    return (
        <StyledModal
            open={props.open}
            onClose={(e) => props.setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                <Box width={400} height={350} bgcolor={"background.default"} color={"text.primary"} padding={3} borderRadius={5}>
                    <Stack spacing={2}>

                        <Typography>Atualizar informações:</Typography>

                        <Autocomplete
                            disablePortal
                            id="combobox-nome"
                            options={props.listaBensNome}
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

                        <TextField
                            required
                            id="marca-input"
                            label="Marca"
                            size="small"
                            onChange={(e) => setMarca(e.target.value)}
                            value={marca}
                        />

                        <Stack spacing={2} direction="row" alignItems="center">
                            <Box flex={10}>
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
                            <Box flex={1}>
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

                    <Stack direction="row" spacing={3} paddingTop={2}>
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
                            variant="contained"
                            style={{
                                maxWidth: "100px",
                                minWidth: "100px",
                            }}
                            onClick={(e) => props.setOpen(false)}
                            type="submit"
                            color="primary"
                        >
                            Cancelar
                        </Button>
                    </Stack>
                </Box>

                <Snackbar
                    open={openMessage}
                    autoHideDuration={6000}
                    onClose={props.handleCloseMessage}
                >
                    <Alert
                        severity={messageSeverity}
                        onClose={props.handleCloseMessage}
                    >
                        {messageText}
                    </Alert>
                </Snackbar>

            </>
        </StyledModal>
    )
}

export default UpdateM;