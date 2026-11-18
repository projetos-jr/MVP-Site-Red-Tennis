/**
 * RED TENNIS · fonte única de conteúdo do site.
 *
 * Tudo que a Red precisa editar (preços, horários, professores, planos,
 * torneios, contato) está neste arquivo. O layout lê daqui.
 *
 * Itens marcados com "CONFIRMAR com a Red" são valores de exemplo plausíveis:
 * precisam ser validados antes de o site ir ao ar.
 * Itens sem marcação vieram do site atual (redtennis.com.br) em 17/11/2026.
 */

export const site = {
  nome: "Red Tennis",
  nomeCompleto: "Academia Red Tennis",
  url: "https://redtennis.com.br", // CONFIRMAR com a Red: domínio final e HTTPS
  slogan: "Feito no saibro.",
  descricao:
    "Aulas de tênis, aluguel de quadra e torneios no Rudge Ramos, São Bernardo do Campo (ABC). Três quadras de saibro iluminadas, uma rápida e paredão.",
  fundacao: 1996, // CONFIRMAR com a Red: ano de fundação
};

export const contato = {
  endereco: {
    rua: "Av. Winston Churchill, 626",
    bairro: "Rudge Ramos",
    cidade: "São Bernardo do Campo",
    uf: "SP",
    cep: "09613-000",
  },
  geo: { lat: -23.6704, lng: -46.5616 },
  mapa: "https://www.google.com/maps/dir/?api=1&destination=Academia+Red+Tennis+Av.+Winston+Churchill+626+Sao+Bernardo+do+Campo",
  whatsapp: "5511984432672",
  whatsappLegivel: "(11) 98443-2672",
  telefone: "(11) 4365-2888",
  telefoneLink: "+551143652888",
  telefone2: "(11) 3423-8880", // CONFIRMAR com a Red: este número ainda atende?
  email: "redtennis@redtennis.com.br",
  instagram: { usuario: "@redtennis10", url: "https://www.instagram.com/redtennis10/" },
  youtube: "https://www.youtube.com/channel/UC93luPScClA5sjS4Lvqhy1g",
  totalpass: true, // aceita TotalPass, planos TP5 a TP7. CONFIRMAR com a Red: planos aceitos
};

/**
 * Mensagens prontas de WhatsApp. Frases completas, sem lacunas para preencher:
 * no celular ninguém edita o meio do texto antes de enviar.
 */
export const mensagens = {
  aula: "Olá, Red! Vim pelo site e quero agendar uma aula experimental. Quais horários vocês têm esta semana?",
  quadra: "Olá, Red! Vim pelo site e quero reservar uma quadra. Quais horários estão livres esta semana?",
  clube: "Olá, Red! Vim pelo site e quero ser sócio do Clube Red. Qual plano combina comigo?",
  plano: (nome: string, preco: string) =>
    `Olá, Red! Vim pelo site e quero entrar no Clube Red no plano ${nome} (${preco} por mês). Quais turmas têm vaga?`,
  torneio: (e: { nome: string; tipo: string; dataCurta: string }) =>
    `Olá, Red! Vim pelo site e quero me inscrever no ${e.nome}, ${e.tipo.toLowerCase()} (${e.dataCurta.toLowerCase().replace("—", " a ")}). Como faço a inscrição?`,
  ranking: "Olá, Red! Vim pelo site e quero entrar no ranking interno. Como faço para começar?",
  geral: "Olá, Red! Vim pelo site e tenho uma dúvida:",
};

/**
 * Horário de funcionamento. 0 = domingo ... 6 = sábado. Formato "HH:MM".
 * CONFIRMAR com a Red: o TotalPass e o Apontador mostram horários diferentes.
 * Estes são os do TotalPass.
 */
export const horarios: { dia: string; curto: string; abre: string; fecha: string }[] = [
  { dia: "Domingo", curto: "DOM", abre: "07:00", fecha: "12:30" },
  { dia: "Segunda", curto: "SEG", abre: "07:00", fecha: "22:00" },
  { dia: "Terça", curto: "TER", abre: "07:00", fecha: "22:00" },
  { dia: "Quarta", curto: "QUA", abre: "07:00", fecha: "22:00" },
  { dia: "Quinta", curto: "QUI", abre: "07:00", fecha: "22:00" },
  { dia: "Sexta", curto: "SEX", abre: "07:00", fecha: "20:30" },
  { dia: "Sábado", curto: "SÁB", abre: "07:00", fecha: "17:00" },
];

