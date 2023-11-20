import { Box } from '@mui/material';
import React from 'react';
import CadastroEstoque from './CadastroEstoque';

const Feed = () => {
    return (
        <Box flex={6} padding={2}>
            <CadastroEstoque/>
        </Box>
    )
}

export default Feed;