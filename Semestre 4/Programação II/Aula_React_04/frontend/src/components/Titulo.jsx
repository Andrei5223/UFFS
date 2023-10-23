import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

function Titulo(props) {
    return (
        <Box sx={{
            bgcolor: 'success.main',
            boxShadow: 2,
            borderRadius: 2,
            p: 2,
          }}>
            <Typography
                variant="h3"
                gutterBottom
                style={{ fontSize: "28px" }}
                sx={{ color: "warning.main",  }}
            >
                {props.mensagem}
            </Typography>
        </Box>
    );
}

export default Titulo;
