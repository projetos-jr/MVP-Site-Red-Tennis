"use client";

import { useState, type FormEvent } from "react";
import { wa } from "@/lib/wa";
import { Bola } from "./ui";

function Enviar({ children }: { children: string }) {
  return (
    <button type="submit" className="btn btn-largo md:w-fit">
      <span>{children}</span>
      <Bola className="btn-bola" />
    </button>
  );
}

function Opcoes({ nome, legenda, opcoes, valor, muda }: { nome: string; legenda: string; opcoes: string[]; valor: string; muda: (v: string) => void }) {
  return (
    <fieldset className="campo">
      <legend className="mb-2">{legenda}</legend>
      <div className="chips">
        {opcoes.map((n) => (
          <label key={n}>
            <input type="radio" name={nome} checked={valor === n} onChange={() => muda(n)} />
            <span>{n}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const NIVEIS = ["Nunca joguei", "Iniciante", "Intermediário", "Avançado"];
const PERIODOS = ["Manhã", "Tarde", "Noite", "Fim de semana"];

/** Aula experimental: monta a mensagem e abre o WhatsApp. */
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
          <label htmlFor="aula-nome">Nome</label>
          <input id="aula-nome" name="nome" required autoComplete="name" placeholder="Como a gente te chama" />
        </div>
        <div className="campo">
          <label htmlFor="aula-idade">Idade</label>
          <input id="aula-idade" name="idade" required inputMode="numeric" pattern="[0-9]{1,2}" placeholder="Anos" />
        </div>
      </div>
      <Opcoes nome="nivel" legenda="Nível" opcoes={NIVEIS} valor={nivel} muda={setNivel} />
      <Opcoes nome="periodo" legenda="Melhor horário" opcoes={PERIODOS} valor={periodo} muda={setPeriodo} />
      <Enviar>Enviar pelo WhatsApp</Enviar>
    </form>
  );
}

const ASSUNTOS = ["Aulas", "Locação de quadra", "Clube Red", "Torneios e ranking", "Outro assunto"];

/** Contato: monta a mensagem e abre o WhatsApp. */
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
        <label htmlFor="ct-nome">Nome</label>
        <input id="ct-nome" name="nome" required autoComplete="name" placeholder="Como a gente te chama" />
      </div>
      <Opcoes nome="assunto" legenda="Assunto" opcoes={ASSUNTOS} valor={assunto} muda={setAssunto} />
      <div className="campo">
        <label htmlFor="ct-msg">Mensagem</label>
        <textarea id="ct-msg" name="mensagem" required rows={3} placeholder="Conte o que você precisa" />
      </div>
      <Enviar>Enviar pelo WhatsApp</Enviar>
    </form>
  );
}
