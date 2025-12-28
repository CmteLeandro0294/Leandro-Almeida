'use client';

import { useState } from 'react';
import GameContainer from '../components/GameContainer';
import ThemeSelector from '../components/ThemeSelector';
import { ThemeType } from '../lib/themeConfig';

export default function Home() {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeType | null>(null);

  if (!currentThemeId) {
    return <ThemeSelector onSelect={(id) => setCurrentThemeId(id)} />;
  }

  return (
    <GameContainer
      themeId={currentThemeId}
      onBack={() => setCurrentThemeId(null)}
    />
  );
}
