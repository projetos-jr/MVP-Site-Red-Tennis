# Briefing da sessão de fotos · Red Tennis

Uma sessão de um dia resolve o site inteiro. O melhor horário é a última hora e meia de sol (luz dura, baixa, quente) e os 30 minutos seguintes, com os refletores acesos.

**Como trocar uma foto no site:** salve o arquivo em `fotos/novas/<slot>.jpg` e rode `npm run photos`. O componente `<PhotoSlot name="<slot>" />` passa a mostrar a foto no lugar do placeholder.

| Slot | O que fotografar | Onde aparece | Proporção | Luz |
|---|---|---|---|---|
| `bola-na-linha` | Bola parada sobre a linha do saibro, com a sombra da rede em diagonal. De cima, sem horizonte. | Hero (futuro), styleguide | 4:5 e 16:9 | Fim de tarde, luz rasante |
| `professor-em-acao` | Professor batendo de lado, saibro levantando no pé de apoio. Velocidade alta para congelar o pó. | Home, manifesto; página Aulas | 4:5 | Fim de tarde, contraluz leve |
| `pes-no-saibro` | Detalhe dos pés deslizando, rastro no pó de tijolo. | Aulas, programa Intermediário | 3:2 | Fim de tarde |
| `kids-bola-vermelha` | Crianças do Red Kids com bola vermelha na quadra rápida. Autorização de imagem dos pais. | Aulas, programa Red Kids | 3:2 | Manhã ou fim de tarde |
| `rapida-de-cima` | Quadra rápida vista do alto, linhas brancas sobre o bordô, sem céu. | Home, comparador; Quadras | 16:10 | Dia nublado ou fim de tarde |
| `saibro-quadras` | As três quadras de saibro da linha de fundo, rede em primeiro plano. Substitui a foto atual. | Home, comparador; Quadras | 16:10 | Fim de tarde |
| `saibro-vertical` | Quadra de saibro em formato vertical, com a sombra da rede. Substitui a foto atual. | Home, manifesto | 4:5 | Fim de tarde |
| `estrutura-anoitecer` | A estrutura ao anoitecer, refletores acesos, céu ainda azul-escuro. | Quadras, estrutura; Sobre | 4:3 | Hora azul |
| `professor-joao`, `professor-francisco`, `professor-arnaldo` | Retrato vertical de cada professor, meio corpo, raquete na mão, fundo de alambrado ou saibro. O site aplica P&B com duotone saibro. | Home e Sobre, faixa da equipe | 4:5 | Sombra aberta ou fim de tarde |
| `rebatedores` | Retrato de grupo dos rebatedores. | Home e Sobre, faixa da equipe | 4:5 | Igual aos retratos |

## Regras de enquadramento

- Horizonte reto ou nenhum horizonte. Prefira ângulos de cima.
- O saibro ocupa pelo menos metade do quadro. Evite céu estourado.
- Um ponto de cor por foto: a bola. Roupas neutras (branco, areia, bordô), sem logos grandes.
- Entregar em JPG, lado maior com pelo menos 2400 px.
