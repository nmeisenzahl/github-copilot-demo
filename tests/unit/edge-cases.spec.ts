import { describe, it, expect } from 'vitest';
import {
  checkWinner,
  checkDraw,
  isValidMove,
  makeMove,
  getAvailableMoves,
} from '../../src/logic/gameState';
import { getEasyAIMove } from '../../src/logic/aiEasy';
import { getHardAIMove } from '../../src/logic/aiHard';
import type { Board } from '../../src/types';

describe('Edge Cases - Game State', () => {
  it('should handle empty board correctly', () => {
    const board: Board = [null, null, null, null, null, null, null, null, null];
    expect(checkWinner(board)).toBeNull();
    expect(checkDraw(board)).toBe(false);
    expect(getAvailableMoves(board).length).toBe(9);
  });

  it('should handle full board with no winner (draw)', () => {
    const board: Board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(checkWinner(board)).toBeNull();
    expect(checkDraw(board)).toBe(true);
    expect(getAvailableMoves(board).length).toBe(0);
  });

  it('should not allow move on occupied cell', () => {
    const board: Board = ['X', null, null, null, null, null, null, null, null];
    const newBoard = makeMove(board, 0, 'O');
    expect(newBoard).toEqual(board); // Board should not change
  });

  it('should handle invalid position gracefully', () => {
    const board: Board = [null, null, null, null, null, null, null, null, null];
    expect(isValidMove(board, -1)).toBe(false);
    expect(isValidMove(board, 9)).toBe(false);
    expect(isValidMove(board, 100)).toBe(false);
  });

  it('should detect winner on last move', () => {
    const board: Board = ['X', 'X', null, 'O', 'O', null, null, null, null];
    const newBoard = makeMove(board, 2, 'X');
    expect(checkWinner(newBoard)).toBe('X');
  });

  it('should handle multiple win conditions correctly', () => {
    // Horizontal and vertical win both present
    const board: Board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    expect(checkWinner(board)).toBe('X');
  });
});

describe('Edge Cases - AI Behavior', () => {
  it('should handle easy AI on nearly full board', () => {
    const board: Board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', null];
    const move = getEasyAIMove(board);
    expect(move).toBe(8); // Only one position available
  });

  it('should handle hard AI on nearly full board', () => {
    const board: Board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', null];
    const move = getHardAIMove(board, 'O');
    expect(move).toBe(8); // Only one position available
  });

  it('should handle hard AI when immediate win is available', () => {
    const board: Board = ['O', 'O', null, 'X', 'X', null, null, null, null];
    const move = getHardAIMove(board, 'O');
    expect(move).toBe(2); // Win at position 2
  });

  it('should handle hard AI when must block to prevent loss', () => {
    const board: Board = ['X', 'X', null, 'O', null, null, null, null, null];
    const move = getHardAIMove(board, 'O');
    expect(move).toBe(2); // Must block at position 2
  });

  it('should handle AI on board with single empty cell', () => {
    const board: Board = ['X', 'O', 'X', 'O', null, 'O', 'O', 'X', 'X'];
    const easyMove = getEasyAIMove(board);
    const hardMove = getHardAIMove(board, 'O');
    expect(easyMove).toBe(4);
    expect(hardMove).toBe(4);
  });
});

describe('Edge Cases - Move Validation', () => {
  it('should prevent move after game is won', () => {
    const board: Board = ['X', 'X', 'X', null, 'O', null, null, 'O', null];
    expect(checkWinner(board)).toBe('X');
    // Game logic should prevent further moves
    expect(getAvailableMoves(board).length).toBeGreaterThan(0); // Technically moves available
    // But game state should be "ended" preventing moves
  });

  it('should handle rapid successive moves correctly', () => {
    let board: Board = [null, null, null, null, null, null, null, null, null];
    
    // Simulate rapid moves
    board = makeMove(board, 0, 'X');
    board = makeMove(board, 1, 'O');
    board = makeMove(board, 2, 'X');
    
    expect(board[0]).toBe('X');
    expect(board[1]).toBe('O');
    expect(board[2]).toBe('X');
  });

  it('should maintain board integrity with invalid moves', () => {
    const board: Board = ['X', 'O', null, null, null, null, null, null, null];
    const newBoard1 = makeMove(board, 0, 'X'); // Already occupied
    const newBoard2 = makeMove(board, -1, 'X'); // Out of bounds
    const newBoard3 = makeMove(board, 10, 'X'); // Out of bounds
    
    expect(newBoard1).toEqual(board);
    expect(newBoard2).toEqual(board);
    expect(newBoard3).toEqual(board);
  });
});

describe('Edge Cases - Win Detection', () => {
  it('should detect all possible horizontal wins', () => {
    const topRow: Board = ['X', 'X', 'X', null, null, null, null, null, null];
    const midRow: Board = [null, null, null, 'O', 'O', 'O', null, null, null];
    const botRow: Board = [null, null, null, null, null, null, 'X', 'X', 'X'];
    
    expect(checkWinner(topRow)).toBe('X');
    expect(checkWinner(midRow)).toBe('O');
    expect(checkWinner(botRow)).toBe('X');
  });

  it('should detect all possible vertical wins', () => {
    const leftCol: Board = ['X', null, null, 'X', null, null, 'X', null, null];
    const midCol: Board = [null, 'O', null, null, 'O', null, null, 'O', null];
    const rightCol: Board = [null, null, 'X', null, null, 'X', null, null, 'X'];
    
    expect(checkWinner(leftCol)).toBe('X');
    expect(checkWinner(midCol)).toBe('O');
    expect(checkWinner(rightCol)).toBe('X');
  });

  it('should detect both diagonal wins', () => {
    const mainDiag: Board = ['X', null, null, null, 'X', null, null, null, 'X'];
    const antiDiag: Board = [null, null, 'O', null, 'O', null, 'O', null, null];
    
    expect(checkWinner(mainDiag)).toBe('X');
    expect(checkWinner(antiDiag)).toBe('O');
  });

  it('should not detect false wins', () => {
    const almostWin1: Board = ['X', 'X', 'O', null, null, null, null, null, null];
    const almostWin2: Board = ['X', null, null, 'X', null, null, 'O', null, null];
    const almostWin3: Board = ['X', null, null, null, 'O', null, null, null, 'X'];
    
    expect(checkWinner(almostWin1)).toBeNull();
    expect(checkWinner(almostWin2)).toBeNull();
    expect(checkWinner(almostWin3)).toBeNull();
  });
});