/** Números reais da estrutura (site atual). */
export const numeros = [
  { valor: "3", rotulo: "quadras de saibro" },
  { valor: "1", rotulo: "quadra rápida" },
  { valor: "18", rotulo: "refletores em seis postes" },
  { valor: "4", rotulo: "categorias no ranking" },
];

export type Programa = {
  id: string;
  nome: string;
  resumo: string;
  paraQuem: string;
  frequencia: string;
  duracao: string;
  preco: string;
  foto: string;
  detalhe: string;
  pontos: string[];
};

// CONFIRMAR com a Red: frequências, durações e todos os preços dos programas.
export const programas: Programa[] = [
  {
    id: "red-kids",
    nome: "Red Kids",
    resumo: "Bola vermelha, quadra reduzida e muito jogo.",
    paraQuem: "4 a 8 anos",
    frequencia: "1 ou 2x por semana",
    duracao: "45 min",
    preco: "R$ 240/mês", // CONFIRMAR com a Red
    foto: "rapida-linhas",
    detalhe:
      "O método da Red para começar cedo. Turmas pequenas na quadra rápida, com bola vermelha, rede baixa e exercícios que parecem brincadeira e ensinam empunhadura, equilíbrio e contagem.",
    pontos: ["Turmas por idade", "Material incluso", "Na quadra rápida, com rede adaptada"],
  },
  {
    id: "iniciante",
    nome: "Iniciante adulto",
    resumo: "Do primeiro forehand ao primeiro set.",
    paraQuem: "Quem nunca jogou ou parou faz tempo",
    frequencia: "2x por semana",
    duracao: "60 min",
    preco: "R$ 380/mês", // CONFIRMAR com a Red
    foto: "saibro-rede",
    detalhe:
      "Grupos de até 4 alunos. Você aprende os golpes de base, o saque e a contar o jogo. Entre uma aula e outra, o paredão iluminado fica à sua disposição, sem custo.",
    pontos: ["Grupos de até 4", "Paredão liberado", "Raquete emprestada no primeiro mês"],
  },
  {
    id: "intermediario",
    nome: "Intermediário",
    resumo: "Consistência, slice, voleio e jogo de duplas.",
    paraQuem: "Quem já troca bola e quer jogar melhor",
    frequencia: "2x por semana",
    duracao: "60 min",
    preco: "R$ 420/mês", // CONFIRMAR com a Red
    foto: "saibro-linha",
    detalhe:
      "Aqui o saibro ensina: deslizar, construir o ponto, variar altura e efeito. As aulas alternam técnica e situação de jogo, em simples e em duplas.",
    pontos: ["Grupos de até 4", "Treino de duplas", "Entrada no ranking interno"],
  },
  {
    id: "competicao",
    nome: "Competição",
    resumo: "Treino de quem joga ranking e torneio.",
    paraQuem: "Jogadores das categorias A e B",
    frequencia: "3x por semana",
    duracao: "90 min",
    preco: "R$ 620/mês", // CONFIRMAR com a Red
    foto: "saibro-refletores",
    detalhe:
      "Carga de treino maior, padrões táticos, saque e devolução sob pressão e tie-breaks valendo. Com rebatedores disponíveis para manter a bola pesada.",
    pontos: ["Planejamento por temporada", "Sessões com rebatedor", "Acompanhamento em torneios"],
  },
  {
    id: "particular",
    nome: "Particular",
    resumo: "Uma quadra, um professor, o seu golpe.",
    paraQuem: "Qualquer nível, no seu horário",
    frequencia: "Você escolhe",
    duracao: "60 min",
    preco: "R$ 140/aula", // CONFIRMAR com a Red
    foto: "rapida-paredao",
    detalhe:
      "Aula individual focada no que você precisa: acertar o backhand, colocar mais primeiro saque em quadra, voltar de lesão. Também em dupla, dividindo a quadra com um parceiro.",
    pontos: ["Individual ou em dupla", "Horário fixo ou avulso", "Pacotes de 4 e 8 aulas"],
  },
];

export const metodologia = [
  { titulo: "Avaliação", texto: "Na aula experimental o professor vê você bater e define nível e turma." },
  { titulo: "Fundamento", texto: "Empunhadura, pés e ponto de contato. No paredão e na quadra." },
  { titulo: "Jogo", texto: "Cada golpe novo entra em situação de ponto na mesma semana." },
  { titulo: "Ranking", texto: "Quando a bola fica em quadra, você entra na categoria D e sobe." },
];

