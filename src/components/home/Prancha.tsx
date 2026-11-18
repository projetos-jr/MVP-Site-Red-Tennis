"use client";

import { useRef, useState } from "react";
import fotos from "@/content/photos.generated.json";

type Foto = { widths: number[]; retWidths?: number[]; width: number; height: number };
const foto = (fotos as Record<string, Foto>)["prancha-quadras"];

/**
 * Prancha: a foto das quadras impressa em duas tintas, de ponta a ponta da tela.
 * O cursor vira um conta-fios (a lupa do gráfico) e mostra a foto em cor por baixo da retícula.
 * No toque, o botão da legenda troca a impressão pela foto.
 */
export function Prancha() {
  const quadro = useRef<HTMLDivElement>(null);
  const [emCor, setEmCor] = useState(false);
  if (!foto) return null;
  const ret = (foto.retWidths ?? foto.widths).map((w) => `/fotos/prancha-quadras-ret-${w}.png ${w}w`).join(", ");
  const cor = (ext: string) => foto.widths.map((w) => `/fotos/prancha-quadras-${w}.${ext} ${w}w`).join(", ");
  const sizes = "(max-width: 48rem) 175vw, 100vw";
  const maiorRet = (foto.retWidths ?? foto.widths).at(-1);

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
    <section className="prancha sup-papel" aria-labelledby="prancha-legenda">
      <figure>
        <div
          ref={quadro}
          className="prancha-quadro"
          data-cor={emCor}
          onPointerMove={move}
          onPointerLeave={() => {
            if (quadro.current) quadro.current.dataset.lente = "0";
          }}
        >
          <picture className="prancha-ret">
            <img
              src={`/fotos/prancha-quadras-ret-${maiorRet}.png`}
              srcSet={ret}
              sizes={sizes}
              width={foto.width}
              height={foto.height}
              loading="lazy"
              decoding="async"
              alt="As quadras de saibro da Red, com a rede, a cobertura de descanso e os postes dos refletores, impressas em duas tintas: saibro e bordô."
            />
          </picture>
          <picture className="prancha-cor">
            <source type="image/avif" srcSet={cor("avif")} sizes={sizes} />
            <img src={`/fotos/prancha-quadras-${foto.widths.at(-1)}.webp`} srcSet={cor("webp")} sizes={sizes} width={foto.width} height={foto.height} loading="lazy" decoding="async" alt="" />
          </picture>
          <span className="prancha-lente" aria-hidden="true" />
        </div>
        <figcaption className="wrap prancha-legenda">
          <span className="ui prancha-fig">Fig. 2</span>
          <span id="prancha-legenda" className="prancha-texto">
            As quadras de saibro, da rede até o paredão. Foto da Red, impressa em duas tintas.
          </span>
          <button type="button" className="ui prancha-botao" aria-pressed={emCor} onClick={() => setEmCor((v) => !v)}>
            {emCor ? "Ver impressa" : "Ver em cor"}
          </button>
        </figcaption>
      </figure>
    </section>
  );
}
