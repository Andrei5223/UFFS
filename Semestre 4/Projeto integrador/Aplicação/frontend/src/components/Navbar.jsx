import { AppBar, Box, Toolbar, Typography, styled } from '@mui/material';
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    }
}));



const Navbar = () => {
    return (
        <AppBar position='sticky'>
            <StyledToolbar>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
                    PADARIA NOVA
                </Typography>
                <Icons>
                    <Typography variant="span">Fazer login</Typography>
                    <PersonIcon />
                </Icons>
            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar;