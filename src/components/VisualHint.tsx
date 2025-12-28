'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThemeConfig } from '../lib/themeConfig';

interface HintProps {
  num1: number;
  num2: number;
  operation: string;
  theme: ThemeConfig;
}

export default function VisualHint({ num1, num2, operation, theme }: HintProps) {

  // --- SOMA ---
  if (operation === 'soma') {
    return (
      <div className={`flex flex-col items-center gap-4 p-6 rounded-xl border-2 ${theme.cardColor}`}>
        <p className="text-sm font-bold opacity-70">Juntando {theme.icons.soma}...</p>
        <div className="flex gap-4 items-center flex-wrap justify-center">
          <div className="flex flex-wrap gap-1 max-w-[150px] justify-center">
            {Array.from({ length: num1 }).map((_, i) => (
              <motion.div
                key={`n1-${i}`}
                initial={{ scale: 0, x: -50 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className="text-3xl"
              >
                {theme.icons.soma}
              </motion.div>
            ))}
          </div>
          <span className="text-3xl font-bold text-gray-600">+</span>
          <div className="flex flex-wrap gap-1 max-w-[150px] justify-center">
            {Array.from({ length: num2 }).map((_, i) => (
              <motion.div
                key={`n2-${i}`}
                initial={{ scale: 0, x: 50 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1), type: 'spring' }}
                className="text-3xl"
              >
                {theme.icons.soma}
              </motion.div>
            ))}
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-lg font-bold text-gray-700"
        >
          = {num1 + num2} {theme.icons.soma}
        </motion.p>
      </div>
    );
  }

  // --- SUBTRAÇÃO ---
  if (operation === 'subtracao') {
    return (
      <div className={`flex flex-col items-center gap-4 p-6 rounded-xl border-2 ${theme.cardColor}`}>
        <p className="text-sm font-bold opacity-70">Retirando {theme.icons.subtracao}...</p>
        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
          {Array.from({ length: num1 }).map((_, i) => {
            const shouldVanish = i >= (num1 - num2);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 1 }}
                animate={shouldVanish ? { opacity: 0, scale: 0.5, rotate: 180, y: -20 } : {}}
                transition={shouldVanish ? { duration: 0.8, delay: 1 + ((i - (num1 - num2)) * 0.2) } : {}}
                className="text-4xl flex items-center justify-center w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg bg-white/50"
              >
                {shouldVanish ? theme.icons.subtracao : theme.icons.soma}
              </motion.div>
            );
          })}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-lg font-bold text-gray-700"
        >
          Sobram {num1 - num2} {theme.icons.soma}
        </motion.p>
      </div>
    );
  }

  // --- MULTIPLICAÇÃO ---
  if (operation === 'multiplicacao') {
    return (
      <div className={`flex flex-col items-center gap-4 p-6 rounded-xl border-2 ${theme.cardColor}`}>
        <p className="text-sm font-bold opacity-70">
          {num1} grupos de {num2} {theme.icons.multi}
        </p>
        <div className="flex flex-col gap-3">
          {Array.from({ length: num1 }).map((_, row) => (
            <motion.div
              key={row}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: row * 0.3 }}
              className="flex gap-2 p-2 bg-black/5 rounded-lg"
            >
              {Array.from({ length: num2 }).map((_, col) => (
                <motion.div
                  key={`${row}-${col}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (row * 0.3) + (col * 0.1) }}
                  className="text-2xl"
                >
                  {theme.icons.multi}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: num1 * 0.3 + 0.5 }}
          className="text-lg font-bold text-gray-700"
        >
          = {num1 * num2} {theme.icons.multi}
        </motion.p>
      </div>
    );
  }

  // --- DIVISÃO ---
  if (operation === 'divisao') {
    const result = Math.floor(num1 / num2);
    const groups = Array.from({ length: num2 }, () => result);

    return (
      <div className={`flex flex-col items-center gap-4 p-6 rounded-xl border-2 ${theme.cardColor}`}>
        <p className="text-sm font-bold opacity-70">
          Dividindo {num1} {theme.icons.divisao} em {num2} grupos
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          {groups.map((count, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.3 }}
              className="flex flex-col items-center gap-1 p-3 bg-black/5 rounded-lg"
            >
              <p className="text-xs font-bold text-gray-500">Grupo {groupIndex + 1}</p>
              <div className="flex gap-1">
                {Array.from({ length: count }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: groupIndex * 0.3 + i * 0.1 }}
                    className="text-2xl"
                  >
                    {theme.icons.divisao}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: num2 * 0.3 + 0.5 }}
          className="text-lg font-bold text-gray-700"
        >
          Cada grupo tem {result} {theme.icons.divisao}
        </motion.p>
      </div>
    );
  }

  return <div className="text-center p-4">Demonstração Visual</div>;
}
