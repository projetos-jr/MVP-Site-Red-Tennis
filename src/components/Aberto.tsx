"use client";

import { useEffect, useState } from "react";
import { horarios } from "@/content/red";
import { hora, statusAgora, type Status } from "@/lib/horario";

function useStatus(): Status | null {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const atualiza = () => setStatus(statusAgora());
    atualiza();
    const t = setInterval(atualiza, 60_000);
    return () => clearInterval(t);
  }, []);
  return status;
}

/** "ABERTO HOJE ATÉ 22H", para a linha de dados do hero. */
export function AbertoFaixa() {
  const s = useStatus();
  return <span>{s ? s.faixa : "SEG A QUI ATÉ 22H"}</span>;
}

/** "Aberto agora" com o ponto limão pulsando, ou "Fechado, abre às 7h". */
export function AbertoStatus({ className = "" }: { className?: string }) {
  const s = useStatus();
  return (
    <p className={`mono ${className}`} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }} aria-live="polite">
      <span className="ponto" data-pulsa={s?.aberto ?? false} data-fechado={s ? !s.aberto : false} />
      <span>{s ? s.texto : "Horário de hoje"}</span>
    </p>
  );
}

/** Horários da semana, com o dia de hoje destacado. Começa na segunda. */
export function HorariosSemana() {
  const s = useStatus();
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  return (
    <ul className="horas mono">
      {ordem.map((d) => (
        <li key={d} data-hoje={s?.dia === d}>
          <span>{horarios[d].dia}</span>
          <span>
            {hora(horarios[d].abre)} às {hora(horarios[d].fecha)}
          </span>
        </li>
      ))}
    </ul>
  );
}
