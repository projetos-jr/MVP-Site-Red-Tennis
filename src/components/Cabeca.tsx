import type { ReactNode } from "react";
import { PhotoSlot } from "./PhotoSlot";

type Props = {
  titulo: string;
  intro: string;
  /** Imagem de fundo (slot). Sem foto, usa o campo de cor. */
  foto?: string;
  tom?: "saibro" | "bordo" | "vinho";
  children?: ReactNode;
};

/** Cabeça das páginas internas: título grande sobre a imagem de material, uma frase e a ação. */
export function Cabeca({ titulo, intro, foto, tom = "saibro", children }: Props) {
  return (
    <header className={`cabeca sup-${tom} ${foto ? "" : "com-grao"}`}>
      {foto && <PhotoSlot name={foto} alt="" sizes="100vw" prioridade className="cabeca-foto" />}
      <div className="wrap cabeca-corpo">
        <h1 className="display cabeca-titulo">{titulo}</h1>
        <div className="cabeca-pe">
          <p className="lead">{intro}</p>
          {children && <div className="cabeca-acoes">{children}</div>}
        </div>
      </div>
    </header>
  );
}

/** Título de seção das páginas internas. */
export function TituloSecao({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`titulo ${className}`}>
      {children}
    </h2>
  );
}
