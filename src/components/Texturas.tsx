import { useId } from "react";

type RedeProps = {
  /** Ângulo da sombra em graus. */
  angulo?: number;
  /** Posição da fita da rede, em % da altura. */
  fita?: number;
  opacidade?: number;
  cor?: string;
  className?: string;
};

/**
 * Sombra da rede (ref. 03): a fita vira uma faixa escura e a trama cai
 * em diagonal sobre o piso. SVG puro, sem imagem.
 */
export function SombraRede({ angulo = -16, fita = 42, opacidade = 0.5, cor = "#5a1f0a", className = "" }: RedeProps) {
  const id = useId();
  return (
    <svg className={`textura ${className}`} aria-hidden="true" preserveAspectRatio="none" style={{ opacity: opacidade, mixBlendMode: "multiply" }}>
      <defs>
        <pattern id={id} width="44" height="30" patternUnits="userSpaceOnUse" patternTransform="skewX(-28)">
          <path d="M0 0H44M0 0V30" stroke={cor} strokeWidth="4.5" fill="none" />
        </pattern>
      </defs>
      <g style={{ transform: `rotate(${angulo}deg)`, transformOrigin: "50% 50%", transformBox: "fill-box" }}>
        <rect x="-50%" y={`${fita}%`} width="200%" height="34" fill={cor} />
        <rect x="-50%" y={`${fita}%`} width="200%" height="150%" fill={`url(#${id})`} />
      </g>
    </svg>
  );
}

/** Sombra de duas raquetes cruzadas (ref. 04), para seções de respiro. */
export function SombraRaquetes({ className = "", cor = "#5a1f0a" }: { className?: string; cor?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 760" fill="none" aria-hidden="true" style={{ mixBlendMode: "multiply" }}>
      <g stroke={cor} strokeWidth="13" strokeLinecap="round" opacity="0.62">
        <ellipse cx="178" cy="212" rx="112" ry="150" transform="rotate(-8 178 212)" />
        <ellipse cx="226" cy="520" rx="112" ry="150" transform="rotate(7 226 520)" />
        <path d="M118 84C132 46 150 20 158 -20M236 80C222 44 212 16 208 -20" />
        <path d="M166 652c8 40 12 72 12 128M286 648c-12 40-22 74-30 132" />
      </g>
      <g fill={cor} opacity="0.7">
        <ellipse cx="130" cy="268" rx="34" ry="38" transform="rotate(-14 130 268)" />
        <ellipse cx="208" cy="548" rx="36" ry="40" transform="rotate(10 208 548)" />
        <ellipse cx="150" cy="86" rx="13" ry="8" />
      </g>
    </svg>
  );
}
