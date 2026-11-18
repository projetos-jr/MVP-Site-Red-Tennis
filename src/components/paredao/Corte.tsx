"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Corte do paredão, como um desenho técnico: você à esquerda, a parede à direita,
 * a faixa na altura da rede e a bola indo e voltando. Cada batida na parede soma no placar.
 * Escala: 60 px por metro. Sem animação para quem prefere menos movimento.
 */

const CHAO = 270;
const PAREDE = 650; // face da parede
const FAIXA = CHAO - 0.914 * 60; // altura da rede
const RAQ = { x: 236, y: 220 }; // ponto de contato

type P = [number, number];
const bez = (a: P, c: P, b: P, t: number): P => {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
};

/** Uma troca: ida até a parede, volta até o quique e subida até a raquete. Controle no meio em x: o x anda constante, como num lançamento de verdade. */
function troca(impacto: number, quique: number, apice: number) {
  const ida: [P, P, P] = [[RAQ.x, RAQ.y], [(RAQ.x + PAREDE) / 2, apice], [PAREDE - 7, impacto]];
  const volta: [P, P, P] = [[PAREDE - 7, impacto], [(PAREDE + quique) / 2, impacto + 8], [quique, CHAO - 7]];
  const sobe: [P, P, P] = [[quique, CHAO - 7], [(quique + RAQ.x) / 2, 150], [RAQ.x, RAQ.y]];
  return [
    { seg: ida, dur: 0.95 },
    { seg: volta, dur: 0.5 },
    { seg: sobe, dur: 0.7 },
  ];
}

