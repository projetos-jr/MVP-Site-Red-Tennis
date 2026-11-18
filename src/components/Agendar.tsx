"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { mensagens, programas } from "@/content/red";
import { wa } from "@/lib/wa";
import { abrirWhatsApp } from "./Formularios";
import { Bola } from "./ui";

/**
 * Folha "Agendar aula experimental": abre por cima da página em qualquer botão de aula.
 * Três toques (para quem, história com o tênis, horário), mostra a turma indicada
 * e manda uma mensagem completa no WhatsApp. Sem JavaScript, o botão abre o WhatsApp direto.
 */

const Ctx = createContext<{ abrir: () => void }>({ abrir: () => {} });

const PARA_QUEM = [
  { id: "eu", rotulo: "Para mim" },
  { id: "crianca", rotulo: "Para uma criança de 4 a 8 anos" },
];
const HISTORIA = [
  { id: "nunca", rotulo: "Nunca peguei numa raquete", programa: "iniciante", frase: "nunca joguei tênis" },
  { id: "parei", rotulo: "Joguei, mas parei faz tempo", programa: "iniciante", frase: "já joguei, mas parei faz tempo" },
  { id: "troco", rotulo: "Troco bola, quero jogar melhor", programa: "intermediario", frase: "já troco bola e quero jogar melhor" },
  { id: "jogo", rotulo: "Jogo set, ranking ou torneio", programa: "competicao", frase: "jogo set, ranking ou torneio" },
];
const PERIODOS = ["Manhã", "Tarde", "Noite", "Fim de semana"];

function Grupo({ legenda, children }: { legenda: string; children: ReactNode }) {
  return (
    <fieldset className="folha-grupo">
      <legend className="ui">{legenda}</legend>
      <div className="chips">{children}</div>
    </fieldset>
  );
}

function Chip({ nome, valor, atual, muda, children }: { nome: string; valor: string; atual: string; muda: (v: string) => void; children: ReactNode }) {
  return (
    <label>
      <input type="radio" name={nome} checked={atual === valor} onChange={() => muda(valor)} />
      <span>{children}</span>
    </label>
  );
}

export function AgendarProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [aberta, setAberta] = useState(false);
  const [paraQuem, setParaQuem] = useState("eu");
  const [historia, setHistoria] = useState("nunca");
  const [periodo, setPeriodo] = useState("Noite");
  const [nome, setNome] = useState("");

  const abrir = useCallback(() => {
    const d = ref.current;
    if (!d) return;
    if (!d.open) d.showModal();
    setAberta(true);
  }, []);
  const fechar = useCallback(() => ref.current?.close(), []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const aoFechar = () => setAberta(false);
    d.addEventListener("close", aoFechar);
    return () => d.removeEventListener("close", aoFechar);
  }, []);

  const crianca = paraQuem === "crianca";
  const h = HISTORIA.find((x) => x.id === historia) ?? HISTORIA[0];
  const programa = programas.find((p) => p.id === (crianca ? "red-kids" : h.programa)) ?? programas[0];
  const quem = nome.trim() ? `Meu nome é ${nome.trim().slice(0, 40)}. ` : "";
  const mensagem = crianca
    ? `Olá, Red! Vim pelo site e quero agendar uma aula experimental do Red Kids para uma criança de 4 a 8 anos. ${quem}Melhor horário: ${periodo.toLowerCase()}.`
    : `Olá, Red! Vim pelo site e quero agendar uma aula experimental. ${quem}Eu ${h.frase}; pelo site, a turma seria ${programa.nome}. Melhor horário: ${periodo.toLowerCase()}.`;

  return (
    <Ctx.Provider value={{ abrir }}>
      {children}
      <dialog
        ref={ref}
        className="folha"
        aria-labelledby="folha-titulo"
        onClick={(e) => {
          // clique no fundo escuro fecha
          if (e.target === e.currentTarget) fechar();
        }}
        data-aberta={aberta}
      >
        <div className="folha-corpo">
          <div className="folha-topo">
            <h2 id="folha-titulo" className="sub">
              Agendar aula experimental
            </h2>
            <button type="button" className="folha-fechar ui" onClick={fechar}>
              Fechar
            </button>
          </div>
          <Grupo legenda="Para quem é a aula?">
            {PARA_QUEM.map((p) => (
              <Chip key={p.id} nome="folha-quem" valor={p.id} atual={paraQuem} muda={setParaQuem}>
                {p.rotulo}
              </Chip>
            ))}
          </Grupo>
          {!crianca && (
            <Grupo legenda="Sua história com o tênis">
              {HISTORIA.map((x) => (
                <Chip key={x.id} nome="folha-historia" valor={x.id} atual={historia} muda={setHistoria}>
                  {x.rotulo}
                </Chip>
              ))}
            </Grupo>
          )}
          <Grupo legenda="Melhor horário">
            {PERIODOS.map((p) => (
              <Chip key={p} nome="folha-periodo" valor={p} atual={periodo} muda={setPeriodo}>
                {p}
              </Chip>
            ))}
          </Grupo>
          <div className="campo folha-nome">
            <label htmlFor="folha-nome">Seu nome (opcional)</label>
            <input id="folha-nome" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="given-name" enterKeyHint="done" placeholder="Como a gente te chama" />
          </div>
          <div className="folha-turma" aria-live="polite">
            <p className="ui sec">Sua turma provável</p>
            <p className="sub folha-turma-nome">{programa.nome}</p>
            <p className="ui">
              {programa.frequencia}, {programa.duracao}, a partir de {programa.preco}
            </p>
            <p className="sec folha-nota">Na aula experimental o professor vê você bater e confirma a turma.</p>
          </div>
          <button type="button" className="btn btn-largo" onClick={() => abrirWhatsApp(wa(mensagem))}>
            <span>Enviar pelo WhatsApp</span>
            <Bola className="btn-bola" />
          </button>
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

/** Botão de aula experimental: abre a folha; sem JavaScript, abre o WhatsApp direto. */
export function BtnAula({ children = "Agendar aula experimental", tom = "padrao", className = "" }: { children?: ReactNode; tom?: "padrao" | "claro" | "escuro"; className?: string }) {
  const { abrir } = useContext(Ctx);
  return (
    <a
      className={`btn ${tom === "claro" ? "btn-claro" : tom === "escuro" ? "btn-escuro" : ""} ${className}`}
      href={wa(mensagens.aula)}
      target="_blank"
      rel="noopener noreferrer"
      aria-haspopup="dialog"
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        abrir();
      }}
    >
      <span>{children}</span>
      <Bola className="btn-bola" />
    </a>
  );
}

/** Link simples que abre a folha (para a barra fixa e o menu). */
export function useAgendar() {
  return useContext(Ctx).abrir;
}
