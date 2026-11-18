import Link from "next/link";
import { contato, mensagens, nav, site } from "@/content/red";
import { wa } from "@/lib/wa";
import { HorariosSemana } from "./Aberto";
import { FooterMarca } from "./FooterMarca";
import { Btn } from "./ui";

export function Footer() {
  const e = contato.endereco;
  return (
    <footer className="rodape sup-vinho">
      <span className="corredor" style={{ borderColor: "var(--saibro)" }} aria-hidden="true" />
      <div className="wrap" style={{ paddingTop: "clamp(3.5rem, 7vw, 6rem)" }}>
        <div className="g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full md:col-span-6 lg:col-span-5">
            <h2 className="sub t-h3">Venha jogar</h2>
            <address className="lead not-italic mt-4">
              {e.rua}
              <br />
              {e.bairro}, {e.cidade}
              <br />
              CEP {e.cep}
            </address>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              <Btn href={wa(mensagens.aula)} tom="claro">
                Agendar aula experimental
              </Btn>
            </div>
          </div>
          <div className="col-span-full md:col-span-6 lg:col-span-3 lg:col-start-7">
            <h2 className="ui sec mb-3">Horários</h2>
            <HorariosSemana />
          </div>
          <div className="col-span-full md:col-span-6 lg:col-span-3 lg:col-start-10">
            <h2 className="ui sec mb-3">Contato</h2>
            <ul className="grid gap-2 ui" style={{ fontSize: "1rem" }}>
              <li>
                <a className="link" href={wa(mensagens.geral)} target="_blank" rel="noopener noreferrer">
                  WhatsApp {contato.whatsappLegivel}
                </a>
              </li>
              <li>
                <a className="link" href={`tel:${contato.telefoneLink}`}>
                  {contato.telefone}
                </a>
              </li>
              <li>
                <a className="link" href={`mailto:${contato.email}`} style={{ overflowWrap: "anywhere" }}>
                  {contato.email}
                </a>
              </li>
              <li>
                <a className="link" href={contato.instagram.url} target="_blank" rel="noopener noreferrer">
                  Instagram {contato.instagram.usuario}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-5 fio flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 ui">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex items-center min-h-11 hover:underline">
                {item.rotulo}
              </Link>
            ))}
          </nav>
          <p className="ui sec">
            Aceitamos TotalPass. © {new Date().getFullYear()} {site.nomeCompleto}.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <FooterMarca />
      </div>
    </footer>
  );
}
