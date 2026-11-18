import Link from "next/link";
import type { ReactNode } from "react";

/** A bola: feltro limão com a costura. Único lugar onde o limão aparece. */
export function Bola({ className, titulo }: { className?: string; titulo?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role={titulo ? "img" : undefined} aria-label={titulo} aria-hidden={titulo ? undefined : true}>
      <circle cx="20" cy="20" r="19" fill="var(--bola)" />
      <path d="M6.2 8.6c6.6 5.4 8.3 16 2.6 24.4M33.8 7.2c-6.4 5.8-7.6 16.6-1.6 25.2" fill="none" stroke="#f9fbe9" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="19" fill="none" stroke="rgb(58 14 18 / 0.28)" strokeWidth="1.2" />
    </svg>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  tom?: "padrao" | "claro" | "escuro";
  className?: string;
};

/** Botão principal: bloco de tinta com a bola, que rola no hover. */
export function Btn({ href, children, tom = "padrao", className = "" }: BtnProps) {
  const cls = `btn ${tom === "claro" ? "btn-claro" : tom === "escuro" ? "btn-escuro" : ""} ${className}`;
  const conteudo = (
    <>
      <span>{children}</span>
      <Bola className="btn-bola" />
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

/** Ação secundária: texto sobre a linha de quadra. */
export function BtnLinha({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  if (href.startsWith("http")) {
    return (
      <a className={`btn-linha ${className}`} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={`btn-linha ${className}`} href={href}>
      {children}
    </Link>
  );
}

/** Logotipo: RED · bola · TENNIS, largo e oblíquo. */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="logo" onClick={onClick}>
      <span>Red</span> <Bola /> <span>Tennis</span>
      <span className="sr-only">, página inicial</span>
    </Link>
  );
}

/**
 * Selo do clube: carimbo redondo com o nome correndo na borda.
 * Herda a cor do texto (currentColor). `id` precisa ser único na página (o texto corre num caminho).
 */
export function Selo({ id, ano, className = "" }: { id: string; ano: number | string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`selo ${className}`} aria-hidden="true">
      <defs>
        <path id={id} d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0" />
      </defs>
      <circle cx="60" cy="60" r="56.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="60" cy="60" r="34.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <text className="selo-anel">
        <textPath href={`#${id}`} textLength="266" lengthAdjust="spacing">
          RED TENNIS · CLUBE DE TÊNIS · RUDGE RAMOS ·
        </textPath>
      </text>
      <text x="60" y="53" textAnchor="middle" className="selo-rot">
        DESDE
      </text>
      <text x="60" y="76" textAnchor="middle" className="selo-ano">
        {ano}
      </text>
    </svg>
  );
}
