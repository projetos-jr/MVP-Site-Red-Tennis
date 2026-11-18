"use client";

import { useEffect, useMemo, useState } from "react";
import { planta, reservaMock } from "@/content/red";
import { wa } from "@/lib/wa";
import { Btn } from "../ui";

/** Uma quadra de tênis em proporção real (23,77 x 10,97 m), vista de cima, em pé. */
function Quadra({ x, y, w, piso, ativa }: { x: number; y: number; w: number; piso: "saibro" | "rapida"; ativa: boolean }) {
  const h = w * (23.77 / 10.97);
  const k = w / 10.97;
  const al = 1.37 * k; // corredor de duplas
  const sv = 6.4 * k; // da rede à linha de saque
  const fundo = piso === "rapida" ? "var(--bordo)" : ativa ? "var(--saibro-fundo)" : "transparent";
  return (
    <g transform={`translate(${x} ${y})`} className="pl-quadra">
      {piso === "rapida" && <rect x={-k * 1.6} y={-k * 1.6} width={w + k * 3.2} height={h + k * 3.2} fill="#c8582f" />}
      <rect width={w} height={h} fill={fundo} />
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

function proximoLivre(agenda: number): string | null {
  const agora = new Date();
  const h = agora.getHours();
  const livres = reservaMock.horas.filter((hh) => !reservaMock.ocupados[agenda % reservaMock.ocupados.length].includes(hh));
  const hoje = livres.find((hh) => Number(hh.slice(0, 2)) > h);
  return hoje ? `hoje, ${Number(hoje.slice(0, 2))}h` : livres[0] ? `amanhã, ${Number(livres[0].slice(0, 2))}h` : null;
}

/** Planta ilustrativa da Red: toque numa quadra para ver o próximo horário livre e reservar. */
export function Planta() {
  const [sel, setSel] = useState(planta[0].id);
  const [prox, setProx] = useState<Record<string, string | null>>({});
  useEffect(() => {
    const m: Record<string, string | null> = {};
    for (const q of planta) m[q.id] = proximoLivre(q.agenda);
    setProx(m);
  }, []);
  const q = useMemo(() => planta.find((p) => p.id === sel) ?? planta[0], [sel]);
  const quando = prox[q.id];
  const W = 110;

  return (
    <div className="planta">
      <svg viewBox="0 0 700 420" className="planta-svg" role="group" aria-label="Planta ilustrativa da Red Tennis">
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
          <text x="500" y="362">Paredão e squash</text>
          <text x="40" y="412">Entrada pela Av. Winston Churchill</text>
        </g>
        {/* paredão */}
        <rect x="650" y="70" width="8" height="240" fill="var(--bordo)" stroke="var(--papel)" strokeWidth="1" />
        {planta.map((p) => {
          const pos = LAYOUT[p.id];
          return (
            <g
              key={p.id}
              role="button"
              tabIndex={0}
              aria-pressed={sel === p.id}
              aria-label={`${p.nome}, ${p.piso === "saibro" ? "saibro" : "quadra rápida"}`}
              className="pl-alvo"
              onClick={() => setSel(p.id)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setSel(p.id)}
              onFocus={() => setSel(p.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(p.id))}
            >
              <Quadra x={pos.x} y={pos.y} w={W} piso={p.piso} ativa={sel === p.id} />
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
      <div className="planta-ficha" aria-live="polite">
        <p className="sub t-h3">{q.nome}</p>
        <dl className="ficha-dados ui">
          <div>
            <dt>Piso</dt>
            <dd>{q.piso === "saibro" ? "Saibro (pó de tijolo)" : "Rápida, base asfáltica"}</dd>
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
          href={wa(`Olá, Red! Vim pelo site e quero reservar a ${q.nome.toLowerCase()}${quando ? `, ${quando}` : ""}.`)}
          tom="claro"
          className="btn-largo"
        >
          Reservar {q.nome.toLowerCase()}
        </Btn>
        <p className="ui planta-nota">Planta ilustrativa. Horários de exemplo.</p>
      </div>
    </div>
  );
}
