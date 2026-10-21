# MPI PAI Kelas 5 — Puasa Wajib & Sunah

Multimedia Pembelajaran Interaktif (MPI) untuk Papan Interaktif Digital (PID), PAI Kelas 5 SD
BAB 4. Dibangun dengan React 19 + Vite + Tailwind CSS v4.

## Jalankan lokal

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # hasil di dist/
npm run preview  # cek hasil build
```

Hasil build:

| Berkas | Kegunaan |
|---|---|
| `dist/index.html` + `dist/assets/` | Situs utama (GitHub Pages) |
| `dist/404.html` | Fallback rute dalam (sudah diberi `<base>` sesuai repo) |
| `dist/standalone.html` | Satu berkas HTML mandiri (±0,5 MB) untuk dibagikan offline |

## Publikasi ke GitHub Pages

1. Push repo ke GitHub (branch `main`).
2. Buka **Settings → Pages**, pada **Source** pilih **GitHub Actions**.
3. Push ke `main` — workflow `.github/workflows/deploy.yml` membangun dan menerbitkan `dist/`.
4. Situs tersedia di `https://<user>.github.io/<repo>/`.

Jangan memilih *Deploy from a branch*. Itu menyajikan berkas sumber mentah (`src/main.tsx`),
bukan hasil build, sehingga muncul 404 pada `main.tsx`, favicon, dan gambar.

Catatan teknis:

- `base: './'` di `vite.config.ts` membuat aset memakai path relatif, aman untuk subfolder repo.
- `scripts/postbuild.mjs` membuat `404.html` + `.nojekyll`. `<base href>` dihitung dari
  `GITHUB_REPOSITORY` (user site `owner.github.io` memakai `/`, repo biasa memakai `/<repo>/`).
- `npm ci` dipakai di workflow, jadi `package-lock.json` wajib ikut di-commit.
