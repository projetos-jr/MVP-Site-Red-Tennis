"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { contato, mensagens, nav } from "@/content/red";
import { wa } from "@/lib/wa";
import { AbertoStatus } from "./Aberto";
import { Btn, Seta } from "./ui";

const curva = [0.22, 1, 0.36, 1] as const;

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="logo" aria-label="Red Tennis, página inicial" onClick={onClick}>
      Red <i aria-hidden="true" /> Tennis
    </Link>
  );
}

export function Header() {
  const caminho = usePathname();
  const [fixo, setFixo] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [barra, setBarra] = useState(false);
  const fechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aoRolar = () => {
      setFixo(window.scrollY > 24);
      setBarra(window.scrollY > window.innerHeight * 0.6);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    document.documentElement.style.overflow = "hidden";
    fechar.current?.focus();
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", tecla);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", tecla);
    };
  }, [aberto]);

  return (
    <>
      <header className="header" data-fixo={fixo}>
        <div className="wrap header-in">
          <Logo />
          <nav className="nav" aria-label="Principal">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={caminho.startsWith(item.href.slice(0, -1)) ? "page" : undefined}>
                {item.rotulo}
              </Link>
            ))}
          </nav>
          <Btn href={wa(mensagens.aula)}>Agendar aula</Btn>
          <button className="menu-btn mono" onClick={() => setAberto(true)} aria-expanded={aberto} aria-controls="menu">
            Menu <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            id="menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: curva }}
          >
            <div className="wrap menu-topo">
              <Logo onClick={() => setAberto(false)} />
              <button ref={fechar} className="menu-btn mono" onClick={() => setAberto(false)}>
                Fechar
              </button>
            </div>
            <nav className="wrap" aria-label="Menu" style={{ flex: 1, display: "flex" }}>
              <ol style={{ width: "100%" }}>
                {nav.map((item, i) => (
                  <li key={item.href}>
                    <Link href={item.href} className="display" onClick={() => setAberto(false)}>
                      <span className="mono">0{i + 1}</span>
                      <span className="mask">
                        <motion.span
                          initial={{ y: "108%" }}
                          animate={{ y: "0%" }}
                          transition={{ duration: 0.8, ease: curva, delay: 0.2 + i * 0.05 }}
                        >
                          {item.rotulo}
                        </motion.span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="wrap menu-pe">
              <AbertoStatus />
              <a className="mono link" href={wa(mensagens.geral)} target="_blank" rel="noopener noreferrer">
                WhatsApp {contato.whatsappLegivel} <Seta size={12} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="barra mono" data-visivel={barra && !aberto}>
        <a href={wa(mensagens.aula)} target="_blank" rel="noopener noreferrer">
          Aula experimental <Seta size={12} />
        </a>
        <a href={wa(mensagens.quadra)} target="_blank" rel="noopener noreferrer">
          Reservar quadra <Seta size={12} />
        </a>
      </div>
    </>
  );
}
