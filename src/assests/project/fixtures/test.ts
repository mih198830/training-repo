import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  browser: async ({ browser }, use, workerInfo) => {
    console.log(`[worker=${workerInfo.workerIndex}] browser setup: before use(browser)`);
    await use(browser);
    console.log(`[worker=${workerInfo.workerIndex}] browser teardown: after use(browser)`);
  },
  context: async ({ context }, use, testInfo) => {
    console.log(`[${testInfo.title}] context setup: before use(context)`);
    await use(context);
    console.log(`[${testInfo.title}] context teardown: after use(context)`);
  },
  page: async ({ page }, use, testInfo) => {
    console.log(`[${testInfo.title}] page setup: before use(page)`);
    await use(page);
    console.log(`[${testInfo.title}] page teardown: after use(page)`);
  },
});

export { expect };
