const fs = require('fs')

const adaptorMap = new Map([
  ['js', require('src/js')]
])

function getLangByPath (path) {
  const chunks = path.split('.')
  if (chunks.length > 1) {
    return chunks.pop()
  }
  return null
}

function getLangAdaptorByPath (path) {
  const lang = getLangByPath(path)
  if (!lang) return null
  const adaptor = Map.get(lang)
  if (adaptor === undefined) {
    throw new Error(`language detected, but no adaptor assigned for: ${path}`)
  }
  return adaptor
}

function parseFile (app, path) {
  const adaptor = getLangAdaptorByPath(path)
  if (!adaptor) return null
  const contents = fs.readFileSync(path, app.config.encoding)
  return adaptor.parseStr(contents)
}

module.exoprts = {
  adaptorMap,
  getLangByPath,
  getLangAdaptorByPath,
  parseFile
}
