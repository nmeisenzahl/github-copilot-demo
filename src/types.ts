export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];
export type Difficulty = 'easy' | 'hard';
export type GameStatus = 'start' | 'playing' | 'ended';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  status: GameStatus;
  difficulty: Difficulty | null;
}
