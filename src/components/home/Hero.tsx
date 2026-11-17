"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mensagens } from "@/content/red";
import { wa } from "@/lib/wa";
import { AbertoFaixa } from "../Aberto";
import { Bola, Btn } from "../ui";

const RAIO = 280;

/** Mapa de deslocamento: ondas concêntricas que empurram a superfície para fora do centro. */
function criaMapa(): string {
  const n = 256;
  const tela = document.createElement("canvas");
  tela.width = tela.height = n;
  const ctx = tela.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(n, n);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const dx = (x / (n - 1)) * 2 - 1;
      const dy = (y / (n - 1)) * 2 - 1;
      const r = Math.hypot(dx, dy);
      const queda = Math.max(0, 1 - r) ** 1.6;
      const amp = r > 0 ? Math.sin(r * Math.PI * 3.2) * queda : 0;
      const i = (y * n + x) * 4;
      img.data[i] = 128 + 127 * (dx / (r || 1)) * amp;
      img.data[i + 1] = 128 + 127 * (dy / (r || 1)) * amp;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return tela.toDataURL();
}

/**
 * Hero "superfície" (ref. 07): o saibro reage. As linhas e a sombra da rede se
 * deformam em volta do cursor (feDisplacementMap) e voltam a ficar lisas;
 * clicar na bola solta uma onda. No celular, a deformação acompanha o scroll.
 */
