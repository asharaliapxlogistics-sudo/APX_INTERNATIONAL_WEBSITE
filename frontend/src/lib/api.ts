export type TrackingEvent = {
  status: string
  location: string
  timestamp: string
  done: boolean
  note?: string
}

export type TrackingResult = {
  tracking_number: string
  service: string
  origin: string
  destination: string
  current_status: string
  booked_on: string
  progress: number
  events: TrackingEvent[]
  // Delivery partner (e.g. DPD) and its own tracking number, once APX staff enter it in the ERP.
  carrier?: string
  carrier_tracking?: string
}

export type ContactPayload = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const TRACKING_RE = /^[A-Za-z0-9-]{4,30}$/

// Public tracking API of the APX ERP (no sign-in; returns status and history, never addresses or prices).
const ERP_API = (import.meta.env.VITE_ERP_API_URL || 'https://apxinternatonalerpsystem-production.up.railway.app/api').replace(/\/$/, '')

// How far along the journey each ERP status is, in percent. Keep in step with the ERP's STATUS_GROUPS.
export const STATUS_PROGRESS: Record<string, number> = {
  Booked: 5,
  'Picked up': 10,
  'At APX hub': 15,
  'Departed origin': 30,
  'In transit': 50,
  'Arrived destination': 75,
  'Customs hold': 80,
  'Customs cleared': 85,
  'Out for delivery': 95,
  Delivered: 100,
}

type ErpShipment = {
  number: string
  date: string // YYYY-MM-DD
  city: string
  country: string
  service: string
  carrier?: string
  carrierTracking?: string
  status: string
  events: { status: string; at: string; location: string; remarks: string }[] // oldest first, office time
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "2026-10-17" or "2026-10-17T14:05" (Karachi office time) → "17 Oct 2026" / "17 Oct 2026, 02:05 pm", without time-zone shifts.
export function formatOfficeTime(value: string) {
  const [date, time] = value.split('T')
  const [y, m, d] = date.split('-')
  const day = `${d} ${MONTHS[Number(m) - 1]} ${y}`
  if (!time) return day
  const [h, min] = time.split(':').map(Number)
  return `${day}, ${String(h % 12 || 12).padStart(2, '0')}:${String(min).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`
}

export function fromErp(s: ErpShipment): TrackingResult {
  return {
    tracking_number: s.number,
    service: s.service,
    origin: s.events[0]?.location || 'Pakistan',
    destination: [s.city, s.country].filter(Boolean).join(', '),
    current_status: s.status,
    booked_on: formatOfficeTime(s.date),
    progress: STATUS_PROGRESS[s.status] ?? 50,
    carrier: s.carrierTracking ? s.carrier || 'Carrier' : undefined,
    carrier_tracking: s.carrierTracking || undefined,
    events: s.events
      .map((e) => ({ status: e.status, location: e.location, timestamp: formatOfficeTime(e.at), done: true, note: e.remarks || undefined }))
      .reverse(), // newest first
  }
}

export async function trackShipment(trackingNumber: string): Promise<TrackingResult> {
  const no = trackingNumber.trim()
  if (!TRACKING_RE.test(no)) {
    throw new Error('Tracking numbers are 4–30 letters or digits. Please check and try again.')
  }
  let res: Response
  try {
    res = await fetch(`${ERP_API}/track/${encodeURIComponent(no)}`, { headers: { Accept: 'application/json' } })
  } catch {
    throw new Error('Tracking is not reachable right now. Please try again in a moment, or call us.')
  }
  if (res.status === 404) throw new Error('No shipment found with this number. Please check the number on your airway bill.')
  if (!res.ok) throw new Error('Tracking is not available right now. Please try again in a moment, or call us.')
  return fromErp(await res.json())
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
