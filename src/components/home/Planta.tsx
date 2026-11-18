"use client";

import { useEffect, useMemo, useState } from "react";
import { planta } from "@/content/red";
import { proximoLivre } from "@/lib/reservas";
import { wa } from "@/lib/wa";
import { Btn } from "../ui";

/** Uma quadra de tênis em proporção real (23,77 x 10,97 m), vista de cima, em pé. */
function Quadra({ x, y, w, piso, ativa }: { x: number; y: number; w: number; piso: "saibro" | "rapida" | "paredao"; ativa: boolean }) {
  const h = w * (23.77 / 10.97);
  const k = w / 10.97;
  const al = 1.37 * k; // corredor de duplas
  const sv = 6.4 * k; // da rede à linha de saque
  const fundo = piso === "rapida" ? "var(--bordo)" : ativa ? "var(--saibro-fundo)" : "transparent";
  return (
    <g transform={`translate(${x} ${y})`} className="pl-quadra">
      {piso === "rapida" && <rect x={-k * 1.6} y={-k * 1.6} width={w + k * 3.2} height={h + k * 3.2} fill="var(--saibro-fundo)" />}
      <rect className="pl-borda" width={w} height={h} fill={fundo} />
      <g fill="none" stroke="var(--papel)" strokeWidth={ativa ? 2.2 : 1.4}>
        <rect width={w} height={h} />
        <path d={`M${al} 0v${h}M${w - al} 0v${h}M${al} ${h / 2 - sv}h${w - 2 * al}M${al} ${h / 2 + sv}h${w - 2 * al}M${w / 2} ${h / 2 - sv}v${sv * 2}M${w / 2} 0v${k * 0.3}M${w / 2} ${h}v${-k * 0.3}`} />
      </g>
      <path d={`M${-k * 0.9} ${h / 2}H${w + k * 0.9}`} stroke="var(--papel)" strokeWidth={ativa ? 3 : 2} strokeDasharray="2 2" />
    </g>
  );
}

const LAYOUT: Record<string, { x: number; y: number }> = {
  q1: { x: 70, y: 70 },
  q2: { x: 200, y: 70 },
  q3: { x: 330, y: 70 },
  q4: { x: 506, y: 70 },
};

