import { afterEach, describe, expect, it, vi } from 'vitest'
import { sendContact, trackShipment } from '../../src/lib/api'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('trackShipment', () => {
  it('TC-U06: returns shipment details for a valid tracking number', async () => {
    const result = await trackShipment('  APX20490  ')
    expect(result.tracking_number).toBe('APX20490')
    expect(result.events.length).toBe(7)
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
