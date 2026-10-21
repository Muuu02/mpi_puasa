import React, { useState } from 'react';
import { X, Globe, CheckCircle2, AlertCircle, Copy, Terminal, ExternalLink, Sparkles, FolderArchive } from 'lucide-react';
import { sound } from '../utils/audio';

interface PublishGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishGuideModal: React.FC<PublishGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const gitCommands = `# 1. Pastikan semua file tersimpan
git add .
git commit -m "Siap online: perbaikan path base dan favicon"
git push origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-emerald-900 text-white">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-emerald-300" />
            <div>
              <h2 className="text-lg font-bold">Panduan Publikasi Online & Solusi 404</h2>
              <p className="text-xs text-emerald-200">
                Cara mempublikasikan MPI ke GitHub Pages & Google Cloud tanpa error 404
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Diagnostic Box: Why 404 happened */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-amber-950 flex items-center gap-2 text-base">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              Mengapa Error 404 "main.tsx", "favicon.ico", & Gambar Terjadi Sebelumnya?
            </h3>
            <ul className="text-xs text-amber-900 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-700 shrink-0">1. Error 404 main.tsx:</span>
                <span>
                  Di GitHub Pages, jika pengaturan <em>Pages Source</em> dipilih <strong>"Deploy from a branch (root)"</strong>, GitHub hanya menyajikan berkas mentah. Browser menerima file <code className="bg-amber-100 px-1 rounded">main.tsx</code> yang belum dikompilasi oleh Vite, sehingga browser gagal memuat modul TypeScript tersebut.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-700 shrink-0">2. Error 404 Gambar & Aset:</span>
                <span>
                  Sebelumnya URL aset menggunakan path absolut <code className="bg-amber-100 px-1 rounded">/assets/</code> atau <code className="bg-amber-100 px-1 rounded">/images/</code>. Ketika dihosting di subfolder repositori (contoh: <code className="bg-amber-100 px-1 rounded">https://user.github.io/nama-repo/</code>), browser mencari di domain utama dan menghasilkan 404. Sekarang sudah diperbaiki menggunakan <strong>base: './' (relative path)</strong> dan <strong>vektor SVG inline yang kebal 404 100%</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-700 shrink-0">3. Error 404 favicon.ico:</span>
                <span>
                  Kini telah disediakan icon resmi <code className="bg-amber-100 px-1 rounded">favicon.svg</code> dan <code className="bg-amber-100 px-1 rounded">favicon.ico</code> berornamen bulan sabit & bintang emas di folder publik.
                </span>
              </li>
            </ul>
          </div>

          {/* Solution 1: Automated GitHub Actions (Recommended) */}
          <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Solusi Terbaik (Otomatis)
                </span>
                <h4 className="font-bold text-emerald-950 text-base">
                  Publikasi Otomatis via GitHub Actions
                </h4>
              </div>
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Kami telah menambahkan berkas otomatisasi <code className="bg-white border px-1.5 py-0.5 rounded text-emerald-800 font-mono">.github/workflows/deploy.yml</code> di dalam repositori ini. Setiap kali Anda melakukan <code>git push</code>, GitHub akan otomatis meng-compile dengan Vite dan merilis website utuh tanpa konfigurasi manual!
            </p>

            <div className="space-y-3 bg-white p-4 rounded-xl border border-emerald-100">
              <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Langkah Cepat Aktifkan di GitHub (Hanya 1 Menit):
              </h5>
              <ol className="text-xs text-slate-700 space-y-2.5 list-decimal pl-4">
                <li>
                  Buka halaman repositori Anda di GitHub (contoh: <code className="text-slate-600">github.com/username/mpi-puasa-kelas5</code>).
                </li>
                <li>
                  Klik tab <strong>Settings</strong> di bagian atas.
                </li>
                <li>
                  Di menu sebelah kiri, klik <strong>Pages</strong>.
                </li>
                <li>
                  Di bawah tulisan <strong>Build and deployment &gt; Source</strong>, ubah pilihan dari <span className="text-rose-600 line-through">"Deploy from a branch"</span> menjadi <strong>"GitHub Actions"</strong>.
                </li>
                <li>
                  <strong>Selesai!</strong> Buka tab <strong>Actions</strong> untuk melihat proses build otomatis. Dalam 1 menit, web game Anda akan aktif di <code className="text-emerald-700 font-semibold">https://username.github.io/nama-repo/</code> dengan semua gambar & materi tampil sempurna!
                </li>
              </ol>
            </div>

            {/* Git Command Snippet */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-emerald-700" /> Perintah Git untuk Push Perubahan:
                </span>
                <button
                  onClick={() => handleCopy(gitCommands, 'git')}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode === 'git' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Salin Perintah
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                {gitCommands}
              </pre>
            </div>
          </div>

          {/* Solution 2: Manual Build / Offline Deployment */}
          <div className="border border-slate-200 bg-slate-50/70 rounded-xl p-5 space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <FolderArchive className="w-4 h-4 text-slate-600" />
              Alternatif: Jalankan Offline di Sekolah (Papan Interaktif Digital)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jika sekolah tidak memiliki koneksi internet stabil saat pembelajaran di kelas:
            </p>
            <ol className="text-xs text-slate-700 space-y-2 list-decimal pl-4">
              <li>
                Jalankan perintah kompilasi di terminal komputer Anda:
                <code className="block bg-slate-900 text-emerald-300 font-mono p-2 rounded mt-1">npm run build</code>
              </li>
              <li>
                Folder hasil bernama <code className="font-mono font-bold text-emerald-800">dist/</code> akan terbuat.
              </li>
              <li>
                Salin seluruh folder <code className="font-mono">dist/</code> ke Flashdisk, lalu colokkan ke PC / Smart TV Papan Interaktif Digital (PID).
              </li>
              <li>
                Buka berkas <code className="font-mono font-bold text-emerald-800">dist/standalone.html</code> langsung dengan Chrome atau Edge. Berkas ini sudah menyatukan CSS &amp; JavaScript di dalam satu file, sehingga berjalan 100% offline tanpa server. (Untuk <code className="font-mono">dist/index.html</code>, gunakan server lokal seperti <code className="font-mono">npm run preview</code> — browser memblokir modul ES dari <code className="font-mono">file://</code>.)
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Konfigurasi Base: <strong className="text-slate-700 font-mono">./ (Relative)</strong> · Fallback: <strong className="text-slate-700">Vector SVG Offline</strong></span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
