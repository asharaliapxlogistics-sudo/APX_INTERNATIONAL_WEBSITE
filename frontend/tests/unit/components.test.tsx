import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TrackingMap from '../../src/components/TrackingMap'
import WhatsAppButton from '../../src/components/WhatsAppButton'
import Footer from '../../src/components/Footer'
import Navbar from '../../src/components/Navbar'
import { mockShipment } from '../../src/lib/mockTracking'
import { renderAt } from '../render'

describe('TrackingMap', () => {
  it('TC-U24: shows origin, destination and progress for a shipment in transit', () => {
    render(<TrackingMap result={mockShipment('APX20490')} />)
    expect(screen.getByText('Karachi')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(screen.getByText('In transit')).toBeInTheDocument()
    expect(screen.getByText('50% of the way')).toBeInTheDocument()
  })

  it('TC-U25: shows a delivered shipment at 100%', () => {
    render(<TrackingMap result={mockShipment('APX20475')} />)
    expect(screen.getByText('Delivered')).toBeInTheDocument()
    expect(screen.getByText('100% of the way')).toBeInTheDocument()
  })

  it('TC-U26: hides the map for a city it has no position for', () => {
    const { container } = render(<TrackingMap result={{ ...mockShipment('APX20490'), destination: 'Atlantis, XX' }} />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('WhatsAppButton', () => {
  it('TC-U27: opens a chat menu with the Pakistan and UK WhatsApp numbers', async () => {
    render(<WhatsAppButton />)
    await userEvent.click(screen.getByRole('button', { name: 'Chat on WhatsApp' }))
    const links = screen.getAllByRole('link')
    expect(links.map((a) => a.getAttribute('href')?.split('?')[0])).toEqual([
      'https://wa.me/923453177311',
      'https://wa.me/447884090724',
    ])
    expect(links[0]).toHaveAttribute('target', '_blank')
    expect(links[0].getAttribute('href')).toContain('text=Hello%20APX')
  })
})

describe('Navbar', () => {
  it('TC-U28: has the main links, Resources and the Customer Portal button', () => {
    renderAt(<Navbar />)
    for (const name of ['Home', 'About', 'Services', 'Tracking', 'Contact']) {
      expect(screen.getAllByRole('link', { name: new RegExp(`^${name}`) })[0]).toBeInTheDocument()
    }
    expect(screen.getByRole('button', { name: /Resources/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Customer Portal/ })).toHaveAttribute('href', '/login')
  })

  it('TC-U29: opens the services mega menu with all five services on hover', async () => {
    renderAt(<Navbar />)
    await userEvent.hover(screen.getAllByRole('link', { name: /^Services/ })[0])
    for (const slug of ['international-courier', 'transportation', 'freight-cargo', 'domestic-express', 'warehouse-distribution']) {
      expect(document.querySelector(`a[href="/services#${slug}"]`)).toBeInTheDocument()
    }
    expect(screen.getByText(/Not sure which service you need/)).toBeInTheDocument()
  })
})

describe('Footer', () => {
  it('TC-U30: has the legal links, the CTA and the copyright as the last line', () => {
    renderAt(<Footer />)
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
    expect(screen.getByRole('link', { name: 'Terms & Conditions' })).toHaveAttribute('href', '/terms')
    expect(screen.getByRole('heading', { name: /Ready to ship/ })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Track a shipment/ })).not.toBeInTheDocument()
    const footer = document.querySelector('footer')!
    expect(footer.lastElementChild).toHaveTextContent(/© \d{4} APX International\. All rights reserved\./)
  })
})
