import { describe, expect, it } from 'vitest'
import { company, mapsLink, offices, services } from '../../src/data/site'

describe('company and office data', () => {
  it('TC-U10: uses the company name "APX International"', () => {
    expect(company.name).toBe('APX International')
  })

  it('TC-U11: lists only the Karachi head office and the UK office (no Dubai)', () => {
    expect(offices.map((o) => o.country)).toEqual(['Pakistan', 'United Kingdom'])
    expect(JSON.stringify(offices)).not.toMatch(/Dubai|UAE|United Arab/)
  })

  it('TC-U12: has the confirmed addresses and phone numbers', () => {
    const [pk, uk] = offices
    expect(pk.address.join(' ')).toContain('1/1-A, Night Square')
    expect(pk.phones).toEqual(['+92 21 36375691', '+92 345 3177311'])
    expect(uk.address.join(' ')).toContain('UB7 0EB')
    expect(uk.phones).toEqual(['+44 7884 090724'])
  })

  it('TC-U13: every WhatsApp number matches one of that office’s phone numbers', () => {
    for (const o of offices.filter((o) => o.whatsapp)) {
      const digits = o.phones.map((p) => p.replace(/\D/g, ''))
      expect(digits).toContain(o.whatsapp)
    }
  })

  it('TC-U14: builds a Google Maps link from the office address', () => {
    const link = mapsLink(offices[1])
    expect(link).toMatch(/^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/)
    expect(decodeURIComponent(link)).toContain('450 Bath Road')
  })
})

describe('services data', () => {
  it('TC-U15: has five services, each with a unique slug, a photo and a stat', () => {
    expect(services).toHaveLength(5)
    expect(new Set(services.map((s) => s.slug)).size).toBe(5)
    for (const s of services) {
      expect(s.image).toMatch(/^\d+-[0-9a-f]+$/)
      expect(s.stat.value).toBeTruthy()
      expect(s.points.length).toBeGreaterThan(0)
    }
  })
})
