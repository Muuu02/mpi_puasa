import fs from 'fs';
import path from 'path';

// Menghasilkan satu berkas HTML mandiri: CSS, JS, dan semua gambar ditanam inline
// supaya bisa dibuka langsung dari flashdisk (file://) tanpa server.
const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, 'assets');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found! Please run vite build first.');
  process.exit(1);
}

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
};

const dataUri = (file) =>
  `data:${MIME[path.extname(file).toLowerCase()] || 'application/octet-stream'};base64,${fs
    .readFileSync(file)
    .toString('base64')}`;

let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Inline CSS
const cssMatch = html.match(/<link rel="stylesheet"[^>]*href="\.?\/assets\/([^"]+)"[^>]*>/);
if (cssMatch) {
  const cssPath = path.join(assetsDir, cssMatch[1]);
  if (!fs.existsSync(cssPath)) {
    console.error(`CSS not found: ${cssPath}`);
    process.exit(1);
  }
  html = html.replace(cssMatch[0], () => `<style>\n${fs.readFileSync(cssPath, 'utf-8')}\n</style>`);
  console.log(`✓ Inlined CSS (${cssMatch[1]})`);
}

// 2. Inline JS
const jsMatch = html.match(/<script type="module"[^>]*src="\.?\/assets\/([^"]+)"[^>]*><\/script>/);
if (jsMatch) {
  const jsPath = path.join(assetsDir, jsMatch[1]);
  if (!fs.existsSync(jsPath)) {
    console.error(`JS not found: ${jsPath}`);
    process.exit(1);
  }
  let js = fs.readFileSync(jsPath, 'utf-8');

  // Vite mengubah import gambar menjadi `new URL(\`nama.jpg\`, import.meta.url).href`.
  // Setelah JS ditanam inline, import.meta.url menunjuk ke standalone.html sehingga
  // gambarnya 404. Ganti dengan data URI agar benar-benar mandiri.
  let inlined = 0;
  js = js.replace(
    /new URL\(\s*[`'"]([^`'"]+)[`'"]\s*,\s*import\.meta\.url\s*\)\.href/g,
    (whole, ref) => {
      const file = path.join(assetsDir, path.basename(ref));
      if (!fs.existsSync(file)) return whole;
      inlined++;
      return JSON.stringify(dataUri(file));
    }
  );
  console.log(`✓ Inlined ${inlined} image(s) into JavaScript`);

  html = html.replace(jsMatch[0], () => `<script type="module">\n${js}\n</script>`);
  console.log(`✓ Inlined JavaScript (${jsMatch[1]})`);
}

// 3. Inline favicon agar tidak ada permintaan berkas eksternal
html = html.replace(
  /<link[^>]*rel="(?:icon|alternate icon)"[^>]*href="\.?\/?(favicon\.[a-z]+)"[^>]*\/?>/g,
  (whole, name) => {
    const file = path.join(distDir, name);
    return fs.existsSync(file) ? `<link rel="icon" href="${dataUri(file)}" />` : whole;
  }
);

const outPath = path.join(distDir, 'standalone.html');
fs.writeFileSync(outPath, html, 'utf-8');

const sizeMb = (Buffer.byteLength(html, 'utf-8') / (1024 * 1024)).toFixed(2);
console.log(`✓ Generated dist/standalone.html (${sizeMb} MB)`);
