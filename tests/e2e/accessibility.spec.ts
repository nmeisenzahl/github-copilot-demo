import { test, expect } from '@playwright/test';

test.describe('Accessibility - Keyboard Navigation', () => {
  test('should navigate start screen with keyboard', async ({ page }) => {
    await page.goto('/');

    // Tab to Easy button
    await page.keyboard.press('Tab');
    
    // Easy button should be focused
    const easyButton = page.getByRole('button', { name: /easy/i });
    await expect(easyButton).toBeFocused();

    // Press Space or Enter to select
    await page.keyboard.press('Enter');

    // Tab to Hard button
    await page.keyboard.press('Tab');
    const hardButton = page.getByRole('button', { name: /hard/i });
    await expect(hardButton).toBeFocused();

    // Tab to Start button
    await page.keyboard.press('Tab');
    const startButton = page.getByRole('button', { name: /start game/i });
    await expect(startButton).toBeFocused();

    // Press Enter to start game
    await page.keyboard.press('Enter');

    // Should see game board
    await expect(page.getByTestId('game-board')).toBeVisible();
  });

  test('should play game using keyboard only', async ({ page }) => {
    await page.goto('/');

    // Navigate to Easy mode and start with keyboard
    await page.keyboard.press('Tab'); // Easy
    await page.keyboard.press('Enter'); // Select Easy
    await page.keyboard.press('Tab'); // Hard
    await page.keyboard.press('Tab'); // Start
    await page.keyboard.press('Enter'); // Start game

    await expect(page.getByTestId('game-board')).toBeVisible();

    // Tab to first cell and press Enter to make move
    const cells = page.getByTestId('cell');
    
    // First cell should be focusable and clickable via Enter
    await page.keyboard.press('Tab');
    await expect(cells.nth(0)).toBeFocused();
    await page.keyboard.press('Enter');
    
    // Should see X in first cell
    await expect(cells.nth(0)).toHaveText('X');

    // Computer makes a move
    await page.waitForTimeout(1000);

    // Continue tabbing through cells
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Game should continue normally
    await expect(page.getByText('O')).toBeVisible();
  });

  test('should navigate Play Again with keyboard', async ({ page }) => {
    await page.goto('/');

    // Start game with keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('game-board')).toBeVisible();

    // Make moves until game ends
    const cells = page.getByTestId('cell');
    await cells.nth(0).click();
    await page.waitForTimeout(500);
    await cells.nth(1).click();
    await page.waitForTimeout(500);
    await cells.nth(2).click();
    await page.waitForTimeout(500);

    // Wait for game to end
    await expect(page.getByText(/you win|you lose|draw/i)).toBeVisible({ timeout: 5000 });

    // Tab to Play Again button
    let tabCount = 0;
    while (tabCount < 15) { // Safety limit
      await page.keyboard.press('Tab');
      const playAgainButton = page.getByRole('button', { name: /play again/i });
      const isFocused = await playAgainButton.evaluate((el) => el === document.activeElement);
      
      if (isFocused) {
        await page.keyboard.press('Enter');
        break;
      }
      tabCount++;
    }

    // Should be back at start screen
    await expect(page.getByRole('heading', { name: /tic tac toe/i })).toBeVisible();
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/');

    // Tab through elements and verify they receive focus
    const focusableElements = [
      page.getByRole('button', { name: /easy/i }),
      page.getByRole('button', { name: /hard/i }),
      page.getByRole('button', { name: /start game/i }),
    ];

    for (const element of focusableElements) {
      await page.keyboard.press('Tab');
      await expect(element).toBeFocused();
      
      // Verify element is visible (focus indicator requirement)
      await expect(element).toBeVisible();
    }
  });

  test('should prevent moves after game ends via keyboard', async ({ page }) => {
    await page.goto('/');

    // Start game
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('game-board')).toBeVisible();

    const cells = page.getByTestId('cell');
    
    // Play until game ends
    await cells.nth(0).click();
    await page.waitForTimeout(500);
    await cells.nth(1).click();
    await page.waitForTimeout(500);
    await cells.nth(2).click();
    await page.waitForTimeout(500);

    await expect(page.getByText(/you win|you lose|draw/i)).toBeVisible({ timeout: 5000 });

    // Try to make another move via keyboard
    const cellCountBefore = await cells.nth(3).textContent();
    
    // Focus and try to click an empty cell
    await cells.nth(3).focus();
    await page.keyboard.press('Enter');
    
    // Cell should remain unchanged
    const cellCountAfter = await cells.nth(3).textContent();
    expect(cellCountBefore).toBe(cellCountAfter);
  });
});
