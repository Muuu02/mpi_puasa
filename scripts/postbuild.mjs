import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found! Please run vite build first.');
  process.exit(1);
}

// .nojekyll: cegah GitHub Pages memproses output lewat Jekyll
fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf-8');

// Base URL untuk 404.html.
// GitHub Pages menyajikan 404.html pada URL sedalam apa pun, jadi path relatif
// ("./assets/...") akan salah. <base> absolut membuat aset tetap ketemu.
const repo = process.env.GITHUB_REPOSITORY || '';
let base = '/';
if (repo) {
  const [owner, name] = repo.split('/');
  // User/organization site (owner.github.io) dilayani dari root, bukan subfolder.
  const isUserSite = name.toLowerCase() === `${owner.toLowerCase()}.github.io`;
  base = isUserSite ? '/' : `/${name}/`;
}

let html = fs.readFileSync(indexPath, 'utf-8');
html = html.replace(
  '<head>',
  `<head>\n    <base href="${base}" />`
);

fs.writeFileSync(path.join(distDir, '404.html'), html, 'utf-8');
console.log(`\u2713 Generated dist/404.html (base: ${base})`);
console.log('\u2713 Generated dist/.nojekyll');
