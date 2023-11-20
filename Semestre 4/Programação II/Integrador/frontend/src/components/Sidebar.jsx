import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material';
import React from 'react'

import ArticleIcon from '@mui/icons-material/Article';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

const Sidebar = ({mode, setMode}) => {
    return (
        <Box
            flex={1}
            padding={2}
            sx={{ display: { xs: "none", sm: "block" } }}
        >
            <Box position="fixed">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag">
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gerenciar estoque" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag">
                            <ListItemIcon>
                                <ArticleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gerenciar receitas culinárias" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag">
                            <ListItemIcon>
                                <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gerenciar usuários" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag">
                            <ListItemIcon>
                                <AttachMoneyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cadastrar receita diária" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag">
                            <ListItemIcon>
                                <AssessmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gerar relatórios" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#anytag">
                            <ListItemIcon>
                                <ModeNightIcon />
                            </ListItemIcon>
                            <Switch onChange={(e)=>setMode(mode === "light" ? "dark": "light")}/>
                        </ListItemButton>
                    </ListItem>

                </ List>
            </Box>
        </Box>
    )
}

export default Sidebar;