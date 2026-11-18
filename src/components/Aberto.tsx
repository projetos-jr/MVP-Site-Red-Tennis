"use client";

import { useEffect, useState } from "react";
import { horarios } from "@/content/red";
import { hora, statusAgora, type Status } from "@/lib/horario";

export function useStatus(): Status | null {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const atualiza = () => setStatus(statusAgora());
    atualiza();
    const t = setInterval(atualiza, 60_000);
    return () => clearInterval(t);
  }, []);
  return status;
}

/** "Aberto agora, até 22h" com o ponto limão, ou "Fechado, abre às 7h". */
export function AbertoStatus({ className = "" }: { className?: string }) {
  const s = useStatus();
  return (
    <p className={`status ui ${className}`} aria-live="polite">
      <span className="ponto-vivo" data-pulsa={s?.aberto ?? false} data-fechado={s ? !s.aberto : false} />
      <span>{s ? s.texto : "Seg a qui, das 7h às 22h"}</span>
    </p>
  );
}

/** Horários da semana em números de placar, hoje destacado. Começa na segunda. */
export function HorariosSemana() {
  const s = useStatus();
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  return (
    <table className="horarios">
      <caption className="sr-only">Horário de funcionamento</caption>
      <tbody>
        {ordem.map((d) => {
          const hoje = s?.dia === d;
          return (
            <tr key={d} data-hoje={hoje}>
              <th scope="row" className="ui">
                {horarios[d].dia}
                {hoje && <span className="hoje"> hoje</span>}
              </th>
              <td className="placar">
                {hora(horarios[d].abre)}
                <span aria-hidden="true">–</span>
                <span className="sr-only"> às </span>
                {hora(horarios[d].fecha)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
