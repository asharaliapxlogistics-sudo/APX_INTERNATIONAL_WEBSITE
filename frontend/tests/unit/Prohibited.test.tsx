import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Prohibited from '../../src/pages/Prohibited'
import { renderAt } from '../render'

const itemNames = () => within(document.getElementById('items')!).queryAllByRole('heading', { level: 3 }).map((h) => h.textContent)

describe('Prohibited Items page', () => {
  it('TC-U16: lists 13 not-allowed and 8 restricted items', () => {
    renderAt(<Prohibited />)
    expect(screen.getByRole('button', { name: /All items\s*21/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Not allowed\s*13/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Restricted\s*8/ })).toBeInTheDocument()
  })

  it.each([
    ['perfume', ['Perfume & aftershave']],
    ['mithai', ['Packaged food']],
    ['gold', ['Gold, jewellery & gems']],
    ['vape', ['Tobacco & e-cigarettes']],
    ['laptop', ['Phones & laptops']],
  ])('TC-U17: searching "%s" finds the right item', async (query, expected) => {
    renderAt(<Prohibited />)
    await userEvent.type(screen.getByPlaceholderText(/Can I ship/), query)
    expect(itemNames()).toEqual(expected)
  })

  it('TC-U18: alcohol and tobacco are marked "Not allowed"', async () => {
    renderAt(<Prohibited />)
    await userEvent.click(screen.getByRole('button', { name: /Not allowed\s*13/ }))
    expect(itemNames()).toEqual(expect.arrayContaining(['Alcohol', 'Tobacco & e-cigarettes']))
    expect(itemNames()).not.toContain('Perfume & aftershave')
  })

  it('TC-U19: shows a helpful message when nothing matches', async () => {
    renderAt(<Prohibited />)
    await userEvent.type(screen.getByPlaceholderText(/Can I ship/), 'spaceship')
    expect(itemNames()).toEqual([])
    expect(screen.getByText(/isn’t on our list/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Ask about my item/ })).toHaveAttribute('href', '/contact')
  })
})
