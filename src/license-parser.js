/*
 * generic ways to parse a provided license file
 * these are used by lang adaptors
 */
const esr = require('escape-string-regexp')

function makeStartValidator (licenseLines) {
  const cleanStr = licenseLines[0].trim()

  // can be indented, the last symbol can be repeated multiple times
  const regex = new RegExp('^\\s*' + esr(cleanStr) + '+$')

  return str => regex.test(str)
}

function makeEndValidator (licenseLines) {
  const cleanStr = licenseLines[licenseLines.length - 1].trim()

  // can be indented, the last symbol can be repeated multiple times
  const regex = new RegExp('^\\s*' + esr(cleanStr) + '$')

  return str => regex.test(str)
}

module.exports = {
  makeStartValidator,
  makeEndValidator
}
