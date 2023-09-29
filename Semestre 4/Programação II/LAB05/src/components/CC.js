import React from 'react';

function CC() {
    return (
        <div class="col">
            <h1>Ciência da computação</h1>

            {/* INÍCIO DO ACCORDION */}
            <div class="accordion" id="accordionCienciaDaComputacao">
                {/* ITEM 1 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOneCC">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneCC" aria-expanded="true" aria-controls="collapseOneCC">
                            Primeiro semestre
                        </button>
                    </h2>
                    <div id="collapseOneCC" aria-labelledby="headingOneCC" class="accordion-collapse collapse show" data-bs-parent="#accordionCienciaDaComputacao">
                        <div class="accordion-body">
                            <table class="tabela">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Segunda</th>
                                        <th>Terça</th>
                                        <th>Quarta</th>
                                        <th>Quinta</th>
                                        <th>Sexta</th>
                                        <th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>7:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>10:20</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>13:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>16:00</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>19:10</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>21:00</td>
                                        <td class='tabela'>Introdução a filosofia</td>
                                        <td class='tabela'>Informatica Basica</td>
                                        <td class='tabela'>Matematica C</td>
                                        <td class='tabela'>Algoritimos e Programação</td>
                                        <td class='tabela'>Estatistica Basica</td>
                                        <td class='tabela'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ITEM 2 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwoCC">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwoCC" aria-expanded="false" aria-controls="collapseTwoCC">
                            Segundo semestre
                        </button>
                    </h2>
                    <div id="collapseTwoCC" aria-labelledby="headingTwoCC" class="accordion-collapse collapse" data-bs-parent="#accordionCienciaDaComputacao">
                        <div class="accordion-body">
                            <table class="tabela">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Segunda</th>
                                        <th>Terça</th>
                                        <th>Quarta</th>
                                        <th>Quinta</th>
                                        <th>Sexta</th>
                                        <th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>7:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>10:20</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>13:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>16:00</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>19:10</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>21:00</td>
                                        <td class='tabela'>Introdução a filosofia</td>
                                        <td class='tabela'>Informatica Basica</td>
                                        <td class='tabela'>Matematica C</td>
                                        <td class='tabela'>Algoritimos e Programação</td>
                                        <td class='tabela'>Estatistica Basica</td>
                                        <td class='tabela'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ITEM 3 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThreeCC">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThreeCC" aria-expanded="false" aria-controls="collapseThreeCC">
                            Terceiro semestre
                        </button>
                    </h2>
                    <div id="collapseThreeCC" aria-labelledby="headingThreeCC" class="accordion-collapse collapse" data-bs-parent="#accordionCienciaDaComputacao">
                        <div class="accordion-body">
                            <table class="tabela">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Segunda</th>
                                        <th>Terça</th>
                                        <th>Quarta</th>
                                        <th>Quinta</th>
                                        <th>Sexta</th>
                                        <th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>7:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>10:20</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>13:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>16:00</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>19:10</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>21:00</td>
                                        <td class='tabela'>Introdução a filosofia</td>
                                        <td class='tabela'>Informatica Basica</td>
                                        <td class='tabela'>Matematica C</td>
                                        <td class='tabela'>Algoritimos e Programação</td>
                                        <td class='tabela'>Estatistica Basica</td>
                                        <td class='tabela'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ITEM 4 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFourCC">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourCC" aria-expanded="false" aria-controls="collapseFourCC">
                            Quarto semestre
                        </button>
                    </h2>
                    <div id="collapseFourCC" aria-labelledby="headingFourCC" class="accordion-collapse collapse" data-bs-parent="#accordionCienciaDaComputacao">
                        <div class="accordion-body">
                            <table class="tabela">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Segunda</th>
                                        <th>Terça</th>
                                        <th>Quarta</th>
                                        <th>Quinta</th>
                                        <th>Sexta</th>
                                        <th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>7:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>10:20</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>13:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>16:00</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>19:10</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>21:00</td>
                                        <td class='tabela'>Introdução a filosofia</td>
                                        <td class='tabela'>Informatica Basica</td>
                                        <td class='tabela'>Matematica C</td>
                                        <td class='tabela'>Algoritimos e Programação</td>
                                        <td class='tabela'>Estatistica Basica</td>
                                        <td class='tabela'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ITEM 5 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFiveCC">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiveCC" aria-expanded="false" aria-controls="collapseFiveCC">
                            Quinto semestre
                        </button>
                    </h2>
                    <div id="collapseFiveCC" aria-labelledby="headingFiveCC" class="accordion-collapse collapse" data-bs-parent="#accordionCienciaDaComputacao">
                        <div class="accordion-body">
                            <table class="tabela">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Segunda</th>
                                        <th>Terça</th>
                                        <th>Quarta</th>
                                        <th>Quinta</th>
                                        <th>Sexta</th>
                                        <th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>7:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>10:20</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>13:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>16:00</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>19:10</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>21:00</td>
                                        <td class='tabela'>Introdução a filosofia</td>
                                        <td class='tabela'>Informatica Basica</td>
                                        <td class='tabela'>Matematica C</td>
                                        <td class='tabela'>Algoritimos e Programação</td>
                                        <td class='tabela'>Estatistica Basica</td>
                                        <td class='tabela'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ITEM 6 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingSixCC">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSixCC" aria-expanded="false" aria-controls="collapseSixCC">
                            Sexto semestre
                        </button>
                    </h2>
                    <div id="collapseSixCC" aria-labelledby="headingSixCC" class="accordion-collapse collapse" data-bs-parent="#accordionCienciaDaComputacao">
                        <div class="accordion-body">
                            <table class="tabela">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Segunda</th>
                                        <th>Terça</th>
                                        <th>Quarta</th>
                                        <th>Quinta</th>
                                        <th>Sexta</th>
                                        <th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>7:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>10:20</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>13:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>16:00</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>19:10</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>21:00</td>
                                        <td class='tabela'>Introdução a filosofia</td>
                                        <td class='tabela'>Informatica Basica</td>
                                        <td class='tabela'>Matematica C</td>
                                        <td class='tabela'>Algoritimos e Programação</td>
                                        <td class='tabela'>Estatistica Basica</td>
                                        <td class='tabela'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ITEM 7 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingSevenCC">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSevenCC" aria-expanded="false" aria-controls="collapseSevenCC">
                            Sétimo semestre
                        </button>
                    </h2>
                    <div id="collapseSevenCC" aria-labelledby="headingSevenCC" class="accordion-collapse collapse" data-bs-parent="#accordionCienciaDaComputacao">
                        <div class="accordion-body">
                            <table class="tabela">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Segunda</th>
                                        <th>Terça</th>
                                        <th>Quarta</th>
                                        <th>Quinta</th>
                                        <th>Sexta</th>
                                        <th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>7:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>10:20</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>13:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>16:00</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>19:10</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>21:00</td>
                                        <td class='tabela'>Introdução a filosofia</td>
                                        <td class='tabela'>Informatica Basica</td>
                                        <td class='tabela'>Matematica C</td>
                                        <td class='tabela'>Algoritimos e Programação</td>
                                        <td class='tabela'>Estatistica Basica</td>
                                        <td class='tabela'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ITEM 8 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingEightCC">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHeightCC" aria-expanded="false" aria-controls="collapseHeightCC">
                            Oitavo semestre
                        </button>
                    </h2>
                    <div id="collapseHeightCC" aria-labelledby="headingEightCC" class="accordion-collapse collapse" data-bs-parent="#accordionCienciaDaComputacao">
                        <div class="accordion-body">
                            <table class="tabela">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Segunda</th>
                                        <th>Terça</th>
                                        <th>Quarta</th>
                                        <th>Quinta</th>
                                        <th>Sexta</th>
                                        <th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>7:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>10:20</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>13:30</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>16:00</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>19:10</td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                        <td class='tabela'></td>
                                    </tr>
                                    <tr>
                                        <td>21:00</td>
                                        <td class='tabela'>Introdução a filosofia</td>
                                        <td class='tabela'>Informatica Basica</td>
                                        <td class='tabela'>Matematica C</td>
                                        <td class='tabela'>Algoritimos e Programação</td>
                                        <td class='tabela'>Estatistica Basica</td>
                                        <td class='tabela'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* FIM DO ACCORDION */}
            </div>

            {/* FIM DA COLUNA 1 */}
        </div>
    )
}

export default CC;