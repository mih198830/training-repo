import { expect, test } from '@playwright/test';

test('user can open the Card Games category', async ({ page }, testInfo) => {
  console.log(`[${testInfo.title}] test body`);
  await test.step('Open Games', async () => {
    await page.goto('/games');
  });
  await test.step('Select Card Games and check the category URL', async () => {
    const cardCategory = page.getByRole('main').getByRole('link', { name: /^Card Games/ });
    await expect(cardCategory).toHaveAttribute('href', '/games/card');
    await cardCategory.click();
    await expect(page).toHaveURL(/\/games\/card$/);
  });

  await test.step('Return to Games', async () => {
    await page.goBack();
    await expect(page).toHaveURL(/\/games\/?$/);
  });
});
