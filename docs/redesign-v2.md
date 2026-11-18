# Red Tennis · Redesign v2

Plano escrito antes da execução. Base: as skills `frontend-design` (Anthropic), `taste-skill`, `impeccable` (craft floor, new-work-world, concept-seed), `emil-design-eng`, `choreograph` e `transitions.dev`; os DESIGN.md do awesome-design-md (Nike como referência mais próxima); e capturas de Sporty & Rich, On, Aimé Leon Dore, Roland-Garros, Wilson, Fila e Padel Club.

## 1. Diagnóstico da v1

A v1 tinha boa estrutura, mas usava quase todos os sinais que hoje denunciam um site feito por IA (lista do `frontend-design`):

| Sinal de IA | Onde aparecia na v1 |
|---|---|
| Fundo creme + serifa display + acento terracota | `--cal #F1ECE3`, Instrument Serif, saibro como acento |
| Fundo quase preto + um acento verde-ácido | seções `--grafite` com botão limão |
| Layout de jornal: linhas finas, raio zero, colunas densas | linhas de 1 px em toda parte |
| Rótulo em caixa alta acima de todo título | "01 / AULAS", "02 / QUADRAS"... |
| Meta strings com ponto médio | "RUDGE RAMOS · SBC — SAIBRO · QUADRA RÁPIDA..." |
| Mono como fantasia de "técnico" | JetBrains Mono em rótulos, preços, botões |
| Uma palavra em itálico serifado em todo título | "Dois pisos, *dois jogos.*" em 12 títulos |
| A mesma entrada animada em toda seção | máscara de título + fade em cada bloco |

E faltava o que separa um site caro de um site de template: **imagem**. As referências caras (Nike, On, Aimé Leon Dore, Roland-Garros) são fotografia em tela cheia com interface quieta. A Red tem duas fotos amadoras.

## 2. A direção

O `impeccable concept-seed` sorteou a direção 6 da minha lista de sete mundos visuais do tênis de clube (ordenada por ressonância com o público):

1. Refletores: o jogo da noite, depois do trabalho
2. A quadra vista de cima (leitura literal do brief)
3. Carteirinha de sócio e flâmula do clube
4. Placar do clube, com placas numeradas
5. Mural do clube: chave do torneio, ranking, regulamento
6. **O impresso do clube: catálogo, cartaz, carteirinha, ficha, em duas tintas** ← sorteada
7. Letreiro pintado à mão do clube brasileiro

**Mundo: "Impresso do clube".** Tudo que a Red publica parece o material gráfico de um clube de tênis brasileiro de tradição, impresso em duas tintas (bordô e saibro) sobre papel branco, com uma cor especial só para a bola. O catálogo de aulas, a carteirinha de sócio, o cartaz do torneio, a ficha do professor. Por cima disso, uma única imagem em tom contínuo: o próprio saibro, renderizado ao vivo.

Por que serve a este cliente: o público tem de 25 a 55 anos e cresceu com o tênis de saibro dos anos 80 e 90 (Kuerten em Roland-Garros, 1997). O impresso de clube vende pertencimento, que é exatamente a proposta de fidelização. E foge dos dois buracos da categoria: o site de academia escuro com foto de atleta e acento neon, e o oposto previsível, o minimalismo branco de luxo com serifa.

### Desafiantes e o que cada um elevou

O sorteio trouxe seis mundos de fora. Nenhum vence nos dois eixos (identificação do público e clareza do produto), mas cada um doa uma disciplina:

| Desafiante | Veredito | O que a direção ganhou |
|---|---|---|
| Mapa-guia de zoológico | recusado | **Uma geometria governa tudo:** as proporções reais da quadra (23,77 × 10,97 m) desenham o hero, a planta da Red, a faixa de seção e o cartaz |
| Areia cinética em relevo | recusado | **Saibro em relevo:** o hero é um campo de altura iluminado em WebGL, não uma textura chapada |
| Contador nixie | recusado | **Números de placar:** horas, preços, contagem regressiva e pontos em algarismos condensados de posição fixa |
| Ebru (pigmento flutuante) | recusado | **O saibro guarda a marca:** o cursor deixa rastro no pó e o vassourão passa e alisa |
| Capa com cordão | recusado | **Um gesto transforma:** as carteirinhas saem empilhadas e abrem em leque com a rolagem |
| Jardim de chuva gravitacional | recusado | **Física da bola:** a bola quica de verdade no hero e no 404 |

