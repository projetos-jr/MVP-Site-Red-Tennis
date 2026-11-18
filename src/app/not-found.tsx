import type { Metadata } from "next";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Bola, Btn, BtnLinha } from "@/components/ui";

export const metadata: Metadata = { title: "Página não encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="fora sup-saibro">
      <PhotoSlot name="bola-fora" alt="" sizes="100vw" className="cabeca-foto" />
      <span className="fora-bola" aria-hidden="true">
        <Bola className="fora-y" />
      </span>
      <style>{`.fora-bola{right:22%;bottom:36%}`}</style>
      <div className="wrap cabeca-corpo">
        <p className="ui">Erro 404</p>
        <h1 className="display cabeca-titulo">Essa foi pra fora</h1>
        <div className="cabeca-pe">
          <p className="lead">A página que você procurou não está aqui. A quadra continua no mesmo lugar.</p>
          <div className="cabeca-acoes">
            <Btn href="/" tom="claro">
              Voltar para a quadra
            </Btn>
            <BtnLinha href="/aulas/">Ver as aulas</BtnLinha>
          </div>
        </div>
      </div>
    </section>
  );
}
