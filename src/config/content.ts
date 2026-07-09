/* ============================================================
   CONTEÚDO CENTRAL — LP Lipedema · Dr. Benício Júnior
   ÚNICO arquivo a editar para trocar copy, contatos, flags.
   Copy conforme PRD v1.0, Seção 11 (conformidade CFM — sem
   promessa de cura/resultado garantido).
   ============================================================ */

export const SITE = {
  /** Domínio de produção (www é o canônico — a raiz redireciona 308 p/ www) */
  domain: 'https://www.drbeniciolipedema.com.br',
  /** Container GTM real (ativado em 2026-07-09). Se voltar ao placeholder
      GTM-XXXXXXX, o snippet deixa de ser injetado. */
  gtmId: 'GTM-W349GXQ2',
  title: 'Tratamento de Lipedema em Goiânia | Dr. Benício de Oliveira Júnior',
  description:
    'Dor, inchaço e pernas desproporcionais que não respondem a dieta podem ser lipedema. Avaliação especializada com o Dr. Benício Júnior em Goiânia, presencial e por telemedicina.',
  locale: 'pt_BR',
};

export const DOCTOR = {
  name: 'Dr. Benício de Oliveira Júnior',
  shortName: 'Dr. Benício Júnior',
  specialty: 'Cirurgia Plástica',
  /** TODO antes do lançamento: CRM-GO e RQE reais */
  crm: 'CRM-GO XXXXX · RQE XXXXX',
  instagram: 'https://www.instagram.com/drbeniciojr/',
};

export const CONTACT = {
  whatsappNumber: '5562996134706',
  whatsappMessage: 'Olá, vim pela página e quero agendar uma avaliação de lipedema.',
  phoneDisplay: '+55 62 99613-4706',
  phoneE164: '+5562996134706',
  address: {
    street: 'R. 87, 415, qd F 27 lt 45',
    neighborhood: 'Setor Sul',
    city: 'Goiânia',
    uf: 'GO',
    cep: '74093-300',
  },
  /** Horário a confirmar com o consultório (registro anterior: 14h–17h) */
  hours: 'Terças e quintas-feiras',
  telemedicine: 'Telemedicina disponível para pacientes de fora de Goiânia',
};

export const FLAGS = {
  /** Ativar somente com depoimentos reais + autorização por escrito (CFM) */
  testimonials: false,
  /** Botão flutuante de WhatsApp no desktop (≥900px) */
  floatingWhatsapp: true,
  /** Anexa [ref: utm_source/utm_campaign] à mensagem do WhatsApp */
  appendUtmToWhatsApp: true,
};

/** Link de conversão — todos os CTAs apontam para cá */
export const waLink = () =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

/* ---------------- 11.1 HERO ---------------- */
export const HERO = {
  kicker: 'Tratamento do lipedema · Goiânia',
  /** H1 — typewriter aplicado por cima do texto já renderizado (LCP-safe) */
  headline: 'Não é "só gordura". E não, a culpa nunca foi sua.',
  subheadline:
    'Dor ao toque, inchaço no fim do dia, pernas desproporcionais ao corpo e aquela gordura "teimosa" que academia e restrição não resolvem. Se você se reconhece, existe um tratamento, e ele começa com um diagnóstico correto.',
  cta: 'Quero agendar minha avaliação',
  ctaReassurance: 'Você conversa direto com a equipe, sem compromisso.',
  microcopy:
    'Atendimento com o Dr. Benício Júnior · +30 anos de experiência · Goiânia e telemedicina para todo o Brasil',
  imageAlt:
    'Dr. Benício de Oliveira Júnior, cirurgião plástico especializado em lipedema, em retrato profissional',
};

/* ---------------- 11.2 PROBLEMA ---------------- */
export const PROBLEMA = {
  kicker: 'Você já ouviu isso',
  title: 'Você não está exagerando. E não está sozinha.',
  quotes: ['"É só emagrecer."', '"Faz mais exercício que some."', '"Você precisa se esforçar mais."'],
  body:
    'E, mesmo fazendo tudo certo, com dieta, academia e disciplina, suas pernas continuavam pesadas, doloridas e do mesmo tamanho. O tronco até afinava. As pernas, não.',
  bodyStrong: 'Isso não é falta de força de vontade. É uma doença.',
  explanation:
    'O lipedema é uma condição crônica, de origem genética e hormonal, com acúmulo anormal, simétrico e doloroso de gordura, resistente a dieta e exercício por natureza.',
};

/* ---------------- 11.3 AGITAÇÃO ---------------- */
export const AGITACAO = {
  kicker: 'Por que agir agora',
  title: 'O silêncio custa caro. E o tempo, mais ainda.',
  consequences: [
    { icon: 'pain', text: 'Dor que limita o dia a dia: trabalhar, caminhar, viver.' },
    { icon: 'swelling', text: 'Inchaço rotineiro, que piora ao longo do dia.' },
    { icon: 'mobility', text: 'Perda progressiva de mobilidade e disposição.' },
    { icon: 'progression', text: 'Risco de evolução para linfedema nos estágios avançados.' },
  ],
  emotional:
    'E existe o peso que não aparece em exame: a frustração de não ser levada a sério, a vergonha injusta, o espelho que virou inimigo.',
  closing: 'Você não merece continuar assim. E não precisa.',
};

/* ---------------- 11.4 SOLUÇÃO ---------------- */
export const SOLUCAO = {
  kicker: 'A virada',
  title: 'O que muda quando o seu caso é levado a sério e tratado com técnica específica.',
  body:
    'Lipedema tem nome, causa e tratamento. A cirurgia não é uma lipoaspiração estética comum. É uma técnica especializada, que preserva o sistema linfático e trata o tecido inflamado.',
  results: 'Nas mãos certas, o resultado é menos dor, menos peso, mais mobilidade e a autoconfiança de volta.',
  contrast: {
    estetica: {
      label: 'Lipo estética comum',
      items: ['Objetivo: contorno corporal', 'Não considera o tecido doente', 'Pode agredir o sistema linfático'],
    },
    funcional: {
      label: 'Lipo funcional para lipedema',
      items: ['Objetivo: tratar a doença e a dor', 'Remove o tecido inflamado', 'Preserva o sistema linfático'],
    },
  },
};

/* ---------------- 11.5 AUTORIDADE ---------------- */
export const AUTORIDADE = {
  kicker: 'Quem vai te atender',
  title: 'Dr. Benício Júnior: cirurgia com propósito.',
  body: [
    'Sou o Dr. Benício de Oliveira Júnior, médico com mais de 30 anos de atuação na área da saúde. Ao longo desses anos, acompanhei muitos pacientes e entendi que tratar o lipedema exige mais do que uma cirurgia isolada.',
    'Meu trabalho une técnica, ciência e empatia, com um princípio que não abro mão: educação e transparência. Sem promessas milagrosas. Com verdade.',
  ],
  bodyStrong: 'Meu objetivo não é só operar. É devolver leveza, conforto e confiança à sua vida.',
  imageAlt: 'Dr. Benício de Oliveira Júnior em seu consultório em Goiânia',
};

/* ---------------- 11.6 MÉTODO ---------------- */
export const METODO = {
  kicker: 'O método',
  title: 'Um cuidado que enxerga você por inteiro, não só as suas pernas.',
  cards: [
    {
      icon: 'diagnostico',
      title: 'Avaliação médica especializada',
      text: 'Diagnóstico correto do estágio do lipedema e planejamento com técnica que preserva o sistema linfático: a lipoaspiração funcional.',
    },
    {
      icon: 'metabolica',
      title: 'Estruturação metabólica',
      text: 'Controle da inflamação e sustentação dos resultados a longo prazo, com orientação individualizada.',
    },
    {
      icon: 'emocional',
      title: 'Estruturação emocional',
      text: 'Acolhimento para quem carregou anos de julgamento, porque cuidar da mente também é tratar a doença.',
    },
  ],
  closing: 'Um plano personalizado, seguro e humano, do primeiro contato ao acompanhamento pós-operatório.',
};

/* ---------------- 11.7 CHECKLIST ---------------- */
export const CHECKLIST = {
  kicker: 'Autoidentificação',
  title: 'Você se identifica com pelo menos 3 destes sinais?',
  items: [
    'Pernas visivelmente mais volumosas que o tronco, e isso não muda com dieta.',
    'A gordura das pernas ou braços dói ao toque, ao apertar ou encostar.',
    'Hematomas ("roxos") com facilidade, às vezes sem lembrar da pancada.',
    'Pernas incham e ficam pesadas, principalmente no fim do dia.',
    'Você já emagreceu, mas as pernas continuaram do mesmo tamanho.',
    'Os pés costumam ser poupados, enquanto pernas e coxas acumulam volume.',
    'Você já ouviu que é "só obesidade", mas sente que é algo diferente.',
  ],
  closing: 'Se você marcou 3 ou mais, é hora de uma avaliação profissional.',
  cta: 'Quero entender o meu caso',
};

/* ---------------- 11.8 PROVA SOCIAL (flag-gated) ---------------- */
export const DEPOIMENTOS = {
  kicker: 'Histórias reais',
  title: 'Mulheres que voltaram a viver sem o peso do lipedema.',
  /** ⚠️ SUBSTITUIR por depoimentos reais COM AUTORIZAÇÃO POR ESCRITO (CFM)
      e então ativar FLAGS.testimonials. Não publicar conteúdo fictício. */
  items: [
    {
      quote: '[SUBSTITUIR: depoimento real com autorização por escrito da paciente]',
      author: 'Paciente',
      detail: '[idade], [cidade]',
    },
  ],
};

/* ---------------- 11.9 FAQ ---------------- */
export const FAQ = {
  kicker: 'Dúvidas frequentes',
  title: 'O que toda paciente pergunta antes de agendar.',
  items: [
    {
      q: 'Lipedema tem cura?',
      a: 'O lipedema é uma condição crônica, e ser transparente sobre isso faz parte do nosso trabalho. O objetivo do tratamento é controlar a dor, reduzir o inchaço, melhorar a mobilidade e devolver qualidade de vida. Cada caso é avaliado individualmente.',
    },
    {
      q: 'A cirurgia é a mesma coisa que lipoaspiração comum?',
      a: 'Não. A cirurgia para lipedema usa técnica específica, que preserva o sistema linfático e remove o tecido doente e inflamado. É um procedimento funcional, com objetivo de tratar a doença, não apenas estético.',
    },
    {
      q: 'Moro fora de Goiânia, consigo ser atendida?',
      a: 'Sim. A avaliação inicial pode ser feita por telemedicina, de qualquer lugar do Brasil. Se houver indicação de continuidade, o planejamento presencial é organizado com antecedência.',
    },
    {
      q: 'Como funciona a primeira consulta?',
      a: 'É uma avaliação completa e honesta: histórico, exame clínico, definição do estágio do lipedema e a indicação do melhor caminho para o seu caso, cirúrgico ou não.',
    },
    {
      q: 'E se meu caso não for cirúrgico?',
      a: 'Nem todo lipedema exige cirurgia. Se o seu caso tiver indicação conservadora, é isso que você vai ouvir, com um plano real de cuidado. Orientação verdadeira faz parte do método.',
    },
  ],
};

/* ---------------- 11.10 CTA FINAL ---------------- */
export const CTA_FINAL = {
  kicker: 'Agendamento',
  title: 'O próximo passo é simples: uma avaliação.',
  subtitle: 'O primeiro passo para viver com menos dor.',
  urgency:
    'O consultório atende presencialmente às terças e quintas-feiras, com vagas de avaliação limitadas por semana. Pacientes de fora de Goiânia podem começar por telemedicina.',
  cta: 'Agendar minha avaliação agora',
  microcopy:
    'Atendimento humanizado · Diagnóstico honesto · Sem promessas milagrosas, só o cuidado que você merece.',
};

/* ---------------- 11.11 RODAPÉ ---------------- */
export const FOOTER = {
  description:
    'Cirurgia plástica especializada em lipedema. Diagnóstico preciso, tratamento funcional e acompanhamento humano em cada etapa.',
  disclaimer:
    'As informações desta página têm caráter educativo e não substituem a consulta médica. Resultados variam conforme cada paciente. O diagnóstico e a indicação de tratamento dependem de avaliação individualizada.',
  copyright: `© ${new Date().getFullYear()} Dr. Benício de Oliveira Júnior · Todos os direitos reservados`,
};

/* ---------------- STICKY CTA (mobile) ---------------- */
export const STICKY = {
  label: 'Agendar avaliação',
};
