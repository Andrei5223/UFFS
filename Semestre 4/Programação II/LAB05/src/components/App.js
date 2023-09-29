import React from 'react';
import CC from './CC'; 
import Med from './Med';
import Botao from './Botao';

function App(){

    return (
        <div class="container-md">

            {/* ROW 1 */}
            <div class="row py-3">
                <div class="col-3 d-flex align-items-center justify-content-center">
                    <div class = 'imagem'> <img src="logoUFFS.png" alt="Logo UFFS" /></div>
                </div>

                <div class="col-1 d-flex align-items-center text-center">
                    <Botao/>
                </div>    

                <div class="col-8 d-flex align-items-center text-center">
                    <h1> UNIVERSIDADE FEDERAL DA FRONTEIRA SUL</h1>
                </div>
            </div>

            {/* ROW 2 */}
            <div class="row">

                <CC/>

                <Med/>

            {/* FIM DA ROW 1 */}
            </div>
            

        </div>
    )
}

export default App;