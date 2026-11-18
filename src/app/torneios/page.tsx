import type { Metadata } from "next";
import { pagina } from "@/lib/seo";
import { Cabeca, TituloSecao } from "@/components/Cabeca";
import { Fecho } from "@/components/Fecho";
import { Cartaz, Contagem } from "@/components/home/Torneio";
import { Btn, BtnLinha } from "@/components/ui";
import { agenda, eventos, mensagens, ranking, resultados } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = pagina({
  titulo: "Torneios e ranking de tênis em São Bernardo",
  descricao: "Circuito Red Tennis, torneio do mês e ranking interno em quatro categorias. Agenda de torneios de tênis em São Bernardo do Campo e inscrição.",
  caminho: "/torneios/",
  compartilhar: { titulo: "Torneios e ranking · Red Tennis", descricao: "Circuito Red Tennis, torneio do mês e ranking interno de A a D. Veja a agenda e inscreva-se." },
});

function Movimento({ mov }: { mov: number }) {
  if (mov === 0) return <span className="sec">=</span>;
  const sobe = mov > 0;
  return (
    <span className="sobe-desce" data-dir={sobe ? "sobe" : "desce"}>
      <span aria-hidden="true">{sobe ? "▲" : "▼"}</span> {Math.abs(mov)}
      <span className="sr-only">{`${sobe ? " subiu" : " caiu"} ${Math.abs(mov) === 1 ? "posição" : "posições"}`}</span>
    </span>
  );
}

export default function Torneios() {
  return (
    <>
      <Cabeca
        titulo="Jogo valendo"
        foto="quadra-noite"
        tom="vinho"
        intro="Etapas ao longo do ano, com chaves por categoria e portas abertas a tenistas de fora. Entre uma etapa e outra, o ranking não para."
      >
        <Btn href={wa(mensagens.torneio(eventos[0]))} tom="claro">
          Inscrever-se no torneio
        </Btn>
      </Cabeca>

      <section className="secao sup-po" aria-labelledby="agenda-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full md:col-span-6 lg:col-span-6">
            <Cartaz />
          </div>
          <div className="col-span-full md:col-span-6 lg:col-span-5 lg:col-start-8 torneios-lado">
            <TituloSecao lado id="agenda-titulo">Próximos eventos</TituloSecao>
            <Contagem />
            <ul className="agenda">
              {agenda.map((ev) => (
                <li key={ev.id}>
                  <time dateTime={ev.inicio} className="placar">
                    {ev.dataCurta.replace("—", "–")}
                  </time>
                  <div>
                    <p className="sub">{ev.nome}</p>
                    <p className="sec">{ev.detalhe}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="secao sup-papel" aria-labelledby="res-titulo">
        <div className="wrap g12" style={{ rowGap: "2.5rem" }}>
          <TituloSecao lado id="res-titulo" className="col-span-full lg:col-span-4">
            Quem levantou a taça
          </TituloSecao>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            {resultados.map((r) => (
              <div key={r.evento}>
                <p className="ui sec pb-3">
                  {r.evento}, {r.data.toLowerCase()}
                </p>
                <table className="tabela">
                  <caption className="sr-only">Campeões por categoria, {r.evento}</caption>
                  <thead>
                    <tr>
                      <th scope="col">Categoria</th>
                      <th scope="col">Campeão</th>
                      <th scope="col" className="num">
                        Final
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.campeoes.map((c) => (
                      <tr key={c.categoria}>
                        <td className="placar" style={{ fontSize: "2.4rem", color: "var(--saibro)", width: "6rem" }}>
                          {c.categoria}
                        </td>
                        <td className="sub" style={{ fontSize: "1.25rem" }}>
                          {c.nome}
                        </td>
                        <td className="num placar placar-jogo" style={{ fontSize: "1.5rem" }}>
                          {c.placar}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secao sup-vinho" aria-labelledby="rank-titulo">
        <div className="wrap g12" style={{ rowGap: "2.5rem" }}>
          <div className="col-span-full lg:col-span-4">
            <TituloSecao lado id="rank-titulo">Ranking do mês</TituloSecao>
            <p className="sec mt-6">Quatro categorias, de A a D. A classificação nova sai todo fim de mês, somando os jogos do mês à anterior.</p>
            <div className="mt-8 grid gap-2 justify-items-start">
              <Btn href={wa(mensagens.ranking)}>Entrar no ranking</Btn>
              <BtnLinha href="/clube-red/#regras">Ler as regras do ranking</BtnLinha>
            </div>
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <table className="tabela">
              <caption className="sr-only">Ranking interno, dez primeiros colocados</caption>
              <thead>
                <tr>
                  <th scope="col">Posição</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Cat.</th>
                  <th scope="col" className="num">
                    Pontos
                  </th>
                  <th scope="col" className="num">
                    No mês
                  </th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((j) => (
                  <tr key={j.pos}>
                    <td className="placar" style={{ fontSize: "1.9rem", width: "5rem" }}>
                      {String(j.pos).padStart(2, "0")}
                    </td>
                    <td className={j.pos <= 3 ? "sub" : ""} style={j.pos <= 3 ? { fontSize: "1.2rem" } : undefined}>
                      {j.nome}
                    </td>
                    <td className="ui">{j.categoria}</td>
                    <td className="num placar" style={{ fontSize: "1.5rem" }}>
                      {j.pontos.toLocaleString("pt-BR")}
                    </td>
                    <td className="num">
                      <Movimento mov={j.mov} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Fecho titulo="Seu nome na chave" />
    </>
  );
}
