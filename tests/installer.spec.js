const { test, expect } = require('@playwright/test');

test.describe('M2 installer UX smoke', () => {
  test('renders template gallery cards', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Next: File types/i }).click();
    await page.getByRole('button', { name: /Next: Stack/i }).click();
    const firstCard = page.locator('#templateGallery .template-card').first();
    await expect(firstCard).toBeVisible();
  });

  test('AI assistant toggles chat window', async ({ page }) => {
    await page.goto('/');
    const assistantButton = page.getByRole('button', { name: /AI Assistant/i });
    await assistantButton.click();

    const chatWindow = page.locator('.ai-chat-window');
    await expect(chatWindow).toBeVisible();

    await page.locator('.ai-chat-window .close-chat').click();
    await expect(chatWindow).toBeHidden();
  });
});
