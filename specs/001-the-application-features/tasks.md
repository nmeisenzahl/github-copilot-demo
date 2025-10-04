// filepath: /Users/nico/Projects/talks/github-copilot-demo/specs/001-the-application-features/tasks.md
# Tasks: Classic Tic Tac Toe Game

**Input**: Design documents from `/specs/001-the-application-features/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, game logic
   → Integration: N/A (client-only)
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All entities have models?
   → All user stories have tests?
   → All requirements implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Setup
- [ ] T001 Create project structure in `src/` and `tests/` per plan.md
- [ ] T002 Initialize React project with minimal dependencies in `src/`
- [ ] T003 [P] Configure ESLint and Prettier for code quality

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] E2E test: Easy mode game flow in `tests/e2e/easy-mode.spec.ts`
- [ ] T005 [P] E2E test: Hard mode game flow in `tests/e2e/hard-mode.spec.ts`
- [ ] T006 [P] E2E test: Play Again flow in `tests/e2e/play-again.spec.ts`
- [ ] T007 [P] E2E test: Accessibility (keyboard navigation) in `tests/e2e/accessibility.spec.ts`
- [ ] T008 [P] Unit test: Game board win/draw logic in `tests/unit/game-board.spec.ts`
- [ ] T009 [P] Unit test: Easy AI (random move) in `tests/unit/ai-easy.spec.ts`
- [ ] T010 [P] Unit test: Hard AI (minimax) in `tests/unit/ai-hard.spec.ts`

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T011 [P] Implement GameBoard component in `src/components/GameBoard.tsx`
- [ ] T012 [P] Implement Player selection/start screen in `src/components/StartScreen.tsx`
- [ ] T013 [P] Implement Easy AI logic in `src/logic/aiEasy.ts`
- [ ] T014 [P] Implement Hard AI logic (minimax) in `src/logic/aiHard.ts`
- [ ] T015 [P] Implement game state management in `src/logic/gameState.ts`
- [ ] T016 [P] Implement Play Again/reset flow in `src/components/PlayAgainButton.tsx`
- [ ] T017 [P] Implement accessibility features (keyboard navigation) in all components

## Phase 3.4: Polish
- [ ] T018 [P] Add unit tests for edge cases in `tests/unit/edge-cases.spec.ts`
- [ ] T019 [P] Add visual polish and styles in `src/styles/`
- [ ] T020 [P] Update documentation and quickstart in `specs/001-the-application-features/quickstart.md`
- [ ] T021 [P] Manual test: Supported browsers (Chrome, Firefox, Safari, Edge)

## Dependencies
- Tests (T004-T010) before implementation (T011-T017)
- T011-T017 can be parallel if different files, otherwise sequential
- Polish (T018-T021) after core implementation

## Parallel Example
```
# Launch T004-T010 together:
Task: "E2E test: Easy mode game flow in tests/e2e/easy-mode.spec.ts"
Task: "E2E test: Hard mode game flow in tests/e2e/hard-mode.spec.ts"
Task: "E2E test: Play Again flow in tests/e2e/play-again.spec.ts"
Task: "E2E test: Accessibility in tests/e2e/accessibility.spec.ts"
Task: "Unit test: Game board win/draw logic in tests/unit/game-board.spec.ts"
Task: "Unit test: Easy AI in tests/unit/ai-easy.spec.ts"
Task: "Unit test: Hard AI in tests/unit/ai-hard.spec.ts"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Validation Checklist
- [ ] All entities have model tasks
- [ ] All user stories have test coverage
- [ ] All requirements are implemented
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task