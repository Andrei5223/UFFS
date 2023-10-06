import React from "react";

function Button() {
    const [countState, setCountState] = React.useState(0);

    function counterState() {
        setCountState(countState + 1);
    }

    return (
        <div className="row">
            <div className="col-4">
                <p>Count com state: {countState}</p>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={counterState}
                >
                    Clique aqui!
                </button>
            </div>
        </div>
    )
}

export default Button;