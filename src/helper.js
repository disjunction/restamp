const fs = require('fs')

function getFileContents (path) {
  return fs.readFileSync(path, 'utf8')
}

function putFileContents (path, str) {
  return fs.writeFileSync(path, str, 'utf8')
}

module.exports = {
  getFileContents,
  putFileContents
}
