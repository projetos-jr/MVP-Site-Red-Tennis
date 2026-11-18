import type { Metadata, Viewport } from "next";
import { Anybody, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { contato, horarios, site } from "@/content/red";
import "./globals.css";

const anybody = Anybody({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-anybody",
  display: "swap",
});
// A itálica e a serifa não são pré-carregadas: chegam logo depois, sem disputar banda com a primeira imagem.
const anybodyItalico = Anybody({
  subsets: ["latin"],
  weight: "variable",
  style: "italic",
  axes: ["wdth"],
  variable: "--font-anybody-it",
  display: "swap",
  preload: false,
});
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Aulas de tênis e quadras de saibro em São Bernardo | Red Tennis",
    template: "%s | Red Tennis",
  },
  description: site.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: "Red Tennis · Aulas de tênis e quadras de saibro no Rudge Ramos",
    description: site.descricao,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Red Tennis. Saibro, técnica, resultado. Rudge Ramos, São Bernardo do Campo." }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#b95128" };

const DIAS_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TennisComplex",
  "@id": `${site.url}/#red`,
  name: site.nomeCompleto,
  description: site.descricao,
  url: `${site.url}/`,
  image: `${site.url}/og.jpg`,
  hasMap: contato.mapa,
  telephone: contato.telefoneLink,
  email: contato.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: contato.endereco.rua,
    addressLocality: contato.endereco.cidade,
    addressRegion: contato.endereco.uf,
    postalCode: contato.endereco.cep,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: contato.geo.lat, longitude: contato.geo.lng },
  openingHoursSpecification: horarios.map((h, i) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: DIAS_SCHEMA[i],
    opens: h.abre,
    closes: h.fecha,
  })),
  sameAs: [contato.instagram.url, contato.youtube],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anybody.variable} ${anybodyItalico.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* noite em São Bernardo: o hero já pinta escuro, antes do JavaScript */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Sao_Paulo",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date());var h=+p.find(function(x){return x.type==="hour"}).value+(+p.find(function(x){return x.type==="minute"}).value)/60;if(h<6.3||h>=18.6)document.documentElement.dataset.luz="noite"}catch(e){}`,
          }}
        />
      </head>
      <body>
        <SmoothScroll>
          <a href="#conteudo" className="ui sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-bola focus:text-vinho focus:p-3">
            Pular para o conteúdo
          </a>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
        </SmoothScroll>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
