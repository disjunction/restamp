const packageJson = require('../../package.json')
const parser = require('../parser')
const licenseParser = require('../license-parser')
const commander = require('commander')
const config = require('../config-default')

let detectedPath

commander
  .version(packageJson.version)
  .usage('[options] <path>')
  .option('-l, --license <licenseFile>', 'license file')
  .option('--dry-run', 'only show the execution plan')
  .option('-v, --verbose', 'show information about all analysed files')
  .arguments('<path>')
  .action(path => {
    detectedPath = path
    if (detectedPath.length > 1) {
      detectedPath = detectedPath.replace(/\/+$/, '')
    }
    main()
  })
  .parse(process.argv)

if (!detectedPath) {
  throw new Error('no path provided!')
}

function main () {
  const app = {
    context: {
      langs: new Map()
    },
    config
  }

  if (!commander.license) {
    throw new Error('license file required!!')
  }

  const licenseLines = licenseParser.readLicenseFile(commander.license)

  ;['verbose'].forEach(key => config[key] = commander[key]) // eslint-disable-line no-return-assign

  if (commander.dryRun) {
    const candidates = parser.findCandidates(app, detectedPath)
    Array.from(candidates.keys()).forEach(candidate => {
      const adaptor = candidates.get(candidate)
      const task = parser.makeTask(candidate, adaptor, licenseLines)
      if (!commander.verbose && task[0] === '.') return
      console.info(task[0].toUpperCase(), candidate)
    })
  } else {
    throw new Error('only dryRun is supported')
  }
}
