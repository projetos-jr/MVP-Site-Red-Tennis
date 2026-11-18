import { numeros } from "@/content/red";

/** Os números da estrutura, desenhados: o desenho é a informação. Valores e rótulos vêm de red.ts. */

function QuadraMini({ cor, linha = "var(--papel)" }: { cor: string; linha?: string }) {
  // proporção real: 23,77 x 10,97 m (vista de cima, em pé)
  return (
    <svg viewBox="0 0 44 92" className="num-quadra" aria-hidden="true">
      <rect x="1" y="1" width="42" height="90" fill={cor} />
      <g fill="none" stroke={linha} strokeWidth="1.4">
        <rect x="3" y="3" width="38" height="86" />
        <path d="M7.7 3v86M36.3 3v86M7.7 25.5h28.6M7.7 66.5h28.6M22 25.5v41M3 46h38" />
      </g>
    </svg>
  );
}

export function Numeros() {
  return (
    <section className="sup-papel numeros-sec" aria-labelledby="numeros-titulo">
      <div className="wrap">
        <h2 id="numeros-titulo" className="ui sec numeros-titulo">
          A estrutura, contada
        </h2>
        <dl className="numeros">
          <div>
            <dt className="ui">{numeros[0].rotulo}</dt>
            <dd>
              <span className="placar">{numeros[0].valor}</span>
              <span className="num-arte">
                <QuadraMini cor="var(--saibro)" />
                <QuadraMini cor="var(--saibro)" />
                <QuadraMini cor="var(--saibro)" />
              </span>
            </dd>
          </div>
          <div>
            <dt className="ui">{numeros[1].rotulo}</dt>
            <dd>
              <span className="placar">{numeros[1].valor}</span>
              <span className="num-arte">
                <QuadraMini cor="var(--bordo)" />
              </span>
            </dd>
          </div>
          <div>
            <dt className="ui">{numeros[2].rotulo}</dt>
            <dd>
              <span className="placar">{numeros[2].valor}</span>
              <span className="num-arte num-postes" aria-hidden="true">
                {Array.from({ length: 6 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 14 60">
                    <path d="M7 14v46" stroke="var(--vinho)" strokeWidth="2" />
                    <circle cx="2.5" cy="4" r="2.3" fill="var(--papel)" stroke="var(--vinho)" strokeWidth="0.8" />
                    <circle cx="7" cy="4" r="2.3" fill="var(--papel)" stroke="var(--vinho)" strokeWidth="0.8" />
                    <circle cx="11.5" cy="4" r="2.3" fill="var(--papel)" stroke="var(--vinho)" strokeWidth="0.8" />
                    <path d="M1 9h12" stroke="var(--vinho)" strokeWidth="2" />
                  </svg>
                ))}
              </span>
            </dd>
          </div>
          <div>
            <dt className="ui">{numeros[3].rotulo}</dt>
            <dd>
              <span className="placar">{numeros[3].valor}</span>
              <span className="num-arte num-degraus" aria-hidden="true">
                {["A", "B", "C", "D"].map((c, i) => (
                  <span key={c} style={{ height: `${100 - i * 22}%` }}>
                    {c}
                  </span>
                ))}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
