import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
const base = '/personal-website/'

test('landing is immediately usable and the real-time scene loads and responds', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  await page.goto(base)
  await expect(
    page.getByRole('heading', { name: 'Daniel Son.', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'View my work', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('.ruins-canvas')).toHaveClass(/is-ready/, {
    timeout: 30000,
  })
  await page.getByRole('button', { name: 'Pause scene animation' }).click()
  await expect(
    page.getByRole('button', { name: 'Play scene animation' }),
  ).toBeVisible()
  await page.mouse.move(1000, 450)
  await page.mouse.down()
  await page.mouse.move(1180, 500, { steps: 12 })
  await page.mouse.up()
  await page.getByRole('button', { name: 'Reset scene view' }).click()
  await page.getByText('Scene credits', { exact: true }).click()
  await expect(
    page.getByRole('link', { name: 'Ancient ruins by fedorzabelin' }),
  ).toBeVisible()
  // The popover sits above the page; Escape dismisses it.
  await page.keyboard.press('Escape')
  await expect(
    page.getByRole('link', { name: 'Ancient ruins by fedorzabelin' }),
  ).toBeHidden()
  await page.getByRole('link', { name: 'View my work', exact: true }).click()
  await expect(page).toHaveURL(/projects/)
  // The scene panel is persistent across routes — it should still be there, still running.
  await expect(page.locator('.ruins-canvas')).toHaveClass(/is-ready/)
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Home', exact: true })
    .click()
  await expect(page.locator('.ruins-canvas')).toHaveClass(/is-ready/, {
    timeout: 30000,
  })
  expect(errors).toEqual([])
})

test('original content organization, coursework, tabs, and assets remain functional', async ({
  page,
}) => {
  for (const route of [
    'projects',
    'experience',
    'hobbies',
    'contact',
    'capybara',
  ]) {
    await page.goto(`${base}${route}/`)
    await expect(page.locator('main').first()).toBeVisible()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy()
    if (route === 'projects') {
      await expect(
        page.getByRole('heading', { name: 'Projects', exact: true }),
      ).toBeVisible()
      await expect(page.getByText('Nexus', { exact: true })).toBeVisible()
    }
    if (route === 'experience') {
      await page.getByText('Computer Science', { exact: true }).click()
      await expect(
        page.getByText('Data Structures & Algorithms I & II', { exact: true }),
      ).toBeVisible()
      await expect(
        page.getByText('Cloud & Automation', { exact: true }),
      ).toBeVisible()
    }
    if (route === 'hobbies') {
      await page.getByRole('tab', { name: 'Movies', exact: true }).click()
      await expect(
        page.getByText('The Dark Knight', { exact: true }),
      ).toBeVisible()
      await page.getByRole('tab', { name: 'Series', exact: true }).click()
      await expect(page.getByText('Berserk', { exact: true })).toBeVisible()
    }
    for (const img of await page.locator('img').all()) {
      await img.scrollIntoViewIfNeeded()
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBeTruthy()
    }
  }
})

test('landing and both content themes meet automated accessibility checks', async ({
  page,
}) => {
  await page.goto(base)
  await expect(page.locator('.ruins-canvas')).toHaveClass(/is-ready/, {
    timeout: 30000,
  })
  await page.getByRole('button', { name: 'Pause scene animation' }).click()
  for (const destination of ['landing', 'dark', 'light']) {
    if (destination === 'dark') await page.goto(`${base}contact/`)
    if (destination === 'light')
      await page.getByRole('button', { name: 'Toggle theme' }).click()
    await page.waitForTimeout(250)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([])
  }
})

test('touch, reduced motion, resizing, and mobile navigation', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  await page.goto(`http://127.0.0.1:3100${base}`)
  await expect(page.locator('.ruins-canvas')).toHaveClass(/is-ready/, {
    timeout: 30000,
  })
  await expect(
    page.getByRole('button', { name: 'Play scene animation' }),
  ).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy()
  await page.setViewportSize({ width: 844, height: 390 })
  await expect(
    page.getByRole('link', { name: 'View my work', exact: true }),
  ).toBeInViewport({ ratio: 1 })
  expect(
    await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight),
  ).toBeTruthy()
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open menu' }).tap()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Contact', exact: true })
    .tap()
  await expect(page).toHaveURL(/contact/)
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await context.close()
})

test('failed WebGL and failed asset downloads preserve navigation', async ({
  page,
}) => {
  await page.route('**/scene/*.glb', (route) => route.abort())
  await page.goto(base)
  await expect(
    page.getByText('Welcome. Take a look around.', { exact: true }),
  ).toBeVisible({ timeout: 30000 })
  await page.getByRole('link', { name: 'View my work', exact: true }).click()
  await expect(page).toHaveURL(/projects/)
  await page.unroute('**/scene/*.glb')
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type.includes('webgl')) return null
      return (original as Function).apply(this, [type, ...args])
    } as typeof original
  })
  await page.goto(base)
  await expect(
    page.getByText('Welcome. Take a look around.', { exact: true }),
  ).toBeVisible({ timeout: 30000 })
  await expect(
    page.getByRole('link', { name: 'My experience', exact: true }),
  ).toBeVisible()
})

test('no JavaScript still displays the landing and allows direct content access', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(`http://127.0.0.1:3100${base}`)
  await expect(
    page.getByRole('heading', { name: 'Daniel Son.', exact: true }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'View my work', exact: true }).click()
  await expect(page.getByText('Nexus', { exact: true })).toBeVisible()
  await context.close()
})
