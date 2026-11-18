// Gera as imagens de material (fotos/estudio/*.jpg) renderizando o shader do saibro.
// Requer o site rodando (npm run dev) e o Playwright instalado.
// Uso: node scripts/estudio.cjs [http://localhost:3000]
const { chromium } = require("playwright");
const path = require("node:path");
const fs = require("node:fs");

const base = process.argv[2] || "http://localhost:3000";
const so = process.argv.slice(3);
const destino = path.join(__dirname, "..", "fotos", "estudio");
fs.mkdirSync(destino, { recursive: true });

// Cada cena: tamanho, parâmetros do saibro e escala de renderização.
const cenas = {
  // base do hero: o saibro com a sombra curta da rede ao meio-dia; linhas e bola entram por cima (WebGL ou CSS)
  "hero-saibro": { w: 2560, h: 1440, q: "lw=25&tx=-900&ty=-900&br=0&hora=12.5&ny=-72" },
  // /aulas: a marca de um deslize, com a borda de pó empurrado
  deslize: { w: 2560, h: 1440, q: "lw=44&tx=-900&ty=1130&br=0&hora=8.0&ny=-5000&deslize=520,640,2050,700,96&fundo=3.2" },
  // /quadras: a quadra recém-varrida, em arcos
  vassourada: { w: 2560, h: 1440, q: "lw=44&tx=1900&ty=-900&br=0&hora=9.5&ny=-5000&var=-900,2700,1.1,50" },
  // chamada final: a sombra de uma raquete encostada, sem bola (a bola vira o ponto final do título)
  "raquete-tarde": { w: 2560, h: 1280, q: "lw=40&tx=2080&ty=1180&br=0&hora=16.6&ny=-5000&raq=1820,520,-28,1.9" },
  // 404: a marca do quique fora da linha
  "bola-fora": { w: 2560, h: 1440, q: "lw=44&tx=-900&ty=1060&br=0&hora=17.2&ny=-5000&quique=1500,860,56&fundo=3.5" },
  // /torneios: a quadra à noite
  "quadra-noite": { w: 2560, h: 1440, q: "lw=44&tx=1800&ty=1000&br=48&noite=1&ny=-700" },
  // compartilhamento e styleguide
  "bola-na-linha": { w: 900, h: 1125, q: "lw=44&tx=520&ty=720&br=50&hora=16.9&ny=-30" },
  "linha-tarde": { w: 1800, h: 900, q: "lw=34&tx=1320&ty=620&br=38&hora=17.5&ny=-20" },
  "rede-manha": { w: 1500, h: 1000, q: "lw=40&tx=420&ty=860&br=0&hora=8.2&ny=-10" },
};

(async () => {
  const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  for (const [nome, c] of Object.entries(cenas).filter(([n]) => !so.length || so.includes(n))) {
    const p = await b.newPage({ viewport: { width: c.w, height: c.h } });
    await p.goto(`${base}/estudio/?w=${c.w}&h=${c.h}&dpr=${c.w > 2000 ? 1 : 2}&${c.q}`, { waitUntil: "networkidle" });
    await p.waitForFunction(() => document.body.dataset.pronto === "1", null, { timeout: 180000 });
    await p.waitForTimeout(300);
    const dataUrl = await p.evaluate(() => document.querySelector("#estudio").toDataURL("image/jpeg", 0.93));
    fs.writeFileSync(path.join(destino, nome + ".jpg"), Buffer.from(dataUrl.split(",")[1], "base64"));
    console.log("ok", nome);
    await p.close();
  }
  await b.close();
})();
