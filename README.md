# Red Tennis · novo site (MVP)

Site da Academia Red Tennis (Rudge Ramos, São Bernardo do Campo). Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Motion e Lenis, com exportação estática.

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

**Tudo está em `src/content/red.ts`**: contato, horários, programas e preços, quadras, locação, planos do Clube Red, benefícios, professores, eventos, resultados, ranking, depoimentos e história. O layout lê desse arquivo; não é preciso mexer em mais nada.

Itens marcados com `CONFIRMAR com a Red` são valores de exemplo e precisam ser validados antes de publicar. Para listar todos:

```bash
grep -n "CONFIRMAR" src/content/red.ts
```

## Fotos

As fotos passam por `scripts/photos.mjs`, que recorta, aplica o tratamento de cor e gera AVIF e WebP em vários tamanhos.

Para trocar uma foto pela da sessão profissional, salve em `fotos/novas/<slot>.jpg` e rode:

```bash
npm run photos
```

Os nomes dos slots e o briefing de cada foto estão em `docs/briefing-fotos.md`.

## Estrutura

| Caminho | O que é |
|---|---|
| `src/content/red.ts` | Fonte única de conteúdo |
| `src/styles/tokens.css` | Tokens de design (cor, tipo, espaço, movimento) |
| `src/app/` | Páginas: home, `/aulas`, `/quadras`, `/clube-red`, `/torneios`, `/sobre`, `/contato`, `/styleguide`, 404 |
| `src/components/` | Componentes (hero, comparador, ingressos, pôster, formulários, reserva) |
| `src/lib/reservas.ts` | Ponto de integração com um sistema de reservas (hoje devolve dados de exemplo) |
| `docs/direcao-de-arte.md` | Análise das referências, conceito e decisões |
| `docs/briefing-fotos.md` | Lista de fotos para a sessão profissional |
| `referencias/` | Fotos atuais e imagens de inspiração |

## Publicar

Na Vercel: importe o repositório e publique. O projeto já usa `output: "export"`, sem variáveis de ambiente.

Antes de publicar, ajuste `site.url` em `src/content/red.ts` para o domínio final (com HTTPS). Esse valor alimenta URL canônica, sitemap, robots e JSON-LD.

A imagem de compartilhamento (`public/og.jpg`, 1200×630) é uma captura da área `#og` da página `/og/`.
