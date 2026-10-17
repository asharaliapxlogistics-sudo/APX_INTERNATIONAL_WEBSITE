import { afterEach, describe, expect, it, vi } from 'vitest'
import { formatOfficeTime, sendContact, trackShipment } from '../../src/lib/api'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

// What the ERP's public /api/track/{number} returns.
const ERP_SHIPMENT = {
  number: '10257080',
  date: '2026-10-15',
  city: 'London',
  country: 'United Kingdom',
  service: 'Express',
  status: 'In transit',
  group: 'transit',
  events: [
    { status: 'Booked', at: '2026-10-15T10:30', location: 'Karachi', remarks: 'Airway bill created' },
    { status: 'In transit', at: '2026-10-16T21:05', location: 'Dubai', remarks: '' },
  ],
}

describe('trackShipment', () => {
  it('TC-U06: asks the ERP and returns shipment details, newest event first', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ERP_SHIPMENT })
    vi.stubGlobal('fetch', fetchMock)

    const result = await trackShipment('  10257080  ')

    expect(fetchMock.mock.calls[0][0]).toMatch(/\/api\/track\/10257080$/)
    expect(result).toMatchObject({
      tracking_number: '10257080',
      origin: 'Karachi',
      destination: 'London, United Kingdom',
      current_status: 'In transit',
      booked_on: '15 Oct 2026',
      progress: 50,
    })
    expect(result.events.map((e) => e.status)).toEqual(['In transit', 'Booked'])
    expect(result.events[0].timestamp).toBe('16 Oct 2026, 09:05 pm')
    expect(result.events[1].note).toBe('Airway bill created')
  })

  it('TC-U06b: an unknown number gives a clear message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }))
    await expect(trackShipment('99999999')).rejects.toThrow(/No shipment found/)
  })

  it('TC-U06c: a network failure gives a friendly message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(trackShipment('10257080')).rejects.toThrow(/not reachable/)
  })

  it('TC-U06d: office times are shown as written, without time-zone shifts', () => {
    expect(formatOfficeTime('2026-01-05T00:15')).toBe('05 Jan 2026, 12:15 am')
    expect(formatOfficeTime('2026-12-31T12:00')).toBe('31 Dec 2026, 12:00 pm')
  })

  it.each(['', 'abc', 'APX 20490', 'APX#20490', 'X'.repeat(31)])(
    'TC-U07: rejects an invalid tracking number (%j)',
    async (bad) => {
      await expect(trackShipment(bad)).rejects.toThrow(/4–30 letters or digits/)
    },
  )
})

describe('sendContact (Netlify Forms)', () => {
  const payload = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+92 300 1234567',
    service: 'Transportation',
    message: 'Please send me a quote.',
  }

  it('TC-U08: posts the form to Netlify as url-encoded data with the form name', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)

    await sendContact(payload)

    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('/')
    expect(init.method).toBe('POST')
    expect(init.headers['Content-Type']).toBe('application/x-www-form-urlencoded')
    const body = new URLSearchParams(init.body)
    expect(body.get('form-name')).toBe('contact')
    expect(body.get('email')).toBe('test@example.com')
    expect(body.get('message')).toBe('Please send me a quote.')
  })

  it('TC-U09: throws a friendly error when the submission fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    await expect(sendContact(payload)).rejects.toThrow(/call or email us/)
  })
})