/** Planta ilustrativa da Red: toque numa quadra para ver o próximo horário livre e reservar. */
export function Planta() {
  const [sel, setSel] = useState(planta[0].id);
  const [prox, setProx] = useState<Record<string, string | null>>({});
  useEffect(() => {
    const calcula = () => {
      const m: Record<string, string | null> = {};
      for (const q of planta) m[q.id] = proximoLivre(q.id, q.agenda);
      setProx(m);
    };
    calcula();
    const t = setInterval(calcula, 60_000);
    return () => clearInterval(t);
  }, []);
  const q = useMemo(() => planta.find((p) => p.id === sel) ?? planta[0], [sel]);
  const quando = prox[q.id];
  const artigo = q.piso === "paredao" ? "o" : "a";
  const W = 110;

  return (
    <div className="planta">
      <svg viewBox="30 30 640 392" className="planta-svg" role="group" aria-label="Planta ilustrativa da Red Tennis">
        {/* muros e áreas de apoio */}
        <g fill="none" stroke="var(--papel)" strokeWidth="1" opacity="0.55">
          <rect x="30" y="30" width="640" height="360" />
          <path d="M470 30v360" />
        </g>
        <g className="pl-area" fill="var(--saibro-fundo)">
          <rect x="70" y="340" width="370" height="34" />
          <rect x="490" y="340" width="166" height="34" />
        </g>
        <g className="pl-area-txt" fontFamily="var(--f-display)" fontSize="13" fontWeight="650" fill="var(--papel)" style={{ fontVariationSettings: '"wdth" 110' }}>
          <text x="82" y="362">Vestiários, armários e Wi-Fi</text>
          <text x="500" y="362">Squash</text>
          <text x="32" y="414">Entrada pela Av. Winston Churchill</text>
        </g>
        {planta.map((p) => {
          const ativa = sel === p.id;
          const alvo = {
            role: "button",
            tabIndex: 0,
            "aria-pressed": ativa,
            className: "pl-alvo",
            onClick: () => setSel(p.id),
            onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setSel(p.id),
            onFocus: () => setSel(p.id),
            onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(p.id)),
          } as const;
          if (p.piso === "paredao") {
            // o paredão: a parede (bordô, com a faixa na altura da rede) e a área de batida na frente dela
            return (
              <g key={p.id} {...alvo} aria-label="Paredão">
                <rect x="618" y="60" width="50" height="262" fill="transparent" />
                <rect className="pl-borda" x="626" y="70" width="20" height="240" fill={ativa ? "var(--saibro-fundo)" : "transparent"} stroke="var(--papel)" strokeWidth={ativa ? 2.2 : 1.2} strokeDasharray={ativa ? undefined : "3 3"} />
                <rect x="646" y="70" width="14" height="240" fill="var(--bordo)" stroke="var(--papel)" strokeWidth={ativa ? 2.2 : 1} />
                <path d="M653 70v240" stroke="var(--papel)" strokeWidth="1.6" strokeDasharray="1 5" />
                <text className="pl-longo" x="636" y="190" textAnchor="middle" transform="rotate(-90 636 190)" fontFamily="var(--f-display)" fontSize="14" fontWeight="700" fill="var(--papel)" style={{ fontVariationSettings: '"wdth" 112' }}>
                  Paredão
                </text>
                <text className="pl-curto" x="643" y="56" textAnchor="middle" fontFamily="var(--f-display)" fontSize="30" fontWeight="700" fill="var(--papel)" style={{ fontVariationSettings: '"wdth" 112' }}>
                  P
                </text>
              </g>
            );
          }
          const pos = LAYOUT[p.id];
          return (
            <g
              key={p.id}
              role="button"
              tabIndex={0}
              aria-pressed={sel === p.id}
              aria-label={`${p.nome}${p.piso === "saibro" ? ", saibro" : ""}`}
              className="pl-alvo"
              onClick={() => setSel(p.id)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setSel(p.id)}
              onFocus={() => setSel(p.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(p.id))}
            >
              <Quadra x={pos.x} y={pos.y} w={W} piso={p.piso} ativa={ativa} />
              <text x={pos.x + W / 2} y={pos.y - 14} textAnchor="middle" fontFamily="var(--f-display)" fontWeight="700" fill="var(--papel)" style={{ fontVariationSettings: '"wdth" 112' }}>
                <tspan className="pl-longo" fontSize="14">
                  {p.nome}
                </tspan>
                <tspan className="pl-curto" fontSize="30">
                  {p.piso === "rapida" ? "R" : p.nome.replace("Quadra ", "")}
                </tspan>
              </text>
            </g>
          );
        })}
      </svg>
      <div className="planta-ficha">
        <p className="sub t-h3">{q.nome}</p>
        <dl className="ficha-dados ui" aria-live="polite">
          <div>
            <dt>Piso</dt>
            <dd>{q.piso === "saibro" ? "Saibro (pó de tijolo)" : q.piso === "paredao" ? "Parede de treino, faixa na altura da rede" : "Rápida, base asfáltica"}</dd>
          </div>
          <div>
            <dt>Luz</dt>
            <dd>{q.luz}</dd>
          </div>
          <div>
            <dt>Próximo horário livre</dt>
            <dd className="placar ficha-hora">{quando ?? "consulte"}</dd>
          </div>
        </dl>
        <Btn
          href={wa(`Olá, Red! Vim pelo site e quero reservar ${artigo} ${q.nome.toLowerCase()}${quando ? ` ${quando.replace(", ", ", às ")}` : ""}. Está livre?`)}
          tom="claro"
          className="btn-largo"
        >
          Reservar {artigo} {q.nome.toLowerCase()}
        </Btn>
        <p className="ui planta-nota">Planta ilustrativa. Horários de exemplo.</p>
      </div>
    </div>
  );
}
