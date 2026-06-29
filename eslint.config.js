const { readFileSync } = require('node:fs')
const path = require('node:path')

const gitignore = readFileSync(path.join(__dirname, '.gitignore'), 'utf8')
  .split('\n')
  .filter((line) => line && !line.startsWith('#'))

module.exports = [
  {
    ignores: gitignore,
  },
]
