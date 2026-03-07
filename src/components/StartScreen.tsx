import { useState } from 'react';
import type { Difficulty } from '../types';

interface StartScreenProps {
  onStartGame: (difficulty: Difficulty) => void;
}

export function StartScreen({ onStartGame }: StartScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>('easy');

  const handleStartGame = () => {
    onStartGame(selectedDifficulty);
  };

  return (
    <div className="start-screen">
      <h1>Tic Tac Toe</h1>
      <div className="difficulty-selection">
        <h2>Select Difficulty</h2>
        <div className="difficulty-buttons">
          <button
            type="button"
            onClick={() => setSelectedDifficulty('easy')}
            className={selectedDifficulty === 'easy' ? 'selected' : ''}
            aria-pressed={selectedDifficulty === 'easy'}
          >
            Easy
          </button>
          <button
            type="button"
            onClick={() => setSelectedDifficulty('hard')}
            className={selectedDifficulty === 'hard' ? 'selected' : ''}
            aria-pressed={selectedDifficulty === 'hard'}
          >
            Hard
          </button>
        </div>
      </div>
      <button
        type="button"
        className="start-button"
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  );
}
