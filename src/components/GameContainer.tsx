'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themes, ThemeType, ThemeConfig } from '../lib/themeConfig';
import VisualHint from './VisualHint';
import Image from 'next/image';

interface GameProps {
  themeId: ThemeType;
  onBack: () => void;
}

interface Level {
  num1: number;
  num2: number;
  operation: 'soma' | 'subtracao' | 'multiplicacao' | 'divisao';
  answer: number;
}

const operationSymbols: Record<string, string> = {
  soma: '+',
  subtracao: '-',
  multiplicacao: '×',
  divisao: '÷',
};

// Gera níveis progressivos
function generateLevels(): Level[] {
  const levels: Level[] = [];

  // Soma fácil (1-5)
  for (let i = 0; i < 5; i++) {
    const num1 = Math.floor(Math.random() * 5) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    levels.push({ num1, num2, operation: 'soma', answer: num1 + num2 });
  }

  // Subtração fácil
  for (let i = 0; i < 5; i++) {
    const num1 = Math.floor(Math.random() * 5) + 3;
    const num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
    levels.push({ num1, num2, operation: 'subtracao', answer: num1 - num2 });
  }

  // Soma média (5-10)
  for (let i = 0; i < 5; i++) {
    const num1 = Math.floor(Math.random() * 5) + 5;
    const num2 = Math.floor(Math.random() * 5) + 1;
    levels.push({ num1, num2, operation: 'soma', answer: num1 + num2 });
  }

  // Multiplicação fácil
  for (let i = 0; i < 5; i++) {
    const num1 = Math.floor(Math.random() * 3) + 2;
    const num2 = Math.floor(Math.random() * 4) + 2;
    levels.push({ num1, num2, operation: 'multiplicacao', answer: num1 * num2 });
  }

  // Divisão fácil (divisões exatas)
  const divisoes = [
    { num1: 4, num2: 2 },
    { num1: 6, num2: 2 },
    { num1: 6, num2: 3 },
    { num1: 8, num2: 2 },
    { num1: 9, num2: 3 },
  ];
  for (const d of divisoes) {
    levels.push({ ...d, operation: 'divisao', answer: d.num1 / d.num2 });
  }

  return levels;
}

export default function GameContainer({ themeId, onBack }: GameProps) {
  const currentTheme: ThemeConfig = themes[themeId];

  const [levels, setLevels] = useState<Level[]>([]);
  const [levelIndex, setLevelIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    setLevels(generateLevels());
  }, []);

  const currentLevel = levels[levelIndex];

  const checkAnswer = useCallback(() => {
    if (!currentLevel || userAnswer === '') return;

    const numAnswer = parseInt(userAnswer, 10);

    if (numAnswer === currentLevel.answer) {
      setFeedback('correct');
      setScore((prev) => prev + (showHint ? 5 : 10));

      setTimeout(() => {
        setFeedback(null);
        setShowHint(false);
        setUserAnswer('');

        if (levelIndex < levels.length - 1) {
          setLevelIndex((prev) => prev + 1);
        } else {
          setGameComplete(true);
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  }, [currentLevel, userAnswer, showHint, levelIndex, levels.length]);

  const handleHint = () => {
    setShowHint(true);
    setHintsUsed((prev) => prev + 1);
  };

  const restartGame = () => {
    setLevels(generateLevels());
    setLevelIndex(0);
    setUserAnswer('');
    setShowHint(false);
    setFeedback(null);
    setScore(0);
    setHintsUsed(0);
    setGameComplete(false);
  };

  if (levels.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${currentTheme.background}`}>
        <div className="text-4xl animate-spin">🌀</div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden ${currentTheme.background}`}>
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src={currentTheme.backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md relative z-10"
        >
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image
              src="/images/trophy.png"
              alt="Troféu"
              fill
              className="object-contain"
              sizes="128px"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Parabéns!</h1>
          <p className="text-xl text-gray-600 mb-4">{currentTheme.texts.welcome.replace('Bem-vindo', 'Incrível')}</p>
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <p className="text-2xl font-bold text-gray-800">Pontuação: {score}</p>
            <p className="text-sm text-gray-500">Dicas usadas: {hintsUsed}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={restartGame}
              className={`${currentTheme.buttonColor} text-white font-bold py-3 px-6 rounded-xl transition transform hover:scale-105`}
            >
              Jogar Novamente
            </button>
            <button
              onClick={onBack}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition transform hover:scale-105"
            >
              Trocar Tema
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden ${currentTheme.background}`}>
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src={currentTheme.backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Botão Voltar */}
      <button
        onClick={onBack}
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition shadow-lg z-20"
      >
        🔄 Trocar
      </button>

      {/* Cabeçalho */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative w-16 h-16 filter drop-shadow-lg"
        >
          <Image
            src={currentTheme.avatarImage}
            alt={currentTheme.name}
            fill
            className="object-contain"
            sizes="64px"
          />
        </motion.div>
        <div>
          <p className="text-white/90 font-bold text-sm drop-shadow-md">
            {currentTheme.texts.welcome}
          </p>
          <p className="text-white/70 text-xs">
            {currentTheme.texts.level}: {levelIndex + 1}/{levels.length}
          </p>
        </div>
      </div>

      {/* Pontuação */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 z-20">
        <p className="text-white font-bold text-lg">⭐ {score}</p>
      </div>

      {/* Barra de Progresso */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white/20 rounded-full h-3 overflow-hidden z-20">
        <motion.div
          className="h-full bg-yellow-400"
          initial={{ width: 0 }}
          animate={{ width: `${((levelIndex + 1) / levels.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Card da Questão */}
      <motion.div
        key={levelIndex}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mt-16 relative z-10"
      >
        {/* Operação */}
        <div className="text-center mb-6">
          <p className="text-5xl font-bold text-gray-800 mb-2">
            {currentLevel.num1} {operationSymbols[currentLevel.operation]} {currentLevel.num2} = ?
          </p>
        </div>

        {/* Input de Resposta */}
        <div className="flex gap-3 mb-4">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            className="flex-1 text-center text-3xl font-bold border-4 border-gray-200 rounded-xl py-3 focus:border-blue-500 focus:outline-none transition"
            placeholder="?"
            autoFocus
          />
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            onClick={handleHint}
            disabled={showHint}
            className={`flex-1 ${showHint ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'} text-white font-bold py-3 px-4 rounded-xl transition transform hover:scale-105 disabled:hover:scale-100`}
          >
            💡 {currentTheme.texts.hint}
          </button>
          <button
            onClick={checkAnswer}
            className={`flex-1 ${currentTheme.buttonColor} text-white font-bold py-3 px-4 rounded-xl shadow-lg transition transform hover:scale-105`}
          >
            ✅ Responder
          </button>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`absolute inset-0 flex items-center justify-center rounded-3xl ${feedback === 'correct' ? 'bg-green-500/90' : 'bg-red-500/90'}`}
            >
              <div className="text-center text-white">
                <p className="text-6xl mb-2">{feedback === 'correct' ? '🎉' : '😅'}</p>
                <p className="text-2xl font-bold">
                  {feedback === 'correct' ? 'Muito bem!' : 'Tente novamente!'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dica Visual */}
      <AnimatePresence>
        {showHint && currentLevel && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="mt-6 w-full max-w-md relative z-10"
          >
            <VisualHint
              num1={currentLevel.num1}
              num2={currentLevel.num2}
              operation={currentLevel.operation}
              theme={currentTheme}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