E da candidata 1 (refletores) vem a luz do hero: **a quadra mostra a hora real de São Bernardo**. De dia, sol com sombra da rede na direção certa; depois das 18h30, os refletores acendem.

## 3. Sistema

### Cor: duas tintas e uma cor especial

| Token | Hex | Papel |
|---|---|---|
| `--papel` | `#FCFAF6` | Fundo claro. Branco de papel, não creme |
| `--saibro` | `#B95128` | Tinta 1 e campo de cor. 4,7:1 com o papel |
| `--bordo` | `#6B1D21` | Tinta 2, cor institucional. 11:1 com o papel |
| `--vinho` | `#3A0E12` | Tinta 2 carregada: texto, noite, rodapé. 16:1 |
| `--po` | `#F0DCCD` | Pó de saibro: superfícies secundárias no lugar de cinza |
| `--bola` | `#D7F04A` | Cor especial. Só a bola: a bola 3D, o ponto de status, a bola dentro do botão |

Sem preto, sem cinza. Texto secundário tingido da cor do fundo: `#7A4A44` sobre papel (7:1), `#E9C9B8` sobre bordô e vinho.

### Tipo: duas famílias claramente diferentes

- **Anybody** (largura 50 a 150, peso 100 a 900, itálico). É a voz do impresso esportivo.
  - Display: largura 150, peso 850, caixa alta, entrelinha 0,86.
  - Títulos de seção: largura 130, peso 800.
  - Interface (botões, menu, rótulos de tabela): largura 110, peso 600, caixa normal.
  - Placar (números): largura 55, peso 800, algarismos de largura fixa.
- **Newsreader** (serifa editorial com tamanho óptico) para todo texto corrido e para citações. Itálico só onde é citação.
- Sem fonte mono. Sem palavra solta em itálico dentro de título.

### Linha e forma

- **Linhas de quadra de verdade**: 3 px (não 1 px de jornal), branco sobre saibro, saibro sobre papel.
- **Faixa de corredor**: duas linhas paralelas com o saibro entre elas, na proporção do corredor de duplas (1,37 m para 10,97 m). É o divisor de seção e a marca do site.
- Raio zero em tudo que é quadra, papel e foto. Círculo só no que é bola.
- Sombra só como sombra projetada real, na direção do sol do hero.

### Imagem

- **Fotos da Red em retícula de duas tintas** (meio-tom, como no impresso), geradas por `scripts/photos.mjs`. Escondem a baixa resolução e parecem intencionais. No hover, a foto real aparece por baixo da retícula.
- **Imagens de material geradas pelo mesmo shader do hero**: bola na linha com sombra da rede, sombra de raquete no pó, marca de deslize, vassourada. São ilustração do material, não fingem ser a quadra da Red, e ficam listadas em `docs/briefing-fotos.md` como provisórias.
- Nenhuma foto de banco.

### Movimento

Curvas: saída `cubic-bezier(0.23, 1, 0.32, 1)`, no lugar `cubic-bezier(0.77, 0, 0.175, 1)`. Interface até 240 ms. Botão pressionado: escala 0,97.

Momentos autorais (e só eles):

1. **Hero**: entrada única (a luz entra, as linhas se desenham, a bola cai e quica, o título fica de pé com a sombra). Depois, ao vivo: o cursor amassa o saibro e deixa rastro, o vassourão alisa, clicar na bola faz ela quicar e solta uma onda.
2. **Carteirinhas do Clube Red**: abrem em leque com a rolagem; inclinam com o cursor, com reflexo.
3. **Rodapé**: a marca "RED TENNIS" gigante se estica da largura 60 para 150 quando entra na tela.

O resto não entra animado. Respostas a ações do usuário (hover de linha, planta da quadra, botões, menu) são bem-vindas. `prefers-reduced-motion` desliga tudo e o hero vira uma imagem parada.

## 4. Elemento por elemento

