import { describe, expect, it } from 'vitest'
import { company, mapsLink, offices, services } from '../../src/data/site'

describe('company and office data', () => {
  it('TC-U10: uses the company name "APX International"', () => {
    expect(company.name).toBe('APX International')
  })

  it('TC-U11: lists the Pakistan offices and the UK office (no Dubai)', () => {
    expect(offices.map((o) => o.label)).toEqual([
      'Head office',
      'Branch office',
      'Branch office',
      'Branch office',
      'Branch office',
    ])
    expect(JSON.stringify(offices)).not.toMatch(/Dubai|UAE|United Arab/)
  })

  it('TC-U12: has the confirmed addresses and phone numbers', () => {
    const [pk, clifton, faisalabad, uk, usa] = offices
    expect(usa.address.join(' ')).toContain('6109 Moody Pines Ct')
    expect(usa.phones).toEqual(['+1 346 213 4425'])
    expect(pk.address.join(' ')).toContain('187/B, Block 2, P.E.C.H.S')
    expect(pk.email).toBe('info@apxlog.com')
    expect(pk.phones).toEqual(['+92 21 36375691', '+92 345 3177311'])
    expect(clifton.address.join(' ')).toContain('Cliff Shopping Mall')
    expect(clifton.phones).toEqual(['+92 301 8260440', '+92 21 35164827', '+92 21 36375691'])
    expect(faisalabad.address.join(' ')).toContain('A-63, Peoples Colony (Choti-D)')
    expect(faisalabad.phones).toEqual(['+92 41 8555422', '+92 41 8555423', '+92 323 2442410'])
    expect(faisalabad.email).toBe('faisalabadapx@gmail.com')
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
    const link = mapsLink(offices.find((o) => o.country === 'United Kingdom')!)
    expect(link).toMatch(/^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/)
    expect(decodeURIComponent(link)).toContain('450 Bath Road')
  })
})

describe('services data', () => {
  it('TC-U15: has four services, each with a unique slug, a photo and a stat', () => {
    expect(services).toHaveLength(4)
    expect(new Set(services.map((s) => s.slug)).size).toBe(4)
    for (const s of services) {
      expect(s.image).toMatch(/^\d+-[0-9a-f]+$/)
      expect(s.stat.value).toBeTruthy()
      expect(s.points.length).toBeGreaterThan(0)
    }
  })
})
