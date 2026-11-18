import { mensagens } from "@/content/red";
import { wa } from "@/lib/wa";
import { PhotoSlot } from "./PhotoSlot";
import { Btn, BtnLinha } from "./ui";

/** Chamada final das páginas: a quadra em luz de fim de tarde. */
type Acao = { rotulo: string; href: string };

export function Fecho({ titulo = "A quadra está pronta", foto = "linha-tarde", acao }: { titulo?: string; foto?: string; acao?: Acao }) {
  return (
    <section className="fecho" aria-labelledby="fecho-titulo">
      <PhotoSlot name={foto} alt="" sizes="100vw" className="fecho-foto" />
      <div className="wrap fecho-corpo">
        <h2 id="fecho-titulo" className="display fecho-titulo">
          {titulo}
        </h2>
        <div className="hero-acoes">
          <Btn href={acao?.href ?? wa(mensagens.aula)} tom="claro">
            {acao?.rotulo ?? "Agendar aula experimental"}
          </Btn>
          {acao ? (
            <BtnLinha href={wa(mensagens.aula)}>Agendar aula experimental</BtnLinha>
          ) : (
            <BtnLinha href={wa(mensagens.quadra)}>Reservar quadra</BtnLinha>
          )}
        </div>
      </div>
    </section>
  );
}
