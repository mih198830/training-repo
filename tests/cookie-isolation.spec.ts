import { expect, test } from '@playwright/test';

test('accepted cookie banner is hidden inside the current test', async ({ page }, testInfo) => {
  console.log(`[${testInfo.title}] test body`);
  await test.step('Open the home page', async () => {
    await page.goto('/');
  });
  await test.step('Accept cookies and check the banner is hidden', async () => {
    await page.getByRole('button', { name: /^accept$/i }).click();
    await expect(page.getByRole('button', { name: /^accept$/i })).toBeHidden();
  });
});

test('a new test starts with a fresh cookie state', async ({ page }, testInfo) => {
  console.log(`[${testInfo.title}] test body`);
  await test.step('Open the home page', async () => {
    await page.goto('/');
  });
  await test.step('Check the fresh context shows the cookie banner', async () => {
    await expect(page.getByRole('button', { name: /^accept$/i })).toBeVisible();
  });
});

test('cookies do not leak between browser contexts', async ({ browser, context }, testInfo) => {
  console.log(`[${testInfo.title}] test body`);
  const cookie = {
    name: 'm5-context-cookie',
    value: 'first-context',
    url: 'https://demo-core-react.casino.p6m.tech',
  };
  const secondContext = await browser.newContext();

  try {
    await test.step('Set a cookie in the first context', async () => {
      await context.addCookies([cookie]);
      expect(await context.cookies(cookie.url)).toEqual([
          expect.objectContaining({name: cookie.name, value: 'first-context'}),
      ]);
    });

    await test.step('Check the second context has no cookies', async () => {
      expect(await secondContext.cookies(cookie.url)).toEqual([]);
    });

    await test.step('Set a different value in the second context and compare', async () => {
      await secondContext.addCookies([{ ...cookie, value: 'second-context' }]);
      expect(await secondContext.cookies(cookie.url)).toEqual([
        expect.objectContaining({ name: cookie.name, value: 'second-context' }),
      ]);
      expect(await context.cookies(cookie.url)).toEqual([
        expect.objectContaining({ name: cookie.name, value: 'first-context' }),
      ]);
    });
  } finally {
    await secondContext.close();
  }
});
