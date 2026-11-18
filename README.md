# Red Tennis · novo site (MVP v2)

Site da Academia Red Tennis (Rudge Ramos, São Bernardo do Campo). Next.js 15 (App Router), TypeScript, Tailwind CSS v4 e WebGL puro no hero, com exportação estática.

O sistema visual se chama **"Impresso do clube"**: duas tintas (saibro e bordô) sobre papel branco e uma cor especial, o limão, só para a bola. O raciocínio está em `docs/redesign-v2.md`.

## Como rodar

```bash
npm install
```

```bash
npm run dev
```

Abra http://localhost:3000.

Para gerar o site estático (pasta `out/`) e servir localmente:

```bash
npm run build
```

```bash
npm run start
```

## Onde editar o conteúdo

**Tudo está em `src/content/red.ts`**: contato, horários, agenda da semana, programas e preços, quadras e planta, locação, planos do Clube Red, benefícios, professores, eventos, resultados, ranking, depoimentos e história. O layout lê desse arquivo.

Itens marcados com `CONFIRMAR com a Red` são valores de exemplo e precisam ser validados antes de publicar. Para listar todos:

```bash
grep -n "CONFIRMAR" src/content/red.ts
```

## O hero (WebGL)

O hero é o saibro visto de cima, renderizado ao vivo em WebGL (`src/components/clay/`):

- a luz segue a hora real de São Bernardo (sol de manhã, sol alto, fim de tarde); depois das 18h30 os refletores acendem;
- o cursor amassa o saibro e deixa marca de pisada; parado, o vassourão passa e alisa;
- a bola é o ponto final de "Resultado"; clicar nela faz quicar e solta uma onda;
- o botão "Acender os refletores" mostra a quadra à noite.

O WebGL só liga com GPU. Sem GPU (ou com WebGL por software), o hero mostra uma imagem parada do mesmo saibro, com as linhas e a bola por cima. Com movimento reduzido, nada anima. Para testar o WebGL numa máquina sem GPU, abra a home com `?gl=forcar`.

## Imagens

`scripts/photos.mjs` gera todas as imagens em AVIF e WebP, em vários tamanhos:

1. **Fotos atuais da Red** (`referencias/site-atual`): recortadas, tratadas e também impressas em retícula de meio-tom (PNG de duas tintas). No site, a retícula aparece por cima e a foto em cor surge ao passar o mouse. A prancha da home (`prancha-quadras`) usa uma impressão em duas tintas, saibro e bordô, em telas de ângulos diferentes, gerada até 2560 px.
2. **Imagens de material** (`fotos/estudio/*.jpg`): o mesmo shader do hero renderizado em cenas fixas (bola na linha, rede de manhã, quadra à noite, linha de fim de tarde). São ilustrações do material, não fotos da Red. Para gerar de novo, com o site rodando em `npm run dev`:

   ```bash
   node scripts/estudio.cjs http://localhost:3000
   ```

3. **Fotos da sessão profissional**: salve em `fotos/novas/<slot>.jpg` e rode o script. A foto nova substitui o slot como veio. Os nomes dos slots e o briefing estão em `docs/briefing-fotos.md`.

```bash
npm run photos
```

Para processar só alguns slots: `node scripts/photos.mjs hero-saibro bola-na-linha`.

## Logo

A arte original da Red está em `fotos/marca/logo-original.png` (191 x 133 px). A partir dela:

- `fotos/marca/red-tennis-logo-transparente.png`: ampliada 4x com super-resolução (EDSR) e sem o fundo branco. As linhas da quadra continuam brancas e opacas; o resto do branco virou transparência suave.
- `fotos/marca/red-tennis-logo-adesivo.png`: a mesma arte recortada como adesivo, com borda branca. É a versão usada no site (cabeçalho, menu, rodapé, carteirinhas e imagem de compartilhamento), porque lê bem sobre o saibro, o bordô e o papel.
- `public/marca/`: as duas versões em 160, 320 e 640 px (PNG e WebP).

O script de recorte está em `scripts/logo-fundo.py`. Quando a Red tiver o arquivo vetorial do logo, ele substitui tudo isso.

## Estrutura

| Caminho | O que é |
|---|---|
| `src/content/red.ts` | Fonte única de conteúdo |
| `src/styles/tokens.css` | Tokens de cor, tipo, espaço e movimento |
| `src/app/globals.css`, `src/styles/home.css`, `src/styles/paginas.css` | Estilos globais, da home e das páginas internas |
| `src/components/clay/` | Motor WebGL do saibro (shaders e cena) |
| `src/components/home/` | Seções da home (hero, semana, catálogo, planta, carteirinhas, equipe, torneio) |
| `src/app/` | Páginas: home, `/aulas`, `/quadras`, `/clube-red`, `/torneios`, `/sobre`, `/contato`, `/styleguide`, 404; `/og` e `/estudio` são ferramentas internas (fora do índice) |
| `src/lib/reservas.ts` | Ponto de integração com um sistema de reservas (hoje devolve dados de exemplo) |
| `docs/redesign-v2.md` | Diagnóstico da v1, direção, sistema e verificação |
| `docs/direcao-de-arte.md` | Leitura das referências e do site atual |
| `docs/briefing-fotos.md` | Lista de fotos para a sessão profissional |
| `PRODUCT.md` | Fatos do produto usados nas decisões de design |

## Publicar

**Prévia atual:** https://red-tennis-site.pages.dev (Cloudflare Pages, projeto `red-tennis-site`). A prévia sai com `noindex` (cabeçalho `X-Robots-Tag` e `robots.txt` bloqueando tudo) para não aparecer no Google antes da aprovação.

Para publicar de novo na mesma prévia (pede login na conta Cloudflare na primeira vez):

```bash
npm run publicar:previa
```

O `build:previa` é o build normal mais `scripts/previa.mjs`, que troca o `robots.txt` e adiciona o `_headers` com `noindex`. Para o site oficial, use `npm run build` sem o passo de prévia.

Na Vercel: importe o repositório e publique. O projeto já usa `output: "export"`, sem variáveis de ambiente.

Antes de publicar, ajuste `site.url` em `src/content/red.ts` para o domínio final (com HTTPS). Esse valor alimenta URL canônica, sitemap, robots e JSON-LD.

A imagem de compartilhamento (`public/og.jpg`, 1200×630) é uma captura da área `#og` da página `/og/`.
