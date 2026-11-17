# Análise do site atual da Red Tennis

**Site:** http://redtennis.com.br/
**Data da análise:** 17/11/2026
**Preparado por:** UFABC Jr., para a proposta de fidelização da Red Tennis

> **Nota de método.** O site da Red Tennis bloqueia leitores automáticos (robots.txt) e não pôde ser aberto diretamente pelo ambiente onde esta análise foi feita. A análise abaixo junta o que dá para verificar de fora: as páginas indexadas pelos buscadores, as duas fotos usadas hoje no site (enviadas pela equipe), e o que aparece sobre a Red em diretórios (TotalPass, Apontador, RudgeSBC, Facebook, guias de academias). Os pontos que dependem de abrir o site no navegador estão marcados com **[conferir no navegador]**. O prompt do novo site manda o Claude Code ler o site atual primeiro e preencher essas lacunas com os dados reais.

---

## 1. Quem é a Red Tennis (o que dá para afirmar)

| Item | Informação | Fonte |
|---|---|---|
| Nome | Academia Red Tennis | Título das páginas no Google |
| Endereço | Av. Winston Churchill, 626, Rudge Ramos, São Bernardo do Campo, SP, 09613-000 | TotalPass, Apontador, RudgeSBC |
| Telefone fixo | (11) 4365-2888 | Apontador, RudgeSBC |
| WhatsApp / celular | (11) 98443-2672 | TotalPass, BrazilFirmas |
| Serviços | Aulas de tênis, locação de quadras e squash | Guia de Academias, páginas `aulas.php` e `locacao.php` |
| Quadras | Saibro (várias, com iluminação) e pelo menos uma quadra rápida (piso sintético bordô com entorno laranja), além de um paredão de treino | Fotos do site atual |
| Parcerias | Aceita TotalPass (planos TP5 a TP7) | TotalPass |
| Comodidades | Armários, vestiário, bebedouro, Wi-Fi, estacionamento | TotalPass |
| Horário (TotalPass) | Seg a qui 7h–22h, sex 7h–20h30, sáb 7h–17h, dom 7h–12h30 | TotalPass |
| Horário (Apontador) | Seg a sáb 9h–20h, dom 10h–18h | Apontador (diverge do TotalPass) |
| Facebook | Duas páginas: "Red Tennis" (/academiaRedTennis) e "Academia Red Tennis - SBC" | Google |

## 2. Estrutura do site atual

Páginas que os buscadores encontram:

| URL | Título | Observação |
|---|---|---|
| `/` | "Academia Red Tennis" | Home |
| `/aulas.php` | "Aulas de Tênis - Academia Red Tennis" | Aulas |
| `/locacao.php` | "Academia Red Tennis" | Locação de quadras (título repetido da home) |

Pelo formato das URLs (`.php`), o site é um site PHP feito à mão, em páginas separadas, sem gerenciador de conteúdo. Na prática a equipe da Red não consegue atualizar preços, horários ou fotos sozinha.

**[conferir no navegador]** Se existem páginas de contato, galeria, torneios ou "quem somos" que não aparecem indexadas; se há formulário; se os preços aparecem no site.

## 3. Problemas encontrados

### 3.1 Marca e design

- **A marca não aparece.** A Red tem um ativo visual muito forte, o saibro e o vermelho/bordô das quadras, e o site não transforma isso numa identidade. As fotos são o único elemento de marca.
- **Fotos amadoras e sem unidade.** As duas fotos do site são de câmera compacta, de dia, com céu estourado, horizonte torto e enquadramento de registro, não de marca. A foto da quadra rápida tem resolução de 1273×853 e a do saibro, 1283×958, o que fica granulado num hero de tela cheia ou em telas retina.
- **Visual datado.** Site em páginas PHP separadas sugere um layout de mais de 10 anos, sem hierarquia tipográfica, sem ritmo de seções e sem movimento. **[conferir no navegador: fontes, cores, menu, rodapé]**
- **Não comunica o que a Red tem de diferente:** quadras de saibro iluminadas, quadra rápida, paredão, squash, localização no Rudge Ramos e aceite do TotalPass.

### 3.2 Experiência do usuário (UX) e conversão

