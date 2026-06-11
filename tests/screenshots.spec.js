/**
 * Screenshot capture spec — visits key pages and saves full-page screenshots.
 * Output goes to screenshots/ via the Playwright screenshotPath option.
 */
const { test } = require('@playwright/test')
const path = require('path')
const fs = require('fs')

const OUT = path.resolve(__dirname, '../screenshots')
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

async function shot(page, name) {
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true })
}

test('connect page', async ({ page }) => {
  await page.goto('/connect')
  await page.waitForLoadState('domcontentloaded')
  await shot(page, '01-connect')
})

test('bookshelf (unauthenticated)', async ({ page }) => {
  await page.goto('/bookshelf')
  await page.waitForLoadState('networkidle')
  await shot(page, '02-bookshelf-unauth')
})

test('bookshelf navbar tabs', async ({ page }) => {
  await page.goto('/bookshelf')
  await page.waitForLoadState('domcontentloaded')
  // Capture with first tab focused
  await page.keyboard.press('Tab')
  await shot(page, '03-bookshelf-focused-nav')
})

test('appbar focus ring', async ({ page }) => {
  await page.goto('/bookshelf')
  await page.waitForLoadState('domcontentloaded')
  // Tab twice to reach appbar elements
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await shot(page, '04-appbar-focus')
})

test('connect page — form focused', async ({ page }) => {
  await page.goto('/connect')
  await page.waitForLoadState('domcontentloaded')
  await page.keyboard.press('Tab')
  await shot(page, '05-connect-focused')
})

test('root redirect', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('domcontentloaded')
  await shot(page, '06-root')
})
