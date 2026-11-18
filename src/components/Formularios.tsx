"use client";

import { useEffect, useState, type FormEvent } from "react";
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

/** Abre o WhatsApp: na mesma aba no celular (navegadores de app, como o do Instagram, bloqueiam janelas novas). */
export function abrirWhatsApp(url: string) {
  if (window.matchMedia("(hover: none)").matches) window.location.href = url;
  else window.open(url, "_blank", "noopener");
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

const PARA_QUEM = ["Para mim", "Para meu filho", "Para minha filha"];
const NIVEIS = ["Nunca joguei", "Parei faz tempo", "Já troco bola", "Jogo torneio ou ranking"];
const FRASE: Record<string, string> = {
  "Nunca joguei": "nunca joguei tênis",
  "Parei faz tempo": "já joguei, mas parei faz tempo",
  "Já troco bola": "já troco bola",
  "Jogo torneio ou ranking": "jogo torneio ou ranking",
};
const PERIODOS = ["Manhã", "Tarde", "Noite", "Fim de semana"];

/** Lê ?indicado=Nome da URL (convite de um sócio) e devolve o nome limpo. */
function useIndicado() {
  const [indicado, setIndicado] = useState("");
  useEffect(() => {
    const bruto = new URLSearchParams(window.location.search).get("indicado") ?? "";
    setIndicado(bruto.replace(/[^\p{L}\s'-]/gu, "").trim().slice(0, 40));
  }, []);
  return indicado;
}

/** Aula experimental: monta a mensagem e abre o WhatsApp. */
export function FormAula({ nivelInicial }: { nivelInicial?: string }) {
  const [paraQuem, setParaQuem] = useState(PARA_QUEM[0]);
  const [nivel, setNivel] = useState(nivelInicial && NIVEIS.includes(nivelInicial) ? nivelInicial : NIVEIS[0]);
  const [periodo, setPeriodo] = useState(PERIODOS[2]);
  const indicado = useIndicado();
  const crianca = paraQuem !== "Para mim";

  useEffect(() => {
    const ouve = (e: Event) => {
      const n = (e as CustomEvent<string>).detail;
      if (NIVEIS.includes(n)) setNivel(n);
      if (n === "kids") setParaQuem(PARA_QUEM[1]);
    };
    window.addEventListener("red:nivel", ouve);
    return () => window.removeEventListener("red:nivel", ouve);
  }, []);

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const nome = String(d.get("nome")).trim();
    const idade = String(d.get("idade")).trim();
    const quando = `Melhor horário: ${periodo.toLowerCase()}.`;
    let msg = crianca
      ? `Olá, Red! Vim pelo site e quero agendar uma aula experimental do Red Kids ${paraQuem === "Para meu filho" ? "para meu filho" : "para minha filha"} de ${idade} anos. Meu nome é ${nome}. ${quando}`
      : `Olá, Red! Vim pelo site e quero agendar uma aula experimental. Meu nome é ${nome}, tenho ${idade} anos e ${FRASE[nivel]}. ${quando}`;
    if (indicado) msg += ` Fui indicado por ${indicado} e quero a experimental em dupla.`;
    abrirWhatsApp(wa(msg));
  };
  return (
    <form onSubmit={enviar} className="grid gap-7">
      {indicado && (
        <p className="convite-aviso ui">
          {indicado} te chamou para jogar. A sua aula experimental pode ser em dupla.
        </p>
      )}
      <Opcoes nome="para-quem" legenda="Para quem é a aula?" opcoes={PARA_QUEM} valor={paraQuem} muda={setParaQuem} />
      <div className="grid gap-7 md:grid-cols-[2fr_1fr]">
        <div className="campo">
          <label htmlFor="aula-nome">Seu nome</label>
          <input id="aula-nome" name="nome" required autoComplete="given-name" enterKeyHint="next" placeholder="Como a gente te chama" />
        </div>
        <div className="campo">
          <label htmlFor="aula-idade">{crianca ? "Idade da criança" : "Sua idade"}</label>
          <input id="aula-idade" name="idade" required inputMode="numeric" pattern="[0-9]{1,2}" maxLength={2} enterKeyHint="done" placeholder="Anos" />
        </div>
      </div>
      {!crianca && <Opcoes nome="nivel" legenda="Sua história com o tênis" opcoes={NIVEIS} valor={nivel} muda={setNivel} />}
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
    abrirWhatsApp(wa(msg));
  };
  return (
    <form onSubmit={enviar} className="grid gap-7">
      <div className="campo">
        <label htmlFor="ct-nome">Nome</label>
        <input id="ct-nome" name="nome" required autoComplete="name" enterKeyHint="next" placeholder="Como a gente te chama" />
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
