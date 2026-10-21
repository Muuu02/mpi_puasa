import React, { useState } from 'react';
import { Heart, Sparkles, RotateCcw, ArrowRight, CheckCircle2, BookmarkCheck, BookOpen } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen17ReflectionProps {
  onRestart: () => void;
  onNavigate: (screenId: number) => void;
}

export const Screen17Reflection: React.FC<Screen17ReflectionProps> = ({ onRestart, onNavigate }) => {
  const [reflection1, setReflection1] = useState<string>('');
  const [reflection2, setReflection2] = useState<string>('');
  const [reflection3, setReflection3] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const sampleChoices1 = [
    'Tahu bahwa niat puasa wajib harus di malam hari sebelum fajar.',
    'Paham perbedaan antara syarat wajib dan rukun puasa.',
    'Tahu bahwa makan karena lupa tidak membatalkan puasa.',
    'Menghafal doa berbuka dan adab kurma atau air putih.'
  ];

  const sampleChoices2 = [
    'Menghafal lafal Arab niat dan artinya secara lancar.',
    'Membedakan rukun puasa lahiriah dan batiniah.',
    'Mendalami kasus-kasus fiqih seperti obat tetes dan suntikan.',
    'Merancang karya visual yang lebih komunikatif.'
  ];

  const sampleChoices3 = [
    'Berlatih sabar dan tidak mudah membalas ejekan teman.',
    'Menyisihkan uang jajan untuk paket makanan berbuka bagi yang membutuhkan.',
    'Selalu bersyukur atas makanan dan minuman di rumah.',
    'Melatih kejujuran beribadah walau tidak ada orang yang melihat.'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>Penutupan Pembelajaran</span>
              <span aria-hidden="true">·</span>
              <span>Refleksi Diri & Karakter</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Refleksi Belajar & Pesan Penutup Mutiara Hikmah
            </h1>
            <p className="text-xs text-slate-600">
              Luangkan waktu sejenak untuk memaknai apa yang telah dipelajari hari ini dan bagaimana mengamalkannya dalam hidup sehari-hari.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate(18);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Bagian B: Puasa Sunah (Lanjutan) →</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Interactive Reflection Questions on PID */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            3 Pertanyaan Refleksi Bermakna untuk Murid:
          </h2>
          <span className="text-xs text-slate-500">Pilih opsi cepat atau ketik pemikiranmu</span>
        </div>

        {/* Refleksi 1 */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <label className="text-xs font-bold text-slate-900 block">
            1. “Apa pemahaman baru yang saya dapatkan tentang puasa wajib hari ini?”
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {sampleChoices1.map((c, i) => (
              <button
                type="button"
                key={i}
                onClick={() => {
                  sound.playClick();
                  setReflection1(c);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg border text-left transition-colors cursor-pointer ${
                  reflection1 === c
                    ? 'bg-emerald-700 text-white border-emerald-700 font-semibold'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500'
                }`}
              >
                + {c}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={reflection1}
            onChange={(e) => setReflection1(e.target.value)}
            placeholder="Tuliskan pemahaman barumu di sini..."
            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Refleksi 2 */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <label className="text-xs font-bold text-slate-900 block">
            2. “Bagian materi apa yang masih perlu saya pelajari atau hafalkan lagi?”
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {sampleChoices2.map((c, i) => (
              <button
                type="button"
                key={i}
                onClick={() => {
                  sound.playClick();
                  setReflection2(c);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg border text-left transition-colors cursor-pointer ${
                  reflection2 === c
                    ? 'bg-emerald-700 text-white border-emerald-700 font-semibold'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500'
                }`}
              >
                + {c}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={reflection2}
            onChange={(e) => setReflection2(e.target.value)}
            placeholder="Tuliskan hal yang ingin kamu perdalam..."
            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Refleksi 3 */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <label className="text-xs font-bold text-slate-900 block">
            3. “Hikmah puasa apa yang paling ingin saya praktikkan dalam keseharian di rumah & sekolah?”
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {sampleChoices3.map((c, i) => (
              <button
                type="button"
                key={i}
                onClick={() => {
                  sound.playClick();
                  setReflection3(c);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg border text-left transition-colors cursor-pointer ${
                  reflection3 === c
                    ? 'bg-emerald-700 text-white border-emerald-700 font-semibold'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500'
                }`}
              >
                + {c}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={reflection3}
            onChange={(e) => setReflection3(e.target.value)}
            placeholder="Tuliskan komitmen akhlak muliamu..."
            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] text-slate-500 italic">
            Catatan: Refleksi pribadi ini dapat disimpan sebagai jurnal belajar harian santri.
          </p>
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer"
          >
            Simpan Refleksi ke Jurnal
          </button>
        </div>
      </form>

      {/* Confirmation of Reflection Saved */}
      {submitted && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p>
            <strong>Alhamdulillah!</strong> Refleksi belajarmu telah tersimpan. Semoga ilmu yang dipelajari menjadi berkah dan membentuk kepribadian yang bertakwa.
          </p>
        </div>
      )}

      {/* Pesan Penutup & Mutiara Hikmah */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-800 space-y-4 text-center">
        <Sparkles className="w-8 h-8 text-amber-300 mx-auto" />
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block">
          Pesan Penutup Pembelajaran
        </span>
        <blockquote className="text-lg md:text-xl font-bold font-display max-w-2xl mx-auto leading-relaxed text-amber-100">
          “Puasa wajib dipelajari agar kita memahami ketentuannya dengan benar dan dapat mengambil hikmahnya dalam membentuk akhlak mulia di kehidupan nyata.”
        </blockquote>
        <p className="text-xs text-emerald-200">
          — PAI & Budi Pekerti Kelas 5 SD · Bab 4: Puasa Wajib dan Puasa Sunah
        </p>

        {/* Action Buttons for Ending or Next Steps */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Materi (Ke Beranda)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate(15);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Lihat Galeri Hasil Proyek</span>
          </button>
          <button
            onClick={() => {
              sound.playSuccess();
              onNavigate(18);
            }}
            className="flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 rounded-xl text-xs font-extrabold shadow-md transition-colors cursor-pointer"
          >
            <span>Buka Bagian B: Puasa Sunah (Lanjutan) →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