- **Sem caminho claro para agendar.** As duas ações que dão dinheiro (marcar aula experimental e alugar quadra) não aparecem como botões fixos, e não há reserva online nem link de WhatsApp com mensagem pronta. **[conferir no navegador se há botão de WhatsApp]**
- **Nada de fidelização.** Não há planos mensais, pacotes, programa de indicação, área do aluno, ranking interno, agenda de torneios ou captação de e-mail. Para uma proposta de fidelização, este é o ponto principal: hoje o site não ajuda a reter o aluno depois da primeira aula.
- **Informações conflitantes.** O horário de funcionamento muda conforme o lugar onde a pessoa procura (TotalPass diz 7h–22h, Apontador diz 9h–20h) e existem dois telefones e duas páginas no Facebook. O cliente não sabe qual informação vale.
- **Sem prova social.** Nenhuma avaliação, depoimento, número de alunos, anos de história ou rosto de professor.

### 3.3 Mobile

- Sites PHP antigos raramente são responsivos de verdade. **[conferir no navegador em 390px de largura: texto pequeno, menu, zoom horizontal, botões]**
- Sem botão de WhatsApp fixo no polegar, que é como quase todo mundo vai querer falar com a Red pelo celular.
- Imagens pesadas e sem formatos modernos (WebP/AVIF) deixam a página lenta no 4G.

### 3.4 SEO e presença local

- **Títulos genéricos.** "Academia Red Tennis" não contém as buscas que trazem cliente: "aula de tênis São Bernardo", "quadra de saibro ABC", "aluguel de quadra de tênis Rudge Ramos". A página de locação repete o título da home.
- **Sem HTTPS aparente.** Os buscadores indexam o site em `http://`. Navegadores marcam isso como "Não seguro", e o Google penaliza. **[conferir se https funciona]**
- **Dados da empresa (nome, endereço, telefone) inconsistentes** entre diretórios, o que enfraquece o ranqueamento no Google Maps.
- **Diretórios com informação vazia ou errada:** o Apontador mostra "0 avaliações" e usa a imagem de outro estabelecimento como prévia do link.
- Provavelmente sem dados estruturados (Schema.org `SportsActivityLocation` / `LocalBusiness`), sem sitemap e sem Open Graph. **[conferir no código-fonte]**
- Nenhum conteúdo que atraia busca (guia de saibro x quadra rápida, tênis para crianças, como escolher raquete etc.).

## 4. O que o novo site precisa resolver (resumo para a proposta)

1. **Identidade de marca premium** construída sobre o saibro, o bordô da Red e o verde-limão da bola.
2. **Dois caminhos de conversão sempre à mão:** "Agendar aula experimental" e "Reservar quadra", ambos por WhatsApp com mensagem pronta (e preparado para reserva online no futuro).
3. **Programa de fidelização visível:** Clube Red (planos), pacotes de aula, indicação e agenda de torneios internos.
4. **Uma única fonte de verdade** para horários, preços e contatos, fácil de editar.
5. **Mobile em primeiro lugar,** rápido e com HTTPS.
6. **SEO local:** títulos por serviço e bairro, Schema.org, Google Business Profile alinhado, páginas de conteúdo.
7. **Fotografia nova** (sessão profissional de 1 dia) para substituir as fotos atuais. Até lá, o MVP trata as fotos existentes com o mesmo tratamento de cor e grão para parecerem de uma mesma campanha.

## 5. Fontes consultadas

- [Academia Red Tennis (home)](http://redtennis.com.br/), [Aulas](http://redtennis.com.br/aulas.php), [Locação](http://redtennis.com.br/locacao.php) (títulos via Google)
- [Red Tennis na TotalPass](https://totalpass.com/br/academias/red-tennis/)
- [Red Tennis Academia no Apontador](https://www.apontador.com.br/local/sp/sao_bernardo_do_campo/esportes/C4073754165A3N5A38/red_tennis_academia.html)
- [RudgeSBC: Red Tennis](https://rudgesbc.com.br/entidades/3371/)
- [Guia de Academias: Red Tennis](https://guiadeacademiasbrasil.com.br/sp/red-tennis-rudge-ramos-sao-bernardo-do-campo-aluguel-de-quadras-aulas-de-tenis-squash-3094)
- [Facebook: Red Tennis](https://www.facebook.com/academiaRedTennis/) e [Academia Red Tennis - SBC](https://www.facebook.com/p/Academia-Red-Tennis-SBC-100064790590137/)
- [BrazilFirmas: Red Tennis](https://brazilfirmas.com/sao-paulo/red-tennis-138060)
