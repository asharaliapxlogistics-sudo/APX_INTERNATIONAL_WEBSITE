import { beforeEach, describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import App from '../../src/App'
import { renderAt } from '../render'

beforeEach(() => {
  // Skip the intro splash so pages render straight away
  sessionStorage.setItem('apx-splash-seen', '1')
})

describe('Routes', () => {
  it.each([
    ['/', /Hassle-free delivery/],
    ['/about', /Three decades of/],
    ['/services', /Logistics solutions for/],
    ['/tracking', /Track your shipment/],
    ['/contact', /Let’s move something together/],
    ['/packaging', /Pack it right/],
    ['/prohibited-items', /What you can’t ship/],
    ['/terms', /Terms and Conditions/],
    ['/privacy', /Privacy Policy/],
    ['/login', /Your shipments/],
    ['/this-page-does-not-exist', /404/],
  ])('TC-U31: %s renders its page', async (url, heading) => {
    renderAt(<App />, url)
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('TC-U32: never mentions India or Dubai anywhere on the home page', async () => {
    renderAt(<App />, '/')
    await screen.findByRole('heading', { level: 1 })
    expect(document.body.textContent).not.toMatch(/India|Dubai|UAE/)
  })

  it('TC-U33: shows the intro splash on the first visit of a session', () => {
    sessionStorage.clear()
    renderAt(<App />, '/')
    expect(screen.getByText('Delivering since 1990')).toBeInTheDocument()
  })
})
