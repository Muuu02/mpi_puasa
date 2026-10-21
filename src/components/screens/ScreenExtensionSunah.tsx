import React from 'react';
import { ArrowLeft, BookOpen, Calendar, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ScreenExtensionSunahProps {
  onBackToMain: () => void;
  onNavigate: (screenId: number) => void;
}

export const ScreenExtensionSunah: React.FC<ScreenExtensionSunahProps> = ({ onBackToMain, onNavigate }) => {
  const sunnahFasts = [
    {
      name: 'Puasa Senin dan Kamis',
      time: 'Dua kali sepekan (setiap hari Senin & Kamis)',
      virtue: 'Hari di mana amalan manusia diperiksa dan dihadapkan kepada Allah SWT, serta hari kelahiran Nabi Muhammad SAW.'
    },
    {
      name: 'Puasa Ayyamul Bidh',
      time: 'Setiap tanggal 13, 14, dan 15 bulan Hijriyah (saat bulan purnama)',
      virtue: 'Pahalanya seperti berpuasa sepanjang tahun (setiap satu kebaikan dilipatgandakan sepuluh kali).'
    },
    {
      name: 'Puasa 6 Hari di Bulan Syawal',
      time: 'Dilaksanakan setelah hari raya Idulfitri (2 Syawal ke atas)',
      virtue: 'Melengkapi puasa Ramadan agar bernilai pahala puasa setahun penuh.'
    },
    {
      name: 'Puasa Hari Arafah',
      time: 'Tanggal 9 Dzulhijjah (bagi yang tidak sedang berhaji di Arafah)',
      virtue: 'Menghapuskan dosa setahun yang lalu dan setahun yang akan datang.'
    },
    {
      name: 'Puasa Asyura & Tasu’a',
      time: 'Tanggal 9 dan 10 Muharram',
      virtue: 'Menghapuskan dosa setahun yang telah lalu dan mengikuti sunah para Nabi.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>BAB 4 Bagian B</span>
              <span aria-hidden="true">·</span>
              <span>Modul Lanjutan Pembelajaran</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">PAI Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Bagian B: Puasa Sunah (Pengantar & Rencana Lanjutan)
            </h1>
            <p className="text-xs text-slate-600">
              Sesuai storyboard, bagian B ini ditempatkan sebagai rangkaian lanjutan dari Bab 4 yang siap dikembangkan setelah pembahasan puasa wajib tuntas.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                onBackToMain();
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Puasa Wajib</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Note Box */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-950">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
          <Sparkles className="w-4 h-4 text-amber-700" />
          Tinjauan Bab: Apa itu Puasa Sunah?
        </div>
        <p className="leading-relaxed">
          Puasa sunah adalah puasa yang <strong>apabila dikerjakan mendapat pahala dan kemuliaan di sisi Allah SWT, namun apabila tidak dikerjakan tidak berdosa</strong>. Puasa sunah menjadi amalan penyempurna bagi kekurangan ibadah wajib kita.
        </p>
      </div>

      {/* Difference Highlight: Niat Puasa Wajib vs Niat Puasa Sunah */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          Perbedaan Penting Ketentuan Waktu Niat:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <strong className="text-emerald-950 text-xs block font-bold">Puasa Wajib (Ramadan):</strong>
            <p className="text-slate-700 leading-relaxed">
              Wajib berniat di malam hari (sejak maghrib sampai sebelum terbit fajar shadiq). Jika lupa berniat sebelum fajar, maka puasa wajibnya tidak sah.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
            <strong className="text-teal-950 text-xs block font-bold">Puasa Sunah (Senin-Kamis, dsb.):</strong>
            <p className="text-slate-700 leading-relaxed">
              Boleh berniat di pagi hari (setelah terbit fajar hingga sebelum tergelincir matahari/zuhur), asalkan sejak subuh belum makan, minum, atau melakukan hal yang membatalkan.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Cards of Popular Sunnah Fasts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          Macam-Macam Puasa Sunah yang Populer Diajarkan di Kelas 5 SD:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sunnahFasts.map((fast, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Puasa Sunah #{idx + 1}
                </span>
                <h4 className="text-xs font-bold text-slate-900">{fast.name}</h4>
                <p className="text-[11px] font-semibold text-emerald-700">{fast.time}</p>
                <p className="text-[11px] text-slate-600 leading-relaxed pt-1">{fast.virtue}</p>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Siap dieksplorasi pertemuan berikutnya</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher continuation note */}
      <div className="bg-slate-100 rounded-2xl p-5 border border-slate-300 flex items-center justify-between text-xs">
        <p className="text-slate-600">
          Modul puasa sunah dapat diintegrasikan dengan materi lanjutan sesuai dengan perangkat ajar guru.
        </p>
        <button
          onClick={() => {
            sound.playClick();
            onNavigate(1);
          }}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer"
        >
          Kembali ke Beranda Awal
        </button>
      </div>
    </div>
  );
};
