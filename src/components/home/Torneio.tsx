"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { eventos, ranking } from "@/content/red";

/** A chave do torneio como arte: oito nomes na primeira rodada e a bola no campeão (nomes de exemplo, do ranking). */
function Chave() {
  const nomes = ranking.slice(0, 8).map((j) => j.nome);
  const ordem = [0, 7, 3, 4, 2, 5, 1, 6]; // cabeças de chave nas pontas
  const y = (i: number) => 18 + i * 26;
  return (
    <svg className="cartaz-chave" viewBox="0 0 520 220" aria-hidden="true">
      <g fill="none" stroke="var(--papel)" strokeWidth="2.5">
        {ordem.map((_, i) => (
          <path key={i} d={`M0 ${y(i)}h150`} pathLength={1} style={{ "--r": 0 } as CSSProperties} />
        ))}
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M150 ${y(2 * k)}V${y(2 * k + 1)}M150 ${31 + 52 * k}H270`} pathLength={1} style={{ "--r": 1 } as CSSProperties} />
        ))}
        {[0, 1].map((j) => (
          <path key={j} d={`M270 ${31 + 104 * j}V${83 + 104 * j}M270 ${57 + 104 * j}H380`} pathLength={1} style={{ "--r": 2 } as CSSProperties} />
        ))}
        <path d="M380 57V161M380 109H468" pathLength={1} style={{ "--r": 3 } as CSSProperties} />
      </g>
      <g fill="var(--papel)" fontFamily="var(--f-display)" fontSize="13" fontWeight="650" style={{ fontVariationSettings: '"wdth" 108' }}>
        {ordem.map((n, i) => (
          <text key={i} x="2" y={y(i) - 6}>
            {nomes[n]}
          </text>
        ))}
      </g>
      <g className="chave-bola">
        <circle cx="490" cy="109" r="16" fill="var(--bola)" />
        <path d="M478 99c5 4 6 13 1 20M502 99c-5 4-6 13-1 20" stroke="#f9fbe9" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/** Cartaz do próximo torneio: data gigante, a chave do torneio como arte. */
export function Cartaz() {
  const e = eventos[0];
  const [dias, mes] = e.dataCurta.split(" ");
  const ref = useRef<HTMLElement>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // a chave se joga uma vez, quando metade do cartaz entra na tela
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          setVisto(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <article ref={ref} data-visto={visto} className="cartaz sup-saibro com-grao" aria-label={`${e.nome}, ${e.tipo}, ${e.dataCurta}`}>
      <header className="cartaz-topo ui">
        <span>Red Tennis apresenta</span>
        <span>Temporada {e.inicio.slice(0, 4)}</span>
      </header>
      <p className="cartaz-data placar">
        {dias.replace("—", "–")}
        <span>{mes}</span>
      </p>
      <Chave />
      <footer className="cartaz-pe">
        <p className="cartaz-nome">{e.nome}</p>
        <p className="ui">
          {e.tipo}. Simples, categorias A, B, C e D.
        </p>
      </footer>
    </article>
  );
}

/** Dias (no calendário de São Paulo) até a data; negativo se já passou. */
function diasAte(iso: string) {
  const hoje = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
  return Math.round((Date.parse(iso + "T12:00:00Z") - Date.parse(hoje + "T12:00:00Z")) / 86_400_000);
}

/** Contagem regressiva em placar. */
export function Contagem() {
  const e = eventos[0];
  const [d, setD] = useState<number | null>(null);
  const [acabou, setAcabou] = useState(false);
  useEffect(() => {
    setD(diasAte(e.inicio));
    setAcabou(diasAte(e.fim ?? e.inicio) < 0);
  }, [e.inicio, e.fim]);
  if (acabou) return null;
  if (d !== null && d <= 0) {
    return (
      <p className="contagem">
        <span className="placar contagem-num">Hoje</span>
        <span className="ui sec">
          É a {e.tipo.toLowerCase()} do {e.nome}. Venha assistir às finais.
        </span>
      </p>
    );
  }
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
