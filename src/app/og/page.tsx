import type { Metadata } from "next";
import { SombraRede } from "@/components/Texturas";
import { Bola } from "@/components/ui";

export const metadata: Metadata = { title: "Imagem de compartilhamento", robots: { index: false } };

/**
 * Arte da imagem Open Graph (1200x630), no estilo do pôster.
 * Para regenerar public/og.jpg: abra /og/ em 1200x630 e capture a área #og (ver README).
 */
export default function Og() {
  return (
    <div className="sup-grafite" style={{ paddingTop: 96, minHeight: "100svh" }}>
      <div id="og" className="sup-saibro relative overflow-hidden isolate" style={{ width: 1200, height: 630 }}>
        <span className="grao grao-saibro" />
        <span className="luz" />
        <SombraRede angulo={-13} fita={56} opacidade={0.45} />
        <span className="traco-v" style={{ left: 880, background: "var(--cal)", width: 2 }} />
        <span style={{ position: "absolute", left: 0, right: 0, top: 500, height: 2, background: "var(--cal)" }} />
        <div style={{ position: "absolute", inset: "500px 0 0 0", background: "var(--saibro-escuro)" }} />
        <Bola className="absolute" />
        <style>{`#og > svg:last-of-type { left: 905px; top: 395px; width: 84px; }`}</style>
        <p className="display" style={{ position: "absolute", left: 56, top: 64, fontSize: 132 }}>
          Feito
          <br />
          <span className="serif">no saibro.</span>
        </p>
        <p className="display" style={{ position: "absolute", left: 56, top: 540, fontSize: 40 }}>
          Red Tennis
        </p>
        <p className="mono" style={{ position: "absolute", right: 56, top: 546, fontSize: 16, textAlign: "right" }}>
          Aulas · Quadras · Torneios
          <br />
          Rudge Ramos · São Bernardo do Campo
        </p>
      </div>
    </div>
  );
}
