const GenericLang = require('./generic')

class PhpLang extends GenericLang {
  executeTask (contents, task, licenseLines) {
    if (task[0] === 'a') {
      const lines = contents.split('\n')
      if (lines.length && lines[0] === '<?php') {
        return '<?php\n' + licenseLines.join('\n') + '\n' + lines.slice(1).join('\n')
      } else {
        return '<?php\n' + licenseLines.join('\n') + '\n?>' + contents
      }
    } else {
      return super.executeTask(contents, task, licenseLines)
    }
  }
}

module.exports = PhpLang
