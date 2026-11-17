"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { marca } from "./marca";

const curva = [0.22, 1, 0.36, 1] as const;
const vista = { once: true, margin: "0px 0px -12% 0px" } as const;

type TituloProps = {
  as?: "h1" | "h2" | "h3" | "p";
  /** Uma string por linha. Trechos entre *asteriscos* saem em serifa itálica. */
  linhas: string[];
  className?: string;
  atraso?: number;
};

/** Título que entra por linha, subindo de dentro de uma máscara. */
export function Titulo({ as = "h2", linhas, className, atraso = 0 }: TituloProps) {
  const Tag = motion[as];
  return (
    <Tag className={className} initial="fora" whileInView="dentro" viewport={vista}>
      {linhas.map((linha, i) => (
        <span className="mask" key={i}>
          <motion.span
            variants={{ fora: { y: "108%" }, dentro: { y: "0%" } }}
            transition={{ duration: 0.9, ease: curva, delay: atraso + i * 0.09 }}
          >
            {marca(linha)}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

type SurgeProps = { children: ReactNode; className?: string; atraso?: number; as?: "div" | "li" | "figure" };

/** Entrada discreta para blocos de texto e fotos: sobe até o lugar, sem fade. */
export function Surge({ children, className, atraso = 0, as = "div" }: SurgeProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ y: 44 }}
      whileInView={{ y: 0 }}
      viewport={vista}
      transition={{ duration: 0.8, ease: curva, delay: atraso }}
    >
      {children}
    </Tag>
  );
}

/** Linha de quadra horizontal que se desenha (stroke-dashoffset) ao entrar na tela. */
export function Traco({ className = "", atraso = 0 }: { className?: string; atraso?: number }) {
  return (
    <svg className={`traco ${className}`} aria-hidden="true">
      <motion.line
        x1="0"
        y1="0.5"
        x2="100%"
        y2="0.5"
        pathLength={1}
        strokeDasharray="1"
        initial={{ strokeDashoffset: 1 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={vista}
        transition={{ duration: 1.3, ease: curva, delay: atraso }}
      />
    </svg>
  );
}
