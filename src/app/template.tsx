"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";

const useLayoutIso = typeof window === "undefined" ? useEffect : useLayoutEffect;
let primeiraVisita = true;

/** Transição entre páginas: um pano de saibro sobe e revela a página nova (só em navegação interna). */
export default function Template({ children }: { children: ReactNode }) {
  const [cortina, setCortina] = useState(false);
  useLayoutIso(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!primeiraVisita && !reduz) setCortina(true);
    primeiraVisita = false;
  }, []);
  return (
    <>
      {cortina && (
        <div className="cortina" aria-hidden="true" onAnimationEnd={() => setCortina(false)}>
          <span className="cortina-faixa" />
        </div>
      )}
      {children}
    </>
  );
}
