import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from "@mui/material";

const colunas = [
    {
        field: "hora", headerName: "Horário", width: 65
    },
    {
        field: "seg", headerName: "Segunda", flex: 1, renderCell: (params) => (
            <Box className="wrapCellText">
                {params.value}
            </Box>
        )
    },
    {
        field: "ter", headerName: "Terça", flex: 1, renderCell: (params) => (
            <Box className="wrapCellText">
                {params.value}
            </Box>
        )
    },
    {
        field: "qua", headerName: "Quarta", flex: 1, renderCell: (params) => (
            <Box className="wrapCellText">
                {params.value}
            </Box>
        )
    },
    {
        field: "qui", headerName: "Quinta", flex: 1, renderCell: (params) => (
            <Box className="wrapCellText">
                {params.value}
            </Box>
        )
    },
    {
        field: "sex", headerName: "Sexta", flex: 1, renderCell: (params) => (
            <Box className="wrapCellText">
                {params.value}
            </Box>
        )
    },
    {
        field: "sab", headerName: "Sábado", flex: 1, renderCell: (params) => (
            <Box className="wrapCellText">
                {params.value}
            </Box>
        )
    }
];

function Table(prop) {
    const rowsData = prop.horarios && prop.horarios.length > 0 ? prop.horarios : [];

    return (
        <div className="row">
            <DataGrid rows={rowsData} columns={colunas} getRowId={(row) => row.hora} />
        </div>
    )
}

export default Table;