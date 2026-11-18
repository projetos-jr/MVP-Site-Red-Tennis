import { mensagens } from "@/content/red";
import { wa } from "@/lib/wa";
import { PhotoSlot } from "./PhotoSlot";
import { Bola, Btn, BtnLinha } from "./ui";
import { BtnAula } from "./Agendar";

/** Chamada final das páginas: a quadra em luz de fim de tarde. */
type Acao = { rotulo: string; href: string };

export function Fecho({ titulo = "A quadra está pronta", foto = "raquete-tarde", acao }: { titulo?: string; foto?: string; acao?: Acao }) {
  // a bola é o ponto final: não pode cair sozinha na linha de baixo
  const palavras = titulo.split(" ");
  const ultima = palavras.pop();
  const resto = palavras.join(" ");
  return (
    <section className="fecho" aria-labelledby="fecho-titulo">
      <PhotoSlot name={foto} alt="" sizes="100vw" className="fecho-foto com-grao-foto" />
      <div className="wrap fecho-corpo">
        <h2 id="fecho-titulo" className="display fecho-titulo">
          {resto}{" "}
          <span className="whitespace-nowrap">
            {ultima}
            <Bola className="fecho-ponto" />
          </span>
        </h2>
        <div className="hero-acoes">
          {acao ? (
            <Btn href={acao.href} tom="claro">
              {acao.rotulo}
            </Btn>
          ) : (
            <BtnAula tom="claro" />
          )}
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
