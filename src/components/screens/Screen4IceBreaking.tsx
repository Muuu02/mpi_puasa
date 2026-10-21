import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle, Info } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen4IceBreakingProps {
  onNext: () => void;
}

interface CardItem {
  id: string;
  text: string;
  isPrep: boolean;
  explanation: string;
}

const INITIAL_CARDS: CardItem[] = [
  { id: 'c1', text: 'Bangun sahur sebelum azan Subuh', isPrep: true, explanation: 'Sahur memberi energi fisik dan mengandung keberkahan sunah.' },
  { id: 'c2', text: 'Berniat puasa di dalam hati sejak malam', isPrep: true, explanation: 'Niat adalah rukun penting sebelum memulai ibadah puasa.' },
  { id: 'c3', text: 'Memilih menu sahur yang bergizi & cukup minum air', isPrep: true, explanation: 'Menjaga kesehatan fisik agar mampu beraktivitas saat berpuasa.' },
  { id: 'c4', text: 'Membiasakan berkata jujur dan sabar', isPrep: true, explanation: 'Melatih batin dan akhlak untuk menjaga pahala puasa.' },
  { id: 'c5', text: 'Bermain game online seharian sampai lalai salat', isPrep: false, explanation: 'Lalai salat dan buang waktu justru mengurangi kemuliaan ibadah.' },
  { id: 'c6', text: 'Tidur seharian penuh agar tidak terasa lapar', isPrep: false, explanation: 'Puasa bukan alasan bermalas-malasan dan melalaikan kewajiban.' },
  { id: 'c7', text: 'Membeli petasan untuk diledakkan menjelang maghrib', isPrep: false, explanation: 'Membahayakan diri sendiri dan mengganggu ketenangan masyarakat.' },
  { id: 'c8', text: 'Mempersiapkan mushaf Al-Qur’an untuk tilawah', isPrep: true, explanation: 'Memperbanyak amal ibadah dan tadarus di bulan Ramadan.' },
];

export const Screen4IceBreaking: React.FC<Screen4IceBreakingProps> = ({ onNext }) => {
  const [unassigned, setUnassigned] = useState<CardItem[]>(INITIAL_CARDS);
  const [prepBox, setPrepBox] = useState<CardItem[]>([]);
  const [notPrepBox, setNotPrepBox] = useState<CardItem[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const moveToPrep = (card: CardItem) => {
    sound.playClick();
    setUnassigned((prev) => prev.filter((c) => c.id !== card.id));
    setNotPrepBox((prev) => prev.filter((c) => c.id !== card.id));
    setPrepBox((prev) => [...prev.filter((c) => c.id !== card.id), card]);
    setIsChecked(false);
  };

  const moveToNotPrep = (card: CardItem) => {
    sound.playClick();
    setUnassigned((prev) => prev.filter((c) => c.id !== card.id));
    setPrepBox((prev) => prev.filter((c) => c.id !== card.id));
    setNotPrepBox((prev) => [...prev.filter((c) => c.id !== card.id), card]);
    setIsChecked(false);
  };

  const moveToUnassigned = (card: CardItem) => {
    sound.playClick();
    setPrepBox((prev) => prev.filter((c) => c.id !== card.id));
    setNotPrepBox((prev) => prev.filter((c) => c.id !== card.id));
    setUnassigned((prev) => [...prev, card]);
    setIsChecked(false);
  };

  const resetAll = () => {
    sound.playClick();
    setUnassigned(INITIAL_CARDS);
    setPrepBox([]);
    setNotPrepBox([]);
    setIsChecked(false);
  };

  const checkAnswers = () => {
    setIsChecked(true);
    const prepCorrect = prepBox.every((c) => c.isPrep);
    const notPrepCorrect = notPrepBox.every((c) => !c.isPrep);
    if (prepCorrect && notPrepCorrect && unassigned.length === 0) {
      sound.playSuccess();
    } else {
      sound.playNudge();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <Sparkles className="w-4 h-4" />
              <span>Aktivitas Pemanasan Awal (Ice Breaking)</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Sentuh & Geser di PID</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Pilah Kartu: “Persiapan Puasa Ramadan”
            </h1>
            <p className="text-xs text-slate-600">
              Sentuh tombol hijau (Persiapan Puasa) atau merah (Bukan Persiapan) pada setiap kartu kegiatan di bawah.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Kartu</span>
            </button>
            <button
              onClick={checkAnswers}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Periksa Hasil</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNext();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Lanjut ke Materi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Teacher note callout */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Catatan Guru:</strong> Ice breaking ini bersifat pemantik diskusi awal untuk menggugah rasa ingin tahu siswa kelas 5. Jangan terburu-buru menganggap setiap pilihan sebagai syarat atau rukun sah puasa sebelum masuk materi formal.
          </p>
        </div>
      </div>

      {/* Unassigned Cards Deck */}
      {unassigned.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Kartu Kegiatan yang Perlu Dipilah ({unassigned.length} Tersisa):
            </h3>
            <span className="text-[11px] text-slate-500">Sentuh wadah tujuan untuk memindahkan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {unassigned.map((card) => (
              <div
                key={card.id}
                className="bg-white border border-slate-300 rounded-xl p-3 shadow-xs flex flex-col justify-between space-y-2 hover:border-emerald-500 transition-all"
              >
                <p className="text-xs font-bold text-slate-800 leading-snug">{card.text}</p>
                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => moveToPrep(card)}
                    className="flex-1 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 font-bold text-[10px] rounded-lg transition-colors border border-emerald-200 cursor-pointer"
                  >
                    ✓ Persiapan
                  </button>
                  <button
                    onClick={() => moveToNotPrep(card)}
                    className="flex-1 py-1.5 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-800 font-bold text-[10px] rounded-lg transition-colors border border-rose-200 cursor-pointer"
                  >
                    ✕ Bukan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Sorting Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bucket 1: Persiapan Puasa */}
        <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-2xl p-5 space-y-3 min-h-[220px]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              Berkaitan dengan Persiapan Puasa ({prepBox.length})
            </h3>
            <span className="text-[11px] text-emerald-700">Kegiatan Positif</span>
          </div>

          <div className="space-y-2">
            {prepBox.length === 0 ? (
              <div className="border border-dashed border-emerald-300 rounded-xl p-6 text-center text-xs text-emerald-700/70">
                Sentuh "✓ Persiapan" pada kartu di atas untuk memindahkan ke sini
              </div>
            ) : (
              prepBox.map((card) => {
                const isWrong = isChecked && !card.isPrep;
                return (
                  <div
                    key={card.id}
                    className={`bg-white border p-3 rounded-xl shadow-xs flex items-center justify-between gap-2 transition-all ${
                      isChecked
                        ? isWrong
                          ? 'border-rose-400 bg-rose-50/50'
                          : 'border-emerald-500 bg-emerald-50/50'
                        : 'border-emerald-200'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900">{card.text}</p>
                      {isChecked && (
                        <p className={`text-[11px] ${isWrong ? 'text-rose-700' : 'text-emerald-700'}`}>
                          {card.explanation}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => moveToUnassigned(card)}
                      className="text-xs text-slate-400 hover:text-slate-700 px-2 py-1 rounded bg-slate-50 cursor-pointer"
                      title="Kembalikan"
                    >
                      Batal
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bucket 2: Bukan Persiapan Puasa */}
        <div className="bg-rose-50/60 border-2 border-rose-300 rounded-2xl p-5 space-y-3 min-h-[220px]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              Bukan Persiapan Puasa ({notPrepBox.length})
            </h3>
            <span className="text-[11px] text-rose-700">Kegiatan Kurang Tepat</span>
          </div>

          <div className="space-y-2">
            {notPrepBox.length === 0 ? (
              <div className="border border-dashed border-rose-300 rounded-xl p-6 text-center text-xs text-rose-700/70">
                Sentuh "✕ Bukan" pada kartu di atas untuk memindahkan ke sini
              </div>
            ) : (
              notPrepBox.map((card) => {
                const isWrong = isChecked && card.isPrep;
                return (
                  <div
                    key={card.id}
                    className={`bg-white border p-3 rounded-xl shadow-xs flex items-center justify-between gap-2 transition-all ${
                      isChecked
                        ? isWrong
                          ? 'border-rose-400 bg-rose-50/50'
                          : 'border-emerald-500 bg-emerald-50/50'
                        : 'border-rose-200'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900">{card.text}</p>
                      {isChecked && (
                        <p className={`text-[11px] ${isWrong ? 'text-rose-700' : 'text-emerald-700'}`}>
                          {card.explanation}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => moveToUnassigned(card)}
                      className="text-xs text-slate-400 hover:text-slate-700 px-2 py-1 rounded bg-slate-50 cursor-pointer"
                      title="Kembalikan"
                    >
                      Batal
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
