/*
 * Demo tracking data.
 *
 * The real APX tracking system (ERP) isn't connected yet, so this generates a consistent sample
 * shipment from the tracking number. Replace `trackShipment` in ./api.ts with a call to the ERP
 * API when it's ready.
 */
import type { TrackingEvent, TrackingResult } from './api'

const ROUTES: [string, string][] = [
  ['Karachi, PK', 'London, UK'],
  ['Karachi, PK', 'New York, US'],
  ['Islamabad, PK', 'Toronto, CA'],
  ['Lahore, PK', 'Sydney, AU'],
  ['Karachi, PK', 'Manchester, UK'],
  ['Karachi, PK', 'Riyadh, SA'],
]

const SERVICES = ['International Express', 'Freight & Cargo', 'Domestic Express']

const STEPS = [
  'Shipment booked',
  'Picked up',
  'Departed origin facility',
  'In transit',
  'Arrived at destination hub',
  'Out for delivery',
  'Delivered',
]

// FNV-1a — small deterministic hash so the same number always shows the same journey.
function hash(text: string) {
  let h = 0x811c9dc5
  for (const ch of text) {
    h ^= ch.charCodeAt(0)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h
}

const fmtDateTime = (d: Date) =>
  d.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
const fmtDate = (d: Date) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

export function mockShipment(trackingNumber: string): TrackingResult {
  const no = trackingNumber.toUpperCase()
  const seed = hash(no)
  const [origin, destination] = ROUTES[seed % ROUTES.length]
  const service = SERVICES[Math.floor(seed / 7) % SERVICES.length]
  const reached = 2 + (Math.floor(seed / 13) % (STEPS.length - 1)) // completed steps, 2..7

  const hour = 60 * 60 * 1000
  const start = Date.now() - 10 * hour * reached
  const events: TrackingEvent[] = STEPS.map((step, i) => {
    const done = i < reached
    return {
      status: step,
      location: i < 3 ? origin : i >= 4 ? destination : 'In transit',
      timestamp: done ? fmtDateTime(new Date(start + 10 * hour * i)) : '',
      done,
    }
  })

  const delivered = reached === STEPS.length
  const eta = new Date(start + 10 * hour * (STEPS.length - 1))
  return {
    tracking_number: no,
    service,
    origin,
    destination,
    current_status: STEPS[reached - 1],
    estimated_delivery: (delivered ? 'Delivered ' : '') + fmtDate(eta),
    progress: Math.round((reached / STEPS.length) * 100),
    events: events.reverse(), // newest first
  }
}
