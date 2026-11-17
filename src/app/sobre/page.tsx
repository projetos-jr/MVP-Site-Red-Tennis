import type { Metadata } from "next";
import { Cabeca } from "@/components/Cabeca";
import { FaixaProfessores } from "@/components/FaixaProfessores";
import { Fecho } from "@/components/Fecho";
import { Surge, Titulo } from "@/components/motion";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Rotulo } from "@/components/ui";
import { estrutura, historia, numeros, site } from "@/content/red";

export const metadata: Metadata = {
  title: "Sobre a Red Tennis, academia de tênis no Rudge Ramos",
  description:
    "Conheça a Red Tennis: academia de tênis em São Bernardo do Campo com três quadras de saibro, quadra rápida, paredão iluminado, Red Kids e ranking interno.",
  alternates: { canonical: "/sobre/" },
};

export default function Sobre() {
  return (
    <>
      <Cabeca
        rotulo="Sobre a Red"
        linhas={["Feito", "*no saibro.*"]}
        intro={`Desde ${site.fundacao} no Rudge Ramos, ensinando a bater na bola, cuidando do pó de tijolo e juntando quem gosta de jogar.`}
      />

      <section className="secao sup-cal">
        <div className="wrap g12" style={{ rowGap: "3rem" }}>
          <Surge className="col-span-full md:col-span-6 lg:col-span-5">
            <PhotoSlot
              name="saibro-refletores"
              alt="Refletores e cobertura de descanso das quadras de saibro da Red Tennis"
              sizes="(min-width: 48rem) 42vw, 100vw"
              className="aspect-[4/5]"
              prioridade
            />
          </Surge>
          <div className="col-span-full md:col-span-6 lg:col-span-6 lg:col-start-7 grid gap-5 content-center">
            <Rotulo n="01">A casa</Rotulo>
            <Titulo className="display t-h2" linhas={["Um clube", "*de bairro,*", "com saibro", "*de verdade.*"]} />
            <p className="lead mt-4">
              A Red nasceu para que o ABC tivesse onde jogar tênis no saibro sem atravessar a cidade. Três quadras de pó de tijolo, uma quadra
              rápida e um paredão iluminado, na Av. Winston Churchill.
            </p>
            <p className="sec">
              As quadras são isoladas entre si por alambrados altos, com entradas independentes. O paredão é livre para alunos e vem com
              orientação: define empunhadura, forma os grupos musculares do golpe e cria reação. Quem quer evoluir rápido, evolui, sem custo
              adicional.
            </p>
            <p className="sec">
              Para as crianças, criamos o Red Kids, um método para alunos de 4 a 8 anos. Para quem compete, mantemos um ranking em quatro
              categorias e o Circuito Red Tennis, com etapas durante o ano.
            </p>
          </div>
          <dl className="numeros col-span-full">
            {numeros.map((n) => (
              <div key={n.rotulo}>
                <dd>
                  <strong className="display">{n.valor}</strong>
                </dd>
                <dt className="mono sec mt-2">{n.rotulo}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="secao sup-bordo">
        <div className="wrap">
          <Rotulo n="02">Linha do tempo</Rotulo>
          <Titulo className="display t-h2 mt-6 mb-12" linhas={["Set", "*a set.*"]} />
          <ol>
            {historia.map((h) => (
              <li key={h.ano} className="g12 b-t py-6 lg:py-8 items-baseline" style={{ rowGap: "0.5rem" }}>
                <p className="display t-h2 col-span-full lg:col-span-4" style={{ color: "var(--areia)" }}>
                  {h.ano}
                </p>
                <h3 className="display t-h4 col-span-full lg:col-span-3">{h.titulo}</h3>
                <p className="sec col-span-full lg:col-span-5">{h.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao sup-cal">
        <div className="wrap mb-10 lg:mb-16">
          <Rotulo n="03">Equipe</Rotulo>
          <Titulo className="display t-h2 mt-6" linhas={["Quem está", "*do outro lado da rede.*"]} />
        </div>
        <FaixaProfessores />
      </section>

      <section className="secao sup-grafite">
        <div className="wrap g12" style={{ rowGap: "2.5rem" }}>
          <div className="col-span-full lg:col-span-4">
            <Rotulo n="04">Estrutura</Rotulo>
            <Titulo className="display t-h2 mt-6" linhas={["Tudo", "*no lugar.*"]} />
          </div>
          <ol className="lista-n col-span-full lg:col-span-7 lg:col-start-6">
            {estrutura.map((e) => (
              <li key={e.nome}>
                <h3 className="display t-h4">{e.nome}</h3>
                <p className="sec">{e.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Fecho />
    </>
  );
}
