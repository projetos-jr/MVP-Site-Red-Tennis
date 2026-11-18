"use client";

import { useEffect, useRef, useState } from "react";
import { semana } from "@/content/red";
import { Bola } from "../ui";

/** Esta semana na Red: o quadro de avisos do clube, com os sete dias à vista. */
export function Semana() {
  const [hoje, setHoje] = useState<number | null>(null);
  const [rola, setRola] = useState(false);
  const lista = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const d = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "short" }).format(new Date());
    // semana começa na segunda (índice 0)
    const i = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(d);
    setHoje(i);
    const ul = lista.current;
    if (!ul) return;
    const mede = () => setRola(ul.scrollWidth > ul.clientWidth + 2);
    mede();
    // no celular, a faixa já abre no dia de hoje
    const li = ul.children[i] as HTMLElement | undefined;
    if (li && ul.scrollWidth > ul.clientWidth) ul.scrollLeft = li.offsetLeft - ul.offsetLeft - 16;
    window.addEventListener("resize", mede);
    return () => window.removeEventListener("resize", mede);
  }, []);
  return (
    <section className="semana sup-vinho" aria-labelledby="semana-titulo">
      <div className="wrap semana-in">
        <h2 id="semana-titulo" className="semana-rotulo ui">
          <Bola className="btn-bola" /> Esta semana na Red
        </h2>
        <ul ref={lista} className="semana-dias" tabIndex={rola ? 0 : undefined} aria-label="Agenda da semana">
          {semana.map((s, i) => (
            <li key={s.quando + s.oque} data-hoje={hoje === i}>
              <span className="placar">{s.quando}</span>
              <span className="ui">{s.oque}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
