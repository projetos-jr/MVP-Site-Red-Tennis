# Direção de arte · Red Tennis

> **Atualização (18/11/2026):** o sistema visual atual é o da v2, "Impresso do clube", descrito em `docs/redesign-v2.md`. As seções 1 e 2 abaixo (site atual e leitura das referências) continuam valendo; as seções 3 a 5 descrevem a v1 e ficam como histórico.

Documento escrito antes do design system, a partir das imagens em `referencias/` e da leitura do site atual.

## 1. O que o site atual entrega (lido em 17/11/2026)

O site responde em `http://redtennis.com.br/` e trouxe dados que a análise externa não tinha:

- **Quadras:** três de saibro e uma de base asfáltica (Lisonda), isoladas por alambrados altos, com entradas independentes.
- **Iluminação:** 18 projetores de vapor metálico (400 W) em seis postes.
- **Red Kids:** método próprio para crianças de 4 a 8 anos, em grupo.
- **Paredão iluminado**, livre para alunos, com orientação de exercícios.
- **Aulas:** individuais, em dupla ou em grupos de até 4.
- **Locação:** plano mensal com horário fixo e reposição em caso de chuva; locação avulsa.
- **Ranking:** quatro categorias (A, B, C, D), nova classificação todo fim de mês. **Circuito Red Tennis** ao longo do ano.
- **Equipe:** professores João Assunção, Francisco Olmos e Arnaldo Rodrigues, além de rebatedores.
- **Contato:** (11) 4365-2888, (11) 3423-8880, WhatsApp (11) 98443-2672, redtennis@redtennis.com.br, Instagram @redtennis10.

O que **não** aparece no site atual: preços, horários de funcionamento, squash, ano de fundação, depoimentos. Tudo isso está em `src/content/red.ts` como exemplo, marcado `CONFIRMAR com a Red`.

Tecnicamente o site atual é Bootstrap 3 com jQuery, fonte Karla, o mesmo título ("Academia Red Tennis") em todas as páginas, sem descrição, sem dados estruturados e servido em `http://`.

## 2. Leitura das referências

### Fotos atuais da Red

**01 · Quadra rápida.** Piso bordô com entorno laranja vivo, linhas brancas nítidas, paredão vermelho ao fundo e a linha de prédios do Rudge Ramos. É a origem do bordô institucional. Problemas: céu estourado, horizonte torto, muita informação no terço superior. Tratamento: recorte que elimina o céu e deixa a geometria das linhas dominar.

**02 · Quadras de saibro.** Rede em primeiro plano com a sombra projetada no pó de tijolo, cobertura de descanso listrada, refletores. Luz dura de dia, céu azul chapado. É a melhor foto: a sombra da rede já é o motivo gráfico do site. Tratamento: recortes verticais e horizontais que valorizam a rede e a sombra; o azul do céu é reduzido pelo ajuste quente.

As duas recebem o mesmo tratamento em `scripts/photos.mjs`: matriz de cor quente (menos azul), saturação contida, sombras fechadas. No site, levam grão por cima e um véu escuro na base. Nunca aparecem em tela cheia sem recorte.

### Inspiração

**03 · Bola e sombra da rede.** Um campo inteiro de laranja, uma faixa escura (a fita da rede) cortando em diagonal e a trama caindo abaixo dela. Um único ponto verde-limão, com sombra dura deslocada. Enquadramento de cima, sem horizonte.
*Levei:* a faixa mais a trama em diagonal como textura (componente `SombraRede`), a bola com sombra dura no hero e a regra de um único ponto limão por tela.

**04 · Sombra de raquetes.** Duas raquetes sobrepostas viram uma forma orgânica quase abstrata, com manchas escuras dentro dos aros. Textura de saibro fina, luz quente.
*Levei:* uma forma grande de sombra ocupando a lateral das seções de respiro (componente `SombraRaquetes`, na chamada final de todas as páginas).

**05 · Pôster Open Ágora.** Tipografia display muito larga em caixa alta, linhas brancas finas de quadra dividindo o cartaz em campos, hierarquia de pôster (título, bloco de informação, objeto em foco).
*Levei:* Archivo em largura 125 e peso 900 para títulos; linhas de 1 a 2 px como grade visível; o pôster do próximo torneio dividido por linhas de quadra, com a data gigante.

**06 · Layout editorial escuro.** Fundo quase preto, título em três tempos com uma palavra em destaque, números como prova, faixa marquee, cards de professor com dados, CTA com seta diagonal.
*Levei:* a estrutura em três tempos ("Saibro. Técnica. *Resultado.*"), os números reais da estrutura como prova (3, 1, 18, 4), a faixa marquee e a seta diagonal num botão redondo. Não copiei frase, layout nem fotos: aqui o campo dominante é saibro e bordô, não preto.

**07 · Vídeo da superfície.** Vista de cima, a quadra amassa como tecido e volta a ficar lisa; a bola parada no "T" de duas linhas brancas; luz rasante; uma ondulação sai da bola.
*Levei:* o hero. Duas linhas formam um "T", a bola fica no encontro, e a superfície reage: as linhas e a sombra da rede se deformam em volta do cursor (`feDisplacementMap` com um mapa de ondas concêntricas) e voltam a ficar lisas quando o cursor para. Clicar na bola solta uma onda. No celular, a deformação acompanha o scroll.

## 3. Conceito: "Feito no saibro."

A Red é a casa do tênis de saibro no ABC. O site fala como clube: frases curtas, vocabulário de quadra, orgulho do lugar.

1. **A quadra é o grid.** Linhas finas dividem colunas, fecham tabelas e se cruzam em "T" onde há algo importante. Elas se desenham (`stroke-dashoffset`) quando entram na tela.
2. **Saibro, bordô e uma bola.** Saibro e bordô são os campos de cor. O limão é só a bola: o ponto do logo, a bola do hero, o CTA principal, o ponto de "aberto agora".
3. **Luz dura e sombra.** Sombra de rede e de raquete, em SVG, como textura. Nada de gradiente decorativo.

## 4. Decisões que saíram da crítica dos screenshots

- **Contraste sobre saibro.** Cal sobre `--saibro` dá 3,7:1: passa para título grande, não para texto pequeno. Por isso todo texto pequeno sobre saibro vive numa **faixa de base** em `--saibro-escuro` (7:1). A faixa virou um motivo do site: lê como a sombra da fita da rede.
- **Limão nunca vira texto sobre saibro.** A terceira palavra do hero vai em Instrument Serif cal; o limão fica na bola.
- **Nada de cards iguais.** Programas são tabela editorial; planos são ingressos com canhoto perfurado, em escada; vantagens são lista numerada; depoimentos têm tamanhos diferentes; professores são uma faixa arrastável desalinhada.
- **Placeholders honestos.** Onde não há foto, um bloco com a sombra da rede, as iniciais em contorno e o briefing da foto em mono.

## 5. Tokens

Todos em `src/styles/tokens.css`. Cores: `--saibro #C2552B`, `--saibro-escuro #8E3A1C`, `--bordo #6E1F1F`, `--grafite #141210`, `--cal #F1ECE3`, `--areia #D9CBB6`, `--bola #D4F03C`. Tipos: Archivo (display), Instrument Serif itálico (editorial), Inter Tight (texto), JetBrains Mono (dados). Curva `cubic-bezier(0.22, 1, 0.36, 1)`. Cantos retos; raio total só no que é bola.

A página `/styleguide/` mostra tudo aplicado.
