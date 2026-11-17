/**
 * Mapa estilizado do entorno da Red (não é um mapa em escala).
 * A avenida é desenhada como linha de quadra; o pino é a bola.
 */
export function Mapa({ className = "" }: { className?: string }) {
  return (
    <svg className={`mapa ${className}`} viewBox="0 0 560 400" role="img" aria-label="Mapa estilizado: Red Tennis na Av. Winston Churchill, 626, Rudge Ramos">
      <g stroke="var(--linha)" strokeWidth="1" fill="none">
        <rect x="0.5" y="0.5" width="559" height="399" />
        <path d="M0 96h560M0 318h560M88 0v400M468 0v400M0 208l190-40M370 0l-56 136M250 400l40-130M560 250l-150-44" />
      </g>
      <path d="M-10 300 580 118" stroke="currentColor" strokeWidth="14" opacity="0.14" />
      <path d="M-10 300 580 118" stroke="currentColor" strokeWidth="1.5" />
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="262" y="118" width="96" height="52" transform="rotate(-17 310 144)" />
        <path d="M310 118v52M276 144h68" transform="rotate(-17 310 144)" strokeWidth="1" />
      </g>
      <circle cx="318" cy="198" r="22" fill="none" stroke="var(--bola)" strokeWidth="1" opacity="0.6" />
      <circle cx="318" cy="198" r="9" fill="var(--bola)" />
      <g fontFamily="var(--f-mono)" fontSize="10" letterSpacing="0.9" fill="currentColor">
        <text x="352" y="204">RED TENNIS · Nº 626</text>
        <text transform="rotate(-17 120 250)" x="24" y="286" opacity="0.8">AV. WINSTON CHURCHILL</text>
        <text x="16" y="24" opacity="0.6">RUDGE RAMOS · SBC</text>
        <text x="516" y="384" opacity="0.6">N ↑</text>
      </g>
    </svg>
  );
}
