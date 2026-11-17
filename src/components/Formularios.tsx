"use client";

import { useState, type FormEvent } from "react";
import { wa } from "@/lib/wa";
import { Seta } from "./ui";

function Enviar({ children }: { children: string }) {
  return (
    <button type="submit" className="btn btn-bola w-full md:w-fit">
      <span>{children}</span>
      <span className="seta">
        <Seta />
      </span>
    </button>
  );
}

const NIVEIS = ["Nunca joguei", "Iniciante", "Intermediário", "Avançado"];
const PERIODOS = ["Manhã", "Tarde", "Noite", "Fim de semana"];

/** Formulário de aula experimental: monta a mensagem e abre o WhatsApp. */
export function FormAula() {
  const [nivel, setNivel] = useState(NIVEIS[0]);
  const [periodo, setPeriodo] = useState(PERIODOS[2]);

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg = `Olá, Red! Vim pelo site e quero agendar uma aula experimental. Meu nome é ${d.get("nome")}, tenho ${d.get("idade")} anos e meu nível é ${nivel.toLowerCase()}. Melhor horário: ${periodo.toLowerCase()}.`;
    window.open(wa(msg), "_blank", "noopener");
  };

  return (
    <form onSubmit={enviar} className="grid gap-7">
      <div className="grid gap-7 md:grid-cols-[2fr_1fr]">
        <div className="campo">
          <label htmlFor="aula-nome" className="mono">
            Nome
          </label>
          <input id="aula-nome" name="nome" required autoComplete="name" placeholder="Como a gente te chama" />
        </div>
        <div className="campo">
          <label htmlFor="aula-idade" className="mono">
            Idade
          </label>
          <input id="aula-idade" name="idade" required inputMode="numeric" pattern="[0-9]{1,2}" placeholder="Anos" />
        </div>
      </div>
      <fieldset className="campo">
        <legend className="mono mb-2">Nível</legend>
        <div className="chips mono">
          {NIVEIS.map((n) => (
            <label key={n}>
              <input type="radio" name="nivel" checked={nivel === n} onChange={() => setNivel(n)} />
              {n}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="campo">
        <legend className="mono mb-2">Melhor horário</legend>
        <div className="chips mono">
          {PERIODOS.map((n) => (
            <label key={n}>
              <input type="radio" name="periodo" checked={periodo === n} onChange={() => setPeriodo(n)} />
              {n}
            </label>
          ))}
        </div>
      </fieldset>
      <Enviar>Enviar pelo WhatsApp</Enviar>
    </form>
  );
}

const ASSUNTOS = ["Aulas", "Locação de quadra", "Clube Red", "Torneios e ranking", "Outro assunto"];

/** Formulário de contato: monta a mensagem e abre o WhatsApp. */
export function FormContato() {
  const [assunto, setAssunto] = useState(ASSUNTOS[0]);

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg = `Olá, Red! Vim pelo site. Meu nome é ${d.get("nome")}. Assunto: ${assunto}. ${d.get("mensagem")}`;
    window.open(wa(msg), "_blank", "noopener");
  };

  return (
    <form onSubmit={enviar} className="grid gap-7">
      <div className="campo">
        <label htmlFor="ct-nome" className="mono">
          Nome
        </label>
        <input id="ct-nome" name="nome" required autoComplete="name" placeholder="Como a gente te chama" />
      </div>
      <fieldset className="campo">
        <legend className="mono mb-2">Assunto</legend>
        <div className="chips mono">
          {ASSUNTOS.map((n) => (
            <label key={n}>
              <input type="radio" name="assunto" checked={assunto === n} onChange={() => setAssunto(n)} />
              {n}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="campo">
        <label htmlFor="ct-msg" className="mono">
          Mensagem
        </label>
        <textarea id="ct-msg" name="mensagem" required rows={3} placeholder="Conte o que você precisa" />
      </div>
      <Enviar>Enviar pelo WhatsApp</Enviar>
    </form>
  );
}
