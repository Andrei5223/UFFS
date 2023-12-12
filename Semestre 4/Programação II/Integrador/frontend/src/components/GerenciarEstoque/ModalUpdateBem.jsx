import { Modal, Stack, Box, Button, TextField, Typography } from '@mui/material';
import React from 'react'
import styled from "@emotion/styled";
import axios from 'axios';

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

const ModalUpdateBem = (props) => {

    // Para ler os inputs do usuario
    const [nome, setNome] = React.useState("");
    const [qtd, setQtd] = React.useState("");
    const [med, setMed] = React.useState("");


    React.useEffect(() => {
        console.log(props.itemUpdate);
        setNome(props.itemUpdate.nome);
        setQtd(props.itemUpdate.qtd_seg);
        setMed(props.itemUpdate.un_med);
    }, [props.itemUpdate]);

    async function handleSubmit() {
        console.log(`Nome: ${nome} - Qtd: ${qtd} - Med: ${med}`);
        if (nome !== "" && qtd !== "" && med !== "") {
            try {
                await axios.put("/estoque/bem", {
                    pk: props.itemUpdate.nome,
                    nome: nome,
                    qtd_seg: qtd,
                    un_med: med
                });


                props.setMessageText("Bem editado com sucesso!");
                props.setMessageSeverity("success");
                props.setOpen(false);
            } catch (error) {
                console.log(error);
                props.setMessageText("Falha na edição do bem!");
                props.setMessageSeverity("error");
            } finally {
                props.setOpenMessage(true);
                setTimeout(async () => {
                    await props.getData();
                }, 100);
            }
        } else {
            props.setMessageText("Dados do bem inválidos!");
            props.setMessageSeverity("warning");
            props.setOpenMessage(true);
        }
    }

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

                        <Typography>Editar informações:</Typography>

                        <TextField
                            required
                            id="qtd-input"
                            label="Nome do bem"
                            size="small"
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                            style={{ width: '100%' }}
                        />

                        <TextField
                            required
                            id="qtd-input"
                            label="Quantidade mínima"
                            size="small"
                            onChange={(e) => setQtd(e.target.value)}
                            value={qtd}
                            style={{ width: '100%' }}
                        />

                        <TextField
                            required
                            id="med-input"
                            label="Unidade de medida"
                            size="small"
                            onChange={(e) => setMed(e.target.value)}
                            value={med}
                            style={{ width: '100%' }}
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

export default ModalUpdateBem;