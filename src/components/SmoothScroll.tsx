"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

/**
 * Scroll suave (Lenis) e respeito a prefers-reduced-motion para todo o site.
 * O Lenis é carregado depois da primeira pintura, para não pesar no carregamento.
 */
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

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
