import { mensagens } from "@/content/red";
import { wa } from "@/lib/wa";
import { Titulo } from "./motion";
import { SombraRaquetes } from "./Texturas";
import { Btn } from "./ui";

/** Chamada final em saibro, com a sombra das raquetes (ref. 04). */
export function Fecho({ linhas = ["A quadra", "está", "*pronta.*"] }: { linhas?: string[] }) {
  return (
    <section className="sup-saibro relative overflow-hidden isolate" style={{ paddingBlock: "clamp(6rem, 14vw, 13rem)" }}>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <span className="grao grao-saibro" />
        <span className="grao grao-claro" />
        <span className="luz" />
        <SombraRaquetes className="absolute right-[-42%] md:right-[6%] top-[-6%] h-[112%] w-auto opacity-80" />
      </div>
      <div className="wrap relative">
        <Titulo className="display t-h1" linhas={linhas} />
        <div className="mt-10 flex flex-wrap gap-4">
          <Btn href={wa(mensagens.aula)}>Agendar aula experimental</Btn>
          <Btn href={wa(mensagens.quadra)} tom="grafite">
            Reservar quadra
          </Btn>
        </div>
      </div>
    </section>
  );
}
