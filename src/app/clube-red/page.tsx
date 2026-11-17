import type { Metadata } from "next";
import { Cabeca } from "@/components/Cabeca";
import { Faq } from "@/components/Faq";
import { Fecho } from "@/components/Fecho";
import { Ingressos } from "@/components/Ingressos";
import { Titulo } from "@/components/motion";
import { Btn, Rotulo } from "@/components/ui";
import { beneficios, comparativo, faqClube, mensagens, planos, regrasRanking } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Clube Red: planos mensais de tênis em São Bernardo do Campo",
  description:
    "Planos mensais da Red Tennis com aulas em grupo, ranking interno, torneio do mês e desconto em locação de quadra. Conheça o Clube Red, no Rudge Ramos.",
  alternates: { canonical: "/clube-red/" },
};

const INDICACAO = [
  { n: "1", t: "Você indica", d: "Chame um amigo para uma aula experimental na Red." },
  { n: "2", t: "Ele fecha o plano", d: "E informa o seu nome na recepção." },
  { n: "3", t: "Você ganha", d: "Uma aula particular no mês seguinte. Sem limite de indicações." },
];

export default function ClubeRed() {
  return (
    <>
      <Cabeca
        tom="bordo"
        rotulo="Clube Red"
        linhas={["O clube", "*de quem joga*", "*toda semana.*"]}
        intro="Uma mensalidade, horário garantido e vários motivos para voltar: ranking, torneio do mês e desconto para quem é da casa."
      >
        <Btn href={wa(mensagens.clube)}>Quero ser sócio</Btn>
      </Cabeca>

      <section className="secao sup-bordo" style={{ paddingTop: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="wrap">
          <Rotulo n="01">Planos</Rotulo>
          <h2 className="sr-only">Planos do Clube Red</h2>
          <div className="mt-8">
            <Ingressos />
          </div>
        </div>
      </section>

      <section className="secao sup-cal">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <div className="col-span-full lg:col-span-4">
            <Rotulo n="02">Comparativo</Rotulo>
            <Titulo className="display t-h2 mt-6" linhas={["Lado", "*a lado.*"]} />
          </div>
          <div className="col-span-full lg:col-span-8 rolagem" tabIndex={0} role="group" aria-label="Comparativo dos planos">
            <table className="tabela" style={{ minWidth: 560 }}>
              <caption className="sr-only">Comparativo dos planos do Clube Red</caption>
              <thead className="mono">
                <tr>
                  <th scope="col">O que inclui</th>
                  {planos.map((p) => (
                    <th key={p.id} scope="col">
                      {p.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativo.linhas.map((l) => (
                  <tr key={l.item}>
                    <th scope="row" style={{ fontWeight: 400 }}>
                      {l.item}
                    </th>
                    {l.valores.map((v, i) => (
                      <td key={i} className="mono">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="mono" style={{ fontWeight: 500 }}>
                    Mensalidade
                  </th>
                  {planos.map((p) => (
                    <td key={p.id} className="display t-h4">
                      {p.preco}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="secao sup-grafite">
        <div className="wrap">
          <Rotulo n="03">Indicação</Rotulo>
          <Titulo className="display t-h2 mt-6 mb-12" linhas={["Traga um amigo,", "*ganhe uma aula.*"]} />
          <ol className="grid lg:grid-cols-3 b-t">
            {INDICACAO.map((p, i) => (
              <li key={p.n} className={`py-8 lg:py-10 b-b lg:border-b-0 ${i ? "lg:pl-8 lg:b-l" : ""} lg:pr-8`}>
                <p className="display" style={{ fontSize: "clamp(5rem, 11vw, 10rem)", color: "var(--saibro)" }}>
                  {p.n}
                </p>
                <h3 className="display t-h4 mt-4">{p.t}</h3>
                <p className="sec mt-2">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao sup-cal">
        <div className="wrap g12" style={{ rowGap: "2.5rem" }}>
          <div className="col-span-full lg:col-span-5">
            <Rotulo n="04">Vantagens</Rotulo>
            <h2 className="display t-h3 mt-6">
              Ser sócio
              <br />
              <span className="serif">vale mais.</span>
            </h2>
            <ol className="lista-n mt-8" style={{ gridTemplateColumns: "none" }}>
              {beneficios.map((b) => (
                <li key={b.titulo} style={{ display: "block" }}>
                  <h3 className="display t-h4">{b.titulo}</h3>
                  <p className="sec mt-1">{b.texto}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <Rotulo n="05">Ranking interno</Rotulo>
            <h2 className="display t-h3 mt-6">
              Regras
              <br />
              <span className="serif">do jogo.</span>
            </h2>
            <ol className="lista-n mt-8">
              {regrasRanking.map((r) => (
                <li key={r} style={{ display: "grid", gridTemplateColumns: "3rem 1fr" }}>
                  <p style={{ gridColumn: 2 }}>{r}</p>
                </li>
              ))}
            </ol>
            <Btn href={wa(mensagens.ranking)} tom="grafite" className="mt-8">
              Entrar no ranking
            </Btn>
          </div>
        </div>
      </section>

      <section className="secao sup-bordo">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <div className="col-span-full lg:col-span-4">
            <Rotulo n="06">Perguntas frequentes</Rotulo>
            <h2 className="display t-h3 mt-6">
              Sem letra
              <br />
              <span className="serif">miúda.</span>
            </h2>
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <Faq itens={faqClube} />
          </div>
        </div>
      </section>

      <Fecho />
    </>
  );
}
