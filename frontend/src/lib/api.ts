import { mockShipment } from './mockTracking'

export type TrackingEvent = {
  status: string
  location: string
  timestamp: string
  done: boolean
}

export type TrackingResult = {
  tracking_number: string
  service: string
  origin: string
  destination: string
  current_status: string
  estimated_delivery: string
  progress: number
  events: TrackingEvent[]
}

export type ContactPayload = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const TRACKING_RE = /^[A-Za-z0-9-]{4,30}$/

/** Demo tracking until the ERP is live — see ./mockTracking.ts */
export async function trackShipment(trackingNumber: string): Promise<TrackingResult> {
  const no = trackingNumber.trim()
  await new Promise((r) => setTimeout(r, 600))
  if (!TRACKING_RE.test(no)) {
    throw new Error('Tracking numbers are 4–30 letters or digits. Please check and try again.')
  }
  return mockShipment(no)
}

/**
 * Contact form is handled by Netlify Forms (no backend needed). The matching hidden form that
 * Netlify detects at deploy time lives in index.html — keep the field names in sync.
 */
export async function sendContact(payload: ContactPayload) {
  const body = new URLSearchParams({ 'form-name': 'contact', ...payload })
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error('Could not send your message. Please call or email us instead.')
}