export const faqAulas = [
  {
    p: "Nunca peguei numa raquete. Posso começar?",
    r: "Pode, e deve. A turma de iniciantes começa do zero e a Red empresta a raquete no primeiro mês.", // CONFIRMAR com a Red: empréstimo de raquete
  },
  {
    p: "Como funciona a aula experimental?",
    r: "Você marca pelo WhatsApp e vem com roupa de treino e tênis de quadra. São cerca de 30 minutos batendo bola com um professor, e você sai sabendo seu nível e as turmas com vaga.", // CONFIRMAR com a Red: duração e se é gratuita
  },
  {
    p: "E se chover?",
    r: "Saibro molhado não se joga. A aula é reposta em outro horário combinado com o professor.", // CONFIRMAR com a Red: regra de reposição
  },
  {
    p: "Preciso de tênis especial para o saibro?",
    r: "O ideal é tênis de quadra com solado espinha de peixe, que segura na hora de deslizar e não estraga o saibro. Tênis de corrida, com garras fundas, não serve. Na dúvida, pergunte na recepção.",
  },
  {
    p: "A partir de que idade as crianças podem começar?",
    r: "A partir dos 4 anos, no Red Kids, com bola vermelha e quadra reduzida.",
  },
  {
    p: "Vocês aceitam TotalPass?",
    r: "Sim. Consulte no aplicativo os planos aceitos e fale com a recepção para marcar o horário.", // CONFIRMAR com a Red: regras de uso
  },
];

export type Quadra = {
  id: string;
  nome: string;
  piso: string;
  foto: string;
  alt: string;
  dados: { rotulo: string; valor: string }[];
  texto: string;
};

export const quadras: Quadra[] = [
  {
    id: "saibro",
    nome: "Saibro",
    piso: "Pó de tijolo",
    foto: "saibro-quadras",
    alt: "Quadras de saibro da Red Tennis vistas da linha de fundo, com a rede em primeiro plano e os refletores ao fundo",
    dados: [
      { rotulo: "Quadras", valor: "03" },
      { rotulo: "Iluminação", valor: "Refletores de vapor metálico" },
      { rotulo: "Horário", valor: "7h às 22h, seg a qui" }, // CONFIRMAR com a Red
    ],
    texto:
      "Três quadras isoladas por alambrados altos, cada uma com entrada própria. A bola quica alta, o ponto dura mais e o joelho agradece.",
  },
  {
    id: "rapida",
    nome: "Rápida",
    piso: "Base asfáltica Lisonda",
    foto: "rapida-quadra",
    alt: "Quadra rápida bordô da Red Tennis com entorno laranja, paredão ao fundo e prédios do Rudge Ramos no horizonte",
    dados: [
      { rotulo: "Quadra", valor: "01" },
      { rotulo: "Iluminação", valor: "Refletores de vapor metálico" },
      { rotulo: "Horário", valor: "7h às 22h, seg a qui" }, // CONFIRMAR com a Red
    ],
    texto:
      "Piso bordô, quique baixo e bola que anda. É onde acontece o Red Kids e onde você treina saque e voleio. Seca rápido depois da chuva.",
  },
];

export const estrutura = [
  { nome: "Paredão iluminado", texto: "Com orientação de exercícios. Livre para alunos, sem custo." },
  { nome: "Squash", texto: "Uma quadra para quem quer variar a raquete." }, // CONFIRMAR com a Red: a quadra de squash está ativa?
  { nome: "Vestiários e armários", texto: "Para sair da quadra direto para o trabalho." },
  { nome: "Estacionamento", texto: "No local, na Av. Winston Churchill." },
  { nome: "Wi-Fi e bebedouro", texto: "Ao lado das quadras." },
  { nome: "Rebatedores", texto: "Para treinar sem depender de parceiro." },
];

