const { mkdirSync, copyFileSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const output = join(root, 'www');

mkdirSync(output, { recursive: true });
copyFileSync(join(root, 'index.html'), join(output, 'index.html'));

console.log('Built web app in www/');
