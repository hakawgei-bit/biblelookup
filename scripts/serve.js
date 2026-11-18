const { createServer } = require('node:http');
const { readFile } = require('node:fs');
const { extname, isAbsolute, relative, resolve, sep } = require('node:path');

const root = resolve(__dirname, '..');
const port = Number(process.env.PORT || 3000);
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gz': 'application/gzip',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json'
};

createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    res.end('Invalid request URL');
    return;
  }

  const requestedPath = pathname === '/' ? 'index.html' : pathname.slice(1);
  const file = resolve(root, requestedPath);
  const relativePath = relative(root, file);
  if (relativePath === '..' || relativePath.startsWith('..' + sep) || isAbsolute(relativePath)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  readFile(file, (error, contents) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500);
      res.end(error.code === 'ENOENT' ? 'Not found' : 'Unable to read file');
      return;
    }

    res.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': contentTypes[extname(file)] || 'application/octet-stream'
    });
    res.end(req.method === 'HEAD' ? undefined : contents);
  });
}).listen(port, '127.0.0.1', () => {
  console.log('Serving BibleLookup at http://localhost:' + port);
});
