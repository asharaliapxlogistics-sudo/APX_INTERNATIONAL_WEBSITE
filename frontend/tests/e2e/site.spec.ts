import { readFileSync } from 'node:fs'
import { expect, test, type Page } from '@playwright/test'

const PAGES = [
  { path: '/', h1: /Hassle-free delivery/ },
  { path: '/about', h1: /Three decades of/ },
  { path: '/services', h1: /Logistics solutions for/ },
  { path: '/tracking', h1: /Track your shipment/ },
  { path: '/contact', h1: /Let’s move something together/ },
  { path: '/packaging', h1: /Pack it right/ },
  { path: '/prohibited-items', h1: /What you can’t ship/ },
  { path: '/terms', h1: /Terms and Conditions/ },
  { path: '/privacy', h1: /Privacy Policy/ },
  { path: '/login', h1: /Your shipments/ },
]

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 768

// Skip the intro splash for every test except the one that checks it.
test.beforeEach(async ({ page }, info) => {
  if (!info.title.includes('TC-E15')) {
    await page.addInitScript(() => sessionStorage.setItem('apx-splash-seen', '1'))
  }
})

test.describe('Pages', () => {
  for (const { path, h1 } of PAGES) {
    test(`TC-E01: ${path} loads without JavaScript errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(e.message))
      await page.goto(path)
      // The login page hides its marketing heading on phones
      if (!(path === '/login' && isMobile(page))) {
        await expect(page.getByRole('heading', { level: 1, name: h1 })).toBeVisible()
      }
      await expect(page).toHaveTitle('APX International')
      expect(errors).toEqual([])
    })

    test(`TC-E02: ${path} has no sideways scrolling`, async ({ page }) => {
      await page.goto(path)
      await page.waitForTimeout(1500)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })
  }

  test('TC-E13: unknown pages show the 404 page', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
    await page.getByRole('link', { name: 'Back to home' }).click()
    await expect(page).toHaveURL(/\/$/)
  })

  test('TC-E11: refreshing a deep link keeps the same page', async ({ page }) => {
    await page.goto('/packaging')
    await page.reload()
    await expect(page.getByRole('heading', { level: 1, name: /Pack it right/ })).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('TC-E03: main navigation links open the right pages', async ({ page }) => {
    await page.goto('/')
    for (const [name, url, h1] of [
      ['About', '/about', /Three decades of/],
      ['Services', '/services', /Logistics solutions for/],
      ['Tracking', '/tracking', /Track your shipment/],
      ['Contact', '/contact', /Let’s move something together/],
    ] as const) {
      if (isMobile(page)) await page.getByRole('button', { name: 'Toggle menu' }).click()
      await page.locator(isMobile(page) ? 'header nav .lg\\:hidden' : 'header nav ul').getByRole('link', { name, exact: true }).click()
      await expect(page).toHaveURL(new RegExp(`${url}$`))
      await expect(page.getByRole('heading', { level: 1, name: h1 })).toBeVisible()
    }
  })

  test('TC-E10: the Services mega menu opens on hover and links to a service', async ({ page }) => {
    test.skip(isMobile(page), 'Hover menus are desktop only')
    await page.goto('/about')
    await page.locator('header nav ul').getByRole('link', { name: 'Services' }).hover()
    const menu = page.locator('header').getByText('Not sure which service you need?')
    await expect(menu).toBeVisible()
    await page.locator('header').getByRole('link', { name: /Freight & Cargo/ }).click()
    await expect(page).toHaveURL(/\/services#freight-cargo$/)
    await expect(menu).toBeHidden()
  })

  test('TC-E17: the mobile menu lists every page including Resources', async ({ page }) => {
    test.skip(!isMobile(page), 'Mobile menu only')
    await page.goto('/')
    await page.getByRole('button', { name: 'Toggle menu' }).click()
    const menu = page.locator('header nav .lg\\:hidden')
    for (const name of ['Home', 'About', 'Services', 'Tracking', 'Contact', 'Packaging Guide', 'Prohibited Items']) {
      await expect(menu.getByRole('link', { name })).toBeVisible()
    }
    await menu.getByRole('link', { name: 'Prohibited Items' }).click()
    await expect(page).toHaveURL(/\/prohibited-items$/)
  })

  test('TC-E14: footer legal links open Privacy and Terms', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer').getByRole('link', { name: 'Privacy Policy' }).click()
    await expect(page.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeVisible()
    await page.locator('footer').getByRole('link', { name: 'Terms & Conditions' }).click()
    await expect(page.getByRole('heading', { level: 1, name: 'Terms and Conditions' })).toBeVisible()
  })

  test('TC-E19: Services tabs jump to the chosen service', async ({ page }) => {
    await page.goto('/services')
    await page.locator('.sticky').getByRole('link', { name: 'Warehouse & Distribution' }).click()
    await expect(page).toHaveURL(/#warehouse-distribution$/)
    await expect(page.getByRole('heading', { level: 2, name: 'Warehouse & Distribution' })).toBeInViewport()
  })
})

test.describe('Tracking', () => {
  test('TC-E04: tracking from the home page shows the result, route map and history', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Enter your tracking number').first().fill('APX20490')
    await page.getByRole('button', { name: 'Track' }).first().click()
    await expect(page).toHaveURL(/\/tracking\?no=APX20490$/)
    await expect(page.getByText('APX20490').first()).toBeVisible()
    await expect(page.getByText('50% of the way')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Shipment history' })).toBeVisible()
  })

  test('TC-E05: an invalid tracking number shows a clear error', async ({ page }) => {
    await page.goto('/tracking?no=ab')
    await expect(page.getByText('We couldn’t find that shipment')).toBeVisible()
  })
})

test.describe('Contact', () => {
  test('TC-E06: the contact form requires all fields', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: /Send Message/ }).click()
    const invalid = await page.locator('main form :invalid').count()
    expect(invalid).toBeGreaterThan(0)
    await expect(page.getByText('Message sent!')).toBeHidden()
  })

  test('TC-E07: the WhatsApp button offers the Pakistan and UK numbers', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: 'Chat on WhatsApp' }).click()
    await expect(page.locator('a[href^="https://wa.me/923453177311"]').last()).toBeVisible()
    await expect(page.locator('a[href^="https://wa.me/447884090724"]').last()).toBeVisible()
  })

  test('TC-E20: office cards show both addresses with map directions', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByText('1/1-A, Night Square').first()).toBeVisible()
    await expect(page.getByText('450 Bath Road, Longford').first()).toBeVisible()
    const directions = page.locator('main a[href^="https://www.google.com/maps/search/"]')
    await expect(directions).toHaveCount(4)
  })
})

test.describe('Tools', () => {
  test('TC-E08: the prohibited items search finds perfume as restricted', async ({ page }) => {
    await page.goto('/prohibited-items')
    await page.getByPlaceholder(/Can I ship/).fill('perfume')
    const items = page.locator('#items h3')
    await expect(items).toHaveCount(1)
    await expect(items.first()).toHaveText('Perfume & aftershave')
  })

  test('TC-E09: the volumetric calculator works out the chargeable weight', async ({ page }) => {
    await page.goto('/packaging')
    const inputs = page.locator('#calculator input')
    for (const [i, v] of ['50', '40', '30', '8'].entries()) await inputs.nth(i).fill(v)
    // 50×40×30 ÷ 5000 = 12 kg volumetric, which beats the 8 kg actual weight
    const chargeable = page.locator('#calculator').getByText('Chargeable weight', { exact: true }).locator('..')
    await expect(chargeable).toContainText('12.00 kg')
    await expect(chargeable).toContainText('smaller box would cost less')
  })

  test('TC-E18: the world map shows country flags and names', async ({ page }) => {
    await page.goto('/about')
    const map = page.locator('img[src="/world-dots.svg"]').locator('..')
    await map.scrollIntoViewIfNeeded()
    await expect(map.getByText('Pakistan', { exact: true }).first()).toBeAttached()
    // Each country appears as a visible label and as the dot's hover tooltip
    await expect(map.getByText('Brazil').first()).toBeAttached()
    await expect(map.getByText('India')).toHaveCount(0)
  })
})

test.describe('Experience', () => {
  test('TC-E15: the intro splash shows on the first visit and then gets out of the way', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Delivering since 1990', { exact: true })).toBeVisible()
    await expect(page.getByText('Delivering since 1990', { exact: true })).toBeHidden({ timeout: 5000 })
    await expect(page.getByRole('heading', { level: 1, name: /Hassle-free delivery/ })).toBeVisible()
  })

  test('TC-E16: home page images load (no broken images)', async ({ page }) => {
    await page.goto('/')
    // Scroll through the page so lazy images load
    for (let y = 0; y < 12; y++) {
      await page.mouse.wheel(0, 800)
      await page.waitForTimeout(250)
    }
    await page.waitForLoadState('networkidle').catch(() => {})
    const broken = await page.evaluate(() =>
      [...document.images].filter((img) => img.complete && img.naturalWidth === 0 && img.loading !== 'lazy').map((img) => img.src),
    )
    expect(broken).toEqual([])
  })
})

test.describe('Deployment build', () => {
  test('TC-E12: the build includes the Netlify form and page redirects', () => {
    const html = readFileSync('dist/index.html', 'utf-8')
    expect(html).toContain('name="contact"')
    expect(html).toContain('data-netlify="true"')
    expect(readFileSync('dist/_redirects', 'utf-8')).toMatch(/\/\*\s+\/index\.html\s+200/)
  })
})
