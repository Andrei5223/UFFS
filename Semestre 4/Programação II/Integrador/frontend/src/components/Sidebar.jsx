import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react'

import ArticleIcon from '@mui/icons-material/Article';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import AssessmentIcon from '@mui/icons-material/Assessment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();

    const handleNavigateEstoque = () => {
        // Use navigate para navegar para uma rota específica
        navigate('/estoque');
    };

    const handleNavigateHome = () => {
        // Use navigate para navegar para uma rota específica
        navigate('/');
    };

    const handleNavigateCulinaria = () => {
        // Use navigate para navegar para uma rota específica
        navigate('/culinaria');
    };

    const handleNavigateUsuario = () => {
        // Use navigate para navegar para uma rota específica
        navigate('/usuario');
    };

    const handleNavigateReceita = () => {
        // Use navigate para navegar para uma rota específica
        navigate('/receita');
    };

    return (
        <Box
            flex={1}
            padding={2}
            sx={{ display: { xs: "none", sm: "block" } }}
        >
            <Box>
                <List>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag" onClick={handleNavigateHome}>
                            <ListItemIcon>
                                <AssessmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag" onClick={handleNavigateEstoque}>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gerenciar estoque" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag" onClick={handleNavigateCulinaria}>
                            <ListItemIcon>
                                <ArticleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gerenciar receitas culinárias" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag" onClick={handleNavigateUsuario}>
                            <ListItemIcon>
                                <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gerenciar usuários" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag" onClick={handleNavigateReceita}>
                            <ListItemIcon>
                                <AttachMoneyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gerenciamento de receita" />
                        </ListItemButton>
                    </ListItem>

                </ List>
            </Box>
        </Box>
    )
}

export default Sidebar;