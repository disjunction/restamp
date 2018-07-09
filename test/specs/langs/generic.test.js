/* eslint-env jest */
const Adaptor = require('../../../src/langs/generic')

describe('langs/generic', () => {
  describe('findModify()', () => {
    it('detects same license in 0 position', () => {
      const adaptor = new Adaptor({config: {maxLines: 1000}})
      const str =
`/*
# license (c)
*/
abc
efg
`
      const result = adaptor.findModify(str.split('\n'), ['/*', '# license (c)', '*/'])
      expect(result).toEqual(['.'])
    })

    it('detects same modification in 0 position', () => {
      const adaptor = new Adaptor({config: {maxLines: 1000}})
      const str =
`/*
# license (c)
# some other content
*/
abc
efg
`
      const result = adaptor.findModify(str.split('\n'), ['/*', '# license (c)', '*/'])
      expect(result).toEqual(['m', 0, 4])
    })

    it('detects same license', () => {
      const adaptor = new Adaptor({config: {maxLines: 1000}})
      const str =
`0 - abc
1 - abc
2 - abc
/*
# license (c)
*/
6 - abc
7 - abc
`
      const result = adaptor.findModify(str.split('\n'), ['/*', '# license (c)', '*/'])
      expect(result).toEqual(['.'])
    })

    it('detects modified license', () => {
      const adaptor = new Adaptor({config: {maxLines: 1000}})
      const str =
`0 - abc
1 - abc
2 - abc
/*
# johoh (c)
*/
6 - abc
7 - abc
`
      const result = adaptor.findModify(str.split('\n'), ['/*', '# license (c)', '*/'])
      expect(result).toEqual(['m', 3, 6])
    })
  })
})
