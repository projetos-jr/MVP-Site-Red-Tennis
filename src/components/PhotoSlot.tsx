import fotos from "@/content/photos.generated.json";
import { SombraRede } from "./Texturas";

type Foto = { width: number; height: number; widths: number[] };
const manifesto = fotos as Record<string, Foto>;

type Props = {
  /** Nome do slot. Com arquivo gerado por `npm run photos`, mostra a foto; sem, o placeholder. */
  name: string;
  /** Texto alternativo descritivo. */
  alt: string;
  /** Briefing curto que aparece no placeholder: "Professor em quadra, luz de fim de tarde". */
  briefing?: string;
  sizes?: string;
  className?: string;
  duotone?: boolean;
  prioridade?: boolean;
  /** Sigla grande no placeholder (iniciais do professor, por exemplo). */
  sigla?: string;
};

/**
 * Lugar de foto. Para trocar pela foto da sessão profissional, salve o arquivo
 * em fotos/novas/<name>.jpg e rode `npm run photos`.
 */
export function PhotoSlot({ name, alt, briefing, sizes = "100vw", className = "", duotone, prioridade, sigla }: Props) {
  const foto = manifesto[name];

  if (!foto) {
    return (
      <div className={`foto foto-vazia ${className}`} role="img" aria-label={alt}>
        <SombraRede angulo={-24} fita={30} opacidade={0.55} cor="#3c1004" />
        <span className="grao" />
        {sigla && (
          <span className="display foto-sigla" aria-hidden="true">
            {sigla}
          </span>
        )}
        <p className="mono" style={{ opacity: 0.7 }}>
          Slot · {name}
        </p>
        <p className="mono">Foto · {briefing ?? alt}</p>
      </div>
    );
  }

  const srcset = (ext: string) => foto.widths.map((w) => `/fotos/${name}-${w}.${ext} ${w}w`).join(", ");
  const maior = foto.widths[foto.widths.length - 1];

  return (
    <div className={`foto ${duotone ? "duotone" : ""} ${className}`}>
      <picture>
        <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
        {/* Export estático: AVIF/WebP já gerados por scripts/photos.mjs, por isso <img> direto. */}
        <img
          src={`/fotos/${name}-${maior}.webp`}
          alt={alt}
          width={foto.width}
          height={foto.height}
          loading={prioridade ? "eager" : "lazy"}
          fetchPriority={prioridade ? "high" : "auto"}
          decoding="async"
        />
      </picture>
      <span className="grao" />
    </div>
  );
}