### Global
- **Logo**: "RED TENNIS" em Anybody 150 itálico preto, com a bola no lugar do espaço entre as palavras.
- **Cabeçalho**: transparente sobre o hero, papel com a faixa de corredor embaixo depois de rolar. À direita, o status ao vivo ("Aberto até 22h" com o ponto limão) e o botão "Agendar aula".
- **Botão primário**: bloco bordô (ou papel sobre fundo escuro) com uma bola limão à direita que rola no hover. Some a seta redonda genérica da v1.
- **Botão secundário**: texto com sublinhado em linha de quadra que se desenha no hover.
- **Superfícies do navegador**: seleção de texto em limão sobre vinho, cursor de texto saibro, barra de rolagem fina em saibro, foco visível em limão com contorno vinho.
- **Transição de página**: um pano de saibro sobe revelando a página nova (só em navegação interna).

### Home
1. **Hero "A quadra agora"**: saibro em WebGL vista de cima, linhas de quadra em proporção real, sombra da rede, bola. Título "SAIBRO. TÉCNICA. RESULTADO" em papel, e **a bola é o ponto final de "RESULTADO"**: ela fica no cruzamento das linhas, exatamente onde cairia o ponto. O título projeta sombra na direção do sol da hora real. Embaixo, uma frase com o fato principal, os dois botões (aula e quadra) e um botão "Acender os refletores" / "Ver de dia" para mostrar a quadra nas duas luzes.
2. **Esta semana na Red**: faixa vinho com a agenda da semana rolando (jogos do ranking, aulas, clínica), velocidade ligada à rolagem, pausa no hover. Substitui o letreiro de palavras soltas.
3. **A casa**: um parágrafo grande em Newsreader com fotos pequenas em retícula no meio do texto. Depois, os números reais como desenho: três quadras desenhadas, uma bordô, 18 refletores em seis postes, quatro categorias.
4. **Aulas**: o catálogo. Cinco programas em tabela de catálogo, com algarismos de placar e a foto em retícula que segue o cursor.
5. **Quadras**: a planta da Red desenhada sobre o saibro. Toque numa quadra e ela mostra piso, luz, próximo horário livre e o botão de reserva com o nome da quadra na mensagem.
6. **Clube Red**: as três carteirinhas de sócio (proporção de cartão, número de sócio, faixa de corredor, selo do clube) que abrem em leque. Cada uma com preço em placar, o que inclui e o botão. Depois, as vantagens.
7. **Equipe**: fichas no estilo figurinha, com pictograma esportivo (linhagem dos pictogramas olímpicos de 1972) no lugar da foto que ainda não existe, e os anos de quadra em placar.
8. **Torneios**: cartaz do Circuito em duas tintas com a chave do torneio como arte, contagem regressiva em placar e a agenda.
9. **Quem joga aqui**: citações em Newsreader itálico.
10. **Visite a Red**: mapa desenhado com a mesma geometria, status ao vivo, horários em placar.
11. **Chamada final**: saibro com a sombra das raquetes (com o encordoamento projetado) e "A quadra está pronta".
12. **Rodapé**: vinho, marca gigante que se estica, endereço, horários, contato, TotalPass.

### Páginas internas
Mesmo sistema. Cabeça com imagem de material, título grande, uma frase. Comparador de pisos vai para `/quadras`. Numeração só onde é sequência de verdade (metodologia em 4 etapas, linha do tempo).

### 404
"Essa foi pra fora." A bola cai, quica e rola para fora da linha.

## 5. Qualidade

- Contraste AA verificado; foco visível; teclado no menu, planta, cartões e formulários.
- Lighthouse mobile ≥ 90 em performance e 100 nas outras três. O hero pinta primeiro em CSS; o WebGL entra depois e para quando sai da tela.
- Telas conferidas em 360, 390, 768, 1024, 1440 e 1920 px.
- Auditoria final com o detector do `impeccable` (padrões genéricos de IA e contraste).

## 6. O que foi entregue e como foi verificado

### Ajustes feitos durante a construção

- **Papel branco de verdade.** O detector do `impeccable` marcou `#FCFAF6` como o "off-white de bom gosto" típico de página gerada. O impresso é em papel branco, então `--papel` virou `#FFFFFF`.
- **Sem letreiro rolando.** A faixa "Esta semana na Red" era um letreiro infinito. Virou um quadro de avisos parado, com os sete dias à vista e o dia de hoje marcado.
- **Grão como fundo, não como camada.** O grão do saibro passou a ser fundo da própria seção (`background-blend-mode`), o que também resolveu um falso alerta de contraste.
- **WebGL só com GPU.** Sem GPU, o shader rodaria na CPU do aparelho. O hero agora tem uma imagem parada do mesmo saibro como base e só liga o WebGL quando há GPU.
- **Leveza.** A biblioteca Motion saiu do menu, da cortina entre páginas e da marca do rodapé (CSS e JavaScript puro); fica só na home e no Clube Red. A Newsreader passou de fonte variável com tamanho óptico (129 KB) para o peso 400 (cerca de 58 KB). A retícula passou de AVIF (92 KB) para PNG de duas tintas (34 KB).

