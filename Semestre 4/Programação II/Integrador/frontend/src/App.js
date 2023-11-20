import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import Add from "./components/Add";
import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3010/";
axios.defaults.headers.common["Content-Type"] =
    "application/json;charset=utf-8";

function App() {
  const [mode, setMode] = useState("light");


  const darkTheme = createTheme({
    palette: {
      mode: mode,
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode}/>
          <Feed />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default App;
