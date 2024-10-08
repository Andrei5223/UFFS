import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import Box from "@mui/material/Box";

const colunas = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nome", headerName: "Nome", width: 180 },
    { field: "email", headerName: "Email", width: 180 },
];

function Table(props) {

    return (
        <Box style={{ height: '500px'}} sx={{
            bgcolor: 'secondary.main',
            boxShadow: 2,
            borderRadius: 2,
            p: 2,
          }} >
            <DataGrid
                rows={props.clientes}
                columns={colunas}
            />
        </Box>
    );
}

export default Table;
