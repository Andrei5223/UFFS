import { Modal, Stack, Box, Button, TextField, Typography } from '@mui/material';
import React from 'react'
import styled from "@emotion/styled";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import ModalUpdateBem from './ModalUpdateBem';

const colunas = [
    { field: "nome", headerName: "Nome", width: 240 },
    { field: "qtd_seg", headerName: "Minimo", width: 120 },
    { field: "un_med", headerName: "Medida", width: 180 },
];

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

const GerenciarBens = (props) => {

    // Para ler os inputs do usuario
    const [nome, setNome] = React.useState("");
    const [qtd, setQtd] = React.useState("");
    const [med, setMed] = React.useState("");

    // Para selecionar a row da dataGrid
    const [selectionModel, setSelectionModel] = React.useState([]);

    // Para controlar modal
    const [openUpdate, setOpenUpdate] = React.useState(false);
    
    // Para manipulação em relação ao backend
    const [itemUpdate, setItemUpdate] = React.useState([]);

    React.useEffect(() => {
        props.getData();
    }, [props.setOpen]);

    async function handleSubmit() {
        console.log(`Nome: ${nome} - Qtd: ${qtd} - Med: ${med}`);
        if (nome !== "" && qtd !== "" && med !== "") {
            try {
                await axios.post("/estoque/bem", {
                    nome: nome,
                    qtd_seg: qtd,
                    un_med: med
                });

                props.setMessageText("Bem cadastrado com sucesso!");
                props.setMessageSeverity("success");
                clearForm();
            } catch (error) {
                console.log(error);
                props.setMessageText("Bem já cadastrado!");
                props.setMessageSeverity("error");
            } finally {
                props.setOpenMessage(true);
                setTimeout(async () => {
                    await props.getData();
                }, 100);
            }
        } else {
            props.setMessageText("Dados inválidos!");
            props.setMessageSeverity("warning");
            props.setOpenMessage(true);
        }
    }

    function clearForm() {
        setNome("");
        setQtd("");
        setMed("");
    }

    async function handleDelete() {
        if (selectionModel.length !== 0) {
            try {
                await axios.delete("/estoque/bem", {
                    data: { nomes: selectionModel }
                });

                props.setMessageText("Bem deletado com sucesso!");
                props.setMessageSeverity("success");
                clearForm(); // limpa o formulário apenas se cadastrado com sucesso

            } catch (error) {
                console.log(error);
                props.setMessageText("Falha ao deletar!");
                props.setMessageSeverity("error");
            } finally {
                props.setOpenMessage(true);
                setTimeout(async () => {
                    await props.getData();
                }, 100);
            }
        } else {
            props.setMessageText("Selecine os bens desejados!");
            props.setMessageSeverity("warning");
            props.setOpenMessage(true);
        }
    }

    async function handleUpdate() {
        if (selectionModel.length === 1) {
            try {
                const nome = selectionModel[0];

                for (let i = 0; i < props.listaBens.length; i++) {
                    if (props.listaBens[i].nome === nome)
                        setItemUpdate(props.listaBens[i]);
                }

                setTimeout(async () => {
                    await setOpenUpdate(true);
                }, 100);

            } catch (error) {
                console.log(error);
                props.setMessageText("Falha ao executar!");
                props.setMessageSeverity("error");
            }
        } else {
            props.setMessageText("Selecine um bem para editar!");
            props.setMessageSeverity("warning");
            props.setOpenMessage(true);
        }
    }

    const handleSelectionModelChange = (newSelectionModel) => {
        console.log('New Selection Model:', newSelectionModel);
        setSelectionModel(newSelectionModel);

        // Now 'newSelectionModel' contains the IDs of the selected rows
    };

    return (
        <StyledModal
            open={props.open}
            onClose={(e) => props.setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                <Box width={900} height={640} bgcolor={"background.default"} color={"text.primary"} padding={3} borderRadius={5}>
                    <Typography>Gerenciar bens:</Typography>

                    <Stack direction="row" spacing={2} paddingTop={1}>

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
                            Cadastrar
                        </Button>

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

                        <Button
                            variant="contained"
                            style={{
                                maxWidth: "100px",
                                minWidth: "100px",
                            }}
                            onClick={handleUpdate}
                            type="submit"
                            color="primary"
                        >
                            Editar
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

                    <Box style={{ height: "500px" }} paddingTop={2}>
                        <DataGrid
                            rows={props.listaBens}
                            columns={colunas}
                            checkboxSelection
                            onRowSelectionModelChange={handleSelectionModelChange}
                            selectionModel={selectionModel}
                            getRowId={(row) => row.nome}
                        />
                    </Box>

                </Box>

                <ModalUpdateBem
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    listaBens={props.listaBens}
                    itemUpdate={itemUpdate}
                    getData={props.getData}
                    openMessage={props.openMessage}
                    setOpenMessage={props.setOpenMessage}
                    messageText={props.messageText}
                    setMessageText={props.setMessageText}
                    messageSeverity={props.messageSeverity}
                    setMessageSeverity={props.setMessageSeverity}
                    handleCloseMessage={props.handleCloseMessage}
                />
            </>
        </StyledModal>
    )
}

export default GerenciarBens;