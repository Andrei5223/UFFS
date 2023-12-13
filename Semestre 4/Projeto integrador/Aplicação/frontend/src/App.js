import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


axios.defaults.baseURL = "http://localhost:3010/";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

function App() {
  const [username, setUsername] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [mode, setMode] = useState('light');

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    }
  })

  React.useEffect(() => {
    // verifica se já está logado
    const token = localStorage.getItem("token");
    if (token) {
      handleLogin();
    }
  }, []);

  const handleLogin = async () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Box>
      {isLoggedIn ? (

        <ThemeProvider theme={darkTheme}>
          <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar setMode={setMode} mode={mode} handleLogout={handleLogout} username={username} />


            <Router>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Sidebar />
                <Feed />
              </Stack>
            </Router>

            
          </Box>
        </ThemeProvider>

      ) : (<Login onLogin={handleLogin} username={username} setUsername={setUsername} />)}
    </Box>
  );
}

export default App;
