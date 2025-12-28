'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themes, ThemeType, ThemeConfig } from '../lib/themeConfig';
import { 
  getRandomStory, 
  generateRandomProblem, 
  formatStoryContext,
  operationNames,
  operationSymbols,
  operationEmojis,
  OperationType,
  StoryTemplate
} from '../lib/storyEngine';
import VisualHint from './VisualHint';
import Image from 'next/image';

interface GameProps {
  themeId: ThemeType;
  onBack: () => void;
}

interface CurrentProblem {
  num1: number;
  num2: number;
  answer: number;
}

const CHAPTERS_PER_GAME = 5;

export default function GameContainer({ themeId, onBack }: GameProps) {
  const currentTheme: ThemeConfig = themes[themeId];

  // Estado do jogo
  const [story, setStory] = useState<StoryTemplate | null>(null);
  const [currentOperation, setCurrentOperation] = useState<OperationType>('soma');
  const [chapterIndex, setChapterIndex] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<CurrentProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showOperationSelector, setShowOperationSelector] = useState(false);
  const [showStoryIntro, setShowStoryIntro] = useState(true);
  const [difficulty, setDifficulty] = useState(1);

  // Inicializa o jogo com uma história aleatória
  useEffect(() => {
    const newStory = getRandomStory(themeId);
    setStory(newStory);
    generateNewProblem('soma', 1);
  }, [themeId]);

  // Gera um novo problema matemático
  const generateNewProblem = useCallback((operation: OperationType, diff: number) => {
    const problem = generateRandomProblem(operation, diff);
    setCurrentProblem(problem);
  }, []);

  // Muda a operação
  const changeOperation = (newOperation: OperationType) => {
    setCurrentOperation(newOperation);
    generateNewProblem(newOperation, difficulty);
    setShowOperationSelector(false);
    setUserAnswer('');
    setShowHint(false);
  };

  // Verifica a resposta
  const checkAnswer = useCallback(() => {
    if (!currentProblem || userAnswer === '') return;

    const numAnswer = parseInt(userAnswer, 10);

    if (numAnswer === currentProblem.answer) {
      setFeedback('correct');
      setScore((prev) => prev + (showHint ? 5 : 10));

      setTimeout(() => {
        setFeedback(null);
        setShowHint(false);
        setUserAnswer('');

        if (chapterIndex < CHAPTERS_PER_GAME - 1) {
          setChapterIndex((prev) => prev + 1);
          const newDifficulty = Math.min(difficulty + 1, 5);
          setDifficulty(newDifficulty);
          generateNewProblem(currentOperation, newDifficulty);
          setShowStoryIntro(true);
        } else {
          setGameComplete(true);
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  }, [currentProblem, userAnswer, showHint, chapterIndex, currentOperation, difficulty, generateNewProblem]);

  // Mostra a dica
  const handleHint = () => {
    setShowHint(true);
    setHintsUsed((prev) => prev + 1);
  };

  // Reinicia o jogo
  const restartGame = () => {
    const newStory = getRandomStory(themeId);
    setStory(newStory);
    setChapterIndex(0);
    setDifficulty(1);
    generateNewProblem(currentOperation, 1);
    setUserAnswer('');
    setShowHint(false);
    setFeedback(null);
    setScore(0);
    setHintsUsed(0);
    setGameComplete(false);
    setShowStoryIntro(true);
  };

  // Loading
  if (!story || !currentProblem) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${currentTheme.background}`}>
        <div className="text-4xl animate-spin">🌀</div>
      </div>
    );
  }

  const currentChapter = story.chapters[chapterIndex];
  const storyContext = formatStoryContext(currentChapter, currentProblem.num1, currentProblem.num2, currentOperation);

  // Tela de vitória
  if (gameComplete) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden ${currentTheme.background}`}>
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
          <p className="text-lg text-gray-600 mb-4 px-4">{story.finale}</p>
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <p className="text-2xl font-bold text-gray-800">Pontuação: {score}</p>
            <p className="text-sm text-gray-500">Dicas usadas: {hintsUsed}</p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={restartGame}
              className={`${currentTheme.buttonColor} text-white font-bold py-3 px-6 rounded-xl transition transform hover:scale-105`}
            >
              🔄 Nova Aventura
            </button>
            <button
              onClick={onBack}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition transform hover:scale-105"
            >
              🎭 Trocar Tema
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

      {/* Seletor de Operação */}
      <button
        onClick={() => setShowOperationSelector(true)}
        className="absolute top-4 right-28 bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-full hover:bg-white/40 transition shadow-lg z-20 flex items-center gap-2"
      >
        {operationEmojis[themeId][currentOperation]} {operationNames[currentOperation]}
      </button>

      {/* Modal Seletor de Operação */}
      <AnimatePresence>
        {showOperationSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowOperationSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Escolha a Operação</h2>
              <div className="grid grid-cols-2 gap-3">
                {(['soma', 'subtracao', 'multiplicacao', 'divisao'] as OperationType[]).map((op) => (
                  <button
                    key={op}
                    onClick={() => changeOperation(op)}
                    className={`p-4 rounded-xl font-bold text-white transition transform hover:scale-105 ${
                      currentOperation === op 
                        ? currentTheme.buttonColor + ' ring-4 ring-yellow-400' 
                        : 'bg-gray-400 hover:bg-gray-500'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{operationEmojis[themeId][op]}</span>
                    <span className="text-sm">{operationNames[op]}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowOperationSelector(false)}
                className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            Capítulo {chapterIndex + 1}/{CHAPTERS_PER_GAME}
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
          animate={{ width: `${((chapterIndex + 1) / CHAPTERS_PER_GAME) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Card da História e Questão */}
      <motion.div
        key={`${chapterIndex}-${currentOperation}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-lg mt-16 relative z-10"
      >
        {/* Título do Capítulo */}
        <div className="text-center mb-4">
          <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold text-white ${currentTheme.buttonColor.split(' ')[0]}`}>
            {currentChapter.title}
          </span>
        </div>

        {/* Intro da História (mostra apenas uma vez por capítulo) */}
        <AnimatePresence>
          {showStoryIntro && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <p className="text-gray-600 text-center italic mb-3">
                {currentChapter.intro}
              </p>
              <button
                onClick={() => setShowStoryIntro(false)}
                className={`w-full ${currentTheme.buttonColor} text-white font-bold py-2 px-4 rounded-xl transition transform hover:scale-105`}
              >
                Continuar a Aventura →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desafio e Conta */}
        {!showStoryIntro && (
          <>
            {/* Contexto da História */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700 text-center">
                <span className="font-bold">{currentChapter.challenge}</span>
              </p>
              <p className="text-gray-500 text-sm text-center mt-2">
                {storyContext}
              </p>
            </div>

            {/* Operação Matemática */}
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-gray-800 mb-2">
                {currentProblem.num1} {operationSymbols[currentOperation]} {currentProblem.num2} = ?
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
          </>
        )}

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`absolute inset-0 flex items-center justify-center rounded-3xl ${feedback === 'correct' ? 'bg-green-500/90' : 'bg-red-500/90'}`}
            >
              <div className="text-center text-white p-4">
                <p className="text-6xl mb-2">{feedback === 'correct' ? '🎉' : '😅'}</p>
                <p className="text-2xl font-bold mb-2">
                  {feedback === 'correct' ? currentChapter.success : 'Tente novamente!'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dica Visual */}
      <AnimatePresence>
        {showHint && currentProblem && !showStoryIntro && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="mt-6 w-full max-w-lg relative z-10"
          >
            <VisualHint
              num1={currentProblem.num1}
              num2={currentProblem.num2}
              operation={currentOperation}
              theme={currentTheme}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
