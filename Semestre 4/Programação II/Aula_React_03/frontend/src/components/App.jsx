import React from "react";
import axios from "axios";
import Titulo from "./Titulo";
import Button from "./Button";
import Table from "./Table";

axios.defaults.baseURL = "http://localhost:3010/";
axios.defaults.headers.common["Content-Type"] =
    "application/json;charset=utf-8";

function App() {

    const [listaClientes, setListaClientes] = React.useState([]);

    React.useEffect(() => {
        const res = axios.get("/clientes");
        res.then((query) => {
            setListaClientes(query.data);
            console.log(query.data);
        });
    }, []);

    
    return (
        <div className="container-lg">
            <Titulo mensagem = 'Hello World!!'/>
            <Button />
            <Table clientes={listaClientes} />
        </div>
    );
}

export default App;
