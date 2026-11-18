// Ajusta a pasta out/ para uma prévia fora dos buscadores (Cloudflare Pages, Netlify).
// Uso: npm run build:previa
import { writeFileSync } from "node:fs";
import path from "node:path";

const out = path.resolve(import.meta.dirname, "..", "out");
writeFileSync(path.join(out, "robots.txt"), "User-agent: *\nDisallow: /\n");
writeFileSync(path.join(out, "_headers"), "/*\n  X-Robots-Tag: noindex\n");
console.log("prévia: robots.txt bloqueando tudo e X-Robots-Tag: noindex em out/");
