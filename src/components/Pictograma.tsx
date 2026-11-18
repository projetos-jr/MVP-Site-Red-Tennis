/**
 * Pictogramas de tênis em traço grosso de pontas redondas, na linhagem dos
 * pictogramas esportivos olímpicos. Usados nas fichas da equipe enquanto não há foto.
 */
const POSES: Record<string, { d: string; cabeca: [number, number]; raquete: [number, number, number] }> = {
  // saque: braço da raquete esticado para o alto, o outro acabou de soltar a bola
  saque: {
    cabeca: [46, 24],
    d: "M48 36 L52 66 M52 66 L40 92 M52 66 L66 90 M49 42 L64 26 M64 26 L70 12 M48 42 L32 30",
    raquete: [70, 12, 18],
  },
  // direita (forehand): corpo de lado, braço à frente
  direita: {
    cabeca: [40, 24],
    d: "M42 36 L48 64 M48 64 L32 90 M48 64 L66 86 M44 42 L64 50 M64 50 L78 46 M43 42 L26 52",
    raquete: [78, 46, 78],
  },
  // voleio: base baixa, raquete à frente do corpo
  voleio: {
    cabeca: [48, 28],
    d: "M48 40 L48 64 M48 64 L32 88 M48 64 L64 88 M48 46 L64 40 M64 40 L72 30 M48 46 L32 40",
    raquete: [72, 30, 24],
  },
  // kids: figura menor, raquete grande
  kids: {
    cabeca: [44, 40],
    d: "M44 50 L46 70 M46 70 L36 90 M46 70 L58 90 M45 55 L60 60 M60 60 L70 54",
    raquete: [70, 54, 42],
  },
};

export function Pictograma({ pose, className }: { pose: keyof typeof POSES; className?: string }) {
  const p = POSES[pose];
  const [rx, ry, ang] = p.raquete;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx={p.cabeca[0]} cy={p.cabeca[1]} r="7.5" fill="currentColor" />
      <path d={p.d} fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`translate(${rx} ${ry}) rotate(${ang})`}>
        <path d="M0 0v-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="0" cy="-17" rx="7" ry="9.5" fill="none" stroke="currentColor" strokeWidth="3.6" />
      </g>
      {pose === "saque" && <circle cx="30" cy="12" r="4.2" fill="var(--bola)" />}
    </svg>
  );
}
