import type { Metadata } from "next";
import { AbertoStatus, HorariosSemana } from "@/components/Aberto";
import { Cabeca } from "@/components/Cabeca";
import { FormContato } from "@/components/Formularios";
import { Mapa } from "@/components/Mapa";
import { Titulo } from "@/components/motion";
import { Btn, Rotulo, Seta } from "@/components/ui";
import { contato, mensagens } from "@/content/red";
import { wa } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Contato e como chegar: Av. Winston Churchill, 626",
  description:
    "Fale com a Red Tennis pelo WhatsApp (11) 98443-2672 ou telefone (11) 4365-2888. Av. Winston Churchill, 626, Rudge Ramos, São Bernardo do Campo. Veja horários e mapa.",
  alternates: { canonical: "/contato/" },
};

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
        tom="bordo"
        rotulo="Contato"
        linhas={["Chame", "*a Red.*"]}
        intro="A resposta mais rápida é pelo WhatsApp. Se preferir, ligue, escreva ou apareça: a recepção fica na entrada das quadras."
      >
        <Btn href={wa(mensagens.geral)}>Abrir WhatsApp</Btn>
      </Cabeca>

      <section className="secao sup-cal">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-5">
            <Rotulo n="01">Canais</Rotulo>
            <ul className="mt-6 b-t">
              {canais.map((c) => (
                <li key={c.rotulo} className="b-b">
                  <a
                    href={c.href}
                    className="flex items-baseline justify-between gap-4 py-5 group"
                    {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="mono sec">{c.rotulo}</span>
                    <span className="lead flex items-center gap-3 text-right break-all">
                      {c.valor} <Seta size={12} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <Rotulo n="02">Mensagem</Rotulo>
            <h2 className="display t-h3 mt-6 mb-8">
              Escreva
              <br />
              <span className="serif">para a gente.</span>
            </h2>
            <FormContato />
          </div>
        </div>
      </section>

      <section className="secao sup-grafite">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full lg:col-span-4">
            <Rotulo n="03">Como chegar</Rotulo>
            <Titulo className="display t-h2 mt-6" linhas={["Rudge", "*Ramos.*"]} />
            <AbertoStatus className="mt-8" />
            <address className="lead not-italic mt-4">
              {e.rua}
              <br />
              {e.bairro}, {e.cidade}, {e.uf}
              <br />
              CEP {e.cep}
            </address>
            <Btn href={contato.mapa} tom="cal" className="mt-8">
              Abrir no Google Maps
            </Btn>
          </div>
          <div className="col-span-full md:col-span-5 lg:col-span-3 lg:col-start-6">
            <p className="mono sec mb-3">Horários</p>
            <HorariosSemana />
          </div>
          <div className="col-span-full md:col-span-7 lg:col-span-4">
            <Mapa />
          </div>
        </div>
      </section>
    </>
  );
}
