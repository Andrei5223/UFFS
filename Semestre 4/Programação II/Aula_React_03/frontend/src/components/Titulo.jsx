import React from "react";

function Titulo(props) {
    return (
        <div className="row">
            <div className="col">
                <h1>{props.mensagem}</h1>
            </div>
        </div>
    )
}

export default Titulo;