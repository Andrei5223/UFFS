import React from 'react';

function Med() {
    return (
        <div class="col">
            <h1>Medicina</h1>

            {/* INÍCIO DO ACCORDEON */}
            <div class="accordion" id="accordionMedicina">

                {/* ITEM 1 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOneMed">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneMed" aria-expanded="true" aria-controls="collapseOneMed">
                            Primeiro semestre
                        </button>
                    </h2>
                    <div id="collapseOneMed" aria-labelledby="headingOneMed" class="accordion-collapse collapse show" data-bs-parent="#accordionMedicina">
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
                    <h2 class="accordion-header" id="headingTwoMed">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwoMed" aria-expanded="false" aria-controls="collapseTwoMed">
                            Segundo semestre
                        </button>
                    </h2>
                    <div id="collapseTwoMed" aria-labelledby="headingTwoMed" class="accordion-collapse collapse" data-bs-parent="#accordionMedicina">
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
                    <h2 class="accordion-header" id="headingThreeMed">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThreeMed" aria-expanded="false" aria-controls="collapseThreeMed">
                            Terceiro semestre
                        </button>
                    </h2>
                    <div id="collapseThreeMed" aria-labelledby="headingThreeMed" class="accordion-collapse collapse" data-bs-parent="#accordionMedicina">
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
                    <h2 class="accordion-header" id="headingFourMed">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourMed" aria-expanded="false" aria-controls="collapseFourMed">
                            Quarto semestre
                        </button>
                    </h2>
                    <div id="collapseFourMed" aria-labelledby="headingFourMed" class="accordion-collapse collapse" data-bs-parent="#accordionMedicina">
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
                    <h2 class="accordion-header" id="headingFiveMed">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiveMed" aria-expanded="false" aria-controls="collapseFiveMed">
                            Quinto semestre
                        </button>
                    </h2>
                    <div id="collapseFiveMed" aria-labelledby="headingFiveMed" class="accordion-collapse collapse" data-bs-parent="#accordionMedicina">
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
                    <h2 class="accordion-header" id="headingSixMed">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSixMed" aria-expanded="false" aria-controls="collapseSixMed">
                            Sexto semestre
                        </button>
                    </h2>
                    <div id="collapseSixMed" aria-labelledby="headingSixMed" class="accordion-collapse collapse" data-bs-parent="#accordionMedicina">
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
                    <h2 class="accordion-header" id="headingSevenMed">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSevenMed" aria-expanded="false" aria-controls="collapseSevenMed">
                            Sétimo semestre
                        </button>
                    </h2>
                    <div id="collapseSevenMed" aria-labelledby="headingSevenMed" class="accordion-collapse collapse" data-bs-parent="#accordionMedicina">
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
                    <h2 class="accordion-header" id="headingEightMed">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEightMed" aria-expanded="false" aria-controls="collapseEightMed">
                            Oitavo semestre
                        </button>
                    </h2>
                    <div id="collapseEightMed" aria-labelledby="headingEightMed" class="accordion-collapse collapse" data-bs-parent="#accordionMedicina">
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

                {/* ITEM 9 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingNineMed">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNineMed" aria-expanded="false" aria-controls="collapseNineMed">
                            Nono semestre
                        </button>
                    </h2>
                    <div id="collapseNineMed" aria-labelledby="headingNineMed" class="accordion-collapse collapse" data-bs-parent="#accordionMedicina">
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

                {/* ITEM 10 */}
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTenMed">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTenMed" aria-expanded="false" aria-controls="collapseTenMed">
                            Décimo semestre
                        </button>
                    </h2>
                    <div id="collapseTenMed" aria-labelledby="headingTenMed" class="accordion-collapse collapse" data-bs-parent="#accordionMedicina">
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

                {/* FIM DO ACCORDEON */}
            </div>

        </div>
    )
}

export default Med;