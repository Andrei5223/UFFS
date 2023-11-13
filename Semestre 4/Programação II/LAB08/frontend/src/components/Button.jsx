import React from "react";
import axios from "axios";

function Button() {
    const [state, setState] = React.useState("Follow");

    function changeState() {
        if (state === "Follow"){
            axios.post('/follow').then(response => {
                setState("Following");
                console.log("Recebi um follow");
            });
        }
        else {
            axios.post('/unfollow').then(response => {
                setState("Follow");
                console.log("Recebi um unfollow");
            });
        }
    }

    return (
        <button
            type="button"
            className="btn btn-primary"
            onClick={changeState}
        >
            {state}
        </button>
    )
}

export default Button;