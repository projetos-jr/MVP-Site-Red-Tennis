# Product

<!-- impeccable:product-schema 1 -->

Fonte: PROMPT-CLAUDE-CODE.md e ANALISE-SITE-ATUAL.md (enviados pela UFABC Jr.) e o site atual redtennis.com.br, lido em 17/11/2026. Nada aqui foi inventado; o que depende da Red está marcado como aberto.

## Platform

web

## Users

- **Quem procura aula:** adulto do ABC (25 a 55 anos) que quer começar ou voltar a jogar tênis, perto de casa ou do trabalho, no Rudge Ramos. Vê o site no celular, quase sempre vindo do Google ou do Instagram, e decide pelo WhatsApp.
- **Pais de crianças de 4 a 8 anos:** procuram uma atividade com método (Red Kids, bola vermelha).
- **Quem já joga:** quer alugar quadra de saibro com horário fixo, entrar no ranking e jogar torneio.
- **O dono da Red:** vai ver o site amanhã, dentro de uma proposta de fidelização de alunos da UFABC Jr.

## Product Purpose

Site da Academia Red Tennis: aulas de tênis, locação de quadras, ranking e torneios. O site precisa fazer duas coisas que dão dinheiro (agendar aula experimental e reservar quadra, ambas por WhatsApp) e uma que retém (o Clube Red: planos mensais, ranking, torneio do mês, indicação).

## Positioning

A casa do tênis de saibro no ABC: três quadras de saibro isoladas por alambrados altos, com entrada própria e 18 refletores em seis postes; uma quadra rápida de base asfáltica (Lisonda) bordô; paredão iluminado livre para alunos; método Red Kids próprio; ranking permanente em quatro categorias com classificação mensal; Circuito Red Tennis ao longo do ano. Endereço: Av. Winston Churchill, Rudge Ramos, São Bernardo do Campo.

## Operating Context

O tênis de saibro: pó de tijolo, linhas brancas, vassourão no fim do dia, rede, refletores à noite, bola amarela, ranking em planilha, chave de torneio, placar 15-30-40. O cliente agenda pelo WhatsApp (11) 98443-2672. A Red aceita TotalPass.

## Capabilities and Constraints

- Next.js 15 com exportação estática; conteúdo editável em `src/content/red.ts`.
- Reserva online ainda não existe: a grade de horários é uma demonstração que monta mensagem de WhatsApp.
- Aberto: preços, horários (TotalPass e Apontador divergem), ano de fundação, dados dos professores, existência da quadra de squash. Todos marcados `CONFIRMAR com a Red`.

## Brand Commitments

- Nome: Red Tennis / Academia Red Tennis. Bordô da quadra rápida como cor institucional; saibro como material da marca; o amarelo-limão só como a bola.
- Conceito do brief: "Feito no saibro." Hero com título em três tempos "Saibro. Técnica. Resultado." e uma superfície que reage (referência 07).
- Proibido pelo brief: gradientes decorativos, glassmorphism, emojis, grade de cards iguais, hero centralizado sobre foto de banco, texto genérico de IA, fotos de banco com pessoas genéricas, contadores falsos.

## Evidence on Hand

- Duas fotos amadoras do site atual (`referencias/site-atual/`), cerca de 1280 px.
- Nomes reais: professores João Assunção, Francisco Olmos e Arnaldo Rodrigues; rebatedores.
- Não existem: depoimentos reais, fotos dos professores, número de alunos, preços públicos. Não fabricar como reais.

## Product Principles

1. Toda tela leva a uma de duas ações: aula experimental ou reservar quadra.
2. O saibro é o produto: mostrar o material, a luz e a quadra antes de qualquer promessa.
3. Falar como clube, não como empresa: frases curtas, vocabulário de quadra.
4. Fidelização visível: o Clube Red tem que parecer algo que dá vontade de pertencer.
5. Celular primeiro: quem decide está com o WhatsApp aberto.

## Accessibility & Inclusion

WCAG AA, foco visível, navegação por teclado no menu, comparador e carrossel, `prefers-reduced-motion` respeitado.
