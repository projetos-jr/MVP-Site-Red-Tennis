"use client";

import { useEffect, useRef } from "react";
import { ClayScene } from "@/components/clay/scene";

export function Estudio() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const n = (k: string, d: number) => (q.has(k) ? Number(q.get(k)) : d);
    const w = n("w", 1440);
    const h = n("h", 900);
    const c = ref.current!;
    c.style.width = w + "px";
    c.style.height = h + "px";
    const s = new ClayScene(c, { dprMax: n("dpr", 1), escala: 1, software: true });
    s.resize(w, h);
    const lineW = n("lw", 22);
    const k = lineW / 0.05;
    s.setLayout({
      t: { x: n("tx", w * 0.72), y: n("ty", h * 0.72) },
      ballR: n("br", lineW * 1.15),
      lineW,
      sideX: n("sx", -1),
      netY: n("ny", -60),
      k,
    });
    s.setLuz({ modo: q.get("noite") === "1" ? "noite" : "dia", hora: n("hora", 17.3) });
    s.setGrain(n("grain", 0.035));
    s.repouso();
    if (q.has("mx")) s.amassado(n("mx", 0), n("my", 0), n("me", 0.8));
    const lista = (k: string) => (q.get(k) ?? "").split(",").map(Number);
    if (q.has("fundo")) s.setMarcaFundo(n("fundo", 1));
    if (q.has("raq")) {
      const [x, y, ang, sc] = lista("raq");
      s.setRaquete(x, y, (ang * Math.PI) / 180, sc);
    }
    if (q.has("var")) {
      const [x, y, int, esp] = lista("var");
      s.setVarrido(x, y, int, esp);
    }
    if (q.has("deslize")) {
      // marca de deslize: um traço longo e levemente curvo
      const [x1, y1, x2, y2, r] = lista("deslize");
      const pts = Array.from({ length: 60 }, (_, i) => {
        const t = i / 59;
        // desliza reto e termina num leve gancho, onde o pé freia
        const curva = Math.pow(t, 3) * r * 2.2;
        return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t + curva };
      });
      s.marcaManual(pts, 0.65, r);
    }
    if (q.has("quique")) {
      // marca da bola no saibro: oval curto
      const [x, y, r] = lista("quique");
      s.marcaManual([{ x: x - r * 0.9, y: y - r * 0.2 }, { x: x + r * 0.9, y: y + r * 0.2 }], 0.75, r);
    }
    if (q.has("trail")) {
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        pts.push({ x: w * (0.15 + 0.6 * t), y: h * (0.35 + 0.25 * Math.sin(t * 3)) });
      }
      s.marcaManual(pts, 0.5);
    }
    s.desenha(1);
    document.body.dataset.pronto = "1";
    return () => s.destruir();
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#000" }}>
      <canvas ref={ref} id="estudio" style={{ display: "block" }} />
    </div>
  );
}
