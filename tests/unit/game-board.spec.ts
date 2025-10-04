import { describe, it, expect } from 'vitest';

// Types for the game logic we'll implement
type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[];

// These functions will be implemented in src/logic/gameState.ts
declare function checkWinner(board: Board): Player | null;
declare function checkDraw(board: Board): boolean;
declare function isValidMove(board: Board, position: number): boolean;

describe('Game Board Logic - Win Detection', () => {
  it('should detect horizontal win - top row', () => {
    const board: Board = ['X', 'X', 'X', null, 'O', null, null, 'O', null];
    const winner = checkWinner(board);
    expect(winner).toBe('X');
  });

  it('should detect horizontal win - middle row', () => {
    const board: Board = ['O', null, null, 'X', 'X', 'X', 'O', null, 'O'];
    const winner = checkWinner(board);
    expect(winner).toBe('X');
  });

  it('should detect horizontal win - bottom row', () => {
    const board: Board = ['X', 'O', null, null, 'X', 'O', 'O', 'O', 'O'];
    const winner = checkWinner(board);
    expect(winner).toBe('O');
  });

  it('should detect vertical win - left column', () => {
    const board: Board = ['X', 'O', 'O', 'X', null, null, 'X', null, 'O'];
    const winner = checkWinner(board);
    expect(winner).toBe('X');
  });

  it('should detect vertical win - middle column', () => {
    const board: Board = ['O', 'X', null, null, 'X', 'O', 'O', 'X', null];
    const winner = checkWinner(board);
    expect(winner).toBe('X');
  });

  it('should detect vertical win - right column', () => {
    const board: Board = ['X', 'O', 'O', null, 'X', 'O', null, 'X', 'O'];
    const winner = checkWinner(board);
    expect(winner).toBe('O');
  });

  it('should detect diagonal win - top-left to bottom-right', () => {
    const board: Board = ['X', 'O', 'O', null, 'X', 'O', null, null, 'X'];
    const winner = checkWinner(board);
    expect(winner).toBe('X');
  });

  it('should detect diagonal win - top-right to bottom-left', () => {
    const board: Board = ['X', 'O', 'O', 'X', 'O', null, 'O', null, 'X'];
    const winner = checkWinner(board);
    expect(winner).toBe('O');
  });

  it('should return null when no winner', () => {
    const board: Board = ['X', 'O', 'X', 'O', 'X', null, null, null, null];
    const winner = checkWinner(board);
    expect(winner).toBeNull();
  });

  it('should return null for empty board', () => {
    const board: Board = [null, null, null, null, null, null, null, null, null];
    const winner = checkWinner(board);
    expect(winner).toBeNull();
  });
});

describe('Game Board Logic - Draw Detection', () => {
  it('should detect draw when board is full with no winner', () => {
    const board: Board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    const isDraw = checkDraw(board);
    expect(isDraw).toBe(true);
  });

  it('should not detect draw when board has empty cells', () => {
    const board: Board = ['X', 'O', 'X', 'X', 'O', null, null, null, null];
    const isDraw = checkDraw(board);
    expect(isDraw).toBe(false);
  });

  it('should not detect draw when there is a winner', () => {
    const board: Board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    const isDraw = checkDraw(board);
    expect(isDraw).toBe(false);
  });

  it('should not detect draw on empty board', () => {
    const board: Board = [null, null, null, null, null, null, null, null, null];
    const isDraw = checkDraw(board);
    expect(isDraw).toBe(false);
  });
});

describe('Game Board Logic - Valid Move', () => {
  it('should allow move in empty cell', () => {
    const board: Board = ['X', null, 'O', null, null, null, null, null, null];
    expect(isValidMove(board, 1)).toBe(true);
    expect(isValidMove(board, 3)).toBe(true);
    expect(isValidMove(board, 8)).toBe(true);
  });

  it('should not allow move in occupied cell', () => {
    const board: Board = ['X', 'O', 'X', null, null, null, null, null, null];
    expect(isValidMove(board, 0)).toBe(false);
    expect(isValidMove(board, 1)).toBe(false);
    expect(isValidMove(board, 2)).toBe(false);
  });

  it('should not allow move outside board bounds', () => {
    const board: Board = [null, null, null, null, null, null, null, null, null];
    expect(isValidMove(board, -1)).toBe(false);
    expect(isValidMove(board, 9)).toBe(false);
    expect(isValidMove(board, 10)).toBe(false);
  });
});
