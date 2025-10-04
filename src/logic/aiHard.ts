import type { Board, Player } from '../types';
import { checkWinner, getAvailableMoves, makeMove } from './gameState';

export function getHardAIMove(board: Board, aiPlayer: Player): number {
  // Hard AI: Minimax algorithm for perfect play
  const opponent: Player = aiPlayer === 'X' ? 'O' : 'X';

  // Use minimax to find the best move
  const bestMove = minimax(board, aiPlayer, opponent, aiPlayer);
  return bestMove.position;
}

interface MinimaxResult {
  position: number;
  score: number;
}

function minimax(
  board: Board,
  currentPlayer: Player,
  opponent: Player,
  aiPlayer: Player,
  depth: number = 0
): MinimaxResult {
  const winner = checkWinner(board);

  // Terminal states
  if (winner === aiPlayer) {
    return { position: -1, score: 10 - depth }; // AI wins (prefer faster wins)
  }
  if (winner === opponent) {
    return { position: -1, score: depth - 10 }; // Opponent wins (prefer slower losses)
  }

  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) {
    return { position: -1, score: 0 }; // Draw
  }

  // If it's the AI's turn, maximize score
  const isMaximizing = currentPlayer === aiPlayer;

  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestPosition = availableMoves[0];

  for (const move of availableMoves) {
    // Make the move
    const newBoard = makeMove(board, move, currentPlayer);

    // Recursively evaluate
    const result = minimax(
      newBoard,
      currentPlayer === aiPlayer ? opponent : aiPlayer,
      opponent,
      aiPlayer,
      depth + 1
    );

    // Update best score and position
    if (isMaximizing) {
      if (result.score > bestScore) {
        bestScore = result.score;
        bestPosition = move;
      }
    } else {
      if (result.score < bestScore) {
        bestScore = result.score;
        bestPosition = move;
      }
    }
  }

  return { position: bestPosition, score: bestScore };
}
