"use client";

import { useEffect, useState } from "react";
import { eventos } from "@/content/red";

/** Cartaz do próximo torneio: data gigante, a chave do torneio como arte. */
export function Cartaz() {
  const e = eventos[0];
  const [dias, mes] = e.dataCurta.split(" ");
  return (
    <article className="cartaz sup-saibro com-grao" aria-label={`${e.nome}, ${e.tipo}, ${e.dataCurta}`}>
      <header className="cartaz-topo ui">
        <span>Red Tennis apresenta</span>
        <span>Temporada 2026</span>
      </header>
      <p className="cartaz-data placar">
        {dias.replace("—", "–")}
        <span>{mes}</span>
      </p>
      <svg className="cartaz-chave" viewBox="0 0 220 200" aria-hidden="true">
        <g fill="none" stroke="var(--papel)" strokeWidth="3">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <path key={i} d={`M0 ${12 + i * 24}h44`} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M44 ${12 + i * 48}v24h44`} />
          ))}
          {[0, 1].map((i) => (
            <path key={i} d={`M88 ${24 + i * 96}v48h44`} />
          ))}
          <path d="M132 48v96h44" />
        </g>
        <circle cx="194" cy="96" r="13" fill="var(--bola)" />
        <path d="M184 88c4 3 5 10 1 16M204 88c-4 3-5 10-1 16" stroke="#f9fbe9" strokeWidth="1.8" fill="none" />
      </svg>
      <footer className="cartaz-pe">
        <p className="cartaz-nome">{e.nome}</p>
        <p className="ui">
          {e.tipo}. Simples, categorias A, B, C e D.
        </p>
      </footer>
    </article>
  );
}

function diasAte(iso: string) {
  const alvo = new Date(iso + "T09:00:00-03:00").getTime();
  return Math.max(0, Math.ceil((alvo - Date.now()) / 86_400_000));
}

/** Contagem regressiva em placar. */
export function Contagem() {
  const e = eventos[0];
  const [d, setD] = useState<number | null>(null);
  useEffect(() => setD(diasAte(e.inicio)), [e.inicio]);
  return (
    <p className="contagem">
      <span className="ui sec">Faltam</span>
      <span className="placar contagem-num">{d === null ? "—" : String(d).padStart(2, "0")}</span>
      <span className="ui sec">
        {d === 1 ? "dia" : "dias"} para a {e.tipo.toLowerCase()} do {e.nome}
      </span>
    </p>
  );
}
