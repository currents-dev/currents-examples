import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
test.describe('Coverage demo', () => {
  //Happy Path  
  test('collects JS and CSS coverage while driving the UI', async ({ page }) => {
    // Start coverage
    await page.coverage.startJSCoverage();
    await page.coverage.startCSSCoverage();
    // Route the API to make network code run deterministically
    await page.route('**/api/items', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ name: 'Keyboard' }, { name: 'Mouse' }])
      });
    });
    // Exercise the UI
    await page.goto('http://localhost:5173');
    await page.fill('#qty', '3');
    await page.fill('#price', '19.99');
    await page.click('#calc');
    await expect(page.locator('#total')).toHaveText('59.97');
    // Trigger async path + CSS class toggling was already hit above on valid flow
    await page.click('#load-items');
    await expect(page.locator('#items li')).toHaveCount(2);
    // Stop coverage
    const jsCoverage = await page.coverage.stopJSCoverage();
    const cssCoverage = await page.coverage.stopCSSCoverage();
    // Persist raw V8-style coverage
    const outDir = path.join(process.cwd(), 'coverage', 'raw');
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'js.json'), JSON.stringify(jsCoverage, null, 2));
    await fs.writeFile(path.join(outDir, 'css.json'), JSON.stringify(cssCoverage, null, 2));
    // Sanity check: at least one function was recorded
    expect(jsCoverage.length).toBeGreaterThan(0);
  });
  //Error Path
  test('invalid inputs path toggles error CSS', async ({ page }) => {
    await page.coverage.startJSCoverage();
    await page.coverage.startCSSCoverage();
    await page.goto('http://localhost:5173');
    await page.fill('#qty', '-1');      // invalid because negative
    await page.fill('#price', '10');
    await page.click('#calc');
    const err = page.locator('#error');
    await expect(err).not.toHaveClass(/hidden/);
    await expect(err).toHaveClass(/error/);
    const js = await page.coverage.stopJSCoverage();
    const css = await page.coverage.stopCSSCoverage();
    const outDir = path.join(process.cwd(), 'coverage', 'raw');
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'js-invalid.json'), JSON.stringify(js, null, 2));
    await fs.writeFile(path.join(outDir, 'css-invalid.json'), JSON.stringify(css, null, 2));
  });
});
