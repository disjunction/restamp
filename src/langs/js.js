const lp = require('../license-parser')

function parseStr (str, licenseLines, app) {
  const lines = str.split('\n')
  const validateStart = lp.makeStartValidator(licenseLines)
  const validateEnd = lp.makeEndValidator(licenseLines)
  const validateCandidate = lp.makeCandidateValidator(licenseLines, app)

  let mode = 0

  const c = app.context.config
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
      const candidate = lines.slice(start, end + 1)
      if (validateCandidate(candidate)) {
        return {start, end, candidate}
      } else {
        mode = 0
      }
    }
  }

  return null
}

module.exports = parseStr
