import { Btn, Bola } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="sup-saibro relative overflow-hidden isolate min-h-svh flex flex-col justify-center" style={{ paddingTop: 76 }}>
      <span className="grao grao-saibro" />
      <span className="luz" />
      <span className="traco-v" style={{ left: "62%", background: "var(--cal)", width: 2 }} aria-hidden="true" />
      <Bola className="absolute w-14 md:w-20" />
      <style>{`.sup-saibro > svg { left: calc(62% + 2.5rem); top: 76%; }`}</style>
      <div className="wrap relative">
        <p className="display inline-block px-3 py-2 t-h4" style={{ background: "var(--saibro-escuro)" }}>
          Erro 404 · Fora
        </p>
        <h1 className="display t-h1 mt-6">
          Essa foi
          <br />
          <span className="serif">pra fora.</span>
        </h1>
        <div className="mt-10 flex flex-wrap gap-4">
          <Btn href="/">Voltar para a quadra</Btn>
          <Btn href="/aulas/" tom="grafite">
            Ver aulas
          </Btn>
        </div>
      </div>
    </section>
  );
}
