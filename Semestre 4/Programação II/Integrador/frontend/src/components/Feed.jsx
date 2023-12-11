import { Box } from '@mui/material';
import React from 'react';
import GerenciarEstoque from './GerenciarEstoque/GerenciarEstoque';

const Feed = () => {
    return (
        <Box flex={6} padding={2}>
            <GerenciarEstoque/>
        </Box>
    )
}

export default Feed;