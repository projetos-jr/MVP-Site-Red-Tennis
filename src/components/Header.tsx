"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contato, mensagens, nav } from "@/content/red";
import { wa } from "@/lib/wa";
import { AbertoStatus } from "./Aberto";
import { Bola, Btn, Logo } from "./ui";

export function Header() {
  const caminho = usePathname();
  const [fixo, setFixo] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [barra, setBarra] = useState(false);
  const fechar = useRef<HTMLButtonElement>(null);
  const gatilho = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aoRolar = () => {
      setFixo(window.scrollY > 40);
      setBarra(window.scrollY > window.innerHeight * 0.7);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => setAberto(false), [caminho]);

  useEffect(() => {
    if (!aberto) return;
    const g = gatilho.current;
    document.documentElement.style.overflow = "hidden";
    fechar.current?.focus();
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", tecla);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", tecla);
      g?.focus();
    };
  }, [aberto]);

  return (
    <>
      <header className="header" data-fixo={fixo}>
        <div className="wrap header-in">
          <Logo />
          <nav className="nav ui" aria-label="Principal">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={caminho.startsWith(item.href.slice(0, -1)) ? "page" : undefined}>
                {item.rotulo}
              </Link>
            ))}
          </nav>
          <div className="header-acoes">
            <AbertoStatus />
            <Btn href={wa(mensagens.aula)}>Agendar aula</Btn>
            <button ref={gatilho} className="menu-btn ui" onClick={() => setAberto(true)} aria-expanded={aberto} aria-controls="menu">
              Menu <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div id="menu" className="menu" role="dialog" aria-modal="true" aria-label="Menu" data-aberto={aberto} inert={!aberto} data-lenis-prevent>
        <div className="wrap menu-topo">
          <Logo onClick={() => setAberto(false)} />
          <button ref={fechar} className="menu-btn ui" onClick={() => setAberto(false)}>
            Fechar
          </button>
        </div>
        <nav className="wrap" aria-label="Menu" style={{ flex: 1, display: "flex" }}>
          <ol style={{ width: "100%" }}>
            {nav.map((item, i) => (
              <li key={item.href} style={{ ["--i" as string]: i }}>
                <Link href={item.href} className="display" onClick={() => setAberto(false)}>
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="wrap menu-pe">
          <AbertoStatus />
          <Btn href={wa(mensagens.aula)} tom="claro" className="btn-largo">
            Agendar aula experimental
          </Btn>
          <a className="ui link" href={wa(mensagens.geral)} target="_blank" rel="noopener noreferrer">
            WhatsApp {contato.whatsappLegivel}
          </a>
        </div>
      </div>

      <div className="barra ui" data-visivel={barra && !aberto}>
        <a href={wa(mensagens.aula)} target="_blank" rel="noopener noreferrer">
          <Bola /> Aula experimental
        </a>
        <a href={wa(mensagens.quadra)} target="_blank" rel="noopener noreferrer">
          Reservar quadra
        </a>
      </div>
    </>
  );
}
