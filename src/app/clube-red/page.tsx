import type { Metadata } from "next";
import { Cabeca, TituloSecao } from "@/components/Cabeca";
import { Faq } from "@/components/Faq";
import { Fecho } from "@/components/Fecho";
import { Carteirinhas } from "@/components/home/Carteirinhas";
import { Btn } from "@/components/ui";
import { beneficios, comparativo, faqClube, mensagens, planos, regrasRanking } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Clube Red: planos mensais de tênis em São Bernardo do Campo",
  description:
    "Planos mensais da Red Tennis com aulas em grupo, ranking interno, torneio do mês e desconto em locação de quadra. Conheça o Clube Red, no Rudge Ramos.",
  alternates: { canonical: "/clube-red/" },
};

const INDICACAO = [
  { t: "Você indica", d: "Chame um amigo para uma aula experimental na Red." },
  { t: "Ele fecha o plano", d: "E informa o seu nome na recepção." },
  { t: "Você ganha", d: "Uma aula particular no mês seguinte. Sem limite de indicações." },
];

export default function ClubeRed() {
  return (
    <>
      <Cabeca
        titulo="O clube de quem joga toda semana"
        tom="bordo"
        intro="Uma mensalidade, horário garantido e motivo para voltar: ranking, torneio do mês e desconto para quem é da casa."
      >
        <Btn href={wa(mensagens.clube)} tom="claro">
          Quero ser sócio
        </Btn>
      </Cabeca>

      <section className="secao sup-bordo" style={{ paddingTop: "clamp(1rem, 3vw, 2rem)" }} aria-label="Planos">
        <div className="wrap">
          <Carteirinhas />
        </div>
      </section>

      <section className="secao sup-papel" aria-labelledby="comp-titulo">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <TituloSecao id="comp-titulo" className="col-span-full lg:col-span-4">
            Lado a lado
          </TituloSecao>
          <div className="col-span-full lg:col-span-8 rolagem" tabIndex={0} role="group" aria-label="Comparativo dos planos">
            <table className="tabela" style={{ minWidth: 560 }}>
              <caption className="sr-only">Comparativo dos planos do Clube Red</caption>
              <thead>
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
                      <td key={i} className="ui">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="ui">
                    Mensalidade
                  </th>
                  {planos.map((p) => (
                    <td key={p.id} className="placar" style={{ fontSize: "2.2rem", color: "var(--saibro)" }}>
                      {p.preco.replace("R$ ", "R$")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="secao sup-vinho" aria-labelledby="ind-titulo">
        <div className="wrap">
          <TituloSecao id="ind-titulo" className="mb-12">
            Traga um amigo, ganhe uma aula
          </TituloSecao>
          <ol className="passos">
            {INDICACAO.map((p, i) => (
              <li key={p.t}>
                <span className="placar">{i + 1}</span>
                <h3 className="sub">{p.t}</h3>
                <p className="sec">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao sup-papel" aria-labelledby="vant-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-5">
            <TituloSecao id="vant-titulo">O que o sócio tem a mais</TituloSecao>
            <ul className="lista-fio mt-8" style={{ ["--risco" as string]: "var(--saibro)" }}>
              {beneficios.map((b) => (
                <li key={b.titulo} style={{ gridTemplateColumns: "none" }}>
                  <h3 className="sub">{b.titulo}</h3>
                  <p className="sec">{b.texto}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <TituloSecao>Regras do ranking</TituloSecao>
            <ol className="lista-fio mt-8">
              {regrasRanking.map((r, i) => (
                <li key={r} style={{ gridTemplateColumns: "3rem 1fr", gap: "0.75rem" }}>
                  <span className="placar" style={{ fontSize: "1.9rem", color: "var(--saibro)" }}>
                    {i + 1}
                  </span>
                  <p>{r}</p>
                </li>
              ))}
            </ol>
            <Btn href={wa(mensagens.ranking)} className="mt-8">
              Entrar no ranking
            </Btn>
          </div>
        </div>
      </section>

      <section className="secao sup-bordo" aria-labelledby="faq-titulo">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <TituloSecao id="faq-titulo" className="col-span-full lg:col-span-4">
            Sem letra miúda
          </TituloSecao>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <Faq itens={faqClube} />
          </div>
        </div>
      </section>

      <Fecho />
    </>
  );
}
