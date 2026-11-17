import type { Metadata } from "next";
import { Traco } from "@/components/motion";
import { PhotoSlot } from "@/components/PhotoSlot";
import { SombraRaquetes, SombraRede } from "@/components/Texturas";
import { Bola, Btn, Rotulo } from "@/components/ui";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false } };

const CORES = [
  { token: "--saibro", hex: "#C2552B", uso: "Campo de cor principal" },
  { token: "--saibro-escuro", hex: "#8E3A1C", uso: "Sombras, faixas de base" },
  { token: "--bordo", hex: "#6E1F1F", uso: "Cor institucional, Clube Red, rodapé" },
  { token: "--grafite", hex: "#141210", uso: "Seções escuras" },
  { token: "--cal", hex: "#F1ECE3", uso: "Fundo claro e linhas" },
  { token: "--areia", hex: "#D9CBB6", uso: "Texto secundário sobre escuro" },
  { token: "--bola", hex: "#D4F03C", uso: "Acento único" },
];

export default function Styleguide() {
  return (
    <div className="sup-cal" style={{ paddingTop: 120 }}>
      <div className="wrap pb-24 grid gap-20">
        <header>
          <Rotulo>Red Tennis · Design system</Rotulo>
          <h1 className="display t-h1 mt-6">
            Style
            <br />
            <span className="serif">guide.</span>
          </h1>
        </header>

        <section>
          <Rotulo n="01">Cores</Rotulo>
          <ul className="mt-6 grid grid-cols-2 md:grid-cols-7 b-t b-l">
            {CORES.map((c) => (
              <li key={c.token} className="b-r b-b">
                <div style={{ background: `var(${c.token})`, height: 140 }} />
                <p className="mono p-3">
                  {c.token}
                  <br />
                  <span className="sec">{c.hex}</span>
                  <br />
                  <span className="sec normal-case">{c.uso}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-8">
          <Rotulo n="02">Tipografia</Rotulo>
          <div className="b-t pt-6">
            <p className="mono sec">Display · Archivo 900, largura 125</p>
            <p className="display t-h1">Saibro. Técnica.</p>
          </div>
          <div className="b-t pt-6">
            <p className="mono sec">Editorial · Instrument Serif itálico</p>
            <p className="serif" style={{ fontSize: "var(--t-h1)", lineHeight: 1 }}>
              Feito no saibro.
            </p>
          </div>
          <div className="b-t pt-6">
            <p className="mono sec">Texto · Inter Tight 400/500</p>
            <p className="lead">A Red é a casa do tênis de saibro no ABC.</p>
            <p className="mt-2">Aqui a criança começa com bola vermelha aos quatro anos, o adulto aprende do zero e quem já joga encontra adversário toda semana no ranking.</p>
          </div>
          <div className="b-t pt-6">
            <p className="mono sec">Dados · JetBrains Mono 500</p>
            <p className="mono">01 / Aulas · Seg a qui 7h às 22h · R$ 380/mês</p>
          </div>
        </section>

        <section>
          <Rotulo n="03">Botões</Rotulo>
          <div className="mt-6 flex flex-wrap gap-4">
            <Btn href="/">Agendar aula</Btn>
            <Btn href="/" tom="grafite">
              Reservar quadra
            </Btn>
            <Btn href="/" tom="linha">
              Ver programas
            </Btn>
          </div>
          <div className="sup-grafite mt-4 p-6 flex flex-wrap gap-4">
            <Btn href="/">Agendar aula</Btn>
            <Btn href="/" tom="cal">
              Como chegar
            </Btn>
            <Btn href="/" tom="linha">
              WhatsApp
            </Btn>
          </div>
        </section>

        <section>
          <Rotulo n="04">Linhas de quadra</Rotulo>
          <div className="mt-6 relative h-48">
            <Traco />
            <span className="traco-v" style={{ left: "33%" }} />
            <div className="absolute left-0 right-0 top-1/2">
              <Traco atraso={0.2} />
            </div>
            <Bola className="absolute w-10" />
            <style>{`.h-48 > svg:last-of-type { left: calc(33% + 12px); top: calc(50% - 52px); }`}</style>
          </div>
        </section>

        <section>
          <Rotulo n="05">Texturas e fotos</Rotulo>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            <div className="sup-saibro relative overflow-hidden h-72">
              <span className="grao grao-saibro" />
              <span className="grao grao-claro" />
              <span className="luz" />
            </div>
            <div className="sup-saibro relative overflow-hidden h-72">
              <span className="grao grao-saibro" />
              <SombraRede />
            </div>
            <div className="sup-saibro relative overflow-hidden h-72">
              <span className="grao grao-saibro" />
              <SombraRaquetes className="absolute h-[120%] left-1/4 -top-[10%]" />
            </div>
            <PhotoSlot name="bola-na-linha" alt="Placeholder de foto" briefing="Bola na linha do saibro, sombra da rede, fim de tarde" className="h-72" />
          </div>
        </section>
      </div>
    </div>
  );
}
