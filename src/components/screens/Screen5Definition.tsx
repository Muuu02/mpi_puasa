import React, { useState } from 'react';
import { BookOpen, CheckCircle, RotateCcw, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen5DefinitionProps {
  onNext: () => void;
}

const CORRECT_ORDER = [
  'Menahan diri',
  'dari segala hal yang membatalkan puasa',
  'mulai terbit fajar shadiq',
  'hingga terbenam matahari',
  'disertai niat ikhlas',
  'karena Allah SWT'
];

export const Screen5Definition: React.FC<Screen5DefinitionProps> = ({ onNext }) => {
  const [availablePieces, setAvailablePieces] = useState<string[]>([
    'hingga terbenam matahari',
    'Menahan diri',
    'disertai niat ikhlas',
    'mulai terbit fajar shadiq',
    'karena Allah SWT',
    'dari segala hal yang membatalkan puasa',
  ]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showQuickCheck, setShowQuickCheck] = useState(false);

  const addPiece = (piece: string) => {
    sound.playClick();
    const updatedUser = [...userSequence, piece];
    setUserSequence(updatedUser);
    setAvailablePieces((prev) => prev.filter((p) => p !== piece));

    if (updatedUser.length === CORRECT_ORDER.length) {
      const isCorrect = updatedUser.every((p, idx) => p === CORRECT_ORDER[idx]);
      if (isCorrect) {
        sound.playSuccess();
        setIsSuccess(true);
      } else {
        sound.playNudge();
      }
    }
  };

  const removePiece = (piece: string) => {
    sound.playClick();
    setUserSequence((prev) => prev.filter((p) => p !== piece));
    setAvailablePieces((prev) => [...prev, piece]);
    setIsSuccess(false);
  };

  const resetGame = () => {
    sound.playClick();
    setUserSequence([]);
    setAvailablePieces([
      'hingga terbenam matahari',
      'Menahan diri',
      'disertai niat ikhlas',
      'mulai terbit fajar shadiq',
      'karena Allah SWT',
      'dari segala hal yang membatalkan puasa',
    ]);
    setIsSuccess(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>Materi Pokok A1</span>
              <span aria-hidden="true">·</span>
              <span>Konsep Dasar Fiqih</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              A1: Pengertian Puasa Wajib
            </h1>
            <p className="text-xs text-slate-600">
              Pelajari definisi menurut bahasa dan istilah syariat, serta susun potongan definisinya di layar PID.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <span>Lanjut: Ketentuan Puasa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dual Language & Terminology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              1. Menurut Bahasa (Etimologi)
            </span>
            <span className="text-sm font-arabic font-bold text-emerald-700">الصِّيَام / الصَّوْم</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Shiyam / Shaum = Menahan Diri
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kata puasa berasal dari bahasa Arab <em>"ash-shiyam"</em> atau <em>"ash-shaum"</em> yang berarti <strong>menahan diri (al-imsak)</strong> dari segala sesuatu, baik menahan makan, minum, maupun menahan berbicara dari perkataan yang sia-sia.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              2. Menurut Istilah Syariat Islam
            </span>
            <span className="text-xs font-semibold text-emerald-600">Fiqih Ibadah</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Menahan Diri Sesuai Ketentuan Syariat
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menahan diri dari segala hal yang membatalkan puasa mulai dari <strong>terbit fajar shadiq (subuh)</strong> sampai <strong>terbenam matahari (maghrib)</strong>, disertai niat karena Allah SWT serta memenuhi syarat dan rukunnya.
          </p>
        </div>
      </div>

      {/* Interactive PID Game: Susun Pengertian */}
      <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-300" />
            <div>
              <h2 className="text-sm font-bold">Aktivitas PID: “Susun Pengertian Puasa Wajib”</h2>
              <p className="text-[11px] text-emerald-200">
                Sentuh potongan kalimat secara berurutan agar membentuk definisi fiqih yang benar
              </p>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Susun Ulang</span>
          </button>
        </div>

        {/* User Workspace (Slot Drop Zone) */}
        <div className="bg-emerald-950/70 border border-emerald-700 rounded-xl p-4 min-h-[90px] flex flex-wrap items-center gap-2">
          {userSequence.length === 0 ? (
            <p className="text-xs text-emerald-300/60 italic w-full text-center">
              Pilih potongan kalimat di bawah untuk menyusun pengertian di sini...
            </p>
          ) : (
            userSequence.map((piece, index) => (
              <button
                key={index}
                onClick={() => removePiece(piece)}
                className="px-3 py-1.5 bg-emerald-500 text-emerald-950 font-bold text-xs rounded-lg shadow-sm hover:bg-emerald-400 transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                title="Sentuh untuk membatalkan"
              >
                <span>{index + 1}. {piece}</span>
                <span className="text-[10px] text-emerald-900/60 font-mono">✕</span>
              </button>
            ))
          )}
        </div>

        {/* Available Pieces */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-emerald-200">
            Potongan Kalimat Tersedia ({availablePieces.length}):
          </span>
          <div className="flex flex-wrap gap-2">
            {availablePieces.map((piece) => (
              <button
                key={piece}
                onClick={() => addPiece(piece)}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-lg border border-white/20 transition-all active:scale-95 cursor-pointer"
              >
                + {piece}
              </button>
            ))}
          </div>
        </div>

        {/* Success Feedback Banner */}
        {isSuccess && (
          <div className="p-4 bg-emerald-600/90 border border-emerald-400 rounded-xl flex items-start gap-3 animate-in fade-in zoom-in-95 duration-200">
            <CheckCircle className="w-5 h-5 text-emerald-100 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <strong className="text-white text-sm font-bold block">
                Alhamdulillah! Urutan Pengertian Sangat Tepat:
              </strong>
              <p className="text-emerald-50 leading-relaxed">
                “Puasa adalah <strong>menahan diri dari segala hal yang membatalkan puasa mulai terbit fajar shadiq hingga terbenam matahari disertai niat ikhlas karena Allah SWT</strong>.”
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cek Cepat & Diskusi Kelas */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            Cek Cepat Diskusi Kelas
          </h3>
          <button
            onClick={() => {
              sound.playClick();
              setShowQuickCheck(!showQuickCheck);
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            {showQuickCheck ? 'Sembunyikan Pembahasan' : 'Buka Pembahasan Guru →'}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-sm font-bold text-slate-900">
            “Apakah puasa hanya berarti tidak makan dan tidak minum saja? Mengapa?”
          </p>
        </div>

        {showQuickCheck && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2 animate-in fade-in duration-200">
            <p className="leading-relaxed">
              <strong>Penjelasan Guru:</strong> Tidak hanya makan dan minum! Puasa sejati juga menahan <strong>lisan</strong> dari perkataan kotor/dusta, menahan <strong>mata</strong> dari pandangan yang dilarang, serta menahan <strong>hati</strong> dari amarah dan iri dengki.
            </p>
            <p className="italic text-emerald-800 text-[11px]">
              Rasulullah SAW bersabda: <em>“Betapa banyak orang berpuasa, tetapi tidak mendapatkan apa-apa dari puasanya selain lapar dan dahaga.”</em> (HR. Ibnu Majah).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
