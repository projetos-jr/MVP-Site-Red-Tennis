import type { Metadata } from "next";
import { pagina } from "@/lib/seo";
import { AbertoStatus, HorariosSemana } from "@/components/Aberto";
import { Cabeca, TituloSecao } from "@/components/Cabeca";
import { FormContato } from "@/components/Formularios";
import { Mapa } from "@/components/Mapa";
import { Btn } from "@/components/ui";
import { contato, mensagens } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = pagina({
  titulo: "Contato e como chegar: Av. Winston Churchill, 626",
  descricao: "WhatsApp (11) 98443-2672. Av. Winston Churchill, 626, Rudge Ramos, São Bernardo do Campo. Horários de funcionamento e como chegar à Red Tennis.",
  caminho: "/contato/",
});

export default function Contato() {
  const e = contato.endereco;
  const canais = [
    { rotulo: "WhatsApp", valor: contato.whatsappLegivel, href: wa(mensagens.geral), externo: true },
    { rotulo: "Telefone", valor: contato.telefone, href: `tel:${contato.telefoneLink}` },
    { rotulo: "E-mail", valor: contato.email, href: `mailto:${contato.email}` },
    { rotulo: "Instagram", valor: contato.instagram.usuario, href: contato.instagram.url, externo: true },
  ];
  return (
    <>
      <Cabeca
        titulo="Chame a Red"
        tom="saibro"
        intro="A resposta mais rápida é pelo WhatsApp. Se preferir, ligue, escreva ou apareça na Av. Winston Churchill, 626."
      >
        <Btn href={wa(mensagens.geral)} tom="claro">
          Chamar no WhatsApp
        </Btn>
      </Cabeca>

      <section className="secao sup-papel" aria-labelledby="canais-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-5">
            <TituloSecao lado id="canais-titulo">Canais</TituloSecao>
            <ul className="canais mt-8">
              {canais.map((c) => (
                <li key={c.rotulo}>
                  <a href={c.href} {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <span className="ui sec">{c.rotulo}</span>
                    <span className="lead" style={{ overflowWrap: "anywhere", textAlign: "right" }}>
                      {c.valor}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <TituloSecao lado>Escreva para a gente</TituloSecao>
            <div className="mt-8">
              <FormContato />
            </div>
          </div>
        </div>
      </section>

      <section className="secao sup-po" aria-labelledby="chegar-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-4">
            <TituloSecao lado id="chegar-titulo">Como chegar</TituloSecao>
            <AbertoStatus className="mt-8" />
            <address className="lead not-italic mt-4">
              {e.rua}
              <br />
              {e.bairro}, {e.cidade}, {e.uf}
              <br />
              CEP {e.cep}
            </address>
            <Btn href={contato.mapa} className="mt-8">
              Abrir no Google Maps
            </Btn>
          </div>
          <div className="col-span-full md:col-span-5 lg:col-span-3 lg:col-start-5">
            <HorariosSemana />
          </div>
          <div className="col-span-full md:col-span-7 lg:col-span-5 lg:col-start-8" style={{ ["--papel-mapa" as string]: "var(--po)" }}>
            <Mapa />
          </div>
        </div>
      </section>
    </>
  );
}
