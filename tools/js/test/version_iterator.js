module.exports = forEach

const path = require('path')

const minecraftTypes = ['pc', 'pe']

function forEach (f, types = minecraftTypes, startAt) {
  types.forEach((type) => {
    const versions = require('../../../data/' + type + '/common/versions')
    const startIndex = startAt !== undefined ? versions.indexOf(startAt) : 0
    if (startIndex < 0) throw new Error(`Invalid startAt: '${startAt}' `)
    versions.slice(startIndex).forEach((version) => {
      f(path.join(__dirname, '../../../data', type, version), type + ' ' + version, version)
    })
  })
}
