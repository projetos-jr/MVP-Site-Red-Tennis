// Gera as imagens de material (fotos/estudio/*.jpg) renderizando o shader do saibro.
// Requer o site rodando (npm run dev) e o Playwright instalado.
// Uso: node scripts/estudio.cjs [http://localhost:3000]
const { chromium } = require("playwright");
const path = require("node:path");
const fs = require("node:fs");

const base = process.argv[2] || "http://localhost:3000";
const destino = path.join(__dirname, "..", "fotos", "estudio");
fs.mkdirSync(destino, { recursive: true });

// Cada cena: tamanho, parâmetros do saibro e escala de renderização.
const cenas = {
  // base do hero: o saibro sem linhas nem bola (as linhas e a bola entram por cima)
  "hero-saibro": { w: 1800, h: 1100, q: "lw=24&tx=-900&ty=-900&br=0&hora=17&ny=-40" },
  "bola-na-linha": { w: 900, h: 1125, q: "lw=44&tx=520&ty=720&br=50&hora=16.9&ny=-30" },
  "quadra-noite": { w: 1500, h: 1000, q: "lw=40&tx=1080&ty=640&br=44&noite=1&ny=-400" },
  "linha-tarde": { w: 1800, h: 900, q: "lw=34&tx=1320&ty=620&br=38&hora=17.5&ny=-20" },
  "rede-manha": { w: 1500, h: 1000, q: "lw=40&tx=420&ty=860&br=0&hora=8.2&ny=-10" },
};

(async () => {
  const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  for (const [nome, c] of Object.entries(cenas)) {
    const p = await b.newPage({ viewport: { width: c.w, height: c.h } });
    await p.goto(`${base}/estudio/?w=${c.w}&h=${c.h}&dpr=2&${c.q}`, { waitUntil: "networkidle" });
    await p.waitForFunction(() => document.body.dataset.pronto === "1", null, { timeout: 60000 });
    await p.waitForTimeout(300);
    const dataUrl = await p.evaluate(() => document.querySelector("#estudio").toDataURL("image/jpeg", 0.93));
    fs.writeFileSync(path.join(destino, nome + ".jpg"), Buffer.from(dataUrl.split(",")[1], "base64"));
    console.log("ok", nome);
    await p.close();
  }
  await b.close();
})();
