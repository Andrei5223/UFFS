import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3010/";
axios.defaults.headers.common["Content-Type"] =
    "application/json;charset=utf-8";

function App() {
    const [countState, setCountState] = React.useState(0);
    const [listaClientes, setListaClientes] = React.useState([]); //cria a lista de clientes

    React.useEffect(() => {
        const res = axios.get("/clientes"); // faz a request
        res.then((response) => {
            console.log(response.data);
            setListaClientes(response.data);    // atribui na lista
        });
    }, []);

    function counterState() {
        setCountState(countState + 1);
    }

    return (
        <div className="container-lg">
            <div className="row">
                <div className="col">
                    <h1>Hello World!</h1>
                </div>
            </div>
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
            <div className="row">
                <table className="table">
                    {listaClientes.length > 0 && (<thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>)}
                    <tbody>
                    {listaClientes.length > 0 && listaClientes.map((cliente, index) => (
                        <tr key = {cliente}>
                            <th key = {cliente.id} scope="row">{cliente.id}</th>
                            <td key = {cliente.nome}>{cliente.nome}</td>
                            <td key = {cliente.email}>{cliente.email}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
