import AcordeaoCelula from './AcordeaoCelula';

function Acordeao(prop) {
    return (
        <div>
            {prop.listaHorarios.map((horario, index) => (
                <AcordeaoCelula horarios={horario} num={index + 1} key={index} />
            ))}
        </div>
    );
}
export default Acordeao;