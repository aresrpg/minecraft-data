/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const assert = require('assert')

require('./version_iterator')((p, versionString, version) => {
  if (version !== '1.16.2') return

  describe(`datagenerators ${versionString}`, () => {
    it('blocks', () => {
      const report = require(path.join(__dirname, 'generated', 'reports', 'blocks.json'))
      const blocks = require(path.join(p, 'blocks.json'))

      const report_names = Object.keys(report).map(name => name.replace('minecraft:', ''))
      const blocks_names = blocks.map(({ name }) => name)

      assert.deepEqual(report_names, blocks_names, 'Blocks names are the same')

      const report_states = Object.values(report).map(({ states }) => ({
        minStateId: states[0].id,
        maxStateId: states[states.length - 1].id
      }))
      const blocks_states = blocks.map(({ minStateId, maxStateId }) => ({ minStateId, maxStateId }))

      assert.deepEqual(report_states, blocks_states, 'Blocks states are the same')
    })
  })
}, ['pc'], '1.13')
