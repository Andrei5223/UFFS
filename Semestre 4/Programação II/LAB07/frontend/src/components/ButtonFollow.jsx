import React from "react";
import axios from "axios";
import { Button } from "@mui/material";

function ButtonFollow() {
    const [state, setState] = React.useState("Follow");
    const [corBtn, setCorBtn] = React.useState("primary.dark");

    function changeState() {
        if (state === "Follow"){
            axios.post('/follow').then(response => {
                setState("Following");
                setCorBtn("primary.light");
                console.log("Recebi um follow");
            });
        }
        else {
            axios.post('/unfollow').then(response => {
                setState("Follow");
                setCorBtn("primary.dark");
                console.log("Recebi um unfollow");
            });
        }
    }

    return (
        <Button
            // type="button"
            // className="btn btn-primary"
            onClick={changeState}
            sx={{backgroundColor: corBtn}}
            variant="contained"
        >
            {state}
        </Button>
    )
}

export default ButtonFollow;