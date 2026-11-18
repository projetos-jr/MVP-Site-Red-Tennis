// Gera as imagens do site: AVIF e WebP em vários tamanhos, com o tratamento da campanha.
// Uso: npm run photos
//
// Três fontes:
//  1. As fotos atuais da Red (referencias/site-atual): recortadas, tratadas e também
//     impressas em retícula de meio-tom (pontos bordô sobre papel, a 45°).
//  2. As imagens de material geradas pelo shader do saibro (fotos/estudio/*.png),
//     produzidas por scripts/estudio.cjs. São ilustrações, não fotos da Red.
//  3. Fotos novas da sessão profissional: salve em fotos/novas/<slot>.jpg e rode de novo.
//     Elas substituem o slot como vieram, sem recorte nem tratamento.
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "public/fotos");
const SAIBRO = path.join(root, "referencias/site-atual/02-quadras-saibro.png");
const RAPIDA = path.join(root, "referencias/site-atual/01-quadra-rapida.png");
const estudio = (n) => path.join(root, "fotos/estudio", n + ".jpg");
const WIDTHS = [480, 640, 800, 1280, 1800, 2560];

const TINTA = { r: 0x6b, g: 0x1d, b: 0x21 };
const PAPEL = "#fcfaf6";

// left, top, width, height em px do original
const slots = [
  { name: "saibro-vertical", src: SAIBRO, crop: [330, 150, 640, 800], ret: true },
  { name: "saibro-quadras", src: SAIBRO, crop: [8, 300, 1268, 650], ret: true },
  { name: "rapida-quadra", src: RAPIDA, crop: [6, 190, 1260, 646], ret: true },
  { name: "rapida-paredao", src: RAPIDA, crop: [620, 150, 650, 520], ret: true },
  { name: "saibro-rede", src: SAIBRO, crop: [8, 430, 620, 520], ret: true },
  { name: "saibro-linha", src: SAIBRO, crop: [520, 520, 760, 435], ret: true },
  { name: "saibro-refletores", src: SAIBRO, crop: [330, 0, 560, 700], ret: true },
  { name: "rapida-linhas", src: RAPIDA, crop: [190, 290, 760, 420], ret: true },
  // material renderizado (ilustração)
  { name: "hero-saibro", src: estudio("hero-saibro") },
  { name: "deslize", src: estudio("deslize") },
  { name: "vassourada", src: estudio("vassourada") },
  { name: "raquete-tarde", src: estudio("raquete-tarde") },
  { name: "bola-fora", src: estudio("bola-fora") },
  { name: "bola-na-linha", src: estudio("bola-na-linha") },
  { name: "quadra-noite", src: estudio("quadra-noite") },
  { name: "linha-tarde", src: estudio("linha-tarde") },
  { name: "rede-manha", src: estudio("rede-manha") },
  // slots da sessão profissional (docs/briefing-fotos.md)
  { name: "professor-em-acao" },
  { name: "pes-no-saibro" },
  { name: "kids-bola-vermelha" },
  { name: "rapida-de-cima" },
  { name: "estrutura-anoitecer" },
  { name: "professor-joao" },
  { name: "professor-francisco" },
  { name: "professor-arnaldo" },
  { name: "rebatedores" },
];

/** Retícula de meio-tom: pontos de tinta numa grade a 45°, raio pelo tom da foto. */
async function reticula(buffer, largura) {
  const { data, info } = await sharp(buffer)
    .resize({ width: largura })
    .greyscale()
    .linear(1.12, -4)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const lum = (x, y) => {
    const xi = Math.min(W - 1, Math.max(0, Math.round(x)));
    const yi = Math.min(H - 1, Math.max(0, Math.round(y)));
    return data[yi * W + xi] / 255;
  };
  const cel = Math.max(5, Math.round(largura / 150));
  const ang = Math.PI / 4;
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  const alcance = Math.ceil((W + H) / cel);
  const pontos = [];
  for (let i = -alcance; i <= alcance; i++) {
    for (let j = -alcance; j <= alcance; j++) {
      const x = W / 2 + (i * c - j * s) * cel;
      const y = H / 2 + (i * s + j * c) * cel;
      if (x < -cel || y < -cel || x > W + cel || y > H + cel) continue;
      // média de 5 amostras na célula
      const t = (lum(x, y) * 2 + lum(x - cel / 3, y) + lum(x + cel / 3, y) + lum(x, y - cel / 3) + lum(x, y + cel / 3)) / 6;
      const escuro = Math.pow(1 - t, 1.12);
      const r = (cel / 2) * 1.42 * Math.sqrt(escuro);
      if (r < 0.35) continue;
      pontos.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}"/>`);
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="${PAPEL}"/><g fill="rgb(${TINTA.r},${TINTA.g},${TINTA.b})">${pontos.join("")}</g></svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

mkdirSync(out, { recursive: true });
const so = process.argv.slice(2);
const manifestPath = path.join(root, "src/content/photos.generated.json");
const manifest = so.length && existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};

for (const slot of slots) {
  if (so.length && !so.includes(slot.name)) continue;
  const nova = [".jpg", ".jpeg", ".png", ".webp"]
    .map((ext) => path.join(root, "fotos/novas", slot.name + ext))
    .find((p) => existsSync(p));
  const fonte = nova ?? slot.src;
  if (!fonte || !existsSync(fonte)) continue;

  let img = sharp(fonte).rotate();
  const tratar = !nova && slot.crop;
  if (tratar) {
    const [left, top, width, height] = slot.crop;
    img = img
      .extract({ left, top, width, height })
      // Tratamento: mais quente, sombras fechadas, saturação contida.
      .recomb([
        [1.06, 0.02, 0.0],
        [0.01, 0.97, 0.0],
        [0.0, 0.03, 0.84],
      ])
      .modulate({ saturation: 0.9, brightness: 0.94 })
      .linear(1.12, -14);
  }
  const base = await img.png().toBuffer({ resolveWithObject: true });
  const { width, height } = base.info;
  const widths = WIDTHS.filter((w) => w < width * 0.9).concat(Math.min(width, 2560));
  const comRet = Boolean(slot.ret && !nova);

  for (const w of widths) {
    const r = sharp(base.data).resize({ width: w });
    // texturas renderizadas aguentam mais compressão que fotografia
    const material = !nova && !slot.crop;
    // texturas: qualidade suficiente para não borrar; o grão fino vem de uma camada em CSS no site
    await r.clone().avif({ quality: material ? 58 : 52, chromaSubsampling: material ? "4:4:4" : "4:2:0" }).toFile(path.join(out, `${slot.name}-${w}.avif`));
    await r.clone().webp({ quality: material ? 72 : 74 }).toFile(path.join(out, `${slot.name}-${w}.webp`));
    if (comRet) {
      // duas tintas: PNG de paleta comprime pontos de meio-tom muito melhor que formatos com perdas
      const ret = await reticula(base.data, w);
      await sharp(ret).png({ palette: true, colors: 4, compressionLevel: 9, effort: 10 }).toFile(path.join(out, `${slot.name}-ret-${w}.png`));
    }
  }
  manifest[slot.name] = { width, height, widths, ret: comRet, fonte: nova ? "nova" : slot.crop ? "red" : "estudio" };
  console.log(`${slot.name}: ${width}x${height} -> ${widths.join(", ")}${comRet ? " + retícula" : ""}`);
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
