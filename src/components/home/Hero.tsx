"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { ClayScene, Layout } from "@/components/clay/scene";
import { mensagens } from "@/content/red";
import { wa } from "@/lib/wa";
import { PhotoSlot } from "../PhotoSlot";
import { Bola, Btn, BtnLinha } from "../ui";

type Modo = "dia" | "noite";
type Medida = Layout & { w: number; h: number };

/* Duplicados de clay/scene para não carregar o motor antes da hora. */
function horaSP(d = new Date()) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d);
  return Number(p.find((x) => x.type === "hour")?.value ?? 17) + Number(p.find((x) => x.type === "minute")?.value ?? 0) / 60;
}
const ehNoite = (h: number) => h < 6.3 || h >= 18.6;
function solDir(h: number): [number, number, number] {
  const f = Math.min(1, Math.max(0, (h - 6.3) / (18.6 - 6.3)));
  const el = ((7 + 60 * Math.pow(Math.sin(Math.PI * f), 0.8)) * Math.PI) / 180;
  const lado = Math.cos(Math.PI * f) * 0.62;
  return [-lado, Math.sqrt(1 - lado * lado), Math.tan(el)];
}
const hhmm = (h: number) => `${Math.floor(h)}h${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;

/** Sombra do título projetada na direção do sol (ou dos refletores, à noite). */
function sombras(modo: Modo, h: number, fs: number) {
  if (modo === "noite") {
    const a = Math.max(3, fs * 0.05);
    return {
      texto: `${a * 0.8}px ${a}px ${a * 1.6}px rgb(20 4 4 / 0.4), ${-a * 0.7}px ${a * 0.9}px ${a * 2}px rgb(20 4 4 / 0.25)`,
      fato: "0 1px 10px rgb(20 4 4 / 0.6)",
    };
  }
  const [dx, dy, tanEl] = solDir(h);
  const comp = Math.min(fs * 0.14, Math.max(fs * 0.025, (fs * 0.035) / Math.max(tanEl, 0.08)));
  const blur = Math.max(3, comp * 0.6);
  return {
    texto: `${(dx * comp).toFixed(1)}px ${(dy * comp).toFixed(1)}px ${blur.toFixed(1)}px rgb(70 18 6 / 0.3)`,
    fato: `${(dx * 3).toFixed(1)}px ${(dy * 3).toFixed(1)}px 6px rgb(70 18 6 / 0.45)`,
  };
}

function legenda(modo: Modo, real: Modo, h: number) {
  if (modo !== real) {
    return modo === "noite"
      ? "Assim fica a quadra à noite, com os 18 refletores acesos."
      : "Assim fica a quadra às 17h, com sol de fim de tarde.";
  }
  if (modo === "noite") return `${hhmm(h)} em São Bernardo. Refletores acesos.`;
  const periodo = h < 10 ? "Sol da manhã" : h < 14.5 ? "Sol alto" : "Luz de fim de tarde";
  return `${hhmm(h)} em São Bernardo. ${periodo}.`;
}

/**
 * Hero "A quadra agora": saibro em WebGL visto de cima, com a luz da hora real.
 * A bola é o ponto final de "Resultado": fica sobre a linha, no cruzamento em T.
 */
export function Hero() {
  const secao = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ponto = useRef<HTMLSpanElement>(null);
  const ancora = useRef<HTMLSpanElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const cena = useRef<ClayScene | null>(null);
  const [medida, setMedida] = useState<Medida | null>(null);
  const [gl, setGl] = useState<"carregando" | "pronto" | "falhou">("carregando");
  const [hora, setHora] = useState(17.2);
  // a legenda só aparece com a hora real (no HTML estático ela seria a de quem gerou o site)
  const [horaPronta, setHoraPronta] = useState(false);
  const primeiraLuz = useRef(true);
  const reduzRef = useRef(false);
  const aperto = useRef(0);
  const [real, setReal] = useState<Modo>("dia");
  const [modo, setModo] = useState<Modo>("dia");
  const [fs, setFs] = useState(160);
  const [anuncio, setAnuncio] = useState("");

  const medir = useCallback(() => {
    const s = secao.current;
    const p = ponto.current;
    const a = ancora.current;
    const t = titulo.current;
    if (!s || !p || !a || !t) return;
    // posições pelo layout (offsetTop/Left), que ignoram a animação de entrada
    const pos = (el: HTMLElement) => {
      let x = 0;
      let y = 0;
      let n: HTMLElement | null = el;
      while (n && n !== s) {
        x += n.offsetLeft;
        y += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return { x, y };
    };
    const rs = { width: s.clientWidth, height: s.clientHeight };
    const pp = pos(p);
    const pa = pos(a);
    const tamanho = parseFloat(getComputedStyle(t).fontSize);
    const lineW = Math.max(7, tamanho * 0.1);
    const ballR = Math.max(9, tamanho * 0.118);
    const baseline = pa.y;
    const y = baseline + tamanho * 0.075 + lineW / 2;
    const x = pp.x + p.offsetWidth * 0.5;
    const k = lineW / 0.05;
    setFs(tamanho);
    setMedida({ w: rs.width, h: rs.height, t: { x, y }, ballR, lineW, sideX: -1, netY: -0.05 * rs.height, k });
  }, []);

  // hora real e medidas
  useEffect(() => {
    const h = horaSP();
    const m: Modo = ehNoite(h) ? "noite" : "dia";
    setHora(h);
    setReal(m);
    setModo(m);
    setHoraPronta(true);
    reduzRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let vivo = true;
    document.fonts.ready.then(() => vivo && medir());
    medir();
    const ro = new ResizeObserver(() => medir());
    if (secao.current) ro.observe(secao.current);
    const relogio = setInterval(() => {
      const agora = horaSP();
      setHora(agora);
      setReal(ehNoite(agora) ? "noite" : "dia");
    }, 60_000);
    return () => {
      vivo = false;
      ro.disconnect();
      clearInterval(relogio);
    };
  }, [medir]);

  // motor WebGL, carregado depois da primeira pintura
  useEffect(() => {
    const c = canvas.current;
    const s = secao.current;
    if (!c || !s) return;
    let destruido = false;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(async () => {
      try {
        const { ClayScene } = await import("@/components/clay/scene");
        if (destruido) return;
        // ?gl=forcar liga o WebGL mesmo sem GPU (para testes e capturas)
        const forcar = new URLSearchParams(window.location.search).get("gl") === "forcar";
        if (!ClayScene.suportado(forcar)) throw new Error("sem webgl");
        const estreito = window.innerWidth < 768;
        const sc = new ClayScene(c, { dprMax: estreito ? 1.5 : 1.25, escala: estreito ? 0.8 : 1, software: forcar });
        // se o navegador derrubar o contexto (pouca memória, troca de app), volta à imagem parada
        sc.onPerda = () => {
          sc.destruir();
          cena.current = null;
          setGl("falhou");
        };
        cena.current = sc;
        setGl("pronto");
        if (!reduz) {
          // a bola toca o chão quando "Resultado" termina de subir (~1,3 s depois da primeira pintura)
          const fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
          sc.entrada(Math.max(0, (fcp + 700 - performance.now()) / 1000));
        } else sc.repouso();
      } catch {
        setGl("falhou");
      }
    }, 60);

    const io = new IntersectionObserver(([e]) => cena.current?.setVisivel(e.isIntersecting), { threshold: 0 });
    io.observe(s);

    const move = (e: PointerEvent) => {
      if (reduz || !cena.current) return;
      const r = s.getBoundingClientRect();
      cena.current.ponteiro(e.clientX - r.left, e.clientY - r.top);
    };
    const sai = () => cena.current?.saiu();
    s.addEventListener("pointermove", move, { passive: true });
    s.addEventListener("pointerleave", sai);
    return () => {
      destruido = true;
      window.clearTimeout(t);
      io.disconnect();
      s.removeEventListener("pointermove", move);
      s.removeEventListener("pointerleave", sai);
      cena.current?.destruir();
      cena.current = null;
    };
  }, []);

  // quando o sol se põe (ou nasce) com a página aberta, a cena acompanha
  useEffect(() => setModo(real), [real]);

  // tamanho e luz em efeitos separados: a luz muda a cada minuto, o tamanho quase nunca
  useEffect(() => {
    const sc = cena.current;
    if (!sc || !medida || gl !== "pronto") return;
    sc.resize(medida.w, medida.h);
    sc.setLayout(medida);
  }, [medida, gl]);
  useEffect(() => {
    if (gl !== "pronto" || !cena.current) return;
    // na primeira vez a luz já entra no estado certo; depois, os refletores acendem poste a poste
    cena.current.setLuz({ modo, hora: modo === real ? hora : 17.1 }, primeiraLuz.current || reduzRef.current);
    primeiraLuz.current = false;
  }, [modo, real, hora, gl]);

  const sombra = sombras(modo, modo === real ? hora : 17.1, fs);
  const estilo = { "--sombra-texto": sombra.texto, "--sombra-fato": sombra.fato } as CSSProperties;

  return (
    <section ref={secao} className="hero" data-luz={modo} style={estilo} aria-labelledby="hero-titulo">
      <div className="hero-fundo" data-gl={gl} aria-hidden="true">
        {/* base: o mesmo saibro renderizado antes, aparece na hora; o WebGL entra por cima quando há GPU */}
        <PhotoSlot name="hero-saibro" alt="" sizes="100vw" prioridade className="hero-still" />
        <div className="hero-css">
          <span className="grao" />
          {medida && (
            <>
              <span className="l" style={{ left: 0, right: 0, top: medida.t.y - medida.lineW / 2, height: medida.lineW }} />
              <span className="l" style={{ left: medida.t.x - medida.lineW / 2, width: medida.lineW, top: 0, height: medida.t.y }} />
              <span className="b" style={{ left: medida.t.x - medida.ballR, top: medida.t.y - medida.ballR, width: medida.ballR * 2, height: medida.ballR * 2 }}>
                <Bola />
              </span>
            </>
          )}
        </div>
        <canvas ref={canvas} />
      </div>

      {medida && gl === "pronto" && (
        <button
          type="button"
          className="hero-bola-btn"
          aria-label="Quicar a bola"
          onPointerEnter={(e) => e.pointerType === "mouse" && !reduzRef.current && cena.current?.paira(true)}
          onPointerLeave={() => cena.current?.paira(false)}
          onPointerDown={() => (aperto.current = performance.now())}
          onClick={() => {
            if (reduzRef.current) return;
            // segurar um pouco antes de soltar dá mais força ao quique
            const t = aperto.current ? Math.min(300, performance.now() - aperto.current) / 300 : 0.5;
            cena.current?.quica(0.4 + 0.6 * t);
          }}
          style={{
            left: medida.t.x - medida.ballR * 1.6,
            top: medida.t.y - medida.ballR * 1.6,
            width: medida.ballR * 3.2,
            height: medida.ballR * 3.2,
          }}
        />
      )}

      <div className="wrap hero-corpo">
        <div className="hero-luz ui">
          <p data-pronto={horaPronta}>{legenda(modo, real, hora)}</p>
          <p className="sr-only" aria-live="polite">
            {anuncio}
          </p>
          <button
            type="button"
            onClick={() => {
              const novo = modo === "dia" ? "noite" : "dia";
              setModo(novo);
              setAnuncio(novo === "noite" ? "Refletores acesos." : "Quadra de dia.");
            }}
          >
            {modo === "dia" ? "Acender os refletores" : "Ver de dia"}
          </button>
        </div>
        <h1 id="hero-titulo" ref={titulo} className="hero-titulo display">
          <span className="mask">
            <span className="sobe" style={{ "--i": 0 } as CSSProperties}>
              Saibro.
            </span>
          </span>
          <span className="mask">
            <span className="sobe" style={{ "--i": 1 } as CSSProperties}>
              Técnica.
            </span>
          </span>
          <span className="mask">
            <span className="sobe" style={{ "--i": 2 } as CSSProperties}>
              Resultado
              <span ref={ponto} className="ponto">
                .
              </span>
              <span ref={ancora} className="ancora" />
            </span>
          </span>
        </h1>
        <div className="hero-baixo">
          <p className="hero-fato">
            Aulas de tênis e quadras para alugar no Rudge Ramos, em São Bernardo do Campo. Três quadras de saibro, uma rápida e um paredão
            iluminado.
          </p>
          <div className="hero-acoes">
            <Btn href={wa(mensagens.aula)} tom="claro">
              Agendar aula experimental
            </Btn>
            <BtnLinha href={wa(mensagens.quadra)}>Reservar quadra</BtnLinha>
          </div>
        </div>
      </div>
    </section>
  );
}
