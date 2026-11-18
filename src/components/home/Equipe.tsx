import { professores } from "@/content/red";
import { Pictograma } from "../Pictograma";

/** Fichas da equipe, no formato de figurinha: pictograma, anos de quadra em placar e a ficha técnica. */
export function Equipe() {
  const fichas = professores.filter((p) => p.anos > 0);
  const apoio = professores.filter((p) => p.anos === 0);
  return (
    <>
      <ul className="fichas">
        {fichas.map((p) => (
          <li key={p.nome} className="ficha">
            <div className="ficha-arte">
              <Pictograma pose={p.pose} className="ficha-picto" />
              <p className="ficha-anos">
                <span className="placar">{p.anos}</span>
                <span className="ui">anos de quadra</span>
              </p>
            </div>
            <div className="ficha-corpo">
              <p className="ui sec">{p.papel}</p>
              <h3 className="sub ficha-nome">{p.nome}</h3>
              <dl className="ficha-dados ui">
                {p.dados
                  .filter((d) => d.rotulo !== "Anos de quadra")
                  .map((d) => (
                    <div key={d.rotulo}>
                      <dt>{d.rotulo}</dt>
                      <dd>{d.valor}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </li>
        ))}
      </ul>
      {apoio.map((p) => (
        <div key={p.nome} className="apoio">
          <Pictograma pose={p.pose} className="apoio-picto" />
          <div>
            <h3 className="sub ficha-nome">{p.nome}</h3>
            <p className="sec">Parceiro de treino para todas as categorias, do iniciante ao ranking A. Para treinar sem depender de parceiro.</p>
          </div>
          <dl className="ficha-dados ui">
            {p.dados.map((d) => (
              <div key={d.rotulo}>
                <dt>{d.rotulo}</dt>
                <dd>{d.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </>
  );
}
