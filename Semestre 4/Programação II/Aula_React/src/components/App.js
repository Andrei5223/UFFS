import React from 'react';

function App(){
    const [newCount, setNewCount] = React.useState(0);

    function contadorNewCount() {
        setNewCount(newCount + 1);
    }

    let count = 0;
    function counter(){
        count = count +1;
    }

    return (
        <div class = "container-md">
            <h1>Hello World!!</h1>
            <p>Count: {count}</p>
            <button onClick={counter}>Clique em mim!</button>
            <p>New Count: {newCount}</p>
            <button onClick={contadorNewCount}>Clique em mim também!</button>
        </div>
    )
}

export default App;