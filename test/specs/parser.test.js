/* eslint-env jest */
const parser = require('../../src/parser')

describe('parser', () => {
  describe('executeTestStr()', () => {
    it('replaces correct lines in the middle', () => {
      const str =
`0 - abc
1 - abc
2 - abc
####
# license (c)
####
6 - abc
7 - abc
`
      const result = parser.executeTaskStr(str, ['m', 3, 6], ['zu', 'bu'])
      expect(result).toBe(`0 - abc
1 - abc
2 - abc
zu
bu
6 - abc
7 - abc
`)
    })
  })
})
