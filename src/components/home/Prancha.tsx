"use client";

import { useRef, useState } from "react";
import fotos from "@/content/photos.generated.json";

type Foto = { widths: number[]; retWidths?: number[]; width: number; height: number };
const manifesto = fotos as Record<string, Foto>;

type Props = {
  nome: string;
  alt: string;
  fig: string;
  legenda: string;
  /** "prancha": de ponta a ponta, altura fixa. "quadro": dentro da grade, na proporção da foto. */
  formato?: "prancha" | "quadro";
  sizes?: string;
  className?: string;
};

/**
 * Foto real da Red impressa em duas tintas (saibro e bordô).
 * O cursor vira um conta-fios (a lupa do gráfico) e mostra a foto em cor por baixo da retícula.
 * No toque, o botão da legenda troca a impressão pela foto.
 */
export function FotoImpressa({ nome, alt, fig, legenda, formato = "quadro", sizes, className = "" }: Props) {
  const quadro = useRef<HTMLDivElement>(null);
  const [emCor, setEmCor] = useState(false);
  const foto = manifesto[nome];
  if (!foto) return null;
  const larguras = foto.retWidths ?? foto.widths;
  const ret = larguras.map((w) => `/fotos/${nome}-ret-${w}.png ${w}w`).join(", ");
  const cor = (ext: string) => foto.widths.map((w) => `/fotos/${nome}-${w}.${ext} ${w}w`).join(", ");
  const tam = sizes ?? (formato === "prancha" ? "(max-width: 48rem) 175vw, 100vw" : "(min-width: 64rem) 50vw, 100vw");
  const idLegenda = `${nome}-legenda`;

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = quadro.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--lx", `${e.clientX - r.left}px`);
    el.style.setProperty("--ly", `${e.clientY - r.top}px`);
    el.dataset.lente = "1";
  };

  return (
    <figure className={`impressa impressa-${formato} ${className}`} aria-labelledby={idLegenda}>
      <div
        ref={quadro}
        className="prancha-quadro"
        style={formato === "quadro" ? { aspectRatio: `${foto.width} / ${foto.height}`, height: "auto" } : undefined}
        data-cor={emCor}
        onPointerMove={move}
        onPointerLeave={() => {
          if (quadro.current) quadro.current.dataset.lente = "0";
        }}
      >
        <picture className="prancha-ret">
          <img src={`/fotos/${nome}-ret-${larguras.at(-1)}.png`} srcSet={ret} sizes={tam} width={foto.width} height={foto.height} loading="lazy" decoding="async" alt={alt} />
        </picture>
        <picture className="prancha-cor">
          <source type="image/avif" srcSet={cor("avif")} sizes={tam} />
          <img src={`/fotos/${nome}-${foto.widths.at(-1)}.webp`} srcSet={cor("webp")} sizes={tam} width={foto.width} height={foto.height} loading="lazy" decoding="async" alt="" />
        </picture>
        <span className="prancha-lente" aria-hidden="true" />
      </div>
      <figcaption className={`prancha-legenda ${formato === "prancha" ? "wrap" : ""}`}>
        <span className="ui prancha-fig">{fig}</span>
        <span id={idLegenda} className="prancha-texto">
          {legenda}
        </span>
        <button type="button" className="ui prancha-botao" aria-pressed={emCor} onClick={() => setEmCor((v) => !v)}>
          {emCor ? "Ver impressa" : "Ver em cor"}
        </button>
      </figcaption>
    </figure>
  );
}

/** Prancha da home: as quadras de saibro, de ponta a ponta da tela. */
export function Prancha() {
  return (
    <section className="prancha sup-papel" aria-label="As quadras de saibro da Red">
      <FotoImpressa
        nome="prancha-quadras"
        formato="prancha"
        fig="Fig. 2"
        legenda="As quadras de saibro, da rede até o paredão. Foto da Red, impressa em duas tintas."
        alt="As quadras de saibro da Red, com a rede, a cobertura de descanso e os postes dos refletores, impressas em duas tintas: saibro e bordô."
      />
    </section>
  );
}
