/* eslint-env jest */
const parser = require('../../src/parser')

describe('parser', () => {
  describe('getLangByPath()', () => {
    it('detects js', () => {
      const lang = parser.getLangByPath('some/strange.js')
      expect(lang).toBe('js')
    })
  })
})
