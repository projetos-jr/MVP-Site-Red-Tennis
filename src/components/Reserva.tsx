"use client";

import { useEffect, useState } from "react";
import { quadras } from "@/content/red";
import { agendaDaSemana, type DiaAgenda } from "@/lib/reservas";
import { wa } from "@/lib/wa";
import { Seta } from "./ui";

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

  useEffect(() => {
    setAgenda(agendaDaSemana(quadra, new Date()));
    setEscolha(null);
  }, [quadra]);

  const nome = quadras.find((q) => q.id === quadra)?.nome.toLowerCase() ?? "";
  const link = escolha
    ? wa(`Olá, Red! Vim pelo site e quero reservar a quadra ${nome === "saibro" ? "de saibro" : "rápida"} para ${fmtLongo.format(escolha.dia)}, às ${escolha.hora}.`)
    : undefined;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="chips mono" role="radiogroup" aria-label="Piso">
          {quadras.map((q) => (
            <label key={q.id}>
              <input type="radio" name="piso" checked={quadra === q.id} onChange={() => setQuadra(q.id)} />
              {q.nome}
            </label>
          ))}
        </div>
        <p className="mono sec">Demonstração · horários de exemplo</p>
      </div>

      <div className="rolagem" data-lenis-prevent tabIndex={0} role="group" aria-label="Horários da semana">
        <div className="reserva mono">
          {agenda.map((d) => (
            <div key={d.data.toISOString()} className="grid gap-px content-start">
              <p className="reserva-dia">
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
                    onClick={() => setEscolha({ dia: d.data, hora: h.hora })}
                  >
                    {h.hora}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4" aria-live="polite">
        <p className="lead">
          {escolha ? (
            <>
              Quadra {nome === "saibro" ? "de saibro" : "rápida"}, {fmtLongo.format(escolha.dia)}, às {escolha.hora}.
            </>
          ) : (
            <span className="sec">Escolha um horário livre.</span>
          )}
        </p>
        {link && (
          <a className="btn btn-bola" href={link} target="_blank" rel="noopener noreferrer">
            <span>Confirmar pelo WhatsApp</span>
            <span className="seta">
              <Seta />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
