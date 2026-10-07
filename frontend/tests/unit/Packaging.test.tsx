import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Packaging from '../../src/pages/Packaging'
import { renderAt } from '../render'

async function setBox(values: [string, string, string, string]) {
  const calc = within(document.getElementById('calculator')!)
  const inputs = calc.getAllByRole('spinbutton')
  for (const [i, v] of values.entries()) {
    await userEvent.clear(inputs[i])
    await userEvent.type(inputs[i], v)
  }
  return calc
}

describe('Packaging Guide', () => {
  it('TC-U20: shows all six packing steps', () => {
    renderAt(<Packaging />)
    for (const step of [
      'Choose a strong box',
      'Wrap every item separately',
      'Fill every empty space',
      'Seal with the H-taping method',
      'Label it clearly',
      'Measure and weigh',
    ]) {
      expect(screen.getByRole('heading', { name: step })).toBeInTheDocument()
    }
  })

  it('TC-U21: no longer shows the removed Liquids and Electronics cards', () => {
    renderAt(<Packaging />)
    expect(screen.queryByRole('heading', { name: 'Liquids' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Electronics' })).not.toBeInTheDocument()
  })

  it('TC-U22: charges by volume when the box is light for its size', async () => {
    renderAt(<Packaging />)
    const calc = await setBox(['50', '40', '30', '8']) // 50×40×30 ÷ 5000 = 12 kg
    expect(calc.getAllByText(/12\.00/).length).toBeGreaterThanOrEqual(2) // volumetric + chargeable
    expect(calc.getByText(/smaller box would cost less/)).toBeInTheDocument()
  })

  it('TC-U23: charges by actual weight when the box is heavy for its size', async () => {
    renderAt(<Packaging />)
    const calc = await setBox(['20', '20', '20', '10']) // volumetric 1.6 kg < 10 kg actual
    expect(calc.getByText('1.60')).toBeInTheDocument()
    expect(calc.getByText('10.00 kg')).toBeInTheDocument()
    expect(calc.getByText(/box size is efficient/)).toBeInTheDocument()
  })
})
