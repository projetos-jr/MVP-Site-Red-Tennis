"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { programas } from "@/content/red";
import { PhotoSlot } from "./PhotoSlot";

/** Tabela editorial de programas. No hover, a linha enche de saibro e uma foto segue o cursor. */
export function TabelaProgramas() {
  const [ativo, setAtivo] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });

  return (
    <div
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX + 28);
        y.set(e.clientY - 140);
      }}
      onPointerLeave={() => setAtivo(null)}
    >
      <div className="tab-cab mono" aria-hidden="true">
        <span>Nº</span>
        <span>Programa</span>
        <span>Para quem</span>
        <span>Frequência</span>
        <span>Duração</span>
        <span>A partir de</span>
      </div>
      <ul>
        {programas.map((p, i) => (
          <li key={p.id}>
            <Link
              href={`/aulas/#${p.id}`}
              className="tab-linha"
              onPointerEnter={(e) => e.pointerType === "mouse" && setAtivo(i)}
            >
              <span className="mono">0{i + 1}</span>
              <span className="display c-nome">{p.nome}</span>
              <span className="mono c-preco">{p.preco}</span>
              <span className="c-meta c-quem">{p.paraQuem}</span>
              <span className="mono c-meta c-freq">{p.frequencia}</span>
              <span className="mono c-meta c-dur">{p.duracao}</span>
            </Link>
          </li>
        ))}
      </ul>
      <motion.div
        className="segue"
        style={{ x: sx, y: sy }}
        animate={{ opacity: ativo === null ? 0 : 1, scale: ativo === null ? 0.92 : 1 }}
        transition={{ duration: 0.35 }}
        aria-hidden="true"
      >
        {programas.map((p, i) => (
          <PhotoSlot
            key={p.id}
            name={p.foto}
            alt=""
            sizes="220px"
            className={`absolute inset-0 transition-opacity duration-300 ${ativo === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </motion.div>
    </div>
  );
}
