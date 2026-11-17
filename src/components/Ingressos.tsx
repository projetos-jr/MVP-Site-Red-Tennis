import { mensagens, planos } from "@/content/red";
import { wa } from "@/lib/wa";
import { Surge } from "./motion";
import { Btn } from "./ui";

/** Planos do Clube Red como ingressos de sócio, com canhoto destacável. */
export function Ingressos() {
  return (
    <ul className="grid gap-5">
      {planos.map((p, i) => (
        <Surge as="li" key={p.id} atraso={i * 0.08} className={["lg:mr-[12%]", "lg:mx-[6%]", "lg:ml-[12%]"][i]}>
          <article className="ingresso" data-destaque={p.destaque ?? false}>
            <div className="ingresso-corpo">
              <div>
                <p className="mono sec">Sócio nº</p>
                <p className="display t-h3">{p.numero}</p>
              </div>
              <div>
                <p className="mono sec">Clube Red</p>
                <h3 className="display t-h3">{p.nome}</h3>
                <p className="mt-3 sec">{p.chamada}</p>
              </div>
              <ul>
                {p.inclui.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="ingresso-canhoto">
              <div>
                <p className="display ingresso-preco">{p.preco}</p>
                <p className="mono sec">{p.periodo}</p>
              </div>
              <div className="hidden lg:flex items-center justify-between">
                <span className="codigo" aria-hidden="true" />
                <span className="mono sec">RT-{p.numero}</span>
              </div>
              <Btn href={wa(`${mensagens.clube} Tenho interesse no plano ${p.nome}.`)} tom={p.destaque ? "bola" : "linha"} className="lg:w-full">
                Quero este
              </Btn>
            </div>
          </article>
        </Surge>
      ))}
    </ul>
  );
}
