import type { Player } from '../types';

interface GameResultProps {
  winner: Player | null;
  isDraw: boolean;
}

export function GameResult({ winner, isDraw }: GameResultProps) {
  if (isDraw) {
    return <div className="game-result">Draw!</div>;
  }

  if (winner === 'X') {
    return <div className="game-result">You Win!</div>;
  }

  if (winner === 'O') {
    return <div className="game-result">You Lose!</div>;
  }

  return null;
}
