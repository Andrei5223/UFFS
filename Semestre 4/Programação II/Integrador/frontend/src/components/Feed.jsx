import { Box } from '@mui/material';
import React from 'react';
import GerenciarEstoque from './GerenciarEstoque/GerenciarEstoque';
import Dashboard from './Dashboard/Dashboard';

const Feed = () => {
    return (
        <Box flex={6} padding={2}>
            <GerenciarEstoque/>
            <Dashboard/>
        </Box>
    )
}

export default Feed;