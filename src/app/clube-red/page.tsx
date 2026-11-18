import type { Metadata } from "next";
import { pagina } from "@/lib/seo";
import { Cabeca, TituloSecao } from "@/components/Cabeca";
import { Faq } from "@/components/Faq";
import { Fecho } from "@/components/Fecho";
import { Convite } from "@/components/Convite";
import { Carteirinhas } from "@/components/home/Carteirinhas";
import { Btn } from "@/components/ui";
import { beneficios, comparativo, faqClube, indicacao, mensagens, planos, regrasRanking } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = pagina({
  titulo: "Clube Red: planos mensais de tênis no ABC",
  descricao: "Planos mensais com aula em grupo, ranking interno, torneio do mês e desconto na quadra. O clube de tênis de saibro do Rudge Ramos, em São Bernardo.",
  caminho: "/clube-red/",
  compartilhar: { titulo: "Clube Red · O clube de quem joga toda semana", descricao: "Aula em grupo, ranking, torneio do mês e desconto na quadra. Planos mensais da Red Tennis, no Rudge Ramos." },
});


export default function ClubeRed() {
  return (
    <>
      <Cabeca
        titulo="O clube de quem joga toda semana"
        tom="vinho"
        selo
        intro="Aluno de turma já é sócio. Uma mensalidade, horário garantido e motivo para voltar: ranking, torneio do mês e desconto na quadra."
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
          <TituloSecao lado id="comp-titulo" className="col-span-full lg:col-span-4">
            Lado a lado
          </TituloSecao>
          <div className="col-span-full lg:col-span-8">
            <table className="tabela comparativo">
              <caption className="sr-only">Comparativo dos planos do Clube Red</caption>
              <thead>
                <tr>
                  <th scope="col" className="item-largo">
                    O que inclui
                  </th>
                  {planos.map((p) => (
                    <th key={p.id} scope="col">
                      {p.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativo.linhas.flatMap((l) => [
                  <tr key={l.item + "-c"} className="so-celular" aria-hidden="true">
                    <th colSpan={4}>{l.item}</th>
                  </tr>,
                  <tr key={l.item}>
                    <th scope="row" className="item-largo" style={{ fontWeight: 400 }}>
                      {l.item}
                    </th>
                    {l.valores.map((v, i) => (
                      <td key={i} className="ui">
                        <span className="sr-only">{l.item}: </span>
                        {v}
                      </td>
                    ))}
                  </tr>,
                ])}
                <tr className="so-celular" aria-hidden="true">
                  <th colSpan={4}>Mensalidade</th>
                </tr>
                <tr>
                  <th scope="row" className="ui item-largo">
                    Mensalidade
                  </th>
                  {planos.map((p) => (
                    <td key={p.id} className="placar" style={{ fontSize: "2.2rem", color: "var(--saibro)" }}>
                      <span className="sr-only">Mensalidade: </span>
                      {p.preco.replace("R$ ", "R$")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="secao sup-vinho" aria-labelledby="ind-titulo" id="indicacao">
        <div className="wrap">
          <TituloSecao id="ind-titulo" className="mb-6">
            {indicacao.titulo}
          </TituloSecao>
          <p className="lead sec mb-12">{indicacao.intro}</p>
          <Convite />
        </div>
      </section>

      <section className="secao sup-papel" aria-labelledby="vant-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-5">
            <TituloSecao lado id="vant-titulo">O que o sócio tem a mais</TituloSecao>
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
            <TituloSecao lado id="regras">Regras do ranking</TituloSecao>
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
          <TituloSecao lado id="faq-titulo" className="col-span-full lg:col-span-4">
            Sem letra miúda
          </TituloSecao>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <Faq itens={faqClube} />
          </div>
        </div>
      </section>

      <Fecho titulo="Temporada 2027 aberta" acao={{ rotulo: "Quero ser sócio", href: wa(mensagens.clube) }} />
    </>
  );
}
