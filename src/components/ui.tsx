import Link from "next/link";
import type { ReactNode } from "react";

export function Seta({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 12 12 2M4.5 2H12v7.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  tom?: "bola" | "cal" | "grafite" | "linha";
  className?: string;
};

/** Botão do site. Links externos (WhatsApp, mapa) abrem em nova aba. */
export function Btn({ href, children, tom = "bola", className = "" }: BtnProps) {
  const cls = `btn btn-${tom} ${className}`;
  const conteudo = (
    <>
      <span>{children}</span>
      <span className="seta">
        <Seta />
      </span>
    </>
  );
  if (href.startsWith("http")) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {conteudo}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {conteudo}
    </Link>
  );
}

/** Numeração de seção em mono: "04 / AULAS". */
export function Rotulo({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="mono rotulo">
      {n && <b>{n} /</b>}
      <span>{children}</span>
    </p>
  );
}

/** A bola: círculo limão com a costura. */
export function Bola({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="var(--bola)" />
      <path d="M14 16c20 14 26 46 8 70M86 16C66 30 60 62 78 86" fill="none" stroke="#f7fbe0" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      <circle cx="50" cy="50" r="50" fill="url(#bola-sombra)" />
      <defs>
        <radialGradient id="bola-sombra" cx="0.68" cy="0.3" r="0.9">
          <stop offset="0.45" stopColor="#141210" stopOpacity="0" />
          <stop offset="1" stopColor="#141210" stopOpacity="0.38" />
        </radialGradient>
      </defs>
    </svg>
  );
}
