
Module 05 — Getting to know a Playwright project

Install Chromium using the Playwright CLI.:
npx playwright install chromium


Add two npm scripts.
  "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "test:pw": "playwright test",
  "test:pw:ui": "playwright test --ui"
}

