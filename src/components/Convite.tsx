"use client";

import { useState, type FormEvent } from "react";
import { indicacao, site } from "@/content/red";
import { abrirWhatsApp } from "./Formularios";
import { Bola } from "./ui";

/** Convite de indicação: abre o WhatsApp sem destinatário, para o sócio escolher o amigo. */
export function Convite() {
  const [nome, setNome] = useState("");
  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const limpo = nome.replace(/[^\p{L}\s'-]/gu, "").trim().slice(0, 40);
    if (!limpo) return;
    abrirWhatsApp(`https://wa.me/?text=${encodeURIComponent(indicacao.convite(limpo, site.url))}`);
  };
  return (
    <div className="convite">
      <div className="convite-lados">
        <div>
          <p className="ui sec">Seu amigo ganha</p>
          <p className="lead">{indicacao.amigoGanha}</p>
        </div>
        <div>
          <p className="ui sec">Você ganha</p>
          <p className="lead">{indicacao.voceGanha}</p>
        </div>
      </div>
      <ol className="passos">
        {indicacao.passos.map((p, i) => (
          <li key={p.titulo}>
            <span className="placar">{i + 1}</span>
            <h3 className="sub">{p.titulo}</h3>
            <p className="sec">{p.texto}</p>
          </li>
        ))}
      </ol>
      <form className="convite-form" onSubmit={enviar}>
        <div className="campo">
          <label htmlFor="convite-nome">Seu nome</label>
          <input id="convite-nome" value={nome} onChange={(e) => setNome(e.target.value)} required autoComplete="given-name" enterKeyHint="send" placeholder="Para a Red saber que foi você" />
        </div>
        <button type="submit" className="btn">
          <span>Convidar pelo WhatsApp</span>
          <Bola className="btn-bola" />
        </button>
      </form>
    </div>
  );
}
