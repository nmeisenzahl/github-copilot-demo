import type { Board } from '../types';
import { getAvailableMoves } from './gameState';

export function getEasyAIMove(board: Board): number {
  // Easy AI: Random move from available positions
  const availableMoves = getAvailableMoves(board);

  if (availableMoves.length === 0) {
    throw new Error('No available moves');
  }

  // Select a random move
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}
