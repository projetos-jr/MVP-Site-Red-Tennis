import { horarios, reservaMock } from "@/content/red";
import { emSP, minutos } from "./horario";

export type Horario = { hora: string; livre: boolean };
export type DiaAgenda = { data: Date; horarios: Horario[] };

/**
 * Ponto único de integração com um sistema de reservas.
 * Hoje devolve os dados de exemplo de src/content/red.ts, já respeitando o
 * horário de funcionamento (fuso de São Paulo) e escondendo horários que já passaram.
 * Para ligar num sistema real, troque o corpo desta função por uma chamada à API
 * e mantenha o formato.
 */
export function agendaDaSemana(quadra: string, inicio: Date, deslocamento?: number): DiaAgenda[] {
  const desloca = deslocamento ?? (quadra === "rapida" ? 3 : quadra === "paredao" ? 5 : 0);
  const agora = emSP(inicio);
  return reservaMock.ocupados.map((_, i) => {
    const data = new Date(inicio.getTime() + i * 86_400_000);
    const { dia } = emSP(data);
    const funcionamento = horarios[dia];
    const ocupados = reservaMock.ocupados[(i + desloca) % reservaMock.ocupados.length];
    return {
      data,
      horarios: reservaMock.horas
        // uma hora inteira dentro do horário de funcionamento
        .filter((h) => minutos(h) >= minutos(funcionamento.abre) && minutos(h) + 60 <= minutos(funcionamento.fecha))
        // hoje, só o que ainda não começou
        .filter((h) => i > 0 || minutos(h) > agora.min)
        .map((hora) => ({ hora, livre: !ocupados.includes(hora) })),
    };
  });
}

/** Próximo horário livre de uma quadra: "hoje, 14h", "amanhã, 8h" ou "sexta, 9h". */
export function proximoLivre(quadra: string, agendaIndice: number, agora: Date = new Date()): string | null {
  const semana = agendaDaSemana(quadra, agora, agendaIndice);
  const nomes = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  for (let i = 0; i < semana.length; i++) {
    const dia = semana[i];
    const livre = dia.horarios.find((h) => h.livre);
    if (!livre) continue;
    const rotulo = i === 0 ? "hoje" : i === 1 ? "amanhã" : nomes[emSP(dia.data).dia];
    return `${rotulo}, ${Number(livre.hora.slice(0, 2))}h`;
  }
  return null;
}
