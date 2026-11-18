"use client";

import { useEffect, type ReactNode } from "react";

/** Scroll suave (Lenis), carregado depois da primeira pintura e desligado com movimento reduzido. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let destruir: (() => void) | undefined;
    let cancelado = false;
    const t = setTimeout(() => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelado) return;
        const lenis = new Lenis({ lerp: 0.12, anchors: true, autoRaf: true });
        destruir = () => lenis.destroy();
      });
    }, 1200);
    return () => {
      cancelado = true;
      clearTimeout(t);
      destruir?.();
    };
  }, []);
  return <>{children}</>;
}
