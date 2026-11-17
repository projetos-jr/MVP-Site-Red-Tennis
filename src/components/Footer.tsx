import Link from "next/link";
import { contato, mensagens, nav, site } from "@/content/red";
import { wa } from "@/lib/wa";
import { HorariosSemana } from "./Aberto";
import { Mapa } from "./Mapa";
import { Seta } from "./ui";

export function Footer() {
  const e = contato.endereco;
  return (
    <footer className="rodape sup-bordo">
      <div className="wrap" style={{ paddingTop: "clamp(4rem, 8vw, 7rem)" }}>
        <div className="g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full md:col-span-6 lg:col-span-4">
            <p className="mono sec">Endereço</p>
            <address className="lead not-italic mt-3">
              {e.rua}
              <br />
              {e.bairro}, {e.cidade}, {e.uf}
              <br />
              CEP {e.cep}
            </address>
            <ul className="mt-6 grid gap-1">
              <li>
                <a className="link" href={wa(mensagens.geral)} target="_blank" rel="noopener noreferrer">
                  WhatsApp {contato.whatsappLegivel} <Seta size={12} />
                </a>
              </li>
              <li>
                <a className="link" href={`tel:${contato.telefoneLink}`}>
                  Telefone {contato.telefone}
                </a>
              </li>
              <li>
                <a className="link" href={`mailto:${contato.email}`}>
                  {contato.email}
                </a>
              </li>
              <li>
                <a className="link" href={contato.instagram.url} target="_blank" rel="noopener noreferrer">
                  Instagram {contato.instagram.usuario} <Seta size={12} />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-full md:col-span-6 lg:col-span-3">
            <p className="mono sec mb-3">Horários</p>
            <HorariosSemana />
          </div>
          <div className="col-span-full lg:col-span-5">
            <Mapa />
          </div>
        </div>

        <div className="mt-12 pt-5 b-t flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="mono inline-flex items-center min-h-11 hover:underline">
                {item.rotulo}
              </Link>
            ))}
          </nav>
          <p className="mono selo">
            <span className="ponto" /> Aceitamos TotalPass
          </p>
        </div>
        <p className="mono sec mt-5 mb-10" style={{ maxWidth: "none" }}>
          © {new Date().getFullYear()} {site.nomeCompleto} · {site.slogan}
        </p>
      </div>
      <p className="display rodape-marca" aria-hidden="true">
        Red Tennis
      </p>
    </footer>
  );
}
