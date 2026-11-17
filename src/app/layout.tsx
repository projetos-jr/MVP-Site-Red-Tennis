import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { contato, horarios, site } from "@/content/red";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument", display: "swap" });
const inter = Inter_Tight({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: "500", variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Red Tennis | Aulas de tênis e quadras de saibro em São Bernardo do Campo",
    template: "%s | Red Tennis Rudge Ramos",
  },
  description: site.descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: "Red Tennis · Feito no saibro",
    description: site.descricao,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Red Tennis. Feito no saibro. Rudge Ramos, São Bernardo do Campo." }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#141210" };

const DIAS_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["SportsActivityLocation", "LocalBusiness"],
  "@id": `${site.url}/#red`,
  name: site.nomeCompleto,
  description: site.descricao,
  url: site.url,
  image: `${site.url}/og.jpg`,
  telephone: contato.telefoneLink,
  email: contato.email,
  priceRange: "$$",
  sport: "Tennis",
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
    <html lang="pt-BR" className={`${archivo.variable} ${instrument.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll>
          <a href="#conteudo" className="mono sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-bola focus:text-grafite focus:p-3">
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
