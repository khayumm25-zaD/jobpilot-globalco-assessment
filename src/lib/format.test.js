import { describe, expect, it } from 'vitest'
import { formatDate, STATUSES } from './format'

describe('format helpers', () => {
  it('contains the expected application statuses', () => {
    expect(STATUSES).toEqual(['Applied','Assessment','Interview','Offer','Rejected'])
  })
  it('formats a date for the UI', () => {
    expect(formatDate('2026-08-12')).toMatch(/2026/)
  })
  it('handles an empty date', () => {
    expect(formatDate('')).toBe('—')
  })
})
