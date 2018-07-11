const helper = require('./helper')
const fs = require('fs')

const GenericLang = require('./langs/generic')
const PhpLang = require('./langs/php')

const adaptorMap = new Map([
  ['js', GenericLang],
  ['php', PhpLang]
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
  const contents = helper.getFileContents(path)
  return adaptor.parseStr(contents)
}

function validatePath (path) {
  return !path.match(/node_modules/)
}

function getAdaptorByPath (app, path) {
  const l = app.context.langs
  const matched = path.match(/\.([^.]+)$/)
  if (matched && adaptorMap.has(matched[1])) {
    const AdaptorClass = adaptorMap.get(matched[1])
    const className = AdaptorClass.constructor.name
    if (!l.has(className)) {
      l.set(className, new AdaptorClass(app))
    }
    return l.get(className)
  } else {
    return null
  }
}

function findCandidates (app, path = process.cwd(), candidates = new Map()) {
  const stat = fs.lstatSync(path)
  if (stat.isDirectory()) {
    fs.readdirSync(path)
      .map(filename => `${path}/${filename}`)
      .filter(validatePath)
      .forEach(fullPath => findCandidates(app, fullPath, candidates))
  } else {
    const adaptor = getAdaptorByPath(app, path)
    if (adaptor) {
      candidates.set(path, adaptor)
    }
  }
  return candidates
}

function makeTask (filename, adaptor, licenseLines) {
  const contents = helper.getFileContents(filename)
  return adaptor.parseStr(contents, licenseLines)
}

function executeTask (filename, adaptor, task, licenseLines) {
  const contents = helper.getFileContents(filename)
  const newContents = adaptor.executeTask(contents, task, licenseLines)
  if (newContents !== false) {
    helper.putFileContents(filename, newContents)
  }
}

module.exports = {
  adaptorMap,
  executeTask,
  findCandidates,
  getLangAdaptorByPath,
  getLangByPath,
  makeTask,
  parseFile
}
