import { Box } from '@mui/material';
import React from 'react';

import MyChart from './ChartPrecoHist';
import NivoChart from './Nivochart';
import RegistroFinaneiro from './RegistroFinanceiro';

const Dashboard = () => {
    return (
        <Box>
            <RegistroFinaneiro />
        </Box>
    );
};

export default Dashboard;
