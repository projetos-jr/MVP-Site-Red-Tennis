import type { Metadata } from "next";
import { pagina } from "@/lib/seo";
import { Cabeca, TituloSecao } from "@/components/Cabeca";
import { Faq } from "@/components/Faq";
import { Fecho } from "@/components/Fecho";
import { FotoImpressa } from "@/components/home/Prancha";
import { Corte } from "@/components/paredao/Corte";
import { Ritmo } from "@/components/paredao/Ritmo";
import { Reserva } from "@/components/Reserva";
import { Btn, BtnLinha } from "@/components/ui";
import { mensagens, paredao } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = pagina({
  titulo: "Paredão de tênis: aula e aluguel por hora no Rudge Ramos",
  descricao:
    "Paredão de tênis iluminado em São Bernardo do Campo: aula no paredão com professor e aluguel por hora, como uma quadra. Repita o golpe centenas de vezes e evolua mais rápido.",
  caminho: "/paredao/",
  compartilhar: { titulo: "O paredão da Red Tennis", descricao: "Aula com professor ou a hora inteira para você. O parceiro que devolve todas as bolas." },
});

const ACOES: Record<string, string> = {
  aula: wa(mensagens.paredaoAula),
  hora: "#reserva",
  clube: "/clube-red/",
};

export default function Paredao() {
  return (
    <>
      <Cabeca
        titulo="O paredão"
        tom="bordo"
        selo={{ anel: "PAREDÃO · NOVIDADE NA RED · AULA E ALUGUEL ·", rotulo: "NOVO EM", ano: 2026 }}
        intro={paredao.intro}
      >
        <Btn href="#reserva" tom="claro">
          Reservar o paredão
        </Btn>
        <BtnLinha href={wa(mensagens.paredaoAula)}>Agendar aula no paredão</BtnLinha>
      </Cabeca>

      <section className="secao sup-papel" aria-labelledby="como-titulo">
        <div className="wrap">
          <div className="g12 items-end mb-10" style={{ rowGap: "1.25rem" }}>
            <TituloSecao id="como-titulo" className="col-span-full lg:col-span-7">
              {paredao.chamada}
            </TituloSecao>
            <p className="col-span-full lg:col-span-5 lead sec">
              A bola bate acima da faixa pintada na altura da rede, quica e volta. Dois segundos depois, você bate de novo.
            </p>
          </div>
          <Corte />
        </div>
      </section>

      <section className="secao sup-bordo" aria-labelledby="porque-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-6">
            <TituloSecao lado id="porque-titulo" className="mb-8">
              Cinco vezes mais bola
            </TituloSecao>
            <Ritmo />
          </div>
          <ol className="motivos col-span-full lg:col-span-5 lg:col-start-8">
            {paredao.porque.map((m, i) => (
              <li key={m.titulo}>
                <span className="placar">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="sub">{m.titulo}</h3>
                  <p className="sec">{m.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao sup-papel" aria-labelledby="modos-titulo">
        <div className="wrap">
          <TituloSecao id="modos-titulo" className="mb-10">
            Três jeitos de usar
          </TituloSecao>
          <ul className="modos">
            {paredao.modos.map((m) => (
              <li key={m.id} className="modo" data-modo={m.id}>
                <h3 className="sub t-h3">{m.titulo}</h3>
                <p>{m.texto}</p>
                <p className="ui modo-detalhe">{m.detalhe}</p>
                {m.id === "aula" ? (
                  <Btn href={ACOES[m.id]} className="btn-largo">
                    {m.acao}
                  </Btn>
                ) : (
                  <BtnLinha href={ACOES[m.id]}>{m.acao}</BtnLinha>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao sup-po" aria-labelledby="hora-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-6">
            <FotoImpressa
              nome="paredao-foto"
              fig="Fig. 3"
              legenda="O paredão da Red, no fundo da quadra rápida. A faixa branca está na altura da rede."
              alt="O paredão da Red: uma parede bordô com uma faixa branca na altura da rede, no fundo da quadra rápida, impressa em duas tintas."
            />
          </div>
          <div className="col-span-full lg:col-span-5 lg:col-start-8">
            <TituloSecao lado id="hora-titulo" className="mb-8">
              Uma hora no paredão
            </TituloSecao>
            <ol className="sessao">
              {paredao.sessao.map((s) => (
                <li key={s.titulo}>
                  <span className="sessao-tempo">
                    <span className="placar">{s.tempo.replace(" min", "")}</span>
                    <span className="ui">min</span>
                  </span>
                  <div>
                    <h3 className="sub">{s.titulo}</h3>
                    <p className="sec">{s.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="reserva" className="secao sup-vinho" aria-labelledby="reserva-titulo">
        <div className="wrap">
          <div className="g12 items-end mb-10" style={{ rowGap: "1.25rem" }}>
            <TituloSecao id="reserva-titulo" className="col-span-full lg:col-span-7">
              Reserve a hora
            </TituloSecao>
            <p className="col-span-full lg:col-span-5 lead sec">
              Como numa quadra: escolha um horário livre e confirme pelo WhatsApp. O preço de lançamento vem na resposta.
            </p>
          </div>
          <Reserva inicial="paredao" />
          <BtnLinha href={wa(mensagens.paredaoHora)} className="mt-8">
            Quer um horário fixo toda semana? Chame no WhatsApp
          </BtnLinha>
        </div>
      </section>

      <section className="secao sup-saibro com-grao" aria-labelledby="recorde-titulo">
        <div className="wrap g12" style={{ rowGap: "2.5rem" }}>
          <div className="col-span-full lg:col-span-5">
            <TituloSecao lado id="recorde-titulo">
              {paredao.desafio.titulo}
            </TituloSecao>
            <p className="lead mt-6">{paredao.desafio.texto}</p>
            <Btn href={wa(mensagens.paredaoRecorde)} tom="claro" className="mt-8">
              Mandar meu recorde
            </Btn>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <table className="tabela recordes">
              <caption className="ui">Quadro de recordes · bolas seguidas acima da faixa</caption>
              <thead>
                <tr>
                  <th scope="col">Categoria</th>
                  <th scope="col" className="num">
                    Recorde
                  </th>
                </tr>
              </thead>
              <tbody>
                {paredao.desafio.categorias.map((c) => (
                  <tr key={c}>
                    <th scope="row" style={{ fontWeight: 400 }}>
                      {c}
                    </th>
                    <td className="num">
                      <span className="placar recorde-vazio" aria-label="Ainda sem recorde">
                        000
                      </span>
                      <span className="ui recorde-nota">seja o primeiro</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="secao sup-papel" aria-labelledby="faq-titulo">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <div className="col-span-full lg:col-span-4">
            <TituloSecao lado id="faq-titulo">
              Antes de bater
            </TituloSecao>
            <BtnLinha href={wa(mensagens.geral)} className="mt-6">
              Outra dúvida? Pergunte no WhatsApp
            </BtnLinha>
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <Faq itens={paredao.faq} />
          </div>
        </div>
      </section>

      <Fecho titulo="A parede te espera" acao={{ rotulo: "Agendar aula no paredão", href: wa(mensagens.paredaoAula) }} />
    </>
  );
}
