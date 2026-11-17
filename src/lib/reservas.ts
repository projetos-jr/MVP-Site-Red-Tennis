import { reservaMock } from "@/content/red";

export type Horario = { hora: string; livre: boolean };
export type DiaAgenda = { data: Date; horarios: Horario[] };

/**
 * Ponto único de integração com um sistema de reservas.
 * Hoje devolve os dados falsos de src/content/red.ts. Para ligar num sistema
 * real, troque o corpo desta função por uma chamada à API e mantenha o formato.
 */
export function agendaDaSemana(quadra: string, inicio: Date): DiaAgenda[] {
  const desloca = quadra === "rapida" ? 3 : 0;
  return reservaMock.ocupados.map((ocupados, i) => {
    const data = new Date(inicio);
    data.setDate(inicio.getDate() + i);
    const lista = reservaMock.ocupados[(i + desloca) % reservaMock.ocupados.length] ?? ocupados;
    return {
      data,
      horarios: reservaMock.horas.map((hora) => ({ hora, livre: !lista.includes(hora) })),
    };
  });
}
