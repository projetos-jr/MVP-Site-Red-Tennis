import type { Metadata } from "next";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Bola } from "@/components/ui";

export const metadata: Metadata = { title: "Imagem de compartilhamento", robots: { index: false } };

/**
 * Arte da imagem Open Graph (1200x630).
 * Para regenerar public/og.jpg: abra /og/ e capture a área #og (ver README).
 */
export default function Og() {
  return (
    <div className="sup-vinho" style={{ paddingTop: 110, minHeight: "100svh" }}>
      <div id="og" className="sup-saibro" style={{ position: "relative", width: 1200, height: 630, overflow: "hidden", isolation: "isolate" }}>
        <PhotoSlot name="linha-tarde" alt="" sizes="1200px" className="og-foto" />
        <style>{`#og .og-foto{position:absolute;inset:0;z-index:-1}`}</style>
        <p className="display" style={{ position: "absolute", left: 56, top: 52, fontSize: 96, fontStyle: "italic", fontFamily: "var(--f-display-it)", lineHeight: 0.86, textShadow: "5px 9px 14px rgb(60 14 6 / .35)" }}>
          Saibro.
          <br />
          Técnica.
          <br />
          Resultado.
        </p>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 116, background: "var(--vinho)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 56px" }}>
          <span className="logo" style={{ fontSize: 34 }}>
            <span>Red</span>
            <Bola />
            <span>Tennis</span>
          </span>
          <span className="ui" style={{ fontSize: 20, textAlign: "right", lineHeight: 1.3 }}>
            Aulas, quadras e torneios
            <br />
            Rudge Ramos, São Bernardo do Campo
          </span>
        </div>
      </div>
    </div>
  );
}
