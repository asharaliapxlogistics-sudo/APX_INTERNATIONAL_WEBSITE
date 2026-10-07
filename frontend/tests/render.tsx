import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

/** Renders a component inside a router, starting at the given URL. */
export function renderAt(ui: ReactElement, url = '/') {
  return render(<MemoryRouter initialEntries={[url]}>{ui}</MemoryRouter>)
}