export function Hero() {
  const secao = useRef<HTMLElement>(null);
  const camada = useRef<SVGGElement>(null);
  const feImagem = useRef<SVGFEImageElement>(null);
  const feDesloca = useRef<SVGFEDisplacementMapElement>(null);
  const amasso = useRef<HTMLDivElement>(null);
  const bola = useRef<HTMLButtonElement>(null);
  const estado = useRef({ x: 0, y: 0, ax: 0, ay: 0, e: 0, rodando: false, px: 0, py: 0 });
  const [mapa, setMapa] = useState("");
  const [ondas, setOndas] = useState<number[]>([]);

  const quadro = useCallback(() => {
    const s = estado.current;
    s.x += (s.ax - s.x) * 0.2;
    s.y += (s.ay - s.y) * 0.2;
    s.e *= 0.93;
    const g = camada.current;
    if (s.e < 0.004) {
      s.e = 0;
      s.rodando = false;
      g?.removeAttribute("filter");
      if (amasso.current) amasso.current.style.opacity = "0";
      return;
    }
    g?.setAttribute("filter", "url(#amassa)");
    feImagem.current?.setAttribute("x", String(s.x - RAIO));
    feImagem.current?.setAttribute("y", String(s.y - RAIO));
    feDesloca.current?.setAttribute("scale", String(Math.min(s.e, 1.6) * 64));
    if (amasso.current) {
      amasso.current.style.transform = `translate(${s.x}px, ${s.y}px) scale(${0.7 + Math.min(s.e, 1) * 0.4})`;
      amasso.current.style.opacity = String(Math.min(s.e, 1) * 0.9);
    }
    requestAnimationFrame(quadro);
  }, []);

  const acorda = useCallback(() => {
    // O mapa de deslocamento só é gerado na primeira interação.
    setMapa((m) => m || criaMapa());
    if (!estado.current.rodando) {
      estado.current.rodando = true;
      requestAnimationFrame(quadro);
    }
  }, [quadro]);

  const centroDaBola = useCallback(() => {
    const el = secao.current;
    const b = bola.current;
    if (!el || !b) return { x: 0, y: 0 };
    const a = el.getBoundingClientRect();
    const r = b.getBoundingClientRect();
    return { x: r.left - a.left + r.width / 2, y: r.top - a.top + r.height / 2 };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = secao.current;
    if (!el) return;
    const s = estado.current;

    const move = (ev: PointerEvent) => {
      if (ev.pointerType === "touch") return;
      const a = el.getBoundingClientRect();
      s.ax = ev.clientX - a.left;
      s.ay = ev.clientY - a.top;
      const v = Math.hypot(ev.clientX - s.px, ev.clientY - s.py);
      s.px = ev.clientX;
      s.py = ev.clientY;
      if (s.e === 0) {
        s.x = s.ax;
        s.y = s.ay;
      }
      s.e = Math.min(1, s.e + v / 260);
      acorda();
    };

    let ultimo = window.scrollY;
    const rola = () => {
      const d = Math.abs(window.scrollY - ultimo);
      ultimo = window.scrollY;
      if (!window.matchMedia("(hover: none)").matches || window.scrollY > window.innerHeight) return;
      const c = centroDaBola();
      s.ax = s.x = c.x;
      s.ay = s.y = c.y;
      s.e = Math.min(1, s.e + d / 160);
      acorda();
    };

    el.addEventListener("pointermove", move);
    window.addEventListener("scroll", rola, { passive: true });
    return () => {
      el.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", rola);
    };
  }, [acorda, centroDaBola]);

  const quica = () => {
    const c = centroDaBola();
    const s = estado.current;
    s.ax = s.x = c.x;
    s.ay = s.y = c.y;
    s.e = 1.6;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) acorda();
    const id = Date.now();
    setOndas((o) => [...o, id]);
    setTimeout(() => setOndas((o) => o.filter((n) => n !== id)), 1500);
  };

  return (
    <section ref={secao} className="hero sup-saibro">
      <div className="hero-sup" aria-hidden="true">
        <span className="grao grao-saibro" />
        <span className="grao grao-claro" />
        <span className="luz" />
        <div ref={amasso} className="hero-amasso" />
        <svg className="hero-svg">
          <defs>
            <filter id="amassa" filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feFlood floodColor="rgb(128,128,128)" result="neutro" />
              <feImage ref={feImagem} href={mapa || undefined} x="0" y="0" width={RAIO * 2} height={RAIO * 2} result="lente" preserveAspectRatio="none" />
              <feMerge result="mapa">
                <feMergeNode in="neutro" />
                <feMergeNode in="lente" />
              </feMerge>
              <feDisplacementMap ref={feDesloca} in="SourceGraphic" in2="mapa" scale="0" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <pattern id="trama" width="46" height="32" patternUnits="userSpaceOnUse" patternTransform="skewX(-30)">
              <path d="M0 0H46M0 0V32" stroke="#5a1f0a" strokeWidth="5" fill="none" />
            </pattern>
          </defs>
          <g ref={camada}>
            <g style={{ mixBlendMode: "multiply" }} opacity="0.5">
              <g style={{ transform: "rotate(-13deg)", transformOrigin: "50% 50%", transformBox: "view-box" }}>
                <rect x="-50%" y="50%" width="200%" height="38" fill="#5a1f0a" />
                <rect x="-50%" y="50%" width="200%" height="120%" fill="url(#trama)" />
              </g>
            </g>
            <g className="quadra">
              <line className="l-h" x1="0" y1="100%" x2="100%" y2="100%" pathLength={1} />
              <line className="l-v" x1="80%" y1="100%" x2="80%" y2="0" pathLength={1} />
            </g>
          </g>
        </svg>
      </div>

      <button ref={bola} className="hero-bola" onClick={quica} aria-label="Quicar a bola">
        <Bola />
        {ondas.map((id) => (
          <span key={id} className="onda" />
        ))}
      </button>

      <div className="wrap hero-corpo">
        <h1 className="hero-titulo display t-hero">
          <span className="mask">
            <span className="sobe" style={{ "--i": 0 } as React.CSSProperties}>
              Saibro.
            </span>
          </span>
          <span className="mask">
            <span className="sobe" style={{ "--i": 1 } as React.CSSProperties}>
              Técnica.
            </span>
          </span>
          <span className="mask">
            <span className="sobe serif" style={{ "--i": 2 } as React.CSSProperties}>
              Resultado.
            </span>
          </span>
        </h1>
      </div>

      <div className="hero-base" style={{ background: "var(--saibro-escuro)" }}>
        <div className="wrap hero-base-in">
          <p className="hero-dados mono" style={{ maxWidth: "none" }}>
            <span>Rudge Ramos · SBC</span>
            <span>Saibro · Quadra rápida · Paredão · Squash</span>
            <AbertoFaixa />
          </p>
          <Btn href={wa(mensagens.aula)}>Agendar aula experimental</Btn>
        </div>
      </div>
    </section>
  );
}
