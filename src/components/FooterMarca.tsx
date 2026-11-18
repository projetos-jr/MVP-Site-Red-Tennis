"use client";

import { useEffect, useRef } from "react";

/** "RED TENNIS" gigante que se estica de condensada para expandida enquanto entra na tela. */
export function FooterMarca() {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.fontVariationSettings = '"wdth" 150';
      return;
    }
    let raf = 0;
    const atualiza = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 quando o topo entra pela base da tela; 1 quando a base da marca chega à base da tela
      const p = Math.min(1, Math.max(0, (vh - r.top) / Math.max(1, r.height + 120)));
      el.style.fontVariationSettings = `"wdth" ${(62 + (150 - 62) * p).toFixed(1)}`;
    };
    const pede = () => {
      if (!raf) raf = requestAnimationFrame(atualiza);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) window.addEventListener("scroll", pede, { passive: true });
      else window.removeEventListener("scroll", pede);
      pede();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", pede);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <p ref={ref} className="rodape-marca display" style={{ fontVariationSettings: '"wdth" 62', fontStyle: "italic", fontFamily: "var(--f-display-it)" }} aria-hidden="true">
      Red Tennis
    </p>
  );
}
