import { expect, test } from '@playwright/test';

test.describe('Basic API', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`[${testInfo.title}] beforeEach`);
    await test.step('Prepare Games for the search example', async () => {
      await page.goto('/games');
      await page.getByRole('button', { name: /^accept$/i }).click();
    });
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`[${testInfo.title}] afterEach: ${testInfo.status}`);
  });

  test('the games search input accepts and clears text', async ({ page }, testInfo) => {
    console.log(`[${testInfo.title}] test body`);
    const searchButton = page.getByRole('button', { name: 'Search', exact: true });
    const searchInput = page.getByPlaceholder('Games, providers and categories');
    await test.step('Open the game search', async () => {
      await expect(searchButton).toBeEnabled();
      await searchButton.click();
      await expect(searchInput).toBeVisible();
    });
    await test.step('Enter and edit the search text', async () => {
      await searchInput.fill('Blackjack!');
      await expect(searchInput).toHaveValue('Blackjack!');

      await searchInput.press('Backspace');
      await expect(searchInput).toHaveValue('Blackjack');
    });
    await test.step('Clear the search input', async () => {
      await searchInput.clear();
      await expect(searchInput).toHaveValue('');
    });
  });
});

test.describe('Network', () => {
  test('page.request sends a direct API request', async ({ page }, testInfo) => {
    console.log(`[${testInfo.title}] test body`);
    await test.step('Request providers and check the API response', async () => {
      const response = await page.request.get('/api/games/providers?device=desktop');
      await expect(response).toBeOK();
      expect(await response.json()).toEqual(expect.any(Array));
    });
  });

  test('route.continue lets a browser request reach the server', async ({ page }, testInfo) => {
    console.log(`[${testInfo.title}] test body`);
    await test.step('Register a route that allows provider requests', async () => {
      await page.route('**/api/games/providers**', async (route) => {
        console.log(`[network] continue ${route.request().method()}`);
        await route.continue();
      });
    });

    await test.step('Open Games and wait for the providers response', async () => {
      // Start waiting before the action that sends the browser request.
      const responsePromise = page.waitForResponse('**/api/games/providers**');
      await page.goto('/games');
      const response = await responsePromise;
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual(expect.any(Array));
    });
  });

  test('route.fulfill replaces a provider response for this test', async ({ page }, testInfo) => {
    console.log(`[${testInfo.title}] test body`);
    await test.step('Mock the provider list', async () => {
      await page.route('**/api/games/providers**', async (route) => {
        await route.fulfill({
          status: 200,
          json: [{ id: 'bgmng', title: 'Showcase Provider', games_count: 1 }],
        });
      });
    });

    await test.step('Open Games and check the mocked provider', async () => {
      await page.goto('/games');
      const provider = page.getByRole('main').getByRole('link', { name: /^Showcase Provider/ });
      await expect(provider).toContainText('Showcase Provider');
    });
  });

  test('route.abort blocks a browser request for this test', async ({ page }, testInfo) => {
    console.log(`[${testInfo.title}] test body`);
    await test.step('Block provider requests', async () => {
      await page.route('**/api/games/providers**', (route) => route.abort());
    });

    await test.step('Open Games and check the request failed', async () => {
      const failedRequestPromise = page.waitForEvent('requestfailed', (request) =>
        new URL(request.url()).pathname === '/api/games/providers');
      await page.goto('/games');
      const failedRequest = await failedRequestPromise;
      expect(failedRequest.failure()?.errorText).toBeTruthy();
    });
  });
});

test.describe('Lifecycle', () => {
  // Keep both examples in one group even when fullyParallel is enabled.
  test.describe.configure({ mode: 'default' });

  test.beforeAll(async ({ browser }, workerInfo) => {
    console.log(`[lifecycle] beforeAll: worker=${workerInfo.workerIndex}, browser=${browser.browserType().name()}`);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`[${testInfo.title}] beforeEach`);
    await test.step('Open Games for this test', async () => {
      await page.goto('/games');
    });
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`[${testInfo.title}] afterEach: ${testInfo.status}`);
  });

  test.afterAll(async ({}, workerInfo) => {
    console.log(`[lifecycle] afterAll: worker=${workerInfo.workerIndex}`);
  });

  test('first lifecycle example opens Games', async ({ page }, testInfo) => {
    console.log(`[${testInfo.title}] test body: project=${testInfo.project.name}, worker=${testInfo.workerIndex}, retry=${testInfo.retry}`);
    await test.step('Check the Games heading', async () => {
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lobby');
    });
  });

  test('second lifecycle example starts from Games independently', async ({ page }, testInfo) => {
    console.log(`[${testInfo.title}] test body: project=${testInfo.project.name}, worker=${testInfo.workerIndex}, retry=${testInfo.retry}`);
    await test.step('Check the Games URL', async () => {
      await expect(page).toHaveURL(/\/games\/?$/);
    });
  });
});
