import React from "react";
import { DataGrid } from '@mui/x-data-grid';

const colunas = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nome", headerName: "Nome", width: 180 },
    { field: "email", headerName: "Email", width: 180 }
];

function Table(prop) {
    return (
        <div className="row">
            <DataGrid rows={prop.clientes} columns={colunas}/>
        </div>
    )
}

export default Table;