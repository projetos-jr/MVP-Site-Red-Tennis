"use client";

import { useEffect, useRef } from "react";
import { paredao } from "@/content/red";

/**
 * Uma hora de jogo contra uma hora de paredão. Cada bola = 10 golpes seus.
 * As duas linhas enchem no mesmo tempo: a do paredão, cinco vezes mais depressa.
 */
export function Ritmo() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.visto = "true";
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const { jogo, paredao: muro, nota } = paredao.ritmo;
  const linhas = [
    { rotulo: "Uma hora de jogo", n: jogo, total: `≈ ${jogo}` },
    { rotulo: "Uma hora de paredão", n: muro, total: `≈ ${muro.toLocaleString("pt-BR")}` },
  ];
  return (
    <div ref={ref} className="ritmo" data-visto="false">
      <p className="sr-only">
        Golpes seus em uma hora: cerca de {jogo} jogando uma partida e cerca de {muro.toLocaleString("pt-BR")} no paredão.
      </p>
      {linhas.map((l) => {
        const bolas = Math.round(l.n / 10);
        return (
          <div key={l.rotulo} className="ritmo-linha" aria-hidden="true">
            <p className="ui ritmo-rot">{l.rotulo}</p>
            <div className="ritmo-bolas">
              {Array.from({ length: bolas }, (_, i) => (
                <i key={i} style={{ ["--d" as string]: `${Math.round((i / bolas) * 2600)}ms` }} />
              ))}
            </div>
            <p className="placar ritmo-total">{l.total}</p>
          </div>
        );
      })}
      <p className="ui ritmo-legenda" aria-hidden="true">
        <i /> = 10 golpes
      </p>
      <p className="sec ritmo-nota">{nota}</p>
    </div>
  );
}
