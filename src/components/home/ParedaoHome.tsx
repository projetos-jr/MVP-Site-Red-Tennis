import { mensagens, paredao } from "@/content/red";
import { wa } from "@/lib/wa";
import { Corte } from "../paredao/Corte";
import { Btn, BtnLinha } from "../ui";

const LINKS: Record<string, string> = { aula: wa(mensagens.paredaoAula), hora: "/paredao/#reserva", clube: "/clube-red/" };

/** O paredão na home: a novidade da Red, com o corte animado e os três jeitos de usar. */
export function ParedaoHome() {
  return (
    <section className="secao sup-papel paredao-sec" aria-labelledby="paredao-titulo">
      <div className="wrap">
        <div className="g12 items-end mb-10" style={{ rowGap: "1.25rem" }}>
          <div className="col-span-full lg:col-span-7">
            <p className="ui novo-marca">Novo na Red</p>
            <h2 id="paredao-titulo" className="titulo">
              O paredão devolve todas
            </h2>
          </div>
          <div className="col-span-full lg:col-span-5">
            <p className="lead">{paredao.intro}</p>
          </div>
        </div>
        <Corte />
        <ul className="modos modos-home mt-12">
          {paredao.modos.map((m) => (
            <li key={m.id} className="modo" data-modo={m.id}>
              <h3 className="sub">{m.titulo}</h3>
              <p className="sec">{m.texto}</p>
              <BtnLinha href={LINKS[m.id]}>{m.acao}</BtnLinha>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Btn href="/paredao/">Tudo sobre o paredão</Btn>
        </div>
      </div>
    </section>
  );
}
