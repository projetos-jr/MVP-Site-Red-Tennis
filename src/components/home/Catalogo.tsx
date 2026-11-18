"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity } from "motion/react";
import { useRef, useState } from "react";
import { programas } from "@/content/red";
import { PhotoSlot } from "../PhotoSlot";

/** Catálogo de aulas: cada programa numa linha; no hover a linha enche de saibro e a foto segue o cursor. */
export function Catalogo() {
  const [ativo, setAtivo] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });
  const vx = useVelocity(sx);
  const giro = useTransform(vx, [-1600, 0, 1600], [-9, 0, 9], { clamp: true });
  const reduz = useReducedMotion();
  const dentro = useRef(false);

  return (
    <div
      className="catalogo"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        // a foto não sai pela direita da tela
        const nx = Math.min(e.clientX + 32, window.innerWidth - 276);
        const ny = e.clientY - 150;
        if (!dentro.current) {
          // ao entrar, a foto aparece já no cursor, sem atravessar a tela
          x.jump(nx);
          y.jump(ny);
          sx.jump(nx);
          sy.jump(ny);
          dentro.current = true;
        } else {
          x.set(nx);
          y.set(ny);
        }
      }}
      onPointerLeave={() => {
        setAtivo(null);
        dentro.current = false;
      }}
    >
      <ul>
        {programas.map((p, i) => {
          const [preco, periodo] = p.preco.split("/");
          return (
            <li key={p.id}>
              <Link href={`/aulas/#${p.id}`} className="cat-linha" onPointerEnter={(e) => e.pointerType === "mouse" && setAtivo(i)}>
                <span className="cat-nome sub">{p.nome}</span>
                <span className="cat-resumo">{p.resumo}</span>
                <span className="cat-ficha ui">
                  <span>{p.paraQuem}</span>
                  <span>{p.frequencia}</span>
                  <span>{p.duracao}</span>
                </span>
                <span className="cat-preco">
                  <span className="ui cat-de">a partir de</span>
                  <span className="placar">{preco.replace("R$ ", "R$")}</span>
                  <span className="ui">/{periodo}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <motion.div
        className="segue"
        style={reduz ? { x, y } : { x: sx, y: sy, rotate: giro }}
        animate={{ opacity: ativo === null ? 0 : 1, scale: ativo === null ? 0.9 : 1 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        aria-hidden="true"
      >
        {programas.map((p, i) => (
          <div key={p.id} className="segue-foto" data-ativo={ativo === i}>
            <PhotoSlot name={p.foto} alt="" sizes="260px" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
