import { test, expect } from '@playwright/test';

test.describe('Play Again Flow', () => {
  test('should return to start screen and reset game state', async ({ page }) => {
    await page.goto('/');

    // Start a game in Easy mode
    await page.getByRole('button', { name: /easy/i }).click();
    await page.getByRole('button', { name: /start game/i }).click();

    // Wait for game board
    await expect(page.getByTestId('game-board')).toBeVisible();

    // Make some moves to get to game end
    const cells = page.getByTestId('cell');
    await cells.nth(0).click();
    await page.waitForTimeout(500);
    await cells.nth(1).click();
    await page.waitForTimeout(500);
    await cells.nth(2).click();
    await page.waitForTimeout(500);

    // Wait for game to end
    await expect(page.getByText(/you win|you lose|draw/i)).toBeVisible({ timeout: 5000 });

    // Click Play Again
    await page.getByRole('button', { name: /play again/i }).click();

    // Should be back at start screen
    await expect(page.getByRole('heading', { name: /tic tac toe/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /easy/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /hard/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /start game/i })).toBeVisible();

    // Game board should not be visible
    await expect(page.getByTestId('game-board')).not.toBeVisible();
  });

  test('should allow selecting different difficulty after Play Again', async ({ page }) => {
    await page.goto('/');

    // Start a game in Easy mode
    await page.getByRole('button', { name: /easy/i }).click();
    await page.getByRole('button', { name: /start game/i }).click();

    await expect(page.getByTestId('game-board')).toBeVisible();

    // Play until game ends
    const cells = page.getByTestId('cell');
    for (let i = 0; i < 9; i++) {
      const cell = cells.nth(i);
      const isEmpty = await cell.textContent().then(text => !text || text.trim() === '');
      
      if (isEmpty) {
        await cell.click();
        await page.waitForTimeout(500);
        
        const resultVisible = await page.getByText(/you win|you lose|draw/i).isVisible().catch(() => false);
        if (resultVisible) {
          break;
        }
      }
    }

    // Click Play Again
    await page.getByRole('button', { name: /play again/i }).click();

    // Now select Hard mode instead
    await page.getByRole('button', { name: /hard/i }).click();
    await page.getByRole('button', { name: /start game/i }).click();

    // Should have a new game in hard mode
    await expect(page.getByTestId('game-board')).toBeVisible();

    // Make a move and verify game works
    await cells.nth(4).click(); // Center cell
    await expect(cells.nth(4)).toHaveText('X');

    // Computer should make a move
    await expect(page.getByText('O')).toBeVisible({ timeout: 2000 });
  });

  test('should completely reset board state', async ({ page }) => {
    await page.goto('/');

    // Start a game
    await page.getByRole('button', { name: /easy/i }).click();
    await page.getByRole('button', { name: /start game/i }).click();

    await expect(page.getByTestId('game-board')).toBeVisible();

    // Make moves in specific cells
    const cells = page.getByTestId('cell');
    await cells.nth(0).click(); // X
    await page.waitForTimeout(500);
    await cells.nth(4).click(); // X
    await page.waitForTimeout(500);
    await cells.nth(8).click(); // X
    await page.waitForTimeout(500);

    // Remember the board state has X's in positions 0, 4, 8
    const firstGameMoves = ['0', '4', '8'];
    for (const pos of firstGameMoves) {
      const cell = cells.nth(parseInt(pos));
      const hasX = await cell.textContent().then(text => text?.includes('X'));
      if (hasX) {
        // Cell has X as expected
      }
    }

    // Wait for game to end
    await expect(page.getByText(/you win|you lose|draw/i)).toBeVisible({ timeout: 5000 });

    // Click Play Again
    await page.getByRole('button', { name: /play again/i }).click();

    // Start new game
    await page.getByRole('button', { name: /easy/i }).click();
    await page.getByRole('button', { name: /start game/i }).click();

    // Board should be empty
    for (let i = 0; i < 9; i++) {
      const cell = cells.nth(i);
      const isEmpty = await cell.textContent().then(text => !text || text.trim() === '');
      expect(isEmpty).toBeTruthy();
    }

    // Make a move to verify new game works
    await cells.nth(5).click();
    await expect(cells.nth(5)).toHaveText('X');
  });
});
