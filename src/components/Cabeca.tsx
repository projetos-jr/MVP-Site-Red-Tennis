import type { ReactNode } from "react";
import { site } from "@/content/red";
import { PhotoSlot } from "./PhotoSlot";
import { Selo } from "./ui";

type Props = {
  titulo: string;
  intro: string;
  /** Imagem de fundo (slot). Sem foto, usa o campo de cor. */
  foto?: string;
  tom?: "saibro" | "bordo" | "vinho";
  /** Mostra a foto em retícula de duas tintas (fotos reais da Red em baixa resolução). */
  ret?: boolean;
  /** Carimba o selo do clube no canto. */
  selo?: boolean;
  children?: ReactNode;
};

/** Cabeça das páginas internas: título grande sobre a imagem de material, uma frase e a ação. */
export function Cabeca({ titulo, intro, foto, tom = "saibro", ret, selo, children }: Props) {
  return (
    <header className={`cabeca sup-${tom} ${foto ? "" : "com-grao"}`}>
      {foto && <PhotoSlot name={foto} alt="" sizes="100vw" prioridade className={`cabeca-foto ${ret ? "cabeca-ret" : "com-grao-foto"}`} ret={ret} />}
      <div className="wrap cabeca-corpo">
        {selo && <Selo id="selo-cabeca" ano={site.fundacao} className="cabeca-selo" />}
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
export function TituloSecao({ id, children, className = "", lado }: { id?: string; children: ReactNode; className?: string; lado?: boolean }) {
  return (
    <h2 id={id} className={`titulo ${lado ? "titulo-lado" : ""} ${className}`}>
      {children}
    </h2>
  );
}
