import type { Metadata } from "next";
import { Cabeca } from "@/components/Cabeca";
import { Faq } from "@/components/Faq";
import { Fecho } from "@/components/Fecho";
import { FormAula } from "@/components/Formularios";
import { Surge, Titulo } from "@/components/motion";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Btn, Rotulo } from "@/components/ui";
import { faqAulas, mensagens, metodologia, programas } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Aulas de tênis em São Bernardo do Campo",
  description:
    "Aulas de tênis para crianças a partir de 4 anos, adultos iniciantes, intermediários e competição. Quadras de saibro no Rudge Ramos. Agende sua aula experimental.",
  alternates: { canonical: "/aulas/" },
};

export default function Aulas() {
  return (
    <>
      <Cabeca
        rotulo="Aulas"
        linhas={["Aprenda", "no saibro.", "*Jogue em qualquer piso.*"]}
        intro="Aulas individuais, em dupla ou em grupos de até quatro alunos. Do Red Kids, aos quatro anos, ao treino de quem disputa ranking."
      >
        <Btn href="#experimental">Aula experimental</Btn>
      </Cabeca>

      <section className="secao sup-cal">
        <div className="wrap">
          <Rotulo n="01">Programas</Rotulo>
          <ul className="mt-8">
            {programas.map((p, i) => (
              <li key={p.id} id={p.id} className="g12 b-t py-10 lg:py-14" style={{ rowGap: "1.5rem" }}>
                <p className="mono sec col-span-full lg:col-span-1">0{i + 1}</p>
                <div className={`col-span-full lg:col-span-6 ${i % 2 ? "lg:order-3 lg:col-start-7" : ""}`}>
                  <h2 className="display" style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.25rem)" }}>{p.nome}</h2>
                  <p className="citacao mt-3" style={{ fontSize: "var(--t-h3)" }}>
                    {p.resumo}
                  </p>
                  <p className="mt-6">{p.detalhe}</p>
                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 mono sec">
                    {p.pontos.map((x) => (
                      <li key={x}>— {x}</li>
                    ))}
                  </ul>
                </div>
                <div className={`col-span-full lg:col-span-4 ${i % 2 ? "lg:order-2 lg:col-start-2" : "lg:col-start-9"}`}>
                  <PhotoSlot name={p.foto} alt={`Quadra da Red Tennis onde acontece o programa ${p.nome}`} sizes="(min-width: 64rem) 33vw, 100vw" className="aspect-[3/2]" prioridade={i === 0} />
                  <dl className="dados mono mt-4">
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
                    <div>
                      <dt>A partir de</dt>
                      <dd>{p.preco}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao sup-saibro relative overflow-hidden isolate">
        <span className="grao grao-saibro" />
        <span className="luz" />
        <div className="wrap relative">
          <div className="inline-block px-3 py-1" style={{ background: "var(--saibro-escuro)" }}>
            <Rotulo n="02">Metodologia</Rotulo>
          </div>
          <Titulo className="display t-h2 mt-6 mb-10 lg:mb-14" linhas={["Quatro etapas,", "*uma quadra.*"]} />
          <ol className="metodo" style={{ background: "var(--saibro-escuro)" }}>
            {metodologia.map((m, i) => (
              <li key={m.titulo}>
                <p className="mono">Etapa 0{i + 1}</p>
                <div>
                  <h3 className="display mt-6">{m.titulo}</h3>
                  <p className="mt-3">{m.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mono mt-3 inline-block px-3 py-1" style={{ background: "var(--saibro-escuro)" }}>
            A linha dupla é a rede: depois dela, você já está jogando.
          </p>
        </div>
      </section>

      <section id="experimental" className="secao sup-grafite">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-5">
            <Rotulo n="03">Aula experimental</Rotulo>
            <Titulo className="display t-h2 mt-6" linhas={["Venha", "*bater bola.*"]} />
            <p className="sec mt-6">
              Preencha e a mensagem já sai pronta no WhatsApp da Red. A gente responde com os horários disponíveis.
            </p>
          </div>
          <Surge className="col-span-full lg:col-span-6 lg:col-start-7">
            <FormAula />
          </Surge>
        </div>
      </section>

      <section className="secao sup-cal">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <div className="col-span-full lg:col-span-4">
            <Rotulo n="04">Perguntas frequentes</Rotulo>
            <h2 className="display t-h3 mt-6">
              Antes de
              <br />
              <span className="serif">entrar em quadra.</span>
            </h2>
            <Btn href={wa(mensagens.geral)} tom="linha" className="mt-8">
              Outra dúvida? Chame
            </Btn>
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
