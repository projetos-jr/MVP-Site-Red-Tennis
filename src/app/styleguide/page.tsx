import type { Metadata } from "next";
import { Pictograma } from "@/components/Pictograma";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Bola, Btn, BtnLinha } from "@/components/ui";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false } };

const CORES = [
  { token: "--papel", hex: "#FFFFFF", uso: "Fundo claro. Papel branco do impresso." },
  { token: "--saibro", hex: "#B95128", uso: "Tinta 1. Campo de cor e linhas sobre papel." },
  { token: "--bordo", hex: "#6B1D21", uso: "Tinta 2. Cor institucional, Clube Red." },
  { token: "--vinho", hex: "#3A0E12", uso: "Texto, noite e rodapé." },
  { token: "--po", hex: "#F0DCCD", uso: "Pó de saibro: superfícies secundárias." },
  { token: "--bola", hex: "#D7F04A", uso: "Só a bola." },
];

export default function Styleguide() {
  return (
    <div className="sup-papel" style={{ paddingTop: 130 }}>
      <div className="wrap pb-24 grid grid-cols-1 gap-20">
        <header>
          <p className="ui sec">Red Tennis, sistema visual v2: impresso do clube</p>
          <h1 className="display t-h1 mt-4" style={{ fontStyle: "italic", fontFamily: "var(--f-display-it)" }}>
            Styleguide
          </h1>
        </header>

        <section>
          <h2 className="titulo">Duas tintas e uma bola</h2>
          <ul className="amostras mt-6">
            {CORES.map((c) => (
              <li key={c.token}>
                <div className="cor" style={{ background: `var(${c.token})`, boxShadow: c.token === "--papel" ? "inset 0 0 0 1px var(--po)" : undefined }} />
                <p className="ui">
                  {c.token} {c.hex}
                  <br />
                  <span className="sec" style={{ fontWeight: 400 }}>
                    {c.uso}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-10">
          <h2 className="titulo">Tipo</h2>
          <div className="risco pt-5">
            <p className="ui sec">Anybody, largura 150, peso 850, itálico: display</p>
            <p className="display t-h1" style={{ fontStyle: "italic", fontFamily: "var(--f-display-it)" }}>
              Saibro. Técnica.
            </p>
          </div>
          <div className="risco pt-5">
            <p className="ui sec">Anybody, largura 132, peso 800: títulos de seção</p>
            <p className="titulo">O clube de quem joga toda semana</p>
          </div>
          <div className="risco pt-5">
            <p className="ui sec">Anybody, largura 56: números de placar</p>
            <p className="placar" style={{ fontSize: "clamp(3.5rem, 12vw, 7rem)", color: "var(--saibro)" }}>
              15 30 40 22h R$390
            </p>
          </div>
          <div className="risco pt-5">
            <p className="ui sec">Newsreader: texto e citações</p>
            <p className="lead">A Red é a casa do tênis de saibro no ABC.</p>
            <p className="mt-2">A criança começa com bola vermelha aos quatro anos, o adulto aprende do zero e quem já joga encontra adversário no ranking.</p>
          </div>
        </section>

        <section>
          <h2 className="titulo">Botões</h2>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Btn href="/">Agendar aula</Btn>
            <BtnLinha href="/">Reservar quadra</BtnLinha>
          </div>
          <div className="sup-vinho mt-4 p-6 flex flex-wrap items-center gap-6">
            <Btn href="/">Agendar aula</Btn>
            <BtnLinha href="/">Como chegar</BtnLinha>
          </div>
          <div className="sup-saibro mt-4 p-6 flex flex-wrap items-center gap-6">
            <Btn href="/" tom="claro">
              Agendar aula experimental
            </Btn>
            <BtnLinha href="/">Reservar quadra</BtnLinha>
          </div>
        </section>

        <section>
          <h2 className="titulo">Linha de quadra</h2>
          <p className="sec mt-3">Linhas de 3 px. A faixa de corredor (duas linhas paralelas) é o divisor e a marca do site.</p>
          <span className="corredor mt-6" style={{ ["--risco" as string]: "var(--saibro)" }} />
          <div className="sup-saibro mt-4 p-6">
            <span className="corredor" />
          </div>
        </section>

        <section>
          <h2 className="titulo">Imagem</h2>
          <p className="sec mt-3">Fotos da Red em retícula de meio-tom (passe o mouse para ver a foto) e material renderizado pelo shader do saibro.</p>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            <PhotoSlot name="saibro-vertical" alt="Quadra de saibro da Red" className="aspect-[4/5]" sizes="25vw" ret />
            <PhotoSlot name="bola-na-linha" alt="Bola sobre a linha com a sombra da rede" className="aspect-[4/5]" sizes="25vw" />
            <PhotoSlot name="quadra-noite" alt="Quadra à noite com refletores" className="aspect-[4/5]" sizes="25vw" />
            <PhotoSlot name="rede-manha" alt="Sombra da rede de manhã" className="aspect-[4/5]" sizes="25vw" />
          </div>
        </section>

        <section>
          <h2 className="titulo">Pictogramas e bola</h2>
          <div className="mt-6 flex flex-wrap items-end gap-6" style={{ color: "var(--saibro)" }}>
            {(["saque", "direita", "voleio", "kids"] as const).map((p) => (
              <Pictograma key={p} pose={p} className="w-28 h-28" />
            ))}
            <Bola className="w-16 h-16" />
          </div>
        </section>
      </div>
    </div>
  );
}
