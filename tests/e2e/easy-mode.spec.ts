import { test, expect } from '@playwright/test';

test.describe('Easy Mode Game Flow', () => {
  test('should allow playing a complete game in easy mode', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Should see start screen
    await expect(page.getByRole('heading', { name: /tic tac toe/i })).toBeVisible();

    // Select Easy difficulty
    await page.getByRole('button', { name: /easy/i }).click();

    // Start game
    await page.getByRole('button', { name: /start game/i }).click();

    // Should see game board
    await expect(page.getByTestId('game-board')).toBeVisible();

    // Make first move (human is X and always starts)
    const cells = page.getByTestId('cell');
    await cells.nth(0).click();

    // Should see X in first cell
    await expect(cells.nth(0)).toHaveText('X');

    // Computer should make a move (O)
    await expect(page.getByText('O')).toBeVisible({ timeout: 2000 });

    // Continue playing until game ends
    // Play strategically to win
    await cells.nth(1).click(); // X
    await page.waitForTimeout(500);
    await cells.nth(2).click(); // X wins (top row)

    // Should show game result
    await expect(page.getByText(/you win|you lose|draw/i)).toBeVisible();

    // Should show Play Again button
    await expect(page.getByRole('button', { name: /play again/i })).toBeVisible();
  });

  test('should handle computer win in easy mode', async ({ page }) => {
    await page.goto('/');
    
    // Select Easy and start
    await page.getByRole('button', { name: /easy/i }).click();
    await page.getByRole('button', { name: /start game/i }).click();

    // Wait for game board
    await expect(page.getByTestId('game-board')).toBeVisible();

    // Make moves that allow computer to potentially win
    const cells = page.getByTestId('cell');
    
    // Play a few moves
    await cells.nth(0).click();
    await page.waitForTimeout(500);
    await cells.nth(3).click();
    await page.waitForTimeout(500);
    await cells.nth(6).click();
    await page.waitForTimeout(500);

    // Eventually game should end
    await expect(page.getByText(/you win|you lose|draw/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: /play again/i })).toBeVisible();
  });

  test('should handle draw in easy mode', async ({ page }) => {
    await page.goto('/');
    
    // Select Easy and start
    await page.getByRole('button', { name: /easy/i }).click();
    await page.getByRole('button', { name: /start game/i }).click();

    await expect(page.getByTestId('game-board')).toBeVisible();

    // Continue playing until draw or win
    const cells = page.getByTestId('cell');
    
    // Make strategic moves for potential draw
    for (let i = 0; i < 9; i++) {
      const cell = cells.nth(i);
      const isEmpty = await cell.textContent().then(text => !text || text.trim() === '');
      
      if (isEmpty) {
        await cell.click();
        await page.waitForTimeout(500);
        
        // Check if game ended
        const resultVisible = await page.getByText(/you win|you lose|draw/i).isVisible().catch(() => false);
        if (resultVisible) {
          break;
        }
      }
    }

    // Game should have ended with some result
    await expect(page.getByText(/you win|you lose|draw/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /play again/i })).toBeVisible();
  });
});
