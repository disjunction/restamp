const fs = require('fs')

function getFileContents (path) {
  return fs.readFileSync(path, 'utf8')
}

module.exports = {
  getFileContents
}
