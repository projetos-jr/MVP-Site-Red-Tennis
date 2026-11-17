// Gera as fotos do site em AVIF/WebP, já com o tratamento de cor da campanha.
// Uso: npm run photos
//
// Para trocar uma foto pela da sessão profissional, salve o arquivo em
// fotos/novas/<nome-do-slot>.jpg (ou .png) e rode o script de novo.
// Fotos em fotos/novas/ não recebem recorte nem tratamento de cor: entram como vieram.
import sharp from "sharp";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "public/fotos");
const SAIBRO = path.join(root, "referencias/site-atual/02-quadras-saibro.png");
const RAPIDA = path.join(root, "referencias/site-atual/01-quadra-rapida.png");
const WIDTHS = [480, 800, 1280];

// Recortes das duas fotos atuais (left, top, width, height em px do original).
const slots = [
  { name: "saibro-vertical", src: SAIBRO, crop: [330, 150, 640, 800] },
  { name: "saibro-quadras", src: SAIBRO, crop: [0, 300, 1283, 655] },
  { name: "rapida-quadra", src: RAPIDA, crop: [0, 190, 1273, 660] },
  { name: "rapida-paredao", src: RAPIDA, crop: [620, 150, 650, 520] },
  { name: "saibro-rede", src: SAIBRO, crop: [0, 430, 620, 525] },
  { name: "saibro-linha", src: SAIBRO, crop: [520, 520, 760, 435] },
  { name: "saibro-refletores", src: SAIBRO, crop: [330, 0, 560, 700] },
  { name: "rapida-linhas", src: RAPIDA, crop: [190, 290, 760, 420] },
  // Slots da sessão profissional (ver docs/briefing-fotos.md). Sem arquivo, o site mostra o placeholder.
  { name: "bola-na-linha" },
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

mkdirSync(out, { recursive: true });
const manifest = {};

for (const slot of slots) {
  const nova = [".jpg", ".jpeg", ".png", ".webp"]
    .map((ext) => path.join(root, "fotos/novas", slot.name + ext))
    .find((p) => existsSync(p));
  if (!nova && !slot.src) continue;

  let img = sharp(nova ?? slot.src).rotate();
  if (!nova) {
    const [left, top, width, height] = slot.crop;
    img = img
      .extract({ left, top, width, height })
      // Tratamento de campanha: mais quente, sombras fechadas, saturação contida.
      .recomb([
        [1.06, 0.02, 0.0],
        [0.01, 0.97, 0.0],
        [0.0, 0.03, 0.84],
      ])
      .modulate({ saturation: 0.9, brightness: 0.94 })
      .linear(1.12, -14);
  }
  const base = await img.toBuffer({ resolveWithObject: true });
  const { width, height } = base.info;
  const widths = WIDTHS.filter((w) => w < width * 0.9).concat(Math.min(width, 1600));

  for (const w of widths) {
    const r = sharp(base.data).resize({ width: w });
    await r.clone().avif({ quality: 50 }).toFile(path.join(out, `${slot.name}-${w}.avif`));
    await r.clone().webp({ quality: 72 }).toFile(path.join(out, `${slot.name}-${w}.webp`));
  }
  manifest[slot.name] = { width, height, widths };
  console.log(`${slot.name}: ${width}x${height} -> ${widths.join(", ")}`);
}

writeFileSync(
  path.join(root, "src/content/photos.generated.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
