import type { Metadata } from "next";
import { Cabeca } from "@/components/Cabeca";
import { Fecho } from "@/components/Fecho";
import { Titulo } from "@/components/motion";
import { Agenda, Poster } from "@/components/Poster";
import { Btn, Rotulo } from "@/components/ui";
import { mensagens, ranking, resultados } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Torneios de tênis e ranking interno no ABC",
  description:
    "Circuito Red Tennis, clínicas e ranking interno em quatro categorias. Veja a agenda de torneios de tênis em São Bernardo do Campo e inscreva-se.",
  alternates: { canonical: "/torneios/" },
};

function Movimento({ mov }: { mov: number }) {
  if (mov === 0) return <span className="sec">=</span>;
  const sobe = mov > 0;
  return (
    <span style={{ color: sobe ? "var(--bola)" : "var(--areia)" }}>
      <span aria-hidden="true">{sobe ? "▲" : "▼"}</span> {Math.abs(mov)}
      <span className="sr-only">{sobe ? " posições acima" : " posições abaixo"}</span>
    </span>
  );
}

export default function Torneios() {
  return (
    <>
      <Cabeca
        tom="grafite"
        rotulo="Torneios e ranking"
        linhas={["Circuito", "Red Tennis.", "*Jogo valendo.*"]}
        intro="Etapas ao longo do ano, com chaves por categoria e portas abertas a tenistas de fora. Entre uma etapa e outra, o ranking não para."
      >
        <Btn href={wa(mensagens.torneio)}>Quero me inscrever</Btn>
      </Cabeca>

      <section className="secao sup-grafite" style={{ paddingTop: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-6">
            <Poster />
          </div>
          <div className="col-span-full lg:col-span-5 lg:col-start-8">
            <Rotulo n="01">Agenda</Rotulo>
            <h2 className="display t-h3 mt-6 mb-8">
              Próximos
              <br />
              <span className="serif">eventos.</span>
            </h2>
            <Agenda quantos={4} pular={0} />
          </div>
        </div>
      </section>

      <section className="secao sup-cal">
        <div className="wrap g12" style={{ rowGap: "2.5rem" }}>
          <div className="col-span-full lg:col-span-4">
            <Rotulo n="02">Resultados</Rotulo>
            <Titulo className="display t-h2 mt-6" linhas={["Quem", "*levantou a taça.*"]} />
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            {resultados.map((r) => (
              <div key={r.evento}>
                <p className="mono sec flex justify-between gap-4 pb-3">
                  <span>{r.evento}</span>
                  <span>{r.data}</span>
                </p>
                <table className="tabela">
                  <caption className="sr-only">Campeões por categoria, {r.evento}</caption>
                  <thead className="mono">
                    <tr>
                      <th scope="col">Cat.</th>
                      <th scope="col">Campeão</th>
                      <th scope="col" className="num">
                        Final
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.campeoes.map((c) => (
                      <tr key={c.categoria}>
                        <td className="display t-h3" style={{ color: "var(--saibro)", width: "5rem" }}>
                          {c.categoria}
                        </td>
                        <td className="display t-h4">{c.nome}</td>
                        <td className="num mono">{c.placar}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secao sup-grafite">
        <div className="wrap g12" style={{ rowGap: "2.5rem" }}>
          <div className="col-span-full lg:col-span-4">
            <Rotulo n="03">Ranking interno</Rotulo>
            <Titulo className="display t-h2 mt-6" linhas={["Top 10", "*do mês.*"]} />
            <p className="sec mt-6">
              Quatro categorias, de A a D. Uma nova classificação sai todo fim de mês, somando os jogos do mês à classificação anterior.
            </p>
            <Btn href={wa(mensagens.ranking)} tom="cal" className="mt-8">
              Entrar no ranking
            </Btn>
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <table className="tabela">
              <caption className="sr-only">Ranking interno, dez primeiros colocados</caption>
              <thead className="mono">
                <tr>
                  <th scope="col">Pos.</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Cat.</th>
                  <th scope="col" className="num">
                    Pontos
                  </th>
                  <th scope="col" className="num">
                    Mês
                  </th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((j) => (
                  <tr key={j.pos}>
                    <td className="mono sec" style={{ width: "4rem" }}>
                      {String(j.pos).padStart(2, "0")}
                    </td>
                    <td className={j.pos <= 3 ? "display t-h4" : ""}>{j.nome}</td>
                    <td className="mono">{j.categoria}</td>
                    <td className="num mono">{j.pontos.toLocaleString("pt-BR")}</td>
                    <td className="num mono">
                      <Movimento mov={j.mov} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Fecho linhas={["Seu nome", "na", "*chave.*"]} />
    </>
  );
}
