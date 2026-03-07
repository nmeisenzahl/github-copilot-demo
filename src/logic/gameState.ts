import type { Board, Player } from '../types';

export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}

export function checkWinner(board: Board): Player | null {
  // Win patterns: rows, columns, diagonals
  const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }

  return null;
}

export function checkDraw(board: Board): boolean {
  // It's a draw if board is full and there's no winner
  const isFull = board.every((cell) => cell !== null);
  const winner = checkWinner(board);
  return isFull && !winner;
}

export function isValidMove(board: Board, position: number): boolean {
  // Valid if position is in range and cell is empty
  return position >= 0 && position < 9 && board[position] === null;
}

export function makeMove(board: Board, position: number, player: Player): Board {
  if (!isValidMove(board, position)) {
    return board;
  }
  const newBoard = [...board];
  newBoard[position] = player;
  return newBoard;
}

export function getAvailableMoves(board: Board): number[] {
  return board.reduce<number[]>((moves, cell, index) => {
    if (cell === null) {
      moves.push(index);
    }
    return moves;
  }, []);
}
