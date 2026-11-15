import { expect, test } from '@playwright/test';

test('the Games page opens', async ({ page }, testInfo) => {
  console.log(`[${testInfo.title}] test body`);
  await test.step('Open Games and check the page details', async () => {
    await page.goto('/games');
    await expect(page).toHaveURL(/\/games\/?$/);
    await expect(page).toHaveTitle(/All Games/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lobby');
  });

  await test.step('Reload Games and check the heading', async () => {
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lobby');
  });
});
