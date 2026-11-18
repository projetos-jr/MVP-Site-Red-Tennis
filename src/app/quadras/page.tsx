import type { Metadata } from "next";
import { Cabeca, TituloSecao } from "@/components/Cabeca";
import { Comparador } from "@/components/Comparador";
import { Fecho } from "@/components/Fecho";
import { Planta } from "@/components/home/Planta";
import { Reserva } from "@/components/Reserva";
import { Btn, BtnLinha } from "@/components/ui";
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
        titulo="Três de saibro, uma rápida"
        foto="rede-manha"
        intro="Quadras isoladas por alambrados altos, cada uma com entrada própria, iluminadas por 18 refletores em seis postes."
      >
        <Btn href="#reserva" tom="claro">
          Reservar quadra
        </Btn>
      </Cabeca>

      <section className="secao sup-papel" aria-labelledby="pisos-titulo">
        <div className="wrap">
          <div className="g12 items-end mb-10" style={{ rowGap: "1.25rem" }}>
            <TituloSecao id="pisos-titulo" className="col-span-full lg:col-span-7">
              Dois pisos, dois jogos
            </TituloSecao>
            <p className="col-span-full lg:col-span-5 sec">Arraste a linha e compare. No saibro o ponto se constrói; na rápida, se decide.</p>
          </div>
          <Comparador />
          <div className="g12 mt-10" style={{ rowGap: "2.5rem" }}>
            {quadras.map((q) => (
              <div key={q.id} className="col-span-full md:col-span-6">
                <h3 className="sub t-h3">{q.nome === "Rápida" ? "Quadra rápida" : "Saibro"}</h3>
                <p className="sec mt-1 ui">{q.piso}</p>
                <p className="mt-4">{q.texto}</p>
                <dl className="ficha-dados ui mt-5">
                  {q.dados.map((d) => (
                    <div key={d.rotulo}>
                      <dt>{d.rotulo}</dt>
                      <dd>{d.valor}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secao sup-saibro com-grao" aria-labelledby="planta-titulo">
        <div className="wrap relative">
          <TituloSecao id="planta-titulo" className="mb-10">
            Escolha a quadra
          </TituloSecao>
          <Planta />
        </div>
      </section>

      <section className="secao sup-papel" aria-labelledby="preco-titulo">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <div className="col-span-full lg:col-span-4">
            <TituloSecao id="preco-titulo">Preço por hora</TituloSecao>
            <p className="sec mt-6">{locacao.nota}</p>
            <p className="sec mt-3">Sócios do Clube Red têm de 10% a 20% de desconto.</p>
          </div>
          <div className="col-span-full lg:col-span-8 rolagem" tabIndex={0} role="group" aria-label="Tabela de preços de locação">
            <table className="tabela" style={{ minWidth: 560 }}>
              <caption className="sr-only">Preços de locação por faixa de horário, piso e modalidade</caption>
              <thead>
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
                    <th scope="rowgroup" rowSpan={2} className="ui">
                      {l.faixa}
                    </th>
                    <td>Saibro</td>
                    {l.saibro.map((v, k) => (
                      <td key={k} className="num placar" style={{ fontSize: "2rem" }}>
                        {v.replace("R$ ", "R$")}
                      </td>
                    ))}
                  </tr>,
                  <tr key={l.faixa + "r"}>
                    <td>Rápida</td>
                    {l.rapida.map((v, k) => (
                      <td key={k} className="num placar" style={{ fontSize: "2rem" }}>
                        {v.replace("R$ ", "R$")}
                      </td>
                    ))}
                  </tr>,
                ])}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="reserva" className="secao sup-vinho" aria-labelledby="reserva-titulo">
        <div className="wrap">
          <div className="g12 items-end mb-10" style={{ rowGap: "1.25rem" }}>
            <TituloSecao id="reserva-titulo" className="col-span-full lg:col-span-7">
              Escolha dia e hora
            </TituloSecao>
            <p className="col-span-full lg:col-span-5 sec">Toque num horário livre e confirme pelo WhatsApp. Planos mensais têm horário fixo e reposição em caso de chuva.</p>
          </div>
          <Reserva />
          <BtnLinha href={wa(mensagens.quadra)} className="mt-8">
            Prefere combinar direto? Chame no WhatsApp
          </BtnLinha>
        </div>
      </section>

      <section className="secao sup-bordo" aria-labelledby="estrutura-titulo">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <TituloSecao id="estrutura-titulo" className="col-span-full lg:col-span-4">
            Além da quadra
          </TituloSecao>
          <ul className="lista-fio col-span-full lg:col-span-8">
            {estrutura.map((e) => (
              <li key={e.nome}>
                <h3 className="sub">{e.nome}</h3>
                <p className="sec">{e.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Fecho titulo="O saibro está regado" />
    </>
  );
}
