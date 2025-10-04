import { useState, useEffect } from 'react';
import type { GameState, Difficulty } from './types';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { GameResult } from './components/GameResult';
import { PlayAgainButton } from './components/PlayAgainButton';
import {
  createEmptyBoard,
  checkWinner,
  checkDraw,
  makeMove,
} from './logic/gameState';
import { getEasyAIMove } from './logic/aiEasy';
import { getHardAIMove } from './logic/aiHard';
import './styles/App.css';

export function App() {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    status: 'start',
    difficulty: null,
  });

  const [isComputerThinking, setIsComputerThinking] = useState(false);

  const handleStartGame = (difficulty: Difficulty) => {
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      status: 'playing',
      difficulty,
    });
  };

  const handlePlayAgain = () => {
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      status: 'start',
      difficulty: null,
    });
  };

  const handleCellClick = (position: number) => {
    // Don't allow moves if game is over or computer is thinking
    if (
      gameState.status !== 'playing' ||
      gameState.winner ||
      gameState.isDraw ||
      isComputerThinking
    ) {
      return;
    }

    // Only human (X) can make moves via click
    if (gameState.currentPlayer !== 'X') {
      return;
    }

    // Make the move
    const newBoard = makeMove(gameState.board, position, 'X');
    if (newBoard === gameState.board) {
      return; // Invalid move
    }

    // Check for winner or draw
    const winner = checkWinner(newBoard);
    const isDraw = checkDraw(newBoard);

    if (winner || isDraw) {
      setGameState({
        ...gameState,
        board: newBoard,
        winner,
        isDraw,
        status: 'ended',
      });
      return;
    }

    // Switch to computer's turn
    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: 'O',
    });
  };

  // Computer's turn
  useEffect(() => {
    if (
      gameState.status === 'playing' &&
      gameState.currentPlayer === 'O' &&
      !gameState.winner &&
      !gameState.isDraw &&
      !isComputerThinking
    ) {
      setIsComputerThinking(true);

      // Add a small delay to make it feel more natural
      setTimeout(() => {
        const aiMove =
          gameState.difficulty === 'easy'
            ? getEasyAIMove(gameState.board)
            : getHardAIMove(gameState.board, 'O');

        const newBoard = makeMove(gameState.board, aiMove, 'O');

        // Check for winner or draw
        const winner = checkWinner(newBoard);
        const isDraw = checkDraw(newBoard);

        if (winner || isDraw) {
          setGameState({
            ...gameState,
            board: newBoard,
            winner,
            isDraw,
            status: 'ended',
          });
        } else {
          // Switch back to human's turn
          setGameState({
            ...gameState,
            board: newBoard,
            currentPlayer: 'X',
          });
        }

        setIsComputerThinking(false);
      }, 500);
    }
  }, [gameState, isComputerThinking]);

  return (
    <div className="app">
      {gameState.status === 'start' && (
        <StartScreen onStartGame={handleStartGame} />
      )}

      {gameState.status !== 'start' && (
        <div className="game-screen">
          <h1>Tic Tac Toe</h1>
          <div className="game-info">
            {gameState.status === 'playing' && (
              <p>
                {gameState.currentPlayer === 'X'
                  ? 'Your turn (X)'
                  : 'Computer thinking...'}
              </p>
            )}
            {gameState.status === 'ended' && (
              <GameResult winner={gameState.winner} isDraw={gameState.isDraw} />
            )}
          </div>
          <GameBoard
            board={gameState.board}
            onCellClick={handleCellClick}
            disabled={
              gameState.status === 'ended' ||
              gameState.currentPlayer === 'O' ||
              isComputerThinking
            }
          />
          {gameState.status === 'ended' && (
            <PlayAgainButton onPlayAgain={handlePlayAgain} />
          )}
        </div>
      )}
    </div>
  );
}
