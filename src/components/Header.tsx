"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contato, mensagens, nav } from "@/content/red";
import { wa } from "@/lib/wa";
import { AbertoStatus } from "./Aberto";
import { Bola, Logo } from "./ui";
import { BtnAula, useAgendar } from "./Agendar";

export function Header() {
  const caminho = usePathname();
  const agendar = useAgendar();
  const [fixo, setFixo] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [barra, setBarra] = useState(false);
  const [coberta, setCoberta] = useState(false);
  const fechar = useRef<HTMLButtonElement>(null);
  const gatilho = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // páginas internas sem cabeça de cor começam com o cabeçalho já em papel
    const claro = /^\/(styleguide|og|estudio)/.test(caminho);
    const aoRolar = () => {
      setFixo(claro || window.scrollY > 40);
      setBarra(window.scrollY > window.innerHeight * 0.7);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [caminho]);

  useEffect(() => setAberto(false), [caminho]);

  // a barra some sobre formulários, a grade de reserva e o rodapé, e enquanto se digita
  useEffect(() => {
    const visiveis = new Set<Element>();
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) visiveis.add(e.target);
        else visiveis.delete(e.target);
      }
      setCoberta(visiveis.size > 0);
    });
    const alvos = document.querySelectorAll("#experimental, #reserva, main form, footer.rodape");
    alvos.forEach((el) => io.observe(el));
    const foco = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.matches("input, textarea, select")) setCoberta(true);
    };
    document.addEventListener("focusin", foco);
    return () => {
      io.disconnect();
      document.removeEventListener("focusin", foco);
    };
  }, [caminho]);

  useEffect(() => {
    if (!aberto) return;
    const g = gatilho.current;
    document.documentElement.style.overflow = "hidden";
    fechar.current?.focus();
    // o foco não escapa para trás do menu
    const fundo = [document.querySelector(".header"), document.getElementById("conteudo"), document.querySelector("footer.rodape")];
    fundo.forEach((el) => el?.setAttribute("inert", ""));
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", tecla);
    // tablet girado para paisagem: o menu deixa de existir, então fecha
    const largo = window.matchMedia("(min-width: 64rem)");
    const aoAlargar = () => largo.matches && setAberto(false);
    largo.addEventListener("change", aoAlargar);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", tecla);
      largo.removeEventListener("change", aoAlargar);
      fundo.forEach((el) => el?.removeAttribute("inert"));
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
            <BtnAula>Agendar aula</BtnAula>
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
          <BtnAula tom="claro" className="btn-largo" />
          <Link href="/quadras/#reserva" className="btn-linha" onClick={() => setAberto(false)}>
            Reservar quadra
          </Link>
          <a className="ui link" href={wa(mensagens.geral)} target="_blank" rel="noopener noreferrer">
            WhatsApp {contato.whatsappLegivel}
          </a>
        </div>
      </div>

      <nav className="barra ui" aria-label="Ações rápidas" data-visivel={barra && !aberto && !coberta} inert={!(barra && !aberto && !coberta)}>
        <a
          href={wa(mensagens.aula)}
          target="_blank"
          rel="noopener noreferrer"
          aria-haspopup="dialog"
          onClick={(e) => {
            e.preventDefault();
            agendar();
          }}
        >
          <Bola /> Agendar aula
        </a>
        <a href={wa(mensagens.quadra)} target="_blank" rel="noopener noreferrer">
          Reservar quadra
        </a>
      </nav>
    </>
  );
}
