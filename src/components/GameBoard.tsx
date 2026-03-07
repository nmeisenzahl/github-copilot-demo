import React from 'react';
import type { Board } from '../types';

interface GameBoardProps {
  board: Board;
  onCellClick: (position: number) => void;
  disabled: boolean;
}

export function GameBoard({ board, onCellClick, disabled }: GameBoardProps) {
  const handleCellClick = (position: number) => {
    if (disabled || board[position]) {
      return;
    }
    onCellClick(position);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    position: number
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCellClick(position);
    }
  };

  return (
    <div className="game-board" data-testid="game-board">
      {board.map((cell, index) => (
        <button
          key={index}
          type="button"
          className={`cell ${cell ? 'filled' : ''}`}
          data-testid="cell"
          onClick={() => handleCellClick(index)}
          onKeyDown={(e) => handleKeyPress(e, index)}
          disabled={disabled || !!cell}
          aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ', empty'}`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}
