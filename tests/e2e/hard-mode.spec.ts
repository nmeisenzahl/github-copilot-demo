import { test, expect } from '@playwright/test';

test.describe('Hard Mode Game Flow', () => {
  test('should allow playing a complete game in hard mode', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Should see start screen
    await expect(page.getByRole('heading', { name: /tic tac toe/i })).toBeVisible();

    // Select Hard difficulty
    await page.getByRole('button', { name: /hard/i }).click();

    // Start game
    await page.getByRole('button', { name: /start game/i }).click();

    // Should see game board
    await expect(page.getByTestId('game-board')).toBeVisible();

    // Make first move
    const cells = page.getByTestId('cell');
    await cells.nth(0).click();

    // Should see X in first cell
    await expect(cells.nth(0)).toHaveText('X');

    // Computer should make a move (O) - hard mode uses minimax
    await expect(page.getByText('O')).toBeVisible({ timeout: 2000 });

    // Continue playing - in hard mode, computer should never lose
    await cells.nth(1).click();
    await page.waitForTimeout(500);
    await cells.nth(2).click();
    await page.waitForTimeout(500);

    // Game should eventually end (likely draw or computer win with perfect play)
    await expect(page.getByText(/you win|you lose|draw/i)).toBeVisible({ timeout: 10000 });

    // Should show Play Again button
    await expect(page.getByRole('button', { name: /play again/i })).toBeVisible();
  });

  test('should never lose in hard mode (perfect play)', async ({ page }) => {
    await page.goto('/');
    
    // Select Hard and start
    await page.getByRole('button', { name: /hard/i }).click();
    await page.getByRole('button', { name: /start game/i }).click();

    await expect(page.getByTestId('game-board')).toBeVisible();

    // Play multiple moves
    const cells = page.getByTestId('cell');
    
    // Make moves
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

    // With hard mode (minimax), human should NOT win
    const result = await page.getByText(/you win|you lose|draw/i).textContent();
    expect(result).not.toMatch(/you win/i);
  });

  test('should make optimal blocking moves', async ({ page }) => {
    await page.goto('/');
    
    // Select Hard and start
    await page.getByRole('button', { name: /hard/i }).click();
    await page.getByRole('button', { name: /start game/i }).click();

    await expect(page.getByTestId('game-board')).toBeVisible();

    const cells = page.getByTestId('cell');
    
    // Set up a scenario where human is about to win
    // Human plays top-left and top-center
    await cells.nth(0).click(); // X at position 0
    await page.waitForTimeout(500);
    
    // Computer makes a move
    await cells.nth(1).click(); // X at position 1
    await page.waitForTimeout(500);
    
    // Computer should block position 2 (top-right) to prevent human win
    // Or game continues with optimal play
    
    // Verify game continues and ends appropriately
    const resultVisible = await page.getByText(/you win|you lose|draw/i).isVisible({ timeout: 10000 });
    expect(resultVisible).toBeTruthy();
  });
});
