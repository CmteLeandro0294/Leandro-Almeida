// src/lib/themeConfig.ts

export type ThemeType = 'mago' | 'piloto' | 'cientista';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  avatar: string;
  background: string;
  cardColor: string;
  buttonColor: string;
  icons: {
    soma: string;
    subtracao: string;
    multi: string;
    divisao: string;
  };
  texts: {
    welcome: string;
    level: string;
    hint: string;
  };
}

export const themes: Record<ThemeType, ThemeConfig> = {
  mago: {
    id: 'mago',
    name: 'Escola de Magia',
    avatar: '🧙‍♂️',
    background: 'bg-gradient-to-b from-purple-900 via-indigo-900 to-black',
    cardColor: 'bg-purple-100 border-purple-500',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    icons: {
      soma: '⚗️',
      subtracao: '👻',
      multi: '⚡',
      divisao: '💎'
    },
    texts: {
      welcome: 'Bem-vindo, Mago Lorenzo!',
      level: 'Nível de Magia',
      hint: 'Consultar Grimório'
    }
  },
  piloto: {
    id: 'piloto',
    name: 'Academia de Voo',
    avatar: '👨‍✈️',
    background: 'bg-gradient-to-b from-sky-400 via-blue-300 to-white',
    cardColor: 'bg-blue-50 border-blue-500',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    icons: {
      soma: '✈️',
      subtracao: '☁️',
      multi: '🚁',
      divisao: '⛽'
    },
    texts: {
      welcome: 'Bem-vindo, Cmte. Lorenzo!',
      level: 'Altitude de Voo',
      hint: 'Pedir Torre de Controle'
    }
  },
  cientista: {
    id: 'cientista',
    name: 'Laboratório Secreto',
    avatar: '👨‍🔬',
    background: 'bg-slate-100',
    cardColor: 'bg-white border-green-500',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    icons: {
      soma: '🦠',
      subtracao: '🧊',
      multi: '💡',
      divisao: '🧪'
    },
    texts: {
      welcome: 'Bem-vindo, Dr. Lorenzo!',
      level: 'Nível do Experimento',
      hint: 'Consultar Dados'
    }
  }
};
