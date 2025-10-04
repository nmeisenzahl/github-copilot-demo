interface PlayAgainButtonProps {
  onPlayAgain: () => void;
}

export function PlayAgainButton({ onPlayAgain }: PlayAgainButtonProps) {
  return (
    <button
      type="button"
      className="play-again-button"
      onClick={onPlayAgain}
    >
      Play Again
    </button>
  );
}
