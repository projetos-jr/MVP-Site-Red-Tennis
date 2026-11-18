import { horarios } from "@/content/red";

export type Status = {
  dia: number;
  aberto: boolean;
  /** Ex.: "Aberto agora, até 22h" ou "Fechado, abre às 7h" */
  texto: string;
  /** Ex.: "ABERTO HOJE ATÉ 22H" */
  faixa: string;
};

const DIAS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function hora(hhmm: string): string {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
}

export const minutos = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));

/** Dia da semana (0 = domingo) e minuto do dia em São Paulo, para uma data. */
export function emSP(d: Date = new Date()): { dia: number; min: number } {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const pega = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  return { dia: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(pega("weekday")), min: Number(pega("hour")) * 60 + Number(pega("minute")) };
}

/** Status de funcionamento no fuso America/Sao_Paulo. */
export function statusAgora(agora: Date = new Date()): Status {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(agora);
  const pega = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  const dia = DIAS.indexOf(pega("weekday"));
  const min = Number(pega("hour")) * 60 + Number(pega("minute"));
  const hoje = horarios[dia];

  if (min >= minutos(hoje.abre) && min < minutos(hoje.fecha)) {
    return {
      dia,
      aberto: true,
      texto: `Aberto agora, até ${hora(hoje.fecha)}`,
      faixa: `ABERTO HOJE ATÉ ${hora(hoje.fecha).toUpperCase()}`,
    };
  }
  if (min < minutos(hoje.abre)) {
    return {
      dia,
      aberto: false,
      texto: `Fechado, abre às ${hora(hoje.abre)}`,
      faixa: `ABRE HOJE ÀS ${hora(hoje.abre).toUpperCase()}`,
    };
  }
  const amanha = horarios[(dia + 1) % 7];
  return {
    dia,
    aberto: false,
    texto: `Fechado, abre amanhã às ${hora(amanha.abre)}`,
    faixa: `ABRE AMANHÃ ÀS ${hora(amanha.abre).toUpperCase()}`,
  };
}
