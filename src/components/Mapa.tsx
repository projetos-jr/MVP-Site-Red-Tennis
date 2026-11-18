/**
 * Mapa desenhado do entorno da Red (ilustrativo, não está em escala).
 * A avenida é desenhada como linha de quadra; o pino é a bola.
 */
export function Mapa({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`mapa ${className}`}
      viewBox="0 0 560 420"
      role="img"
      aria-label="Mapa ilustrativo: Red Tennis na Avenida Winston Churchill, 626, Rudge Ramos, São Bernardo do Campo"
    >
      <rect x="0" y="0" width="560" height="420" fill="currentColor" opacity="0.06" />
      <g stroke="currentColor" strokeWidth="1" opacity="0.32" fill="none">
        <path d="M0 92h560M0 330h560M96 0v420M470 0v420M0 214l200-42M380 0l-60 142M250 420l44-136M560 262l-158-46" />
      </g>
      {/* quarteirões */}
      <g fill="currentColor" opacity="0.08">
        <path d="M110 104h96l-8 52-88 18zM330 104h126v120l-98-28zM110 228l120-26 30 112H110zM360 238l96 26v54H330z" />
      </g>
      {/* avenida: corredor de duplas */}
      <path d="M-10 316 572 132" stroke="var(--saibro)" strokeWidth="26" />
      <path d="M-10 305 572 121M-10 327 572 143" stroke="var(--papel-mapa, var(--papel))" strokeWidth="3" />
      {/* a Red: quadras vistas de cima */}
      <g transform="rotate(-17 316 168)">
        <rect x="268" y="132" width="98" height="52" fill="var(--saibro)" />
        <rect x="268" y="132" width="98" height="52" fill="none" stroke="var(--papel-mapa, var(--papel))" strokeWidth="2" />
        <path d="M317 132v52M280 158h74" stroke="var(--papel-mapa, var(--papel))" strokeWidth="1.5" />
      </g>
      <circle cx="324" cy="214" r="26" fill="none" stroke="var(--bola)" strokeWidth="1.5" opacity="0.7" />
      <circle cx="324" cy="214" r="10" fill="var(--bola)" />
      <g fontFamily="var(--f-display)" fontWeight="650" fill="currentColor">
        <text x="352" y="219" style={{ fontVariationSettings: '"wdth" 110' }}>Red Tennis, 626</text>
        <text transform="rotate(-17.6 150 260)" x="40" y="292" style={{ fontVariationSettings: '"wdth" 120' }}>
          Av. Winston Churchill
        </text>
        <text x="18" y="30" style={{ fontVariationSettings: '"wdth" 110' }}>
          Rudge Ramos, SBC
        </text>
        <text x="510" y="402">N ↑</text>
      </g>
    </svg>
  );
}
