import { Box } from '@mui/material';
import React from 'react';
import GerenciarEstoque from './GerenciarEstoque/GerenciarEstoque';
import Dashboard from './Dashboard/Dashboard';
import GerenciarCulinaria from './GerenciarCulinaria/GerenciarCulinaria';
import GerenciarUsuario from './GerenciarUsuarios/GerenciarUsuario';

import { Route, Routes } from "react-router-dom";
import GereciarReceita from './GerenciarReceita/GerenciarReceita';

const Feed = () => {

    return (
        <Box flex={6} padding={2}>

            <Routes>
                <Route
                    path="/estoque"
                    element={<GerenciarEstoque />}
                />
                <Route
                    path="/"
                    element={<Dashboard />}
                />
                <Route
                    path="/culinaria"
                    element={<GerenciarCulinaria />}
                />
                <Route
                    path="/usuario"
                    element={<GerenciarUsuario />}
                />
                <Route
                    path="/receita"
                    element={<GereciarReceita />}
                />
            </Routes>

        </Box>
    )
}

export default Feed;