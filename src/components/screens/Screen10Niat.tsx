import React, { useState } from 'react';
import { Volume2, ArrowRight, RotateCcw, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen10NiatProps {
  onNext: () => void;
}

const NIAT_PIECES = [
  { id: 1, text: 'نَوَيْتُ صَوْمَ غَدٍ', translit: 'Nawaitu shauma ghadin', meaning: 'Aku berniat puasa esok hari' },
  { id: 2, text: 'عَنْ أَدَاءِ فَرْضِ', translit: "'an adā'i fardhi", meaning: 'untuk menunaikan kewajiban fardhu' },
  { id: 3, text: 'شَهْرِ رَمَضَانَ', translit: 'syahri Ramadhāna', meaning: 'bulan Ramadan' },
  { id: 4, text: 'هَذِهِ السَّنَةِ', translit: 'hādzihis-sanati', meaning: 'tahun ini' },
  { id: 5, text: 'لِلَّهِ تَعَالَى', translit: "lillāhi ta'ālā", meaning: 'karena Allah Ta\'ala' },
];

export const Screen10Niat: React.FC<Screen10NiatProps> = ({ onNext }) => {
  const [selectedPieces, setSelectedPieces] = useState<number[]>([]);
  const [availableIds, setAvailableIds] = useState<number[]>([3, 1, 5, 2, 4]);
  const [isSuccess, setIsSuccess] = useState(false);

  const playVoice = () => {
    sound.playClick();
    sound.speak("Nawaitu shauma ghadin 'an adaa'i fardhi syahri Ramadhaana haadzihis-sanati lillaahi ta'aalaa", 'ar-SA');
  };

  const handleAddPiece = (id: number) => {
    sound.playClick();
    const updated = [...selectedPieces, id];
    setSelectedPieces(updated);
    setAvailableIds((prev) => prev.filter((i) => i !== id));

    if (updated.length === 5) {
      const isCorrect = updated.every((val, idx) => val === idx + 1);
      if (isCorrect) {
        sound.playSuccess();
        setIsSuccess(true);
      } else {
        sound.playNudge();
      }
    }
  };

  const handleRemovePiece = (id: number) => {
    sound.playClick();
    setSelectedPieces((prev) => prev.filter((i) => i !== id));
    setAvailableIds((prev) => [...prev, id]);
    setIsSuccess(false);
  };

  const resetGame = () => {
    sound.playClick();
    setSelectedPieces([]);
    setAvailableIds([3, 1, 5, 2, 4]);
    setIsSuccess(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>Materi Pokok A3</span>
              <span aria-hidden="true">·</span>
              <span>Lafal & Waktu Berniat</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              A3: Niat Puasa Ramadan
            </h1>
            <p className="text-xs text-slate-600">
              Niat adalah rukun pertama puasa. Tempat niat di dalam hati dan disunahkan melafalkannya dengan lisan.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <span>Lanjut: Doa Berbuka</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Big Niat Display Board */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-800 space-y-5">
        <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
            Bacaan Niat Puasa Ramadan yang Masyhur
          </span>
          <button
            onClick={playVoice}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-emerald-300" />
            <span>Dengarkan Pelafalan</span>
          </button>
        </div>

        {/* Large Arabic Script */}
        <div className="text-center py-4 px-2">
          <p
            dir="rtl"
            className="font-arabic text-2xl sm:text-3xl md:text-4xl leading-[2.2] tracking-wide text-amber-100 font-normal"
          >
            نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلَّهِ تَعَالَى
          </p>
        </div>

        {/* Latin & Meaning */}
        <div className="bg-emerald-900/80 rounded-xl p-4 border border-emerald-800 space-y-2 text-xs">
          <p className="text-emerald-200 italic font-mono text-[11px] leading-relaxed">
            "Nawaitu shauma ghadin 'an adā'i fardhi syahri Ramadhāna hādzihis-sanati lillāhi ta'ālā."
          </p>
          <div className="pt-2 border-t border-emerald-800">
            <strong className="text-emerald-300 block mb-1">Artinya:</strong>
            <p className="text-white text-sm leading-relaxed">
              “Aku berniat puasa esok hari untuk menunaikan fardhu bulan Ramadan tahun ini karena Allah Ta'ala.”
            </p>
          </div>
        </div>
      </div>

      {/* Interactive PID Puzzle: Susun Potongan Niat */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Aktivitas PID: “Susun Potongan Lafal Niat dengan Urutan yang Benar”
              </h3>
              <p className="text-xs text-slate-500">
                Sentuh potongan bacaan di bawah untuk menyusun urutan niat dari awal hingga akhir.
              </p>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi</span>
          </button>
        </div>

        {/* Target Sequence Container */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 min-h-[90px] flex flex-wrap items-center gap-2">
          {selectedPieces.length === 0 ? (
            <p className="text-xs text-slate-400 italic w-full text-center">
              Sentuh potongan kata di bawah untuk menempatkannya di sini...
            </p>
          ) : (
            selectedPieces.map((id, index) => {
              const item = NIAT_PIECES.find((p) => p.id === id);
              if (!item) return null;
              return (
                <button
                  key={id}
                  onClick={() => handleRemovePiece(id)}
                  className="px-3 py-2 bg-emerald-700 text-white rounded-xl shadow-xs text-xs font-semibold hover:bg-emerald-800 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                  title="Sentuh untuk membatalkan"
                >
                  <span className="font-mono text-emerald-200 text-[10px]">{index + 1}.</span>
                  <span dir="rtl" className="font-arabic text-sm">{item.text}</span>
                  <span className="text-[10px] text-emerald-300">✕</span>
                </button>
              );
            })
          )}
        </div>

        {/* Available Puzzle Chunks */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-700">Potongan Tersedia:</span>
          <div className="flex flex-wrap gap-2">
            {availableIds.map((id) => {
              const item = NIAT_PIECES.find((p) => p.id === id);
              if (!item) return null;
              return (
                <button
                  key={id}
                  onClick={() => handleAddPiece(id)}
                  className="p-3 bg-white border border-slate-300 hover:border-emerald-600 rounded-xl transition-all active:scale-95 cursor-pointer text-left shadow-xs"
                >
                  <p dir="rtl" className="font-arabic text-base font-bold text-emerald-900">{item.text}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{item.meaning}</p>
                </button>
              );
            })}
          </div>
        </div>

        {isSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs font-bold text-emerald-950">
              Masya Allah! Potongan niat telah tersusun sempurna dan fasih!
            </p>
          </div>
        )}
      </div>

      {/* Keterangan Waktu Berniat */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          Kapan Waktu Berniat Puasa Wajib?
        </h4>
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-slate-700 leading-relaxed">
          Niat puasa wajib harus dilakukan pada <strong>malam hari (tabyit an-niyyah)</strong>, yaitu antara terbenam matahari (Maghrib) sampai sebelum terbit fajar shadiq (Subuh). Biasanya dilafalkan bersama setelah salat Tarawih atau saat makan sahur.
        </div>
      </div>
    </div>
  );
};
