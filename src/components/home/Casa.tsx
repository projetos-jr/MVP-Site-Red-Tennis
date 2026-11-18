import Link from "next/link";
import { site } from "@/content/red";
import { PhotoSlot } from "../PhotoSlot";
import { Selo } from "../ui";

/** Miniatura impressa no meio da frase: decorativa, o texto já diz o que ela mostra. */
function Chip({ name }: { name: string }) {
  return (
    <span className="chip-foto" aria-hidden="true">
      <PhotoSlot name={name} alt="" sizes="200px" inline ret />
    </span>
  );
}

/** A casa: um parágrafo grande com fotos impressas no meio do texto. */
export function Casa() {
  return (
    <section className="secao sup-papel casa" aria-labelledby="casa-titulo">
      <div className="wrap g12 casa-grade">
        <h2 id="casa-titulo" className="sr-only">
          A Red Tennis
        </h2>
        <div className="col-span-full lg:col-span-8">
        <p className="casa-texto">
          A Red é a casa do tênis de saibro no ABC. São três quadras de saibro{" "}
          <Chip name="saibro-rede" /> isoladas por alambrados altos, uma quadra rápida bordô{" "}
          <Chip name="rapida-linhas" /> e um paredão iluminado{" "}
          <Chip name="rapida-paredao" />. Desde {site.fundacao}, no Rudge Ramos, tem gente que
          volta toda semana.
        </p>
        <div className="casa-pe">
          <p className="sec lead-pe">
            A criança começa com bola vermelha aos quatro anos. O adulto aprende do zero, em turma de até quatro. Quem já joga encontra
            adversário no ranking. Cada quadra tem entrada própria, e a luz acende quando o sol vai embora.
          </p>
          <Link href="/sobre/" className="btn-linha">
            Conhecer a história da Red
          </Link>
        </div>
        </div>
        <figure className="col-span-full md:col-span-6 lg:col-span-4 lg:col-start-9 casa-figura">
          <PhotoSlot
            name="saibro-vertical"
            alt="Quadra de saibro da Red vista da rede, com a cobertura de descanso e os refletores ao fundo"
            sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 50vw, 100vw"
            className="aspect-[4/5]"
            ret
          />
          <Selo id="selo-casa" ano={site.fundacao} className="casa-selo" />
          <figcaption>Fig. 1. As quadras de saibro vistas da rede, numa tarde de sol.</figcaption>
        </figure>
      </div>
    </section>
  );
}
