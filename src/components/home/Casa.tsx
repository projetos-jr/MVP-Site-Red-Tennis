import Link from "next/link";
import { site } from "@/content/red";
import { PhotoSlot } from "../PhotoSlot";

function Chip({ name, alt }: { name: string; alt: string }) {
  return (
    <span className="chip-foto">
      <PhotoSlot name={name} alt={alt} sizes="200px" inline />
    </span>
  );
}

/** A casa: um parágrafo grande com fotos impressas no meio do texto. */
export function Casa() {
  return (
    <section className="secao sup-papel casa" aria-labelledby="casa-titulo">
      <div className="wrap">
        <h2 id="casa-titulo" className="sr-only">
          A Red Tennis
        </h2>
        <p className="casa-texto">
          A Red é a casa do tênis de saibro no ABC. São três quadras de saibro{" "}
          <Chip name="saibro-rede" alt="Rede e sombra sobre a quadra de saibro" /> isoladas por alambrados altos, uma quadra rápida bordô{" "}
          <Chip name="rapida-linhas" alt="Linhas brancas da quadra rápida bordô" /> e um paredão iluminado{" "}
          <Chip name="rapida-paredao" alt="Paredão vermelho ao lado da quadra rápida" />. Desde {site.fundacao}, no Rudge Ramos, tem gente que
          volta toda semana.
        </p>
        <div className="casa-pe">
          <p className="sec lead-pe">
            A criança começa com bola vermelha aos quatro anos. O adulto aprende do zero, em turma de até quatro. Quem já joga encontra
            adversário no ranking. Cada quadra tem entrada própria, e a luz acende quando o sol vai embora.
          </p>
          <Link href="/sobre/" className="btn-linha">
            A história da Red
          </Link>
        </div>
      </div>
    </section>
  );
}
