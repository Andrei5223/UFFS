import { Modal, Stack, Box, Autocomplete, Button, TextField } from '@mui/material';
import React from 'react'
import styled from "@emotion/styled";

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

const UpdateM = (props) => {

    return (
        <StyledModal
            open={props.open}
            onClose={(e) => props.setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Stack spacing={2}>

                <Stack spacing={2} direction="row" justifyContent="space-between">
                    <Box flex={6}>
                        <Autocomplete
                            disablePortal
                            id="combobox-nome"
                            options={props.listaBensNome}
                            size="small"
                            onChange={(event, newValue) => {
                                props.setNome(newValue || '');
                            }}
                            value={props.nome}
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
                        //onClick= abrir janela de gerenciamento de bens
                        type="submit"
                        color="primary"
                    >
                        Gerenciar bens
                    </Button>
                </Stack>

                <TextField
                        required
                        id="marca-input"
                        label="Marca"
                        size="small"
                        onChange={(e) => props.setMarca(e.target.value)}
                        value={props.marca}
                    />

                    <Stack spacing={2} direction="row" alignItems="center">
                        <Box flex={10}>
                            <TextField
                                required
                                id="qtd-input"
                                label="Quantidade"
                                size="small"
                                onChange={(e) => props.setQtd(e.target.value)}
                                value={props.qtd}
                                style={{ width: '100%' }}
                            />
                        </Box>
                        <Box flex={1}>
                            {props.bemMed}
                        </Box>
                    </Stack>

                    <TextField
                        required
                        id="data_val-input"
                        label="Data de validade"
                        size="small"
                        onChange={(e) => props.setData_val(e.target.value)}
                        value={props.data_val}
                    />

                    <TextField
                        required
                        id="preco_total-input"
                        label="Preço"
                        size="small"
                        onChange={(e) => props.setPreco_total(e.target.value)}
                        value={props.preco_total}
                    />
            </Stack>

            <Stack direction="row" spacing={3}>
                <Button
                    variant="contained"
                    style={{
                        maxWidth: "100px",
                        minWidth: "100px",
                    }}

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

                    type="submit"
                    color="primary"
                >
                    Atualizar
                </Button>

                <Button
                    variant="outlined"
                    style={{
                        maxWidth: "100px",
                        minWidth: "100px",
                    }}

                    color="error"
                >
                    Cancelar
                </Button>
            </Stack>

        </StyledModal>
    )
}

export default UpdateM;