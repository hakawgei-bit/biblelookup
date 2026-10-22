const { mkdirSync, copyFileSync, readdirSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const output = join(root, 'www');

mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'manifest.webmanifest', 'pwa.js', 'sw.js', 'bible-en.json.gz']) {
  copyFileSync(join(root, file), join(output, file));
}

const iconSource = join(root, 'icons');
const iconOutput = join(output, 'icons');
mkdirSync(iconOutput, { recursive: true });
for (const file of readdirSync(iconSource)) {
  copyFileSync(join(iconSource, file), join(iconOutput, file));
}

console.log('Built web app in www/');
