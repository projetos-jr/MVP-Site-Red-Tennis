import Link from "next/link";
import { AbertoStatus, HorariosSemana } from "@/components/Aberto";
import { Comparador } from "@/components/Comparador";
import { FaixaProfessores } from "@/components/FaixaProfessores";
import { Hero } from "@/components/home/Hero";
import { Ingressos } from "@/components/Ingressos";
import { Mapa } from "@/components/Mapa";
import { Surge, Titulo, Traco } from "@/components/motion";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Agenda, Poster } from "@/components/Poster";
import { TabelaProgramas } from "@/components/TabelaProgramas";
import { Fecho } from "@/components/Fecho";
import { Btn, Rotulo, Seta } from "@/components/ui";
import { beneficios, contato, depoimentos, mensagens, numeros, quadras, site } from "@/content/red";
import { wa } from "@/lib/wa";

const FAIXA = ["Aulas", "Locação", "Torneios", "Clube Red", "TotalPass", "Ranking", "Red Kids", "Paredão"];

export default function Home() {
  const e = contato.endereco;
  return (
    <>
      <Hero />

      {/* 02 · Faixa */}
      <div className="marquee sup-grafite" aria-hidden="true">
        <div className="marquee-faixa">
          {[0, 1].map((k) => (
            <div key={k}>
              {FAIXA.map((t) => (
                <span key={t} className="display flex items-center" style={{ gap: "clamp(2rem, 4vw, 4rem)" }}>
                  {t} <i />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 03 · Manifesto */}
      <section className="secao sup-cal">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full">
            <Rotulo n="01">A casa</Rotulo>
            <Titulo className="display t-h2 mt-6" linhas={["Três de saibro,", "uma rápida,", "um paredão e", "*gente que joga.*"]} />
          </div>
          <Surge className="col-span-full lg:col-span-6 lg:col-start-2 grid gap-5 content-start">
            <p className="lead">
              A Red é a casa do tênis de saibro no ABC. Desde {site.fundacao}, no Rudge Ramos, a gente ensina a bater na bola, cuida do pó de
              tijolo e junta quem gosta de jogar.
            </p>
            <p className="sec">
              Aqui a criança começa com bola vermelha aos quatro anos, o adulto aprende do zero e quem já joga encontra adversário toda semana
              no ranking. As quadras são isoladas, cada uma com sua entrada, e a luz acende quando o sol vai embora.
            </p>
            <Link href="/sobre/" className="link mono w-fit">
              A história da Red <Seta size={12} />
            </Link>
          </Surge>
          <Surge as="figure" className="col-span-full md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:-mt-[13vw] xl:-mt-[12rem]">
            <PhotoSlot
              name="saibro-vertical"
              alt="Quadra de saibro da Red Tennis com a rede em primeiro plano, cobertura de descanso e refletores ao fundo"
              sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 66vw, 100vw"
              className="aspect-[4/5]"
            />
            <figcaption className="mono sec mt-3 flex justify-between gap-4">
              <span>Red Tennis · Saibro</span>
              <span>Rudge Ramos, SBC</span>
            </figcaption>
          </Surge>
          <dl className="numeros col-span-full mt-4 lg:mt-12">
            {numeros.map((n) => (
              <div key={n.rotulo}>
                <dd>
                  <strong className="display">{n.valor}</strong>
                </dd>
                <dt className="mono sec mt-2">{n.rotulo}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 04 · Aulas */}
      <section className="secao sup-cal" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="g12 items-end mb-10 lg:mb-16" style={{ rowGap: "1.5rem" }}>
            <div className="col-span-full lg:col-span-8">
              <Rotulo n="02">Aulas</Rotulo>
              <Titulo className="display t-h2 mt-6" linhas={["Do primeiro", "forehand", "ao *tie-break.*"]} />
            </div>
            <p className="col-span-full lg:col-span-4 sec">
              Aulas individuais, em dupla ou em grupos de até quatro. Cinco programas, um para cada fase do seu jogo.
            </p>
          </div>
          <TabelaProgramas />
          <div className="mt-10 flex flex-wrap gap-4">
            <Btn href="/aulas/" tom="grafite">
              Ver todos os programas
            </Btn>
            <Btn href={wa(mensagens.aula)} tom="linha">
              Agendar aula experimental
            </Btn>
          </div>
        </div>
      </section>

      {/* 05 · Quadras */}
      <section className="secao sup-grafite">
        <div className="wrap">
          <div className="g12 items-end mb-10 lg:mb-14" style={{ rowGap: "1.5rem" }}>
            <div className="col-span-full lg:col-span-8">
              <Rotulo n="03">Quadras</Rotulo>
              <Titulo className="display t-h2 mt-6" linhas={["Dois pisos,", "*dois jogos.*"]} />
            </div>
            <p className="col-span-full lg:col-span-4 sec">Arraste a linha central e compare. No saibro o ponto se constrói. Na rápida, se decide.</p>
          </div>
        </div>
        <div className="wrap">
          <Comparador />
          <div className="g12 relative" style={{ rowGap: "2.5rem" }}>
            <span className="traco-v hidden md:block" style={{ left: "50%" }} aria-hidden="true" />
            {quadras.map((q, i) => (
              <div key={q.id} className={`col-span-full md:col-span-6 pt-8 ${i === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <h3 className="mono sec">
                  0{i + 1} · {q.nome} · {q.piso}
                </h3>
                <p className="lead mt-3">{q.texto}</p>
                <dl className="dados mono mt-6">
                  {q.dados.map((d) => (
                    <div key={d.rotulo}>
                      <dt>{d.rotulo}</dt>
                      <dd>{d.valor}</dd>
                    </div>
                  ))}
                </dl>
                <Btn href={wa(`${mensagens.quadra} Piso: ${q.nome.toLowerCase()}.`)} tom={i === 0 ? "cal" : "linha"} className="mt-6">
                  Reservar {q.nome.toLowerCase()}
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 · Clube Red */}
      <section className="secao sup-bordo overflow-hidden">
        <div className="wrap">
          <div className="g12 items-end mb-12 lg:mb-20" style={{ rowGap: "1.5rem" }}>
            <div className="col-span-full lg:col-span-9">
              <Rotulo n="04">Clube Red</Rotulo>
              <Titulo
                className="display t-h2 mt-6"
                linhas={["O clube", "*de quem joga*", "*toda semana.*"]}
              />
            </div>
            <p className="col-span-full lg:col-span-3 sec">
              Mensalidade única, horário garantido e motivo para voltar: ranking, torneio do mês e desconto para quem é da casa.
            </p>
          </div>
          <Ingressos />
          <div className="g12 mt-16 lg:mt-24" style={{ rowGap: "2rem" }}>
            <h3 className="col-span-full lg:col-span-4 display t-h3">
              Ser sócio
              <br />
              <span className="serif">vale mais.</span>
            </h3>
            <div className="col-span-full lg:col-span-8">
              <ol className="lista-n">
                {beneficios.map((b) => (
                  <li key={b.titulo}>
                    <h4 className="display t-h4">{b.titulo}</h4>
                    <p className="sec">{b.texto}</p>
                  </li>
                ))}
              </ol>
              <Btn href="/clube-red/" tom="cal" className="mt-8">
                Conhecer o Clube Red
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* 07 · Professores */}
      <section className="secao sup-cal">
        <div className="wrap mb-10 lg:mb-16">
          <Rotulo n="05">Equipe</Rotulo>
          <div className="g12 items-end mt-6" style={{ rowGap: "1.5rem" }}>
            <Titulo className="col-span-full lg:col-span-8 display t-h2" linhas={["Quem está", "*do outro lado da rede.*"]} />
            <p className="col-span-full lg:col-span-4 mono sec lg:text-right">Arraste para ver a equipe →</p>
          </div>
        </div>
        <FaixaProfessores />
      </section>

      {/* 08 · Torneios */}
      <section className="secao sup-grafite">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-6">
            <Poster />
          </div>
          <div className="col-span-full lg:col-span-5 lg:col-start-8 flex flex-col justify-between gap-10">
            <div>
              <Rotulo n="06">Torneios</Rotulo>
              <Titulo className="display t-h2 mt-6" linhas={["Jogo", "*valendo.*"]} />
              <p className="sec mt-6">
                O Circuito Red Tennis acontece ao longo do ano, com chaves por categoria. Entre uma etapa e outra, o ranking interno não para.
              </p>
            </div>
            <div>
              <p className="mono sec mb-3">Na agenda</p>
              <Agenda />
              <div className="mt-8 flex flex-wrap gap-4">
                <Btn href={wa(mensagens.torneio)} tom="cal">
                  Quero me inscrever
                </Btn>
                <Btn href="/torneios/" tom="linha">
                  Agenda e ranking
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09 · Depoimentos */}
      <section className="secao sup-cal">
        <div className="wrap">
          <Rotulo n="07">Quem joga aqui</Rotulo>
          <div className="g12 mt-10" style={{ rowGap: "3.5rem" }}>
            {depoimentos.map((d, i) => (
              <Surge
                as="figure"
                key={d.nome}
                className={
                  ["col-span-full lg:col-span-10", "col-span-full md:col-span-6 lg:col-span-5 lg:col-start-2", "col-span-full md:col-span-6 lg:col-span-5 lg:col-start-8 lg:mt-20"][i]
                }
              >
                <Traco />
                <blockquote className="citacao mt-6" style={{ fontSize: i === 0 ? "clamp(2rem, 5.2vw, 4.75rem)" : "clamp(1.625rem, 2.8vw, 2.5rem)" }}>
                  “{d.texto}”
                </blockquote>
                <figcaption className="mono sec mt-6">
                  {d.nome} · {d.tempo} · {d.nivel}
                </figcaption>
              </Surge>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · Visite */}
      <section className="secao sup-grafite">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-5">
            <Rotulo n="08">Visite a Red</Rotulo>
            <Titulo className="display t-h2 mt-6" linhas={["Venha", "*bater bola.*"]} />
            <AbertoStatus className="mt-8" />
            <address className="lead not-italic mt-4">
              {e.rua}
              <br />
              {e.bairro}, {e.cidade}
            </address>
            <div className="mt-8 flex flex-wrap gap-4">
              <Btn href={contato.mapa} tom="cal">
                Como chegar
              </Btn>
              <Btn href={wa(mensagens.geral)} tom="linha">
                WhatsApp
              </Btn>
            </div>
          </div>
          <div className="col-span-full md:col-span-5 lg:col-span-3">
            <p className="mono sec mb-3">Horários</p>
            <HorariosSemana />
          </div>
          <div className="col-span-full md:col-span-7 lg:col-span-4">
            <Mapa />
          </div>
        </div>
      </section>

      {/* 11 · CTA final */}
      <Fecho />
    </>
  );
}
