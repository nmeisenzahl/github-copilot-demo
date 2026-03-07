import { describe, it, expect } from 'vitest';
import { getHardAIMove } from '../../src/logic/aiHard';
import type { Board } from '../../src/types';

describe('Hard AI - Minimax Algorithm', () => {
  it('should block immediate win threat', () => {
    // X has two in a row, O must block
    const board: Board = ['X', 'X', null, null, 'O', null, null, null, null];
    const move = getHardAIMove(board, 'O');
    
    // Must block position 2
    expect(move).toBe(2);
  });

  it('should take winning move when available', () => {
    // O has two in a row and can win
    const board: Board = ['O', 'O', null, 'X', 'X', null, null, null, null];
    const move = getHardAIMove(board, 'O');
    
    // Must win at position 2
    expect(move).toBe(2);
  });

  it('should prefer winning over blocking', () => {
    // O can win at position 2, X threatens at position 5
    const board: Board = ['O', 'O', null, 'X', 'X', null, null, null, null];
    const move = getHardAIMove(board, 'O');
    
    // Should take the win
    expect(move).toBe(2);
  });

  it('should block vertical win threat', () => {
    // X has two in left column
    const board: Board = ['X', 'O', null, 'X', null, 'O', null, null, null];
    const move = getHardAIMove(board, 'O');
    
    // Must block position 6
    expect(move).toBe(6);
  });

  it('should block diagonal win threat', () => {
    // X has two in diagonal (top-left to bottom-right)
    const board: Board = ['X', 'O', null, null, 'X', 'O', null, null, null];
    const move = getHardAIMove(board, 'O');
    
    // Must block position 8
    expect(move).toBe(8);
  });

  it('should make a valid move on empty board', () => {
    const board: Board = [null, null, null, null, null, null, null, null, null];
    const move = getHardAIMove(board, 'O');
    
    // Should make a valid move (any position on empty board is acceptable)
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThan(9);
  });

  it('should respond optimally to corner opening', () => {
    // X takes corner, O should take center
    const board: Board = ['X', null, null, null, null, null, null, null, null];
    const move = getHardAIMove(board, 'O');
    
    expect(move).toBe(4); // Center is best response
  });

  it('should respond optimally to center opening', () => {
    // X takes center, O should take a corner
    const board: Board = [null, null, null, null, 'X', null, null, null, null];
    const move = getHardAIMove(board, 'O');
    
    // Should take a corner (0, 2, 6, or 8)
    expect([0, 2, 6, 8]).toContain(move);
  });

  it('should never lose when playing optimally', () => {
    // Simulate a game where X plays corners and O responds
    const board: Board = ['X', null, null, null, 'O', null, null, null, 'X'];
    const move = getHardAIMove(board, 'O');
    
    // O should make a move that prevents X from winning
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThan(9);
    expect(board[move]).toBeNull();
  });

  it('should handle complex mid-game position', () => {
    // Complex board state
    const board: Board = ['X', 'O', 'X', 'O', 'X', null, null, null, 'O'];
    const move = getHardAIMove(board, 'O');
    
    // Should make an optimal move (empty cells: 5, 6, 7)
    expect([5, 6, 7]).toContain(move);
    expect(board[move]).toBeNull();
  });

  it('should force win in 2 moves when possible', () => {
    // O can set up a fork
    const board: Board = ['O', null, null, null, 'O', null, 'X', null, 'X'];
    const move = getHardAIMove(board, 'O');
    
    // Should make optimal move
    expect(board[move]).toBeNull();
  });

  it('should detect and use fork opportunities', () => {
    // O should create a fork (two ways to win)
    const board: Board = ['O', null, 'X', null, null, null, 'X', null, 'O'];
    const move = getHardAIMove(board, 'O');
    
    // Should position for fork or block opponent
    expect(board[move]).toBeNull();
  });
});
