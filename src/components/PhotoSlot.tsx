import fotos from "@/content/photos.generated.json";

type Foto = { width: number; height: number; widths: number[]; ret?: boolean; fonte?: string };
const manifesto = fotos as Record<string, Foto>;

type Props = {
  /** Nome do slot (ver scripts/photos.mjs e docs/briefing-fotos.md). */
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  /** Mostra a retícula de meio-tom por cima; a foto em cor aparece no hover. */
  ret?: boolean;
  prioridade?: boolean;
  /** Renderiza com <span> para poder ficar dentro de um parágrafo. */
  inline?: boolean;
};

export function temFoto(name: string) {
  return Boolean(manifesto[name]);
}

function Picture({ name, sufixo, foto, alt, sizes, prioridade, className }: { name: string; sufixo: string; foto: Foto; alt: string; sizes: string; prioridade?: boolean; className?: string }) {
  const srcset = (ext: string) => foto.widths.map((w) => `/fotos/${name}${sufixo}-${w}.${ext} ${w}w`).join(", ");
  const maior = foto.widths[foto.widths.length - 1];
  if (sufixo === "-ret") {
    // retícula: PNG de paleta, duas tintas
    return (
      <picture className={className}>
        <img src={`/fotos/${name}-ret-${maior}.png`} srcSet={srcset("png")} sizes={sizes} alt={alt} width={foto.width} height={foto.height} loading="lazy" decoding="async" />
      </picture>
    );
  }
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      {/* Export estático: AVIF/WebP já gerados por scripts/photos.mjs, por isso <img> direto. */}
      <img
        src={`/fotos/${name}${sufixo}-${maior}.webp`}
        alt={alt}
        width={foto.width}
        height={foto.height}
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : "auto"}
        decoding={prioridade ? "sync" : "async"}
      />
    </picture>
  );
}

/**
 * Lugar de foto. Para trocar pela foto da sessão profissional, salve o arquivo
 * em fotos/novas/<name>.jpg e rode `npm run photos`.
 */
export function PhotoSlot({ name, alt, sizes = "100vw", className = "", ret, prioridade, inline }: Props) {
  const foto = manifesto[name];
  const Caixa = inline ? "span" : "div";
  if (!foto) {
    return (
      <Caixa className={`foto foto-vazia ${className}`} role="img" aria-label={alt}>
        <span className="grao" />
      </Caixa>
    );
  }
  const comRet = Boolean(ret && foto.ret);
  return (
    <Caixa className={`foto ${comRet ? "foto-viva" : ""} ${className}`} style={inline ? { display: "block" } : undefined}>
      <Picture name={name} sufixo="" foto={foto} alt={alt} sizes={sizes} prioridade={prioridade} />
      {comRet && <Picture name={name} sufixo="-ret" foto={foto} alt="" sizes={sizes} className="reticula" />}
    </Caixa>
  );
}