### Verificação (build de produção, 18/11/2026)

| Checagem | Resultado |
|---|---|
| Detector do `impeccable` (padrões de IA, contraste, texto pequeno), 1440 e 390 px, 7 páginas | Nenhum achado |
| Lighthouse mobile: acessibilidade, boas práticas, SEO | 100 nas 7 páginas |
| Lighthouse mobile: desempenho | Home 97, Clube Red 96, Contato 96, Torneios 95, Quadras 94, Aulas 91, Sobre 91 |
| Rolagem horizontal em 360, 390, 768, 1024 e 1920 px | Nenhuma, em todas as páginas |
| TypeScript e ESLint | Limpos |

Aulas e Sobre ficam abaixo de 95 por causa da foto de abertura na simulação de 4G lento do Lighthouse (a pintura real acontece em cerca de 170 ms).

## 7. Rodada de revisão (agentes) e o que mudou

Cinco revisões independentes olharam o site: celular, conversão, código, direção de arte e conteúdo. O que entrou:

**Conversão**
- **Folha de agendamento.** Todo botão "Agendar aula experimental" abre uma folha (painel lateral no computador, gaveta de baixo no celular) com três toques: para quem é, a história da pessoa com o tênis e o melhor horário. A folha mostra a turma provável, com frequência e preço, e manda uma mensagem completa no WhatsApp. Sem JavaScript, o botão abre o WhatsApp direto.
- **Convite de indicação** no Clube Red: o sócio escreve o nome e o convite sai pronto no WhatsApp, com o link `/aulas/?indicado=Nome`. O formulário de aula reconhece o convite e oferece a experimental em dupla.
- Mensagens de plano e de torneio saem preenchidas (nome, preço, data), sem lacunas.
- A barra fixa do celular some sobre formulários, reserva e rodapé, e quando o teclado abre.

**Conteúdo**
- Agenda em ordem de data, torneio do mês em novembro e janeiro, planos com o que cada um inclui, FAQ do clube ("Já faço aula na Red. Pago o clube à parte?"), faixas de horário da locação corrigidas.
- Promessas ainda não confirmadas com a Red estão marcadas com `CONFIRMAR` em `src/content/red.ts`.

**Imagem e movimento**
- **Prancha (Fig. 2)**: a foto real das quadras impressa em duas tintas, de ponta a ponta. O cursor vira um conta-fios que mostra a foto em cor; no toque, um botão troca a impressão pela foto.
- **Selo do clube**: carimbo com "Red Tennis · Clube de tênis · Rudge Ramos · desde 1996" na figura da home e na cabeça do Clube Red. Gira um pouco com a rolagem.
- Chave do torneio desenhada (oito nomes do ranking), que se traça quando entra na tela.
- Hero: sombra de raquete, arcos do vassourão, marcas com borda de barro, bola que paira e quica ao clique, refletores acendendo poste a poste.
- Cenas novas do estúdio para as cabeças das páginas (deslize, vassourada, raquete ao fim da tarde, bola fora).

**Código e acessibilidade**
- SEO por página (título, descrição, canônico, Open Graph), JSON-LD `TennisComplex`.
- Menu com `inert` no resto da página, reserva com escolha de dia no celular, horários sempre no fuso de São Paulo.

### Verificação da rodada (build de produção, 18/11/2026)

| Checagem | Resultado |
|---|---|
| Detector do `impeccable`, 1440 e 390 px, 7 páginas | Nenhum achado |
| axe-core (WCAG 2.1 AA e boas práticas), 1440 e 390 px, 8 páginas e a folha aberta | Nenhuma violação |
| Rolagem horizontal em 360, 390, 768, 1024, 1280, 1440 e 1920 px | Nenhuma |
| Lighthouse mobile | Home 91, Aulas 93, Clube Red 99 em desempenho; 100 em acessibilidade, boas práticas e SEO |

Prévia publicada em https://red-tennis-site.pages.dev (fora dos buscadores: `robots.txt` e `X-Robots-Tag: noindex`).