export function Corte({ tom = "papel" }: { tom?: "papel" | "escuro" }) {
  const svg = useRef<SVGSVGElement>(null);
  const bola = useRef<SVGGElement>(null);
  const sombra = useRef<SVGEllipseElement>(null);
  const raquete = useRef<SVGGElement>(null);
  const impacto = useRef<SVGCircleElement>(null);
  const placar = useRef<HTMLSpanElement>(null);
  const [parado, setParado] = useState(false);
  const [reduz, setReduz] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduz(mq.matches);
    const f = () => setReduz(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  useEffect(() => {
    const el = svg.current;
    if (!el || reduz || parado) return;
    let raf = 0;
    let visivel = false;
    let t0 = 0;
    let fase = 0;
    let rodada = troca(170, 430, 118);
    let conta = Number(placar.current?.dataset.n ?? 0);
    let flash = -1;

    const quadro = (agora: number) => {
      raf = requestAnimationFrame(quadro);
      if (!t0) t0 = agora;
      let dt = (agora - t0) / 1000;
      while (dt > rodada[fase].dur) {
        dt -= rodada[fase].dur;
        t0 += rodada[fase].dur * 1000;
        fase++;
        if (fase === 1) {
          // a bola bateu na parede
          conta++;
          flash = agora;
          if (placar.current) {
            placar.current.textContent = String(conta).padStart(3, "0");
            placar.current.dataset.n = String(conta);
          }
        }
        if (fase === rodada.length) {
          fase = 0;
          // cada troca é um pouco diferente: altura na parede, quique e arco
          rodada = troca(150 + Math.random() * 40, 400 + Math.random() * 70, 104 + Math.random() * 30);
        }
      }
      const { seg, dur } = rodada[fase];
      const [x, y] = bez(seg[0], seg[1], seg[2], Math.min(1, dt / dur));
      bola.current?.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      const alt = Math.max(0, CHAO - y);
      if (sombra.current) {
        sombra.current.setAttribute("cx", x.toFixed(1));
        sombra.current.setAttribute("rx", (8 - alt / 30).toFixed(2));
        sombra.current.style.opacity = String(Math.max(0.08, 0.4 - alt / 400));
      }
      // a raquete arma enquanto a bola volta e acompanha depois do golpe
      let ang = 26; // terminação do golpe
      if (fase === 0 && dt < 0.12) ang = -44 + (dt / 0.12) * 70; // o golpe
      if (fase === 2) ang = 26 - 70 * Math.min(1, dt / dur); // arma para a próxima
      raquete.current?.setAttribute("transform", `rotate(${ang.toFixed(1)} ${RAQ.x - 30} ${RAQ.y + 34})`);
      if (impacto.current) {
        const k = flash < 0 ? 1 : Math.min(1, (agora - flash) / 380);
        impacto.current.setAttribute("r", (4 + k * 18).toFixed(1));
        impacto.current.style.opacity = String((1 - k) * 0.9);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      cancelAnimationFrame(raf);
      t0 = 0;
      if (visivel) raf = requestAnimationFrame(quadro);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduz, parado]);

  const estatico = reduz || parado;
  const parada = bez([RAQ.x, RAQ.y], [(RAQ.x + PAREDE) / 2, 118], [PAREDE - 7, 170], 0.62);

  return (
    <figure className={`corte corte-${tom}`}>
      <div className="corte-topo">
        <p className="corte-placar" aria-hidden="true">
          <span className="ui">Bolas devolvidas</span>
          <span ref={placar} className="placar" data-n="0">
            {estatico ? "1.000/h" : "000"}
          </span>
        </p>
        {!reduz && (
          <button type="button" className="ui corte-botao" aria-pressed={parado} onClick={() => setParado((v) => !v)}>
            {parado ? "Continuar a bola" : "Pausar a bola"}
          </button>
        )}
      </div>
      <svg ref={svg} viewBox="150 44 604 270" className="corte-svg" role="img" aria-labelledby="corte-desc">
        <title id="corte-desc">
          Corte do paredão: o jogador bate a bola de seis a oito metros da parede, a bola acerta a parede acima da faixa pintada na altura da rede, quica no chão e volta para a raquete.
        </title>
        <defs>
          <pattern id="corte-hachura" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 0v9" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
          </pattern>
        </defs>
        {/* chão, em corte */}
        <rect x="150" y={CHAO} width="560" height="22" fill="url(#corte-hachura)" />
        <path d={`M150 ${CHAO}H${PAREDE + 40}`} stroke="currentColor" strokeWidth="3" />
        {/* a parede, em corte, com a faixa na altura da rede */}
        <rect x={PAREDE} y="70" width="34" height={CHAO - 70} className="corte-parede" />
        <rect x={PAREDE} y="70" width="34" height={CHAO - 70} fill="url(#corte-hachura)" opacity="0.5" />
        <rect x={PAREDE - 1} y={FAIXA - 3} width="6" height="6" fill="var(--papel)" />
        {/* altura da rede, tracejada até você */}
        <path d={`M${RAQ.x - 40} ${FAIXA}H${PAREDE}`} stroke="currentColor" strokeWidth="1.4" strokeDasharray="6 6" opacity="0.6" />
        <text x={RAQ.x + 70} y={FAIXA - 8} className="corte-rot">
          altura da rede
        </text>
        {/* cota: 91 cm */}
        <g stroke="currentColor" strokeWidth="1.2">
          <path d={`M${PAREDE + 44} ${CHAO}V${FAIXA}M${PAREDE + 38} ${CHAO}h12M${PAREDE + 38} ${FAIXA}h12`} />
        </g>
        <text x={PAREDE + 52} y={(CHAO + FAIXA) / 2 + 4} className="corte-rot corte-cota">
          91 cm
        </text>
        {/* cota: distância */}
        <g stroke="currentColor" strokeWidth="1.2">
          <path d={`M${RAQ.x} 298H${PAREDE}M${RAQ.x} 292v12M${PAREDE} 292v12`} />
        </g>
        <rect x={(RAQ.x + PAREDE) / 2 - 92} y="286" width="184" height="24" className="corte-fundo-rot" />
        <text x={(RAQ.x + PAREDE) / 2} y="302" textAnchor="middle" className="corte-rot">
          6 a 8 m da parede
        </text>
        {/* nota da batida */}
        <path d={`M${PAREDE - 12} 160L${PAREDE - 52} 92H${PAREDE - 262}`} fill="none" stroke="currentColor" strokeWidth="1.2" />
        <text x={PAREDE - 262} y="84" className="corte-rot">
          acima da faixa<tspan className="so-largo">: passaria a rede</tspan>
        </text>
        {/* trajetória de referência */}
        <path
          d={`M${RAQ.x} ${RAQ.y}Q${(RAQ.x + PAREDE) / 2} 118 ${PAREDE - 7} 170Q${(PAREDE + 430) / 2} 178 430 ${CHAO - 7}Q${(430 + RAQ.x) / 2} 150 ${RAQ.x} ${RAQ.y}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="1 7"
          strokeLinecap="round"
          opacity="0.55"
        />
        {/* você */}
        <g ref={raquete} transform={`rotate(26 ${RAQ.x - 30} ${RAQ.y + 34})`} className="corte-raquete">
          <path d={`M${RAQ.x - 30} ${RAQ.y + 34}L${RAQ.x - 6} ${RAQ.y + 8}`} strokeWidth="5" strokeLinecap="round" />
          <ellipse cx={RAQ.x + 4} cy={RAQ.y - 4} rx="11" ry="16" transform={`rotate(40 ${RAQ.x + 4} ${RAQ.y - 4})`} strokeWidth="3" fill="none" />
          <path d={`M${RAQ.x - 4} ${RAQ.y - 14}l16 16M${RAQ.x - 8} ${RAQ.y - 6}l14 14M${RAQ.x} ${RAQ.y - 18}l12 12`} strokeWidth="0.8" opacity="0.6" />
        </g>
        <text x={RAQ.x - 16} y={RAQ.y - 40} className="corte-rot" textAnchor="end">
          você
        </text>
        {/* a bola */}
        <ellipse ref={sombra} cx={estatico ? parada[0] : RAQ.x} cy={CHAO + 2} rx="5" ry="2" className="corte-sombra" style={{ opacity: 0.25 }} />
        <circle ref={impacto} cx={PAREDE - 2} cy="168" r="4" fill="none" stroke="var(--bola)" strokeWidth="2.5" style={{ opacity: 0 }} />
        <g ref={bola} transform={`translate(${estatico ? parada[0].toFixed(1) : RAQ.x} ${estatico ? parada[1].toFixed(1) : RAQ.y})`}>
          <circle r="7" fill="var(--bola)" stroke="rgb(58 14 18 / 0.45)" strokeWidth="1" />
          <path d="M-5 -4.5c2.6 2 3 6 0.6 9.2M5 -4.8c-2.4 2.2-2.8 6.2-0.4 9.4" fill="none" stroke="#f9fbe9" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    </figure>
  );
}
