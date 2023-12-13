import { Modal, Stack, Box, Autocomplete, Button, TextField, Typography } from '@mui/material';
import React from 'react'
import styled from "@emotion/styled";
import axios from 'axios';

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

const ModalRemove = (props) => {

    // Para ler os inputs do usuario
    const [nome, setNome] = React.useState("");
    const [qtd, setQtd] = React.useState("");

    const [bemMed, setBemMed] = React.useState([]);

    React.useEffect(() => {
        console.log(props.itemUpdate);
        setNome(props.itemUpdate.nome);
    }, [props.itemUpdate]);

    async function handleSubmit() {
        console.log(`Nome: ${nome} - Qtd: ${qtd}`);
        if (nome !== "" && qtd !== "") {
            try {
                await axios.delete("/remover", {
                    data: {
                        nome: nome,
                        qtd: qtd
                    }
                });

                props.setMessageText("Matéria-prima removida com sucesso!");
                props.setMessageSeverity("success");
                props.setOpen(false);
                clearForm();
            } catch (error) {
                console.log(error);
                props.setMessageText("Falha na remoção do estoque!");
                props.setMessageSeverity("error");
            } finally {
                props.setOpenMessage(true);
                setTimeout(async () => {
                    await props.getData();
                }, 100);
            }
        } else {
            props.setMessageText("Defina um bem e quantidade a ser retirada!");
            props.setMessageSeverity("warning");
            props.setOpenMessage(true);
        }
    }

    function clearForm() {
        setNome("");
        setQtd("");
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
                <Box width={400} height={190} bgcolor={"background.default"} color={"text.primary"} padding={3} borderRadius={5}>
                    <Stack spacing={2}>

                        <Typography>Defina o bem e quantidade:</Typography>

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
                            Retirar
                        </Button>

                        <Button
                            variant="outlined"
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
            </>
        </StyledModal>
    )
}

export default ModalRemove;