import React, { useState } from 'react';
import { BookOpen, Volume2, ArrowRight, HelpCircle, CheckCircle, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen8DalilProps {
  onNext: () => void;
}

interface KeywordChunk {
  arabic: string;
  translit: string;
  meaning: string;
  insight: string;
}

const CHUNKS: KeywordChunk[] = [
  {
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا',
    translit: 'Yā ayyuhalladhīna āmanū',
    meaning: 'Wahai orang-orang yang beriman!',
    insight: 'Panggilan kasih sayang Allah khusus ditujukan kepada orang-orang yang memiliki iman di dadanya.'
  },
  {
    arabic: 'كُتِبَ عَلَيْكُمُ الصِّيَامُ',
    translit: "Kutiba 'alaikumuṣ-ṣiyām",
    meaning: 'Diwajibkan atas kamu berpuasa',
    insight: 'Kata "kutiba" berarti telah diwajibkan secara mutlak (fardhu \'ain) dan tidak boleh ditinggalkan tanpa uzur syar\'i.'
  },
  {
    arabic: 'كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ',
    translit: "Kamā kutiba 'alalladhīna min qablikum",
    meaning: 'Sebagaimana diwajibkan atas orang-orang sebelum kamu',
    insight: 'Umat terdahulu (para nabi sebelum Nabi Muhammad SAW) juga diperintahkan berpuasa untuk membersihkan jiwa.'
  },
  {
    arabic: 'لَعَلَّكُمْ تَتَّقُونَ',
    translit: "La'allakum tattaqūn",
    meaning: 'Agar kamu bertakwa',
    insight: 'Tujuan akhir dan puncak dari ibadah puasa adalah menjadi insan yang bertakwa (menjalankan perintah Allah dan menjauhi larangan-Nya).'
  }
];

export const Screen8Dalil: React.FC<Screen8DalilProps> = ({ onNext }) => {
  const [activeChunk, setActiveChunk] = useState<number | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);

  const playVerseVoice = () => {
    sound.playClick();
    sound.speak(
      "Yaa ayyuhalladziina aamanuu kutiba 'alaikumush shiyaamu kamaa kutiba 'alalladziina min qablikum la'allakum tattaquun",
      'ar-SA'
    );
  };

  const handleQuizAnswer = (optionIdx: number) => {
    sound.playClick();
    setSelectedQuizOption(optionIdx);
    setQuizChecked(true);
    if (optionIdx === 1) {
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
              <span>Materi Pokok A2</span>
              <span aria-hidden="true">·</span>
              <span>Hukum & Dalil Al-Qur’an</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              A2: Hukum & Dalil Puasa Wajib
            </h1>
            <p className="text-xs text-slate-600">
              Puasa Ramadan hukumnya <strong className="text-emerald-800">Fardhu 'Ain</strong> berdasarkan QS. Al-Baqarah ayat 183.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <span>Lanjut: Hal yang Membatalkan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Big Quran Display Box (Designed for Class Visibility on PID) */}
      <div className="bg-gradient-to-b from-emerald-950 to-emerald-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-800 space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Surah Al-Baqarah (2) : Ayat 183</span>
          </div>

          <button
            onClick={playVerseVoice}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-emerald-300" />
            <span>Dengarkan Lafal Ayat</span>
          </button>
        </div>

        {/* Large Crisp Arabic Text */}
        <div className="text-center py-4 px-2">
          <p
            dir="rtl"
            className="font-arabic text-2xl sm:text-3xl md:text-4xl leading-[2.2] tracking-wide text-amber-100 selection:bg-emerald-700 font-normal"
          >
            يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ
          </p>
        </div>

        {/* Transliteration & Indonesian Translation */}
        <div className="bg-emerald-900/80 rounded-xl p-4 border border-emerald-700/60 space-y-2 text-xs">
          <p className="text-emerald-200 italic font-mono text-[11px] leading-relaxed">
            "Yā ayyuhalladhīna āmanū kutiba 'alaikumuṣ-ṣiyāmu kamā kutiba 'alalladhīna min qablikum la'allakum tattaqūn."
          </p>
          <div className="pt-2 border-t border-emerald-800">
            <strong className="text-emerald-300 block mb-1">Terjemahan Resmi Kemenag RI:</strong>
            <p className="text-white text-sm leading-relaxed">
              “Wahai orang-orang yang beriman! Diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang sebelum kamu agar kamu bertakwa.”
            </p>
          </div>
        </div>

        {/* Interactive Word Chunks for PID Touch */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Sentuh Potongan Kalimat untuk Menyingkap Makna & Hikmah:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CHUNKS.map((chunk, idx) => {
              const isSelected = activeChunk === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setActiveChunk(isSelected ? null : idx);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 border-white ring-2 ring-emerald-300 text-white shadow-md'
                      : 'bg-emerald-900/60 border-emerald-800 hover:border-emerald-600 text-emerald-100'
                  }`}
                >
                  <p dir="rtl" className="font-arabic text-base text-amber-200 mb-1">
                    {chunk.arabic}
                  </p>
                  <p className="text-xs font-bold text-white">{chunk.meaning}</p>
                  {isSelected && (
                    <p className="text-[11px] text-emerald-100 mt-2 pt-2 border-t border-emerald-600/60 leading-relaxed">
                      💡 {chunk.insight}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive PID Quiz: Memilih Pesan Utama Dalil */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          Kuis Interaktif: Apa Tujuan Utama Berpuasa Menurut QS. Al-Baqarah: 183?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 0, text: 'Supaya tubuh menjadi lebih langsing dan hemat pengeluaran makanan.' },
            { id: 1, text: 'Agar menjadi insan yang bertakwa kepada Allah SWT (La’allakum Tattaqūn).' },
            { id: 2, text: 'Agar mendapat pujian dari teman sebaya karena kuat menahan lapar.' },
          ].map((opt) => {
            const isSelected = selectedQuizOption === opt.id;
            const isCorrect = opt.id === 1;
            return (
              <button
                key={opt.id}
                onClick={() => handleQuizAnswer(opt.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer text-xs flex flex-col justify-between ${
                  isSelected
                    ? isCorrect
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 text-emerald-950 font-bold'
                      : 'bg-rose-50 border-rose-500 ring-2 ring-rose-300 text-rose-950'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{opt.text}</span>
                {quizChecked && isSelected && (
                  <span className={`text-[11px] mt-2 font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {isCorrect ? '✓ Jawaban Tepat!' : '✕ Belum tepat, coba telusuri ayat di atas.'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
