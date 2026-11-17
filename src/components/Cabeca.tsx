import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { marca } from "./marca";
import { SombraRede } from "./Texturas";
import { Rotulo } from "./ui";

type Props = {
  rotulo: string;
  linhas: string[];
  intro: string;
  tom?: "saibro" | "grafite" | "bordo";
  children?: ReactNode;
};

/** Cabeça das páginas internas: título em três tempos sobre um campo de cor, com faixa de base. */
export function Cabeca({ rotulo, linhas, intro, tom = "saibro", children }: Props) {
  const saibro = tom === "saibro";
  return (
    <header className={`sup-${tom}`}>
      <div className="cabeca">
        {saibro && <span className="grao grao-saibro" />}
        {saibro && <span className="grao grao-claro" />}
        {saibro && <span className="luz" />}
        <SombraRede angulo={-13} fita={62} opacidade={saibro ? 0.45 : 0.5} cor={saibro ? "#5a1f0a" : "#000"} />
        <div className="wrap">
          <h1 className="display t-h1">
            {linhas.map((linha, i) => (
              <span className="mask" key={i}>
                <span className="sobe" style={{ "--i": i } as CSSProperties}>
                  {marca(linha)}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </div>
      <div style={{ background: saibro ? "var(--saibro-escuro)" : undefined, borderTop: "1px solid var(--linha)" }}>
        <div className="wrap g12 py-6 items-center" style={{ rowGap: "1rem" }}>
          <div className="col-span-full lg:col-span-3">
            <Rotulo>{rotulo}</Rotulo>
          </div>
          <p className="col-span-full lg:col-span-6 lead">{intro}</p>
          {children && <div className="col-span-full lg:col-span-3 lg:justify-self-end">{children}</div>}
        </div>
      </div>
    </header>
  );
}
