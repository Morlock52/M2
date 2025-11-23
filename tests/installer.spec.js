const { test, expect } = require('@playwright/test');
const fs = require('fs');

test.describe('M2 installer UX smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
  });

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

  test('user variables can be saved and inserted', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Next: File types/i }).click();
    await page.getByRole('button', { name: /Next: Stack/i }).click();
    await page.getByRole('button', { name: /Next: Access/i }).click();
    await page.getByRole('button', { name: /Next: \.env/i }).click();

    await page.getByRole('button', { name: /Add variable/i }).click();
    await page.locator('#userVarLabel').fill('Cloudflare token');
    await page.locator('#userVarKey').fill('CF_API_TOKEN');
    await page.locator('#userVarValue').fill('super-secret');
    await page.locator('#userVarCompose').check();
    await page.getByRole('button', { name: /Save variable/i }).click();

    const card = page.locator('.user-var-card').first();
    await expect(card).toContainText('CF_API_TOKEN');

    const savedOptionValue = await page
      .locator('#userVarSelect option')
      .nth(1)
      .getAttribute('value');
    await page.selectOption('#userVarSelect', savedOptionValue);
    await page.locator('#applyUserVar').click();

    await expect(page.locator('#envPreview')).toContainText('CF_API_TOKEN=super-secret');
    await expect(page.locator('#composePreview')).toContainText('x-user-vars');
    await expect(page.locator('#composePreview')).toContainText('CF_API_TOKEN');
  });

  test('variable runbook markdown includes service headings', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Next: File types/i }).click();
    await page.getByRole('button', { name: /Next: Stack/i }).click();
    await page.getByRole('button', { name: /Next: Access/i }).click();
    await page.getByRole('button', { name: /Next: \.env/i }).click();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /Download variable runbook/ }).click()
    ]);

    const filePath = await download.path();
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('## Per-service variables');
    // Jellyfin is selected by default and its label is used as a heading
    expect(content).toContain('### Jellyfin media server');
  });
});
