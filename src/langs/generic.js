const lp = require('../license-parser')
const R = require('ramda')

class GenericLang {
  constructor (app) {
    this.app = app
  }

  parseStr (str, licenseLines) {
    const lines = str.split('\n')
    return this.findModify(lines, licenseLines) || this.findInsert(lines)
  }

  findModify (lines, licenseLines) {
    const validateStart = lp.makeStartValidator(licenseLines)
    const validateEnd = lp.makeEndValidator(licenseLines)
    const validateContent = lp.makeContentValidator(licenseLines, this.app)

    let mode = 0

    const c = this.app.config
    let i = 0
    let start
    let end

    while (i++ < c.maxLines) {
      const l = lines[i]
      if (mode === 0 && validateStart(l)) {
        start = i
        mode = 1
      }
      if (mode === 1 && validateEnd(l)) {
        end = i
        const candidLines = lines.slice(start, end + 1)
        if (validateContent(candidLines)) {
          return R.equals(candidLines, licenseLines)
            ? ['.'] // no modification is needed
            : ['m', start, end] // modify existing license
        } else {
          mode = 0
        }
      }
    }

    return null
  }

  findInsert (lines) {
    return ['a', 0, 0] // add the license starting from the first line
  }
}

module.exports = GenericLang