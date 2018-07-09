/*
 * generic ways to parse a provided license file
 * these are used by lang adaptors
 */
const esr = require('escape-string-regexp')
const helper = require('./helper')

function readLicenseFile (path) {
  const licenceContents = helper.getFileContents(path)
  return licenceContents.split('\n')
    .filter(line => line.trim().length)
}

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

function makeContentValidator (licenseLines) {
  const joined = licenseLines.join('\n')
  return candidLines => !!candidLines.join('\n').match(/c/i)
}

module.exports = {
  makeStartValidator,
  makeEndValidator,
  makeContentValidator,
  readLicenseFile
}
