"use client";

import { useEffect, useState } from "react";
import { semana } from "@/content/red";
import { Bola } from "../ui";

/** Esta semana na Red: o quadro de avisos do clube, com os sete dias à vista. */
export function Semana() {
  const [hoje, setHoje] = useState<number | null>(null);
  useEffect(() => {
    const d = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "short" }).format(new Date());
    // semana começa na segunda (índice 0)
    setHoje(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(d));
  }, []);
  return (
    <section className="semana sup-vinho" aria-labelledby="semana-titulo">
      <div className="wrap semana-in">
        <h2 id="semana-titulo" className="semana-rotulo ui">
          <Bola className="btn-bola" /> Esta semana na Red
        </h2>
        <ul className="semana-dias" tabIndex={0} aria-label="Agenda da semana">
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