// CONFIRMAR com a Red: todos os preços e faixas de horário da locação.
export const locacao = {
  nota: "Avulso: uma hora, por quadra. Mensalista: uma hora por semana, sempre no mesmo dia e horário, com reposição em caso de chuva. O valor do mensalista é do mês.",
  colunas: ["Avulso (1 hora)", "Mensalista (mês)"],
  linhas: [
    { faixa: "Seg a sex, 7h às 17h", saibro: ["R$ 90", "R$ 320"], rapida: ["R$ 80", "R$ 280"] },
    { faixa: "Seg a qui, 17h às 22h; sex até 20h30", saibro: ["R$ 120", "R$ 420"], rapida: ["R$ 100", "R$ 360"] },
    { faixa: "Sáb 7h às 17h; dom 7h às 12h30", saibro: ["R$ 110", "R$ 400"], rapida: ["R$ 95", "R$ 340"] },
  ],
};

/**
 * Mock de reserva. Dados FALSOS só para demonstrar a interface.
 * Quando houver sistema de reservas, substituir por dados reais (ver src/lib/reservas.ts).
 * Cada string lista os horários OCUPADOS por dia (0 = hoje, 1 = amanhã...).
 */
export const reservaMock = {
  horas: ["07:00", "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
  ocupados: [
    ["07:00", "08:00", "18:00", "19:00", "20:00"],
    ["07:00", "19:00", "20:00", "21:00"],
    ["08:00", "09:00", "18:00", "19:00"],
    ["07:00", "08:00", "17:00", "18:00", "19:00", "20:00"],
    ["19:00", "20:00"],
    ["08:00", "09:00", "10:00", "11:00"],
    ["09:00", "10:00"],
  ],
};

export type Plano = {
  id: string;
  numero: string;
  nome: string;
  chamada: string;
  preco: string;
  periodo: string;
  inclui: string[];
  destaque?: boolean;
};

/**
 * Regra do Clube (proposta, a confirmar com a Red): quem tem turma já é sócio Saibro.
 * O Pro e o Família somam aula particular, torneios e a criança na mesma mensalidade.
 * CONFIRMAR com a Red: nomes, composição e preços dos planos do Clube Red.
 */
export const regraClube = "Aluno de turma já é sócio do Clube Red.";
export const semMulta = "Mensal, sem multa para sair."; // CONFIRMAR com a Red

export const planos: Plano[] = [
  {
    id: "saibro",
    numero: "001",
    nome: "Saibro",
    chamada: "Sua turma, já como sócio.",
    preco: "R$ 380", // CONFIRMAR com a Red
    periodo: "por mês",
    inclui: ["Turma 2x por semana no seu nível", "Paredão livre", "Ranking interno", "10% na locação de quadra"],
  },
  {
    id: "pro",
    numero: "002",
    nome: "Pro",
    chamada: "Para quem quer subir de categoria.",
    preco: "R$ 540", // CONFIRMAR com a Red
    periodo: "por mês",
    inclui: [
      "Turma 2x por semana no seu nível",
      "1 aula particular por mês",
      "20% na locação de quadra",
      "Torneio do mês e Circuito sem pagar inscrição",
    ],
    destaque: true,
  },
  {
    id: "familia",
    numero: "003",
    nome: "Família",
    chamada: "Um adulto e uma criança, uma mensalidade só.",
    preco: "R$ 560", // CONFIRMAR com a Red
    periodo: "por mês",
    inclui: ["1 adulto em grupo 2x por semana", "1 criança no Red Kids", "1 hora de quadra em família por mês"],
  },
];

// CONFIRMAR com a Red: benefícios do clube.
export const beneficios = [
  { titulo: "Prioridade de horário", texto: "Sócio renova a turma e a quadra antes de abrir para o público." },
  { titulo: "Ranking interno", texto: "Quatro categorias, de A a D, com classificação nova todo fim de mês." },
  { titulo: "Torneio do mês", texto: "Um domingo por mês, com chave por categoria. Sócio paga menos na inscrição; no Pro, não\u00a0paga." },
  { titulo: "Encordoamento", texto: "15% de desconto para deixar a raquete na tensão certa." },
  { titulo: "Indicação", texto: "Trouxe um amigo e ele entrou no Clube? Você ganha uma aula particular, e ele ganha 10% no primeiro mês." },
];

export const comparativo = {
  linhas: [
    { item: "Turma por semana", valores: ["2 aulas", "2 aulas", "2 aulas + Red Kids"] },
    { item: "Aula particular por mês", valores: ["—", "1", "—"] },
    { item: "Paredão livre", valores: ["Sim", "Sim", "Sim"] },
    { item: "Ranking interno", valores: ["Sim", "Sim", "Sim"] },
    { item: "Desconto em locação", valores: ["10%", "20%", "10%"] },
    { item: "Torneio do mês e Circuito", valores: ["Inscrição com desconto", "Inscrição incluída", "Inscrição com desconto"] },
    { item: "Hora de quadra em família", valores: ["—", "—", "1 por mês"] },
  ],
};

export const regrasRanking = [
  "O ranking tem quatro categorias: A, B, C e D. Você entra pela categoria indicada pelo seu professor.",
  "É uma competição permanente: você desafia, marca o jogo e joga na Red.",
  "Uma nova classificação sai todo fim de mês, somando os jogos do mês à classificação anterior.",
  "Os melhores de cada categoria sobem; os últimos descem. Ninguém fica parado.", // CONFIRMAR com a Red: regra de acesso e descenso
  "Jogos em melhor de três sets, com super tie-break no terceiro.", // CONFIRMAR com a Red: formato dos jogos
];

export const faqClube = [
  { p: "Já faço aula na Red. Pago o clube à parte?", r: "Não. Quem tem turma já é sócio Saibro. O Pro e o Família somam aula particular, torneios e a criança na mesma mensalidade." }, // CONFIRMAR com a Red
  { p: "Tem fidelidade?", r: "Não. O plano é mensal e você sai quando quiser, sem multa. Quem fica seis meses seguidos ganha uma aula particular por nossa conta." }, // CONFIRMAR com a Red
  { p: "Posso trocar de plano?", r: "Pode, na virada do mês. Basta avisar a recepção." },
  { p: "Como funciona a indicação?", r: "Mande o convite pelo site. Seu amigo faz a experimental em dupla com você e, se entrar no Clube, a aula particular entra no seu cadastro no mês seguinte." },
  { p: "Faltei à aula. Perco?", r: "Avisando com antecedência, você repõe em outra turma do mesmo nível dentro do mês." }, // CONFIRMAR com a Red
];

export type Professor = {
  nome: string;
  papel: string;
  slot: string;
  /** pose do pictograma da ficha */
  pose: "saque" | "direita" | "voleio" | "kids";
  anos: number;
  dados: { rotulo: string; valor: string }[];
};

// Nomes reais (site atual). CONFIRMAR com a Red: anos de quadra, certificação e especialidade.
export const professores: Professor[] = [
  {
    nome: "João Assunção",
    papel: "Professor",
    slot: "professor-joao",
    pose: "saque",
    anos: 25, // CONFIRMAR com a Red
    dados: [
      { rotulo: "Anos de quadra", valor: "25" },
      { rotulo: "Certificação", valor: "CBT nível 2" },
      { rotulo: "Especialidade", valor: "Competição" },
    ],
  },
  {
    nome: "Francisco Olmos",
    papel: "Professor",
    slot: "professor-francisco",
    pose: "direita",
    anos: 20, // CONFIRMAR com a Red
    dados: [
      { rotulo: "Anos de quadra", valor: "20" },
      { rotulo: "Certificação", valor: "CBT nível 1" },
      { rotulo: "Especialidade", valor: "Adultos iniciantes" },
    ],
  },
  {
    nome: "Arnaldo Rodrigues",
    papel: "Professor",
    slot: "professor-arnaldo",
    pose: "kids",
    anos: 18, // CONFIRMAR com a Red
    dados: [
      { rotulo: "Anos de quadra", valor: "18" },
      { rotulo: "Certificação", valor: "ITF Play Tennis" },
      { rotulo: "Especialidade", valor: "Red Kids" },
    ],
  },
  {
    nome: "Rebatedores",
    papel: "Equipe de apoio",
    slot: "rebatedores",
    pose: "voleio",
    anos: 0,
    dados: [
      { rotulo: "Função", valor: "Parceiro de treino" },
      { rotulo: "Para quem", valor: "Categorias A a D" },
      { rotulo: "Como marcar", valor: "Na recepção" },
    ],
  },
];

export type Evento = {
  id: string;
  nome: string;
  tipo: string;
  inicio: string; // AAAA-MM-DD
  fim?: string;
  dataCurta: string;
  detalhe: string;
};

// CONFIRMAR com a Red: calendário de eventos (datas e nomes são exemplos).
export const eventos: Evento[] = [
  {
    id: "etapa-encerramento",
    nome: "Circuito Red Tennis",
    tipo: "Etapa de encerramento",
    inicio: "2026-12-12",
    fim: "2026-12-13",
    dataCurta: "12—13 DEZ",
    detalhe: "Simples, categorias A a D. Chaves no saibro, finais no domingo de manhã. Vale como torneio do mês de dezembro.",
  },
  {
    id: "torneio-mes-nov",
    nome: "Torneio do mês",
    tipo: "Novembro",
    inicio: "2026-11-29",
    dataCurta: "29 NOV",
    detalhe: "Domingo de manhã, chave rápida por categoria, jogos de um set. Sócio Pro não paga\u00a0inscrição.",
  },
  {
    id: "torneio-mes-jan",
    nome: "Torneio do mês",
    tipo: "Janeiro",
    inicio: "2027-01-31",
    dataCurta: "31 JAN",
    detalhe: "Abre a temporada 2027 do ranking. Chave por categoria, jogos de um set.",
  },
  {
    id: "clinica-saque",
    nome: "Clínica de saque",
    tipo: "Clínica",
    inicio: "2026-11-28",
    dataCurta: "28 NOV",
    detalhe: "Duas horas na quadra rápida com os professores. 12 vagas.",
  },
  {
    id: "festival-kids",
    nome: "Festival Red Kids",
    tipo: "Kids",
    inicio: "2026-12-05",
    dataCurta: "05 DEZ",
    detalhe: "Jogos de bola vermelha para alunos de 4 a 8 anos. Pais em quadra no final.",
  },
  {
    id: "etapa-abertura",
    nome: "Circuito Red Tennis",
    tipo: "Etapa de abertura 2027",
    inicio: "2027-02-06",
    fim: "2027-02-07",
    dataCurta: "06—07 FEV",
    detalhe: "Simples e duplas. Aberto a tenistas de fora, por nível.",
  },
];

/** Agenda em ordem de data. O primeiro de `eventos` é o destaque do cartaz. */
export const agenda = [...eventos].sort((a, b) => a.inicio.localeCompare(b.inicio));

// CONFIRMAR com a Red: resultados e ranking são dados de exemplo.
export const resultados = [
  { evento: "Circuito Red Tennis · Etapa de primavera", data: "OUT 2026", campeoes: [
    { categoria: "A", nome: "Rafael M.", placar: "6/4 3/6 10-7" },
    { categoria: "B", nome: "Carla T.", placar: "6/2 6/4" },
    { categoria: "C", nome: "Diego F.", placar: "7/5 6/3" },
    { categoria: "D", nome: "Marina S.", placar: "6/3 6/1" },
  ] },
];

export const ranking: { pos: number; nome: string; categoria: string; pontos: number; mov: number }[] = [
  { pos: 1, nome: "Rafael M.", categoria: "A", pontos: 1840, mov: 0 },
  { pos: 2, nome: "Bruno A.", categoria: "A", pontos: 1715, mov: 2 },
  { pos: 3, nome: "Luís P.", categoria: "A", pontos: 1690, mov: -1 },
  { pos: 4, nome: "Carla T.", categoria: "A", pontos: 1580, mov: 3 },
  { pos: 5, nome: "André K.", categoria: "A", pontos: 1545, mov: -2 },
  { pos: 6, nome: "Paulo R.", categoria: "A", pontos: 1490, mov: 0 },
  { pos: 7, nome: "Diego F.", categoria: "B", pontos: 1320, mov: 4 },
  { pos: 8, nome: "Helena V.", categoria: "B", pontos: 1275, mov: -1 },
  { pos: 9, nome: "Marcos L.", categoria: "B", pontos: 1210, mov: 1 },
  { pos: 10, nome: "Marina S.", categoria: "C", pontos: 1185, mov: 2 },
];

// CONFIRMAR: coletar depoimentos reais (nomes e textos abaixo são exemplos).
export const depoimentos = [
  {
    texto: "Comecei aos 41 sem nunca ter segurado uma raquete. Hoje jogo o ranking na categoria C e não troco a quinta à noite por nada.",
    nome: "Marcelo",
    tempo: "3 anos de Red",
    nivel: "Categoria C",
  },
  {
    texto: "Meu filho entrou no Red Kids com cinco anos. Agora é ele quem me chama para o paredão.",
    nome: "Patrícia",
    tempo: "mãe de aluno, 2 anos de Red",
    nivel: "Iniciante",
  },
  {
    texto: "Saibro bem cuidado, luz boa e gente que joga sério. É difícil achar isso no ABC.",
    nome: "Renato",
    tempo: "8 anos de Red",
    nivel: "Categoria A",
  },
];

// CONFIRMAR com a Red: história e datas da linha do tempo.
export const historia = [
  { ano: "1996", titulo: "A primeira quadra", texto: "A Red abre as portas na Av. Winston Churchill, no Rudge Ramos." },
  { ano: "2004", titulo: "Três de saibro", texto: "As quadras ganham alambrados altos, entradas independentes e iluminação completa." },
  { ano: "2012", titulo: "Nasce o Red Kids", texto: "A quadra rápida vira sala de aula para crianças de 4 a 8 anos." },
  { ano: "2018", titulo: "Ranking informatizado", texto: "Quatro categorias, de A a D, com classificação atualizada pelo sistema." },
  { ano: "Hoje", titulo: "Clube Red", texto: "Planos mensais, ranking e torneio todo mês para quem joga na casa." },
];

export const nav = [
  { href: "/aulas/", rotulo: "Aulas" },
  { href: "/quadras/", rotulo: "Quadras" },
  { href: "/clube-red/", rotulo: "Clube Red" },
  { href: "/torneios/", rotulo: "Torneios" },
  { href: "/sobre/", rotulo: "Sobre" },
  { href: "/contato/", rotulo: "Contato" },
];

/**
 * Esta semana na Red: a faixa que corre abaixo do hero.
 * CONFIRMAR com a Red: agenda real da semana (exemplos abaixo).
 */
export const semana = [
  { quando: "Seg 19h", oque: "Ranking, categoria B, quadra 1" },
  { quando: "Ter 8h", oque: "Turma de iniciantes, quadra 2" },
  { quando: "Qua 18h", oque: "Red Kids, quadra rápida" },
  { quando: "Qui 20h", oque: "Ranking, categoria C, quadra 3" },
  { quando: "Sex 7h", oque: "Paredão livre para alunos" },
  { quando: "Sáb 9h", oque: "Treino de duplas do Clube, quadras 1 e 2" },
  { quando: "Dom 8h", oque: "Jogos amistosos do clube" },
];

export type QuadraPlanta = {
  id: string;
  nome: string;
  piso: "saibro" | "rapida";
  luz: string;
  /** índice em reservaMock para os horários livres de exemplo */
  agenda: number;
};

/**
 * Planta ilustrativa da Red (posições a confirmar).
 * CONFIRMAR com a Red: numeração e posição real das quadras.
 */
export const planta: QuadraPlanta[] = [
  { id: "q1", nome: "Quadra 1", piso: "saibro", luz: "6 refletores", agenda: 0 },
  { id: "q2", nome: "Quadra 2", piso: "saibro", luz: "6 refletores", agenda: 2 },
  { id: "q3", nome: "Quadra 3", piso: "saibro", luz: "6 refletores", agenda: 4 },
  { id: "q4", nome: "Quadra rápida", piso: "rapida", luz: "Iluminada", agenda: 1 },
];

/** Indicação do Clube Red: os dois lados ganham. CONFIRMAR com a Red: benefícios. */
export const indicacao = {
  titulo: "Traga seu parceiro de duplas",
  intro:
    "Tênis se joga com alguém do outro lado da rede. Chame um amigo: ele faz a aula experimental com você, na mesma quadra, e os dois saem ganhando.",
  amigoGanha: "A aula experimental em dupla com você, com professor, e 10% na primeira mensalidade.", // CONFIRMAR com a Red
  voceGanha: "Uma aula particular para cada amigo que entrar no Clube. Sem limite.", // CONFIRMAR com a Red
  passos: [
    { titulo: "Mande o convite", texto: "Escreva seu nome e toque no botão. A mensagem sai pronta, com o link." },
    { titulo: "Batam bola juntos", texto: "Vocês marcam a experimental em dupla e jogam na mesma quadra." },
    { titulo: "Ele entra, você ganha", texto: "A aula particular entra no seu cadastro no mês seguinte." },
  ],
  convite: (nome: string, url: string) =>
    `Bora jogar tênis comigo na Red Tennis, no Rudge Ramos? A aula experimental é em dupla: a gente bate bola junto, com professor. Marca por aqui: ${url}/aulas/?indicado=${encodeURIComponent(nome)}#experimental`,
};
