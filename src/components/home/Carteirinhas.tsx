"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { mensagens, planos, type Plano } from "@/content/red";
import { wa } from "@/lib/wa";
import { Bola, Btn } from "../ui";

const TOM: Record<string, string> = { saibro: "cart-saibro", pro: "cart-papel", familia: "cart-vinho" };

/** A carteirinha de sócio: inclina na direção do cursor, com o reflexo do plástico. */
function Cartao({ p }: { p: Plano }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(30);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const brilho = useTransform([gx, gy] as MotionValue[], ([x, y]: number[]) => `radial-gradient(60% 70% at ${x}% ${y}%, rgb(255 255 255 / 0.28), transparent 70%)`);
  return (
    <motion.article
      className={`cart ${TOM[p.id] ?? "cart-saibro"}`}
      style={{ rotateX: srx, rotateY: sry }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 16);
        rx.set(-(py - 0.5) * 12);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      aria-label={`Carteirinha do plano ${p.nome}`}
    >
      <div className="cart-topo">
        <span className="cart-logo">
          Red <Bola /> Tennis
        </span>
        <span className="ui">Sócio do clube</span>
      </div>
      <p className="cart-nome">{p.nome}</p>
      <span className="cart-faixa" aria-hidden="true" />
      <div className="cart-pe">
        <span>
          <span className="ui cart-rot">Nº de sócio</span>
          <span className="placar cart-num">{p.numero.padStart(4, "0")}</span>
        </span>
        <span>
          <span className="ui cart-rot">Temporada</span>
          <span className="placar cart-num">2027</span>
        </span>
        <Bola className="cart-chip" />
      </div>
      <motion.span className="cart-brilho" style={{ backgroundImage: brilho }} aria-hidden="true" />
    </motion.article>
  );
}

/** As três carteirinhas: chegam empilhadas e abrem em leque com a rolagem (no desktop). */
export function Carteirinhas() {
  const ref = useRef<HTMLDivElement>(null);
  const reduz = useReducedMotion();
  const [largo, setLargo] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const f = () => setLargo(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 100%", "start 45%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const ativo = largo && !reduz;

  // de empilhadas (no centro) para as colunas
  const x0 = useTransform(p, [0, 1], ["70%", "0%"]);
  const x2 = useTransform(p, [0, 1], ["-70%", "0%"]);
  const r0 = useTransform(p, [0, 1], [-9, 0]);
  const r1 = useTransform(p, [0, 1], [3, 0]);
  const r2 = useTransform(p, [0, 1], [11, 0]);
  const y1 = useTransform(p, [0, 1], [-18, 0]);
  const movimentos = [
    { x: x0, rotate: r0, zIndex: 1 },
    { y: y1, rotate: r1, zIndex: 3 },
    { x: x2, rotate: r2, zIndex: 2 },
  ];

  return (
    <div ref={ref} className="carteirinhas">
      {planos.map((plano, i) => {
        const [preco] = plano.preco.split("/");
        return (
          <div key={plano.id} className="plano" data-destaque={plano.destaque ?? false}>
            <motion.div className="plano-cartao" style={ativo ? movimentos[i] : undefined}>
              <Cartao p={plano} />
            </motion.div>
            <div className="plano-info">
              <p className="plano-preco">
                <span className="placar">{preco.replace("R$ ", "R$")}</span>
                <span className="ui sec"> {plano.periodo}</span>
              </p>
              <p className="sec plano-chamada">{plano.chamada}</p>
              <ul className="plano-lista">
                {plano.inclui.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <Btn href={wa(`${mensagens.clube} Tenho interesse no plano ${plano.nome}.`)} tom={plano.destaque ? "claro" : "padrao"} className="btn-largo">
                Quero o plano {plano.nome}
              </Btn>
            </div>
          </div>
        );
      })}
    </div>
  );
}
