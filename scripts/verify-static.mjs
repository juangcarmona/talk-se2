import { cpSync, readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'

// The source workflow diagram remains published even though its scene was retired.
cpSync('deck/public/pdac-reference-workflow.png', 'dist/assets/pdac-reference-workflow.png')

const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const originals = readdirSync('deck/public')
const built = new Set(readdirSync('dist/assets').map(name => hash(readFileSync(`dist/assets/${name}`))))
for (const name of originals) {
  if (!built.has(hash(readFileSync(`deck/public/${name}`)))) throw Error(`Original asset not published: ${name}`)
}
const html = readFileSync('dist/index.html', 'utf8')
if (!html.includes('id="root"') || !html.includes('./assets/')) throw Error('Invalid standalone entry')
const output = readdirSync('dist/assets').filter(name => /\.(js|css)$/.test(name)).map(name => readFileSync(`dist/assets/${name}`, 'utf8')).join('\n')
const notes = readFileSync('content/speaker-notes.md', 'utf8')
for (const block of notes.split(/^## /m).slice(1)) {
  const note = block.split('\n').slice(1).join('\n').trim()
  if (note.length >= 80 && output.includes(note.slice(0, 80))) throw Error('Speaker notes leaked into public bundle')
}
console.log(`Verified standalone entry and ${originals.length} original assets; speaker notes are not bundled.`)
