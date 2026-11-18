import type { Metadata } from "next";
import { pagina } from "@/lib/seo";
import { Cabeca, TituloSecao } from "@/components/Cabeca";
import { Fecho } from "@/components/Fecho";
import { Equipe } from "@/components/home/Equipe";
import { Numeros } from "@/components/home/Numeros";
import { PhotoSlot } from "@/components/PhotoSlot";
import { estrutura, historia, site } from "@/content/red";

export const metadata: Metadata = pagina({
  titulo: "Sobre a Red, academia de tênis no Rudge Ramos",
  descricao: "Conheça a Red Tennis: academia de tênis em São Bernardo do Campo com três quadras de saibro, quadra rápida, paredão iluminado, Red Kids e ranking.",
  caminho: "/sobre/",
});

export default function Sobre() {
  return (
    <>
      <Cabeca
        titulo="Feito no saibro"
        foto="saibro-quadras"
        ret
        intro={`Desde ${site.fundacao} no Rudge Ramos, ensinando a bater na bola, cuidando do pó de tijolo e juntando quem gosta de jogar.`}
      />

      <section className="secao sup-papel" aria-labelledby="casa-titulo">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <div className="col-span-full md:col-span-6 lg:col-span-5">
            <PhotoSlot
              name="saibro-refletores"
              alt="Refletores e cobertura de descanso das quadras de saibro da Red Tennis"
              sizes="(min-width: 48rem) 42vw, 100vw"
              className="aspect-[4/5]"
              ret
            />
          </div>
          <div className="col-span-full md:col-span-6 lg:col-span-6 lg:col-start-7 grid gap-5 content-center">
            <TituloSecao lado id="casa-titulo">Um clube de bairro com saibro de verdade</TituloSecao>
            <p className="lead mt-2">
              A Red é onde o ABC joga tênis no saibro sem atravessar a cidade. Três quadras de pó de tijolo, uma quadra
              rápida e um paredão iluminado, na Av. Winston Churchill.
            </p>
            <p className="sec">
              As quadras são isoladas por alambrados altos, com entradas independentes. O paredão é livre para alunos e vem com orientação:
              define a empunhadura, cria a memória do golpe e treina a reação. Quem quer evoluir rápido, evolui, sem custo a mais.
            </p>
            <p className="sec">
              Para as crianças, criamos o Red Kids, um método para alunos de 4 a 8 anos. Para quem compete, mantemos um ranking em quatro
              categorias e o Circuito Red Tennis, com etapas durante o ano.
            </p>
          </div>
        </div>
      </section>

      <Numeros />

      <section className="secao sup-bordo" aria-labelledby="tempo-titulo">
        <div className="wrap">
          <TituloSecao id="tempo-titulo" className="mb-12">
            Set a set
          </TituloSecao>
          <ol className="tempo">
            {historia.map((h) => (
              <li key={h.ano}>
                <span className="placar">{h.ano}</span>
                <h3 className="sub">{h.titulo}</h3>
                <p className="sec">{h.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao sup-papel" aria-labelledby="equipe-titulo">
        <div className="wrap">
          <TituloSecao id="equipe-titulo" className="mb-12">
            Quem está do outro lado da rede
          </TituloSecao>
          <Equipe />
        </div>
      </section>

      <section className="secao sup-vinho" aria-labelledby="estrutura-titulo">
        <div className="wrap g12" style={{ rowGap: "2rem" }}>
          <TituloSecao lado id="estrutura-titulo" className="col-span-full lg:col-span-4">
            Tudo no lugar
          </TituloSecao>
          <ul className="lista-fio col-span-full lg:col-span-8">
            {estrutura.map((e) => (
              <li key={e.nome}>
                <h3 className="sub">{e.nome}</h3>
                <p className="sec">{e.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Fecho />
    </>
  );
}
