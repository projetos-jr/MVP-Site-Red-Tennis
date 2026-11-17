import type { Metadata } from "next";
import { Cabeca } from "@/components/Cabeca";
import { Fecho } from "@/components/Fecho";
import { Surge, Titulo } from "@/components/motion";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Reserva } from "@/components/Reserva";
import { Btn, Rotulo } from "@/components/ui";
import { estrutura, locacao, mensagens, quadras } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Aluguel de quadra de tênis de saibro no Rudge Ramos, ABC",
  description:
    "Locação de quadras de tênis em São Bernardo do Campo: três quadras de saibro e uma quadra rápida, todas iluminadas. Avulso ou plano mensal com horário fixo.",
  alternates: { canonical: "/quadras/" },
};

export default function Quadras() {
  return (
    <>
      <Cabeca
        tom="grafite"
        rotulo="Quadras e locação"
        linhas={["Três de saibro.", "Uma rápida.", "*Todas iluminadas.*"]}
        intro="Quadras isoladas por alambrados altos, cada uma com entrada própria, iluminadas por 18 refletores em seis postes."
      >
        <Btn href="#reserva">Reservar quadra</Btn>
      </Cabeca>

      <section className="secao sup-cal">
        <div className="wrap grid gap-16 lg:gap-28">
          {quadras.map((q, i) => (
            <article key={q.id} className="g12 items-end" style={{ rowGap: "1.5rem" }}>
              <Surge className={`col-span-full lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <PhotoSlot name={q.foto} alt={q.alt} sizes="(min-width: 64rem) 58vw, 100vw" className="aspect-[16/10]" prioridade={i === 0} />
              </Surge>
              <div className={`col-span-full lg:col-span-4 ${i % 2 ? "lg:order-1" : "lg:col-start-9"}`}>
                <p className="mono sec">
                  0{i + 1} · {q.piso}
                </p>
                <h2 className="display mt-3" style={{ fontSize: "clamp(2.5rem, 5vw, 4.75rem)" }}>{q.nome}</h2>
                <p className="mt-5">{q.texto}</p>
                <dl className="dados mono mt-6">
                  {q.dados.map((d) => (
                    <div key={d.rotulo}>
                      <dt>{d.rotulo}</dt>
                      <dd>{d.valor}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="secao sup-bordo">
        <div className="wrap g12" style={{ rowGap: "2.5rem" }}>
          <div className="col-span-full lg:col-span-4">
            <Rotulo n="02">Estrutura</Rotulo>
            <Titulo className="display t-h2 mt-6" linhas={["Além", "*da quadra.*"]} />
            <PhotoSlot
              name="estrutura-anoitecer"
              alt="Estrutura da Red Tennis ao anoitecer, com os refletores acesos"
              briefing="A estrutura ao anoitecer, refletores acesos"
              className="aspect-[4/3] mt-10 hidden lg:flex"
            />
          </div>
          <ol className="lista-n col-span-full lg:col-span-7 lg:col-start-6 self-start">
            {estrutura.map((e) => (
              <li key={e.nome}>
                <h3 className="display t-h4">{e.nome}</h3>
                <p className="sec">{e.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao sup-cal">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <div className="col-span-full lg:col-span-4">
            <Rotulo n="03">Locação</Rotulo>
            <Titulo className="display t-h2 mt-6" linhas={["Preço", "*por hora.*"]} />
            <p className="sec mt-6">{locacao.nota}</p>
            <p className="sec mt-3">Sócios do Clube Red têm de 10% a 20% de desconto.</p>
          </div>
          <div className="col-span-full lg:col-span-8 rolagem" tabIndex={0} role="group" aria-label="Tabela de preços de locação">
            <table className="tabela" style={{ minWidth: 560 }}>
              <caption className="sr-only">Preços de locação por faixa de horário, piso e modalidade</caption>
              <thead className="mono">
                <tr>
                  <th scope="col">Faixa</th>
                  <th scope="col">Piso</th>
                  {locacao.colunas.map((c) => (
                    <th key={c} scope="col" className="num">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {locacao.linhas.flatMap((l) => [
                  <tr key={l.faixa + "s"}>
                    <th scope="rowgroup" rowSpan={2} className="mono" style={{ fontWeight: 500 }}>
                      {l.faixa}
                    </th>
                    <td>Saibro</td>
                    {l.saibro.map((v, k) => (
                      <td key={k} className="num display t-h4">
                        {v}
                      </td>
                    ))}
                  </tr>,
                  <tr key={l.faixa + "r"}>
                    <td>Rápida</td>
                    {l.rapida.map((v, k) => (
                      <td key={k} className="num display t-h4">
                        {v}
                      </td>
                    ))}
                  </tr>,
                ])}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="reserva" className="secao sup-grafite">
        <div className="wrap">
          <div className="g12 items-end mb-10" style={{ rowGap: "1.5rem" }}>
            <div className="col-span-full lg:col-span-8">
              <Rotulo n="04">Reserva</Rotulo>
              <Titulo className="display t-h2 mt-6" linhas={["Escolha", "*dia e hora.*"]} />
            </div>
            <p className="col-span-full lg:col-span-4 sec">
              Toque num horário livre e confirme pelo WhatsApp. Planos mensais têm horário fixo e reposição em caso de chuva.
            </p>
          </div>
          <Reserva />
          <Btn href={wa(mensagens.quadra)} tom="linha" className="mt-10">
            Prefere combinar direto? Chame
          </Btn>
        </div>
      </section>

      <Fecho linhas={["O saibro", "está", "*regado.*"]} />
    </>
  );
}
