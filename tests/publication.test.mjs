import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'

const hash = bytes => createHash('sha256').update(bytes).digest('hex')

test('the standalone output includes every original visual byte-for-byte', () => {
  const originals = readdirSync('deck/public')
  assert.equal(originals.length, 10)
  const built = new Set(readdirSync('dist/assets').map(name => hash(readFileSync(`dist/assets/${name}`))))
  for (const name of originals) assert.ok(built.has(hash(readFileSync(`deck/public/${name}`))), name)
})
