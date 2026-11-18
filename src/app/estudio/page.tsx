import type { Metadata } from "next";
import { Estudio } from "./Estudio";

export const metadata: Metadata = { title: "Estúdio do saibro", robots: { index: false } };

/** Ferramenta interna: renderiza o saibro com parâmetros na URL (usada para gerar imagens paradas). */
export default function Page() {
  return <Estudio />;
}
