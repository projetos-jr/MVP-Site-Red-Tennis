import type { Metadata } from "next";
import { AbertoStatus } from "@/components/Aberto";
import { Carteirinhas } from "@/components/home/Carteirinhas";
import { Casa } from "@/components/home/Casa";
import { Catalogo } from "@/components/home/Catalogo";
import { Equipe } from "@/components/home/Equipe";
import { Hero } from "@/components/home/Hero";
import { Numeros } from "@/components/home/Numeros";
import { Prancha } from "@/components/home/Prancha";
import { Planta } from "@/components/home/Planta";
import { Semana } from "@/components/home/Semana";
import { Cartaz, Contagem } from "@/components/home/Torneio";
import { Mapa } from "@/components/Mapa";
import { Fecho } from "@/components/Fecho";
import { Btn, BtnLinha } from "@/components/ui";
import { agenda, beneficios, contato, depoimentos, eventos, mensagens, site } from "@/content/red";
import { pagina } from "@/lib/seo";
import { wa } from "@/lib/wa";
import { BtnAula } from "@/components/Agendar";

export const metadata: Metadata = {
  ...pagina({
    titulo: "Aulas de tênis e quadras de saibro em São Bernardo",
    descricao: site.descricao,
    caminho: "/",
    compartilhar: { titulo: "Red Tennis · Aulas de tênis e quadras de saibro no Rudge Ramos", descricao: site.descricao },
  }),
  title: { absolute: "Aulas de tênis e quadras de saibro em São Bernardo | Red Tennis" },
};

export default function Home() {
  const e = contato.endereco;
  return (
    <>
      <Hero />
      <Semana />
      <Casa />
      <Numeros />
      <Prancha />

      {/* Aulas */}
      <section className="secao sup-papel aulas" aria-labelledby="aulas-titulo">
        <div className="wrap g12" style={{ rowGap: "2.5rem" }}>
          <div className="col-span-full lg:col-span-4 aulas-lado">
            <h2 id="aulas-titulo" className="titulo">
              Do primeiro saque ao torneio
            </h2>
            <p className="sec mt-6">
              Individual, em dupla ou em turma de até quatro. Da bola vermelha, aos quatro anos, ao treino de quem joga o Circuito.
            </p>
            <div className="mt-8 grid gap-2 justify-items-start">
              <BtnAula />
              <BtnLinha href="/aulas/">Ver os programas</BtnLinha>
            </div>
          </div>
          <div className="col-span-full lg:col-span-8">
            <Catalogo />
          </div>
        </div>
      </section>

      {/* Quadras */}
      <section className="secao sup-saibro com-grao quadras-sec" aria-labelledby="quadras-titulo">
        <div className="wrap relative">
          <div className="g12 items-end mb-10" style={{ rowGap: "1.25rem" }}>
            <h2 id="quadras-titulo" className="titulo col-span-full lg:col-span-7">
              Três de saibro, uma rápida
            </h2>
            <p className="col-span-full lg:col-span-5 lead">
              Cada quadra tem alambrado alto e entrada própria. Toque numa delas para ver o próximo horário livre.
            </p>
          </div>
          <Planta />
        </div>
      </section>

      {/* Clube Red */}
      <section className="secao sup-bordo clube" aria-labelledby="clube-titulo">
        <div className="wrap">
          <div className="g12 items-end" style={{ rowGap: "1.25rem" }}>
            <h2 id="clube-titulo" className="titulo col-span-full lg:col-span-8">
              O clube de quem joga toda semana
            </h2>
            <p className="col-span-full lg:col-span-4 lead sec">
              Aluno de turma já é sócio. Uma mensalidade, horário garantido e motivo para voltar: ranking, torneio do mês e desconto na quadra.
            </p>
          </div>
          <Carteirinhas />
          <div className="g12 vantagens" style={{ rowGap: "2rem" }}>
            <h3 className="sub t-h3 col-span-full lg:col-span-4">O que o sócio tem a mais</h3>
            <ul className="col-span-full lg:col-span-8 vantagens-lista">
              {beneficios.map((b) => (
                <li key={b.titulo}>
                  <p className="sub">{b.titulo}</p>
                  <p className="sec">{b.texto}</p>
                </li>
              ))}
            </ul>
            <div className="col-span-full lg:col-span-8 lg:col-start-5">
              <BtnLinha href="/clube-red/">Comparar os planos</BtnLinha>
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="secao sup-papel equipe" aria-labelledby="equipe-titulo">
        <div className="wrap">
          <div className="g12 items-end mb-12" style={{ rowGap: "1.25rem" }}>
            <h2 id="equipe-titulo" className="titulo col-span-full lg:col-span-8">
              Quem está do outro lado da rede
            </h2>
            <p className="col-span-full lg:col-span-4 lead sec">Três professores e uma equipe de rebatedores para treinar sem depender de parceiro.</p>
          </div>
          <Equipe />
        </div>
      </section>

      {/* Torneios */}
      <section className="secao sup-po torneios" aria-labelledby="torneios-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full md:col-span-6 lg:col-span-6">
            <Cartaz />
          </div>
          <div className="col-span-full md:col-span-6 lg:col-span-5 lg:col-start-8 torneios-lado">
            <h2 id="torneios-titulo" className="titulo titulo-lado">
              Jogo valendo, o ano inteiro
            </h2>
            <p className="sec mt-5">
              O Circuito Red Tennis tem etapas ao longo do ano, com chaves por categoria. Entre uma etapa e outra, o ranking interno não para.
            </p>
            <Contagem />
            <ul className="agenda">
              {agenda.filter((ev) => ev.id !== eventos[0].id).slice(0, 3).map((ev) => (
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
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2">
              <Btn href={wa(mensagens.torneio(eventos[0]))}>Inscrever-se no torneio</Btn>
              <BtnLinha href="/torneios/">Ver agenda e ranking</BtnLinha>
            </div>
          </div>
        </div>
      </section>

      {/* Quem joga aqui */}
      <section className="secao sup-papel depo" aria-labelledby="depo-titulo">
        <div className="wrap">
          <h2 id="depo-titulo" className="sr-only">
            Quem joga na Red
          </h2>
          <figure className="depo-grande">
            <blockquote>“{depoimentos[0].texto}”</blockquote>
            <figcaption className="ui sec">
              {depoimentos[0].nome}, {depoimentos[0].tempo}, {depoimentos[0].nivel.toLowerCase()}
            </figcaption>
          </figure>
          <div className="depo-par">
            {depoimentos.slice(1).map((d) => (
              <figure key={d.nome}>
                <blockquote>“{d.texto}”</blockquote>
                <figcaption className="ui sec">
                  {d.nome}, {d.tempo}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="ui sec depo-nota">Depoimentos de exemplo. Na versão final, falas de alunos da Red.</p>
        </div>
      </section>

      {/* Visite */}
      <section className="secao sup-vinho visite" aria-labelledby="visite-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-4">
            <h2 id="visite-titulo" className="titulo titulo-lado">
              Venha bater bola
            </h2>
            <AbertoStatus className="mt-8" />
            <address className="lead not-italic mt-4">
              {e.rua}
              <br />
              {e.bairro}, {e.cidade}
            </address>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2">
              <Btn href={contato.mapa}>Como chegar</Btn>
              <BtnLinha href={wa(mensagens.geral)}>Chamar no WhatsApp</BtnLinha>
            </div>
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6" style={{ ["--papel-mapa" as string]: "var(--vinho)" }}>
            <Mapa />
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <Fecho />
    </>
  );
}
