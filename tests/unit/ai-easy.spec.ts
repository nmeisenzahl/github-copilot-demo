import { describe, it, expect } from 'vitest';
import { getEasyAIMove } from '../../src/logic/aiEasy';
import type { Board } from '../../src/types';

describe('Easy AI - Random Move Selection', () => {
  it('should return a valid empty position', () => {
    const board: Board = ['X', null, 'O', null, 'X', null, null, null, 'O'];
    const move = getEasyAIMove(board);
    
    // Move should be a valid index
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThan(9);
    
    // Move should be in an empty cell
    expect(board[move]).toBeNull();
  });

  it('should select from available empty cells only', () => {
    const board: Board = ['X', 'O', 'X', 'O', null, 'X', 'O', null, 'X'];
    // Available positions: 4, 7
    
    const move = getEasyAIMove(board);
    expect([4, 7]).toContain(move);
  });

  it('should select the only remaining cell', () => {
    const board: Board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', null];
    // Only position 8 is available
    
    const move = getEasyAIMove(board);
    expect(move).toBe(8);
  });

  it('should work with mostly empty board', () => {
    const board: Board = ['X', null, null, null, null, null, null, null, null];
    const move = getEasyAIMove(board);
    
    // Should select one of positions 1-8
    expect(move).toBeGreaterThanOrEqual(1);
    expect(move).toBeLessThan(9);
    expect(board[move]).toBeNull();
  });

  it('should make random selections (not always same position)', () => {
    const board: Board = [null, null, null, null, null, null, null, null, null];
    
    // Run multiple times and collect moves
    const moves = new Set<number>();
    for (let i = 0; i < 20; i++) {
      const move = getEasyAIMove(board);
      moves.add(move);
    }
    
    // Should have selected different positions (randomness check)
    // With 20 tries on an empty board, we should get more than 1 unique position
    expect(moves.size).toBeGreaterThan(1);
  });

  it('should handle board with one empty cell', () => {
    const board: Board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', null, 'X'];
    const move = getEasyAIMove(board);
    expect(move).toBe(7);
  });

  it('should not select occupied cells', () => {
    const board: Board = ['X', 'O', null, 'X', null, 'O', null, null, 'X'];
    
    // Run multiple times and verify it never picks occupied cells
    for (let i = 0; i < 10; i++) {
      const move = getEasyAIMove(board);
      expect(board[move]).toBeNull();
      expect([2, 4, 6, 7]).toContain(move);
    }
  });
});
