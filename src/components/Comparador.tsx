"use client";

import { useState } from "react";
import { quadras } from "@/content/red";
import { PhotoSlot } from "./PhotoSlot";

/** Comparador de pisos: arraste a linha central (ou use as setas do teclado). */
export function Comparador() {
  const [pos, setPos] = useState(50);
  const [saibro, rapida] = quadras;

  return (
    <div className="comp">
      <PhotoSlot name={rapida.foto} alt={rapida.alt} sizes="100vw" />
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <PhotoSlot name={saibro.foto} alt={saibro.alt} sizes="100vw" />
      </div>
      <p className="display comp-nome" style={{ left: "1rem", opacity: pos > 38 ? 1 : 0 }} aria-hidden="true">
        {saibro.nome}
      </p>
      <p className="display comp-nome" style={{ right: "1rem", opacity: pos < 62 ? 1 : 0 }} aria-hidden="true">
        {rapida.nome}
      </p>
      <div className="comp-eixo" style={{ left: `${pos}%` }}>
        <span className="comp-pega">
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
            <path d="M6 1 1 6l5 5M16 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparar os pisos: saibro à esquerda, quadra rápida à direita"
        aria-valuetext={`${pos}% saibro, ${100 - pos}% quadra rápida`}
      />
    </div>
  );
}
