"use client";

import { useEffect, useRef, useState } from "react";
import { quadras } from "@/content/red";
import { agendaDaSemana, type DiaAgenda } from "@/lib/reservas";
import { wa } from "@/lib/wa";
import { Bola } from "./ui";

const fmtDia = new Intl.DateTimeFormat("pt-BR", { weekday: "short", timeZone: "America/Sao_Paulo" });
const fmtData = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "America/Sao_Paulo" });
const fmtLongo = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit", timeZone: "America/Sao_Paulo" });

/**
 * Mock de reserva: grade da semana com horários livres e ocupados.
 * Os dados vêm de agendaDaSemana() (src/lib/reservas.ts), que é o ponto
 * de troca para um sistema de reservas real.
 */
export function Reserva() {
  const [quadra, setQuadra] = useState(quadras[0].id);
  const [agenda, setAgenda] = useState<DiaAgenda[]>([]);
  const [escolha, setEscolha] = useState<{ dia: Date; hora: string } | null>(null);
  const [diaSel, setDiaSel] = useState(0);
  const confirma = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const semana = agendaDaSemana(quadra, new Date());
    setAgenda(semana);
    setEscolha(null);
    // começa no primeiro dia que ainda tem horário livre
    const i = semana.findIndex((d) => d.horarios.some((h) => h.livre));
    setDiaSel(Math.max(0, i));
  }, [quadra]);

  const escolher = (dia: Date, hora: string) => {
    setEscolha({ dia, hora });
    // no celular, o botão de confirmar entra na tela
    requestAnimationFrame(() => confirma.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  };

  const nome = quadras.find((q) => q.id === quadra)?.nome.toLowerCase() ?? "";
  const link = escolha
    ? wa(`Olá, Red! Vim pelo site e quero reservar a quadra ${nome === "saibro" ? "de saibro" : "rápida"} para ${fmtLongo.format(escolha.dia)}, às ${escolha.hora.replace(":00", "h")}. Está livre?`)
    : undefined;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="chips" role="radiogroup" aria-label="Piso">
          {quadras.map((q) => (
            <label key={q.id}>
              <input type="radio" name="piso" checked={quadra === q.id} onChange={() => setQuadra(q.id)} />
              <span>{q.nome === "Rápida" ? "Quadra rápida" : "Saibro"}</span>
            </label>
          ))}
        </div>
        <p className="ui sec">Demonstração com horários de exemplo</p>
      </div>

      <div className="reserva-dias" role="group" aria-label="Dia">
        {agenda.map((d, i) => (
          <button key={d.data.toISOString()} type="button" aria-pressed={diaSel === i} onClick={() => setDiaSel(i)}>
            {i === 0 ? "Hoje" : i === 1 ? "Amanhã" : fmtDia.format(d.data).replace(".", "")}
            <br />
            {fmtData.format(d.data)}
          </button>
        ))}
      </div>

      <div className="rolagem rolagem-reserva" data-lenis-prevent role="group" aria-label="Horários da semana">
        <div className="reserva">
          {agenda.map((d, i) => (
            <div key={d.data.toISOString()} className="grid gap-px content-start" data-sel={diaSel === i}>
              <p className="reserva-dia ui">
                {fmtDia.format(d.data).replace(".", "")}
                <br />
                <span className="sec">{fmtData.format(d.data)}</span>
              </p>
              {d.horarios.map((h) => {
                const ativo = escolha?.hora === h.hora && escolha.dia.getTime() === d.data.getTime();
                return (
                  <button
                    key={h.hora}
                    type="button"
                    disabled={!h.livre}
                    aria-pressed={ativo}
                    aria-label={`${fmtLongo.format(d.data)}, ${h.hora}, ${h.livre ? "livre" : "ocupado"}`}
                    onClick={() => escolher(d.data, h.hora)}
                  >
                    {h.hora}
                  </button>
                );
              })}
              {d.horarios.length === 0 && <p className="ui sec reserva-vazio">Fechado</p>}
            </div>
          ))}
        </div>
      </div>

      <div ref={confirma} className="reserva-confirma flex flex-wrap items-center justify-between gap-4" aria-live="polite">
        <p className="lead">
          {escolha ? (
            <>
              Quadra {nome === "saibro" ? "de saibro" : "rápida"}, {fmtLongo.format(escolha.dia)}, às {escolha.hora.replace(":00", "h")}, por uma hora.
            </>
          ) : (
            <span className="sec">Escolha um horário livre.</span>
          )}
        </p>
        {link && (
          <a className="btn btn-claro" href={link} target="_blank" rel="noopener noreferrer">
            <span>Confirmar pelo WhatsApp</span>
            <Bola className="btn-bola" />
          </a>
        )}
      </div>
    </div>
  );
}
