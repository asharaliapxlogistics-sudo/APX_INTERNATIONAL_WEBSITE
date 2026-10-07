import { describe, expect, it } from 'vitest'
import { mockShipment } from '../../src/lib/mockTracking'

const STEPS = [
  'Shipment booked',
  'Picked up',
  'Departed origin facility',
  'In transit',
  'Arrived at destination hub',
  'Out for delivery',
  'Delivered',
]

describe('mockShipment (demo tracking data)', () => {
  it('TC-U01: returns the same shipment for the same number', () => {
    expect(mockShipment('APX20490')).toEqual(mockShipment('APX20490'))
  })

  it('TC-U02: ignores letter case in the tracking number', () => {
    expect(mockShipment('apx20490').tracking_number).toBe('APX20490')
    expect(mockShipment('apx20490').current_status).toBe(mockShipment('APX20490').current_status)
  })

  it('TC-U03: always has 7 events, newest first, with a valid status and progress', () => {
    for (let n = 20400; n < 20600; n++) {
      const s = mockShipment(`APX${n}`)
      expect(s.events).toHaveLength(7)
      expect(STEPS).toContain(s.current_status)
      expect(s.progress).toBeGreaterThanOrEqual(0)
      expect(s.progress).toBeLessThanOrEqual(100)
      // Newest first: the last event is "Shipment booked" and is always done
      expect(s.events.at(-1)?.status).toBe('Shipment booked')
      expect(s.events.at(-1)?.done).toBe(true)
      // Completed events carry a timestamp, pending ones don't
      for (const e of s.events) expect(Boolean(e.timestamp)).toBe(e.done)
    }
  })

  it('TC-U04: never routes a shipment to or from India or Dubai', () => {
    for (let n = 20400; n < 20600; n++) {
      const s = mockShipment(`APX${n}`)
      expect(`${s.origin} ${s.destination}`).not.toMatch(/India|Mumbai|Dubai|, AE/)
    }
  })

  it('TC-U05: marks a delivered shipment as 100% complete', () => {
    const delivered = mockShipment('APX20475')
    expect(delivered.current_status).toBe('Delivered')
    expect(delivered.progress).toBe(100)
    expect(delivered.estimated_delivery).toMatch(/^Delivered /)
  })
})
