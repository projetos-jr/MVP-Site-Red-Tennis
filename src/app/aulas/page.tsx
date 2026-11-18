import type { Metadata } from "next";
import { pagina } from "@/lib/seo";
import { Cabeca, TituloSecao } from "@/components/Cabeca";
import { Faq } from "@/components/Faq";
import { Fecho } from "@/components/Fecho";
import { FormAula } from "@/components/Formularios";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Btn, BtnLinha } from "@/components/ui";
import { faqAulas, mensagens, metodologia, programas } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = pagina({
  titulo: "Aulas de tênis em São Bernardo: adultos e Red Kids",
  descricao: "Aula de tênis no saibro em São Bernardo do Campo: Red Kids a partir de 4 anos, adulto iniciante, intermediário e competição. Agende a experimental.",
  caminho: "/aulas/",
  compartilhar: { titulo: "Aulas de tênis no saibro · Red Tennis", descricao: "Do Red Kids, aos 4 anos, ao treino de quem joga torneio. Turmas de até quatro no Rudge Ramos." },
});

export default function Aulas() {
  return (
    <>
      <Cabeca
        titulo="Aprenda no saibro"
        foto="bola-na-linha"
        intro="Aulas individuais, em dupla ou em grupos de até quatro. Do Red Kids, aos quatro anos, ao treino de quem disputa ranking."
      >
        <Btn href="#experimental" tom="claro">
          Agendar aula experimental
        </Btn>
      </Cabeca>

      <section className="secao sup-papel" aria-label="Programas">
        <div className="wrap">
          {programas.map((p, i) => {
            const [preco, periodo] = p.preco.split("/");
            return (
              <article key={p.id} id={p.id} className="programa g12" style={{ rowGap: "1.75rem" }}>
                <div className={`col-span-full lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <h2 className="display programa-nome">{p.nome}</h2>
                  <p className="programa-resumo">{p.resumo}</p>
                  <p className="mt-5">{p.detalhe}</p>
                  <ul className="pontos mt-6">
                    {p.pontos.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className={`col-span-full lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                  <PhotoSlot name={p.foto} alt={`Quadra da Red Tennis onde acontece o programa ${p.nome}`} sizes="(min-width: 64rem) 40vw, 100vw" className="aspect-[3/2]" ret prioridade={i === 0} />
                  <dl className="ficha-dados ui mt-4">
                    <div>
                      <dt>Para quem</dt>
                      <dd>{p.paraQuem}</dd>
                    </div>
                    <div>
                      <dt>Frequência</dt>
                      <dd>{p.frequencia}</dd>
                    </div>
                    <div>
                      <dt>Duração</dt>
                      <dd>{p.duracao}</dd>
                    </div>
                  </dl>
                  <p className="programa-preco mt-4">
                    <span className="ui sec">A partir de </span>
                    <span className="placar">{preco.replace("R$ ", "R$")}</span>
                    <span className="ui sec">/{periodo}</span>
                  </p>
                  {["iniciante", "intermediario", "competicao"].includes(p.id) && (
                    <p className="ui sec mt-2">Já é Clube Red: ranking, paredão livre e 10% na quadra.</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="secao sup-saibro" aria-labelledby="metodo-titulo">
        <div className="wrap">
          <TituloSecao id="metodo-titulo" className="mb-10">
            Quatro etapas, uma quadra
          </TituloSecao>
          <ol className="metodo">
            {metodologia.map((m, i) => (
              <li key={m.titulo}>
                <span className="placar">{i + 1}</span>
                <h3 className="sub">{m.titulo}</h3>
                <p>{m.texto}</p>
              </li>
            ))}
          </ol>
          <p className="ui mt-4">A linha dupla é a rede: passou dela, você já está jogando.</p>
        </div>
      </section>

      <section id="experimental" className="secao sup-vinho" aria-labelledby="exp-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-5">
            <TituloSecao lado id="exp-titulo">Venha bater bola</TituloSecao>
            <p className="sec mt-6">Preencha e a mensagem sai pronta no WhatsApp da Red. A gente responde com os horários da sua turma.</p>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <FormAula />
          </div>
        </div>
      </section>

      <section className="secao sup-papel" aria-labelledby="faq-titulo">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <div className="col-span-full lg:col-span-4">
            <TituloSecao lado id="faq-titulo">Antes de entrar em quadra</TituloSecao>
            <BtnLinha href={wa(mensagens.geral)} className="mt-6">
              Outra dúvida? Pergunte no WhatsApp
            </BtnLinha>
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <Faq itens={faqAulas} />
          </div>
        </div>
      </section>

      <Fecho />
    </>
  );
}
