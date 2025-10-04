# Classic Tic Tac Toe Game

A modern, accessible Tic Tac Toe game built with React and TypeScript, featuring two difficulty levels and comprehensive testing.

## Features

- 🎮 **Two Difficulty Modes**
  - **Easy**: Computer makes random valid moves
  - **Hard**: Computer uses minimax algorithm for perfect play (never loses)

- ♿ **Fully Accessible**
  - Keyboard navigation support
  - ARIA labels for screen readers
  - Focus indicators for keyboard users

- ✨ **Modern UI**
  - Clean, responsive design
  - Smooth animations
  - Works on desktop and mobile browsers

- 🧪 **Comprehensive Testing**
  - Unit tests for game logic (36 tests)
  - E2E tests with Playwright
  - Edge case coverage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Testing

### Unit Tests

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch
```

### E2E Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui
```

## Code Quality

### Linting

```bash
# Run ESLint
npm run lint
```

### Formatting

```bash
# Format code with Prettier
npm run format
```

## Project Structure

```
src/
├── components/       # React components
│   ├── StartScreen.tsx
│   ├── GameBoard.tsx
│   ├── GameResult.tsx
│   └── PlayAgainButton.tsx
├── logic/           # Game logic
│   ├── gameState.ts    # Core game state management
│   ├── aiEasy.ts       # Easy AI (random moves)
│   └── aiHard.ts       # Hard AI (minimax algorithm)
├── styles/          # CSS styles
├── types.ts         # TypeScript type definitions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point

tests/
├── e2e/             # Playwright E2E tests
└── unit/            # Vitest unit tests
```

## Game Logic

### AI Implementation

#### Easy Mode
- Selects a random empty cell
- Provides casual gameplay

#### Hard Mode
- Uses minimax algorithm for optimal play
- Evaluates all possible game states
- Never loses when playing optimally
- Will always win or draw

### Win Detection
- Checks all 8 possible winning combinations:
  - 3 horizontal rows
  - 3 vertical columns
  - 2 diagonals

## Browser Support

Tested and supported on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Architecture Decisions

### Technology Stack
- **React 18**: For UI components and state management
- **TypeScript**: For type safety and better developer experience
- **Vite**: For fast development and optimized builds
- **Vitest**: For unit testing
- **Playwright**: For E2E testing

### Design Principles
1. **Simplicity**: Minimal dependencies, focused scope
2. **Accessibility**: Keyboard navigation and ARIA support
3. **Test-Driven Development**: Tests written before implementation
4. **Code Quality**: ESLint and Prettier for consistency

## Development

This project follows Test-Driven Development (TDD):
1. Tests are written first
2. Implementation follows to make tests pass
3. Code is refactored while keeping tests green

## Contributing

This is a proof-of-concept project. Contributions are welcome for:
- Bug fixes
- Test improvements
- Accessibility enhancements
- Code quality improvements

## License

ISC

## Acknowledgments

Built following software engineering best practices and principles outlined in the project specification.
