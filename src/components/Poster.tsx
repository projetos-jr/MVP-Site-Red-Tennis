import { eventos } from "@/content/red";
import { SombraRede } from "./Texturas";
import { Bola } from "./ui";

/** Pôster do próximo torneio (ref. 05): tipografia larga, linhas de quadra como grid, data gigante. */
export function Poster() {
  const e = eventos[0];
  const [dias, mes] = e.dataCurta.split(" ");
  return (
    <article className="poster sup-saibro" aria-label={`${e.nome}, ${e.tipo}, ${e.dataCurta}`}>
      <span className="grao grao-saibro" />
      <SombraRede angulo={-20} fita={58} opacidade={0.42} />
      <div className="p flex justify-between gap-4 mono" style={{ background: "var(--grafite)" }}>
        <span>Próximo torneio</span>
        <span>Red Tennis · 2026</span>
      </div>
      <div className="p flex flex-col justify-center">
        <p className="display poster-data">
          {dias}
          <br />
          <span className="serif" style={{ fontSize: "0.9em" }}>
            {mes.toLowerCase()}.
          </span>
        </p>
      </div>
      <div className="poster-grade" style={{ borderTop: "2px solid var(--cal)" }}>
        <div className="p" style={{ borderRight: "2px solid var(--cal)" }}>
          <p className="display poster-nome">
            Circuito
            <br />
            Red Tennis
          </p>
        </div>
        <div className="p flex flex-col justify-between gap-6" style={{ background: "var(--saibro-escuro)" }}>
          <Bola className="w-10 h-10 self-end" />
          <p className="mono">
            {e.tipo}
            <br />
            Categorias A · B · C · D
          </p>
        </div>
      </div>
    </article>
  );
}

export function Agenda({ quantos = 3, pular = 1 }: { quantos?: number; pular?: number }) {
  return (
    <ul className="agenda">
      {eventos.slice(pular, pular + quantos).map((e) => (
        <li key={e.id}>
          <time dateTime={e.inicio} className="mono" style={{ paddingTop: "0.3em" }}>
            {e.dataCurta}
          </time>
          <div>
            <p className="mono sec">{e.tipo}</p>
            <h3 className="display t-h4 mt-1">{e.nome}</h3>
            <p className="sec mt-2">{e.detalhe}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
