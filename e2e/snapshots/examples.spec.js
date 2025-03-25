// @ts-check
import { test, expect } from '@playwright/test';

const examples = [
  'custom-gamut-cube',
  'custom-size',
  'full-size',
  'has-presets',
  'load-gamuts',
  'load-presets',
  'load-settings',
  'no-store',
  'two-wheels',
  'two-wheels-dark'
];

examples.forEach((name) => {
  test(`visual: compare ${name}`, async ({ page }) => {
    await page.goto(`/examples/${name}`);

    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
})

