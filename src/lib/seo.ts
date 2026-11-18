import type { Metadata } from "next";

const imagem = { url: "/og.jpg", width: 1200, height: 630, alt: "Red Tennis. Saibro, técnica, resultado. Rudge Ramos, São Bernardo do Campo." };

/**
 * Metadata de uma página: título (vai para o template "%s | Red Tennis"), descrição,
 * URL canônica e a prévia de compartilhamento (WhatsApp, Instagram), própria de cada página.
 */
export function pagina(o: { titulo: string; descricao: string; caminho: string; compartilhar?: { titulo: string; descricao: string } }): Metadata {
  const og = o.compartilhar ?? { titulo: `${o.titulo} | Red Tennis`, descricao: o.descricao };
  return {
    title: o.titulo,
    description: o.descricao,
    alternates: { canonical: o.caminho },
    openGraph: { type: "website", locale: "pt_BR", siteName: "Red Tennis", url: o.caminho, title: og.titulo, description: og.descricao, images: [imagem] },
    twitter: { card: "summary_large_image", title: og.titulo, description: og.descricao, images: [imagem.url] },
  };
}
