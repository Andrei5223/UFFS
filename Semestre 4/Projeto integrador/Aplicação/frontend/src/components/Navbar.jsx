import { AppBar, Box, Button, Switch, Toolbar, Typography, styled } from '@mui/material';
import React from 'react'
import ModeNightIcon from '@mui/icons-material/ModeNight';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const Icons = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
}));



const Navbar = ({mode, setMode, handleLogout, username}) => {

    function changeMode(){
        if (mode === 'light'){
            setMode('dark');
        } else {
            setMode('light');
        }
    }

    return (
        <AppBar position='sticky'>
            <StyledToolbar>
                <Box>
                    <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
                        PADARIA NOVA
                    </Typography>
                </Box>
                <Icons>
                    <ModeNightIcon />
                    <Switch onChange={changeMode}/>
                    <Typography variant="span">{username}</Typography>
                    <Button variant="contained" onClick={handleLogout}>
						Logout
					</Button>
                </Icons>
            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar;