// src/lib/storyEngine.ts
// Motor de histórias temáticas para o jogo Matemática do Lorenzo

import { ThemeType } from './themeConfig';

export type OperationType = 'soma' | 'subtracao' | 'multiplicacao' | 'divisao';

export interface StoryChapter {
  title: string;
  intro: string;
  challenge: string;
  success: string;
  operationContext: string;
}

export interface StoryTemplate {
  opening: string;
  chapters: StoryChapter[];
  finale: string;
}

// Templates de histórias para o Mago
const magoStories: StoryTemplate[] = [
  {
    opening: "O Mago Lorenzo acordou em sua torre mágica. Hoje é dia de preparar poções especiais para o grande festival de magia!",
    chapters: [
      {
        title: "A Poção da Coragem",
        intro: "Para fazer a Poção da Coragem, Lorenzo precisa misturar ingredientes mágicos.",
        challenge: "Quantos ingredientes Lorenzo precisa no total?",
        success: "Perfeito! A poção brilha com uma luz dourada!",
        operationContext: "ingredientes mágicos"
      },
      {
        title: "Os Cristais Encantados",
        intro: "Lorenzo encontrou cristais mágicos na caverna secreta.",
        challenge: "Quantos cristais Lorenzo conseguiu reunir?",
        success: "Os cristais flutuam ao redor de Lorenzo!",
        operationContext: "cristais brilhantes"
      },
      {
        title: "O Feitiço do Vento",
        intro: "Para voar até o castelo, Lorenzo precisa conjurar o feitiço do vento.",
        challenge: "Quantas palavras mágicas Lorenzo deve pronunciar?",
        success: "Woosh! Lorenzo flutua suavemente pelo ar!",
        operationContext: "palavras mágicas"
      },
      {
        title: "A Biblioteca Secreta",
        intro: "Na biblioteca, Lorenzo precisa organizar os livros de feitiços.",
        challenge: "Quantos livros Lorenzo deve colocar na prateleira?",
        success: "Os livros se organizam magicamente!",
        operationContext: "livros antigos"
      },
      {
        title: "O Dragão Amigável",
        intro: "Lorenzo encontrou um dragão que adora resolver enigmas matemáticos.",
        challenge: "Ajude Lorenzo a responder o enigma do dragão!",
        success: "O dragão sorri e oferece uma carona a Lorenzo!",
        operationContext: "escamas douradas"
      }
    ],
    finale: "Lorenzo completou todas as missões! O festival de magia foi um sucesso e todos aplaudiram o jovem mago!"
  },
  {
    opening: "Uma carta misteriosa chegou para o Mago Lorenzo: 'Preciso de sua ajuda para salvar o reino encantado!'",
    chapters: [
      {
        title: "O Portal Mágico",
        intro: "Para abrir o portal, Lorenzo precisa combinar runas antigas.",
        challenge: "Quantas runas são necessárias para o feitiço?",
        success: "O portal se abre com um brilho azulado!",
        operationContext: "runas brilhantes"
      },
      {
        title: "A Floresta Encantada",
        intro: "Na floresta, fadas pedem ajuda para contar suas flores mágicas.",
        challenge: "Quantas flores as fadas têm no total?",
        success: "As fadas agradecem com pó mágico!",
        operationContext: "flores luminosas"
      },
      {
        title: "O Rio das Estrelas",
        intro: "Para atravessar o rio, Lorenzo precisa criar pedras flutuantes.",
        challenge: "Quantas pedras Lorenzo deve conjurar?",
        success: "As pedras brilham e formam uma ponte!",
        operationContext: "pedras mágicas"
      },
      {
        title: "A Torre do Feiticeiro",
        intro: "Na torre, Lorenzo encontra poções que precisam ser organizadas.",
        challenge: "Quantas poções devem ir para cada prateleira?",
        success: "As poções estão perfeitamente organizadas!",
        operationContext: "poções coloridas"
      },
      {
        title: "O Feitiço Final",
        intro: "Para salvar o reino, Lorenzo precisa do feitiço mais poderoso.",
        challenge: "Quantos elementos mágicos o feitiço precisa?",
        success: "O reino está salvo! Todos celebram Lorenzo!",
        operationContext: "elementos mágicos"
      }
    ],
    finale: "O Mago Lorenzo salvou o reino encantado! Agora ele é conhecido como o maior mago de todos os tempos!"
  },
  {
    opening: "Hoje é o dia do exame final na Escola de Magia! Lorenzo precisa passar por todas as provas para se tornar um Mago Supremo!",
    chapters: [
      {
        title: "Prova de Alquimia",
        intro: "O professor quer ver se Lorenzo sabe misturar ingredientes.",
        challenge: "Quantos ingredientes a receita pede?",
        success: "A poção ficou perfeita! Nota máxima!",
        operationContext: "ingredientes raros"
      },
      {
        title: "Prova de Levitação",
        intro: "Lorenzo precisa fazer objetos flutuarem.",
        challenge: "Quantos objetos Lorenzo consegue levitar?",
        success: "Incrível! Todos os objetos flutuam perfeitamente!",
        operationContext: "objetos flutuantes"
      },
      {
        title: "Prova de Transformação",
        intro: "Lorenzo deve transformar sapos em borboletas.",
        challenge: "Quantas borboletas Lorenzo criou?",
        success: "Lindas borboletas voam pelo salão!",
        operationContext: "borboletas mágicas"
      },
      {
        title: "Prova de Teleporte",
        intro: "Lorenzo precisa teleportar maçãs para cestas.",
        challenge: "Quantas maçãs em cada cesta?",
        success: "Teleporte perfeito! Nenhuma maçã perdida!",
        operationContext: "maçãs douradas"
      },
      {
        title: "Prova Final",
        intro: "A última prova: criar fogos de artifício mágicos!",
        challenge: "Quantos fogos de artifício Lorenzo deve criar?",
        success: "O céu se ilumina com cores mágicas!",
        operationContext: "fogos mágicos"
      }
    ],
    finale: "Lorenzo passou em todas as provas! Ele agora é oficialmente um Mago Supremo! 🎓✨"
  }
];

// Templates de histórias para o Piloto
const pilotoStories: StoryTemplate[] = [
  {
    opening: "Comandante Lorenzo recebeu uma missão especial: entregar suprimentos para ilhas remotas no oceano!",
    chapters: [
      {
        title: "Decolagem",
        intro: "Antes de decolar, Lorenzo precisa verificar o combustível.",
        challenge: "Quantos litros de combustível o avião precisa?",
        success: "Tanque cheio! Pronto para decolar!",
        operationContext: "litros de combustível"
      },
      {
        title: "Primeira Ilha",
        intro: "A primeira ilha precisa de caixas de mantimentos.",
        challenge: "Quantas caixas Lorenzo deve entregar?",
        success: "Entrega perfeita! Os moradores agradecem!",
        operationContext: "caixas de suprimentos"
      },
      {
        title: "Tempestade à Vista",
        intro: "Uma tempestade se aproxima! Lorenzo precisa calcular a rota.",
        challenge: "Quantos quilômetros Lorenzo deve desviar?",
        success: "Rota calculada! Tempestade evitada com sucesso!",
        operationContext: "quilômetros de voo"
      },
      {
        title: "Resgate no Mar",
        intro: "Lorenzo avista um barco pedindo ajuda!",
        challenge: "Quantos coletes salva-vidas Lorenzo deve lançar?",
        success: "Todos foram salvos! Lorenzo é um herói!",
        operationContext: "coletes salva-vidas"
      },
      {
        title: "Pouso Final",
        intro: "Hora de voltar para casa! A pista está à vista.",
        challenge: "Em quantos minutos Lorenzo deve pousar?",
        success: "Pouso perfeito! Missão cumprida!",
        operationContext: "minutos de voo"
      }
    ],
    finale: "Comandante Lorenzo completou a missão com sucesso! Ele recebeu a medalha de Piloto Herói! 🏅✈️"
  },
  {
    opening: "Lorenzo foi convidado para participar da Grande Corrida Aérea ao redor do mundo!",
    chapters: [
      {
        title: "Largada na América",
        intro: "A corrida começa! Lorenzo precisa calcular sua velocidade.",
        challenge: "A quantos quilômetros por hora Lorenzo deve voar?",
        success: "Velocidade perfeita! Lorenzo está na liderança!",
        operationContext: "quilômetros por hora"
      },
      {
        title: "Sobre o Oceano",
        intro: "Cruzando o Atlântico, Lorenzo conta as nuvens.",
        challenge: "Quantas nuvens Lorenzo atravessou?",
        success: "Voo tranquilo sobre o oceano!",
        operationContext: "nuvens macias"
      },
      {
        title: "Escala na Europa",
        intro: "Parada para reabastecer na Europa.",
        challenge: "Quantos minutos para o reabastecimento?",
        success: "Reabastecimento rápido! De volta à corrida!",
        operationContext: "minutos de parada"
      },
      {
        title: "Montanhas da Ásia",
        intro: "Voando sobre montanhas nevadas.",
        challenge: "A que altitude Lorenzo deve voar?",
        success: "Altitude perfeita! Vista incrível!",
        operationContext: "metros de altitude"
      },
      {
        title: "Chegada Triunfal",
        intro: "A linha de chegada está à vista!",
        challenge: "Em que posição Lorenzo vai terminar?",
        success: "Lorenzo cruzou a linha de chegada!",
        operationContext: "pontos da corrida"
      }
    ],
    finale: "Lorenzo venceu a Grande Corrida Aérea! Ele é o melhor piloto do mundo! 🏆✈️"
  },
  {
    opening: "Lorenzo é piloto de um avião de carga que entrega presentes de Natal para crianças do mundo todo!",
    chapters: [
      {
        title: "Carregando o Avião",
        intro: "O avião precisa ser carregado com presentes.",
        challenge: "Quantos presentes cabem no avião?",
        success: "Avião carregado! Hora de partir!",
        operationContext: "presentes coloridos"
      },
      {
        title: "Primeira Parada",
        intro: "Chegando na primeira cidade para entregar presentes.",
        challenge: "Quantos presentes para esta cidade?",
        success: "Crianças felizes! Próxima parada!",
        operationContext: "presentes entregues"
      },
      {
        title: "Noite Estrelada",
        intro: "Voando sob as estrelas, Lorenzo conta os pontos brilhantes.",
        challenge: "Quantas estrelas Lorenzo consegue ver?",
        success: "Que noite linda para voar!",
        operationContext: "estrelas brilhantes"
      },
      {
        title: "Última Entrega",
        intro: "A última cidade espera ansiosamente.",
        challenge: "Quantos presentes restam para entregar?",
        success: "Todas as crianças receberam presentes!",
        operationContext: "presentes especiais"
      },
      {
        title: "Voltando para Casa",
        intro: "Missão cumprida! Hora de voltar.",
        challenge: "Quantas horas de voo até casa?",
        success: "Lorenzo está voltando para casa!",
        operationContext: "horas de voo"
      }
    ],
    finale: "Lorenzo entregou todos os presentes! O Natal foi mágico graças ao nosso piloto! 🎄✈️"
  }
];

// Templates de histórias para o Cientista
const cientistaStories: StoryTemplate[] = [
  {
    opening: "Dr. Lorenzo descobriu uma fórmula secreta que pode criar uma planta que cresce super rápido! Hora de testar no laboratório!",
    chapters: [
      {
        title: "Preparando o Experimento",
        intro: "Lorenzo precisa medir os ingredientes com precisão.",
        challenge: "Quantas gotas da solução azul são necessárias?",
        success: "Medida perfeita! O experimento pode começar!",
        operationContext: "gotas de solução"
      },
      {
        title: "Misturando Químicos",
        intro: "Hora de misturar os químicos no tubo de ensaio.",
        challenge: "Quantos mililitros de cada substância?",
        success: "A mistura borbulha com uma cor verde!",
        operationContext: "mililitros de químico"
      },
      {
        title: "Observando a Reação",
        intro: "Lorenzo observa a reação no microscópio.",
        challenge: "Quantas células estão se multiplicando?",
        success: "Incrível! As células estão crescendo!",
        operationContext: "células vivas"
      },
      {
        title: "Testando na Planta",
        intro: "Hora de aplicar a fórmula na planta.",
        challenge: "Quantas folhas a planta deve ter?",
        success: "A planta está crescendo rapidamente!",
        operationContext: "folhas verdes"
      },
      {
        title: "Resultado Final",
        intro: "O experimento está quase completo!",
        challenge: "Quantos centímetros a planta cresceu?",
        success: "Experimento bem-sucedido!",
        operationContext: "centímetros de crescimento"
      }
    ],
    finale: "Dr. Lorenzo fez uma descoberta incrível! Sua fórmula vai ajudar a alimentar o mundo! 🌱🔬"
  },
  {
    opening: "Dr. Lorenzo foi chamado para investigar um mistério: dinossauros estão aparecendo na cidade! É hora de descobrir o que está acontecendo!",
    chapters: [
      {
        title: "Coletando Amostras",
        intro: "Lorenzo coleta amostras de pegadas de dinossauro.",
        challenge: "Quantas amostras Lorenzo coletou?",
        success: "Amostras coletadas! Hora de analisar!",
        operationContext: "amostras de DNA"
      },
      {
        title: "No Laboratório",
        intro: "Analisando as amostras no computador.",
        challenge: "Quantos dados o computador processou?",
        success: "Análise completa! Descoberta importante!",
        operationContext: "dados científicos"
      },
      {
        title: "Seguindo Pistas",
        intro: "As pistas levam a uma caverna misteriosa.",
        challenge: "Quantos metros até a caverna?",
        success: "Lorenzo encontrou a entrada secreta!",
        operationContext: "metros de distância"
      },
      {
        title: "A Máquina do Tempo",
        intro: "Dentro da caverna, uma máquina do tempo!",
        challenge: "Quantos anos no passado a máquina foi?",
        success: "Mistério resolvido! Era uma máquina do tempo!",
        operationContext: "anos no passado"
      },
      {
        title: "Salvando o Dia",
        intro: "Lorenzo precisa enviar os dinossauros de volta!",
        challenge: "Quantos dinossauros precisam voltar?",
        success: "Todos os dinossauros voltaram para casa!",
        operationContext: "dinossauros amigáveis"
      }
    ],
    finale: "Dr. Lorenzo salvou a cidade e fez amizade com os dinossauros! Que aventura científica! 🦕🔬"
  },
  {
    opening: "Dr. Lorenzo está construindo um robô ajudante para o laboratório! Cada peça precisa ser calculada com precisão!",
    chapters: [
      {
        title: "Projetando o Robô",
        intro: "Lorenzo desenha os planos do robô.",
        challenge: "Quantas peças o robô precisa?",
        success: "Projeto aprovado! Hora de construir!",
        operationContext: "peças metálicas"
      },
      {
        title: "Montando a Cabeça",
        intro: "A cabeça do robô precisa de sensores.",
        challenge: "Quantos sensores na cabeça?",
        success: "Cabeça montada! O robô pode ver!",
        operationContext: "sensores eletrônicos"
      },
      {
        title: "Braços Mecânicos",
        intro: "Os braços precisam de articulações.",
        challenge: "Quantas articulações em cada braço?",
        success: "Braços funcionando perfeitamente!",
        operationContext: "articulações mecânicas"
      },
      {
        title: "Programando o Cérebro",
        intro: "Hora de programar o computador do robô.",
        challenge: "Quantas linhas de código Lorenzo escreveu?",
        success: "Programa instalado! Robô inteligente!",
        operationContext: "linhas de código"
      },
      {
        title: "Teste Final",
        intro: "O robô está pronto para o teste!",
        challenge: "Quantas tarefas o robô completou?",
        success: "O robô funciona perfeitamente!",
        operationContext: "tarefas completadas"
      }
    ],
    finale: "Dr. Lorenzo criou o robô mais inteligente do mundo! Agora ele tem um ajudante no laboratório! 🤖🔬"
  }
];

// Função para selecionar uma história aleatória
export function getRandomStory(theme: ThemeType): StoryTemplate {
  let stories: StoryTemplate[];
  
  switch (theme) {
    case 'mago':
      stories = magoStories;
      break;
    case 'piloto':
      stories = pilotoStories;
      break;
    case 'cientista':
      stories = cientistaStories;
      break;
    default:
      stories = magoStories;
  }
  
  return stories[Math.floor(Math.random() * stories.length)];
}

// Função para gerar uma conta aleatória
export function generateRandomProblem(
  operation: OperationType,
  difficulty: number = 1
): { num1: number; num2: number; answer: number } {
  let num1: number, num2: number, answer: number;
  
  // Ajusta a dificuldade baseada no nível (1-5)
  const maxNum = Math.min(5 + difficulty * 2, 12);
  
  switch (operation) {
    case 'soma':
      num1 = Math.floor(Math.random() * maxNum) + 1;
      num2 = Math.floor(Math.random() * maxNum) + 1;
      answer = num1 + num2;
      break;
      
    case 'subtracao':
      num1 = Math.floor(Math.random() * maxNum) + 3;
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      answer = num1 - num2;
      break;
      
    case 'multiplicacao':
      num1 = Math.floor(Math.random() * Math.min(maxNum, 10)) + 1;
      num2 = Math.floor(Math.random() * Math.min(maxNum, 10)) + 1;
      answer = num1 * num2;
      break;
      
    case 'divisao':
      // Gera divisões exatas
      num2 = Math.floor(Math.random() * Math.min(maxNum, 10)) + 1;
      answer = Math.floor(Math.random() * Math.min(maxNum, 10)) + 1;
      num1 = num2 * answer;
      break;
      
    default:
      num1 = 1;
      num2 = 1;
      answer = 2;
  }
  
  return { num1, num2, answer };
}

// Função para formatar o contexto da história com os números
export function formatStoryContext(
  chapter: StoryChapter,
  num1: number,
  num2: number,
  operation: OperationType
): string {
  const operationTexts: Record<OperationType, string> = {
    soma: `${num1} ${chapter.operationContext} mais ${num2} ${chapter.operationContext}`,
    subtracao: `${num1} ${chapter.operationContext}, mas ${num2} foram usados`,
    multiplicacao: `${num1} grupos com ${num2} ${chapter.operationContext} cada`,
    divisao: `${num1} ${chapter.operationContext} divididos em ${num2} partes iguais`
  };
  
  return operationTexts[operation];
}

// Nomes das operações em português
export const operationNames: Record<OperationType, string> = {
  soma: 'Soma',
  subtracao: 'Subtração',
  multiplicacao: 'Multiplicação',
  divisao: 'Divisão'
};

// Símbolos das operações
export const operationSymbols: Record<OperationType, string> = {
  soma: '+',
  subtracao: '-',
  multiplicacao: '×',
  divisao: '÷'
};

// Emojis das operações por tema
export const operationEmojis: Record<ThemeType, Record<OperationType, string>> = {
  mago: {
    soma: '⚗️',
    subtracao: '👻',
    multiplicacao: '⚡',
    divisao: '💎'
  },
  piloto: {
    soma: '✈️',
    subtracao: '☁️',
    multiplicacao: '🚁',
    divisao: '⛽'
  },
  cientista: {
    soma: '🧪',
    subtracao: '🔬',
    multiplicacao: '💡',
    divisao: '🧬'
  }
};
