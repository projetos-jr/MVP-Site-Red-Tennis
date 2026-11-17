"use client";

import { useRef, useState } from "react";
import { professores } from "@/content/red";
import { PhotoSlot } from "./PhotoSlot";

/** Faixa horizontal arrastável com a equipe. Também rola com as setas do teclado. */
export function FaixaProfessores() {
  const ref = useRef<HTMLUListElement>(null);
  const arrasto = useRef({ ativo: false, x: 0, inicio: 0 });
  const [arrasta, setArrasta] = useState(false);

  return (
    <ul
      ref={ref}
      className="faixa"
      data-arrasta={arrasta}
      tabIndex={0}
      aria-label="Equipe da Red Tennis. Use as setas para rolar."
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        arrasto.current = { ativo: true, x: e.clientX, inicio: ref.current.scrollLeft };
        setArrasta(true);
      }}
      onPointerMove={(e) => {
        if (!arrasto.current.ativo || !ref.current) return;
        ref.current.scrollLeft = arrasto.current.inicio - (e.clientX - arrasto.current.x);
      }}
      onPointerUp={() => {
        arrasto.current.ativo = false;
        setArrasta(false);
      }}
      onPointerLeave={() => {
        arrasto.current.ativo = false;
        setArrasta(false);
      }}
      onKeyDown={(e) => {
        if (!ref.current) return;
        if (e.key === "ArrowRight") ref.current.scrollBy({ left: 320, behavior: "smooth" });
        if (e.key === "ArrowLeft") ref.current.scrollBy({ left: -320, behavior: "smooth" });
      }}
    >
      {professores.map((p, i) => (
        <li key={p.nome}>
          <PhotoSlot
            name={p.slot}
            alt={`Retrato de ${p.nome}`}
            briefing={`Retrato vertical, ${p.nome}, P&B com duotone saibro`}
            sizes="400px"
            duotone
            sigla={p.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          />
          <p className="mono sec mt-4">
            0{i + 1} · {p.papel}
          </p>
          <h3 className="display t-h4 mt-2">{p.nome}</h3>
          <dl className="dados mono mt-4">
            {p.dados.map((d) => (
              <div key={d.rotulo}>
                <dt>{d.rotulo}</dt>
                <dd>{d.valor}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ul>
  );
}
