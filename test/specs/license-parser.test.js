/* eslint-env jest */
const licenseParser = require('../../src/license-parser')

describe('license-parser', () => {
  describe('makeStartValidator()', () => {
    it('works for /* string symbol', () => {
      const f = licenseParser.makeStartValidator([
        '/*', '* SOME LICENSE', '*/'
      ])
      expect(f('/*')).toBe(true)
      expect(f('/*****')).toBe(true)
      expect(f(' /*****')).toBe(true)
      expect(f('#########')).toBe(false)
      expect(f('//*')).toBe(false)
    })
  })

  describe('makeEndValidator()', () => {
    it('works for */ string symbol', () => {
      const f = licenseParser.makeEndValidator([
        '/*', '* SOME LICENSE', '*/'
      ])
      expect(f('*/')).toBe(true)
      expect(f('    */')).toBe(true)
      expect(f('#########')).toBe(false)
      expect(f('*///')).toBe(false)
    })
  })
})
