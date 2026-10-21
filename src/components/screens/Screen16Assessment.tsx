import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Printer, HelpCircle, ExternalLink } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen16AssessmentProps {
  onNext: () => void;
}

interface Question {
  id: number;
  type: 'pilihan_ganda' | 'situasi';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'pilihan_ganda',
    question: 'Secara bahasa (etimologi), kata “ash-shiyam” atau puasa memiliki arti...',
    options: [
      'Menahan diri dari segala sesuatu (al-imsak)',
      'Berdoa sepanjang siang dan malam',
      'Membayar zakat dan sedekah',
      'Membersihkan badan dari hadas kecil'
    ],
    correctIndex: 0,
    explanation: 'Shaum secara bahasa berarti menahan diri (al-imsak).'
  },
  {
    id: 2,
    type: 'pilihan_ganda',
    question: 'Batas awal seseorang mulai menahan diri dari segala pembatal puasa adalah saat...',
    options: [
      'Matahari tepat di atas kepala (zuhur)',
      'Terbit fajar shadiq (masuk waktu Subuh)',
      'Pukul 06.00 pagi saat berangkat ke sekolah',
      'Saat selesai membaca niat di malam hari'
    ],
    correctIndex: 1,
    explanation: 'Puasa dimulai dari terbitnya fajar shadiq sampai matahari terbenam.'
  },
  {
    id: 3,
    type: 'pilihan_ganda',
    question: 'Perhatikan firman Allah: “Lā’allakum tattaqūn” di akhir QS. Al-Baqarah: 183. Maksud tujuan puasa tersebut adalah...',
    options: [
      'Supaya dipuji oleh guru dan tetangga',
      'Agar tubuh menjadi lapar',
      'Agar kamu menjadi orang yang bertakwa',
      'Supaya berhemat dalam berbelanja makanan'
    ],
    correctIndex: 2,
    explanation: 'Puncak tujuan puasa adalah meraih derajat takwa (tattaqun).'
  },
  {
    id: 4,
    type: 'situasi',
    question: 'Studi Kasus 1: Hasan berpuasa di bulan Ramadan. Siang hari setelah bermain bola, ia merasa sangat haus lalu membuka kulkas dan minum segelas air es karena benar-benar lupa sedang puasa. Ketika ingat, apa yang harus dilakukan Hasan?',
    options: [
      'Puasanya batal, dan ia boleh makan siang sepuasnya',
      'Puasanya tetap sah, segera berhenti minum, berkumur, dan melanjutkan puasanya',
      'Puasanya batal dan harus membayar denda memerdekakan budak',
      'Harus langsung pulang dan membatalkan puasa hari itu'
    ],
    correctIndex: 1,
    explanation: 'Makan dan minum karena lupa tidak membatalkan puasa karena merupakan rezeki dari Allah.'
  },
  {
    id: 5,
    type: 'situasi',
    question: 'Studi Kasus 2: Fatimah berniat puasa Ramadan di dalam hatinya pada pukul 21.00 setelah salat Tarawih. Apakah niat puasa Fatimah sah menurut ketentuan puasa wajib?',
    options: [
      'Tidak sah, karena niat puasa harus diucapkan tepat saat azan Subuh',
      'Sah, karena untuk puasa wajib niat boleh dilakukan sejak malam hari sebelum fajar',
      'Tidak sah, harus diulang setelah makan sahur',
      'Hanya sah jika diucapkan di hadapan imam masjid'
    ],
    correctIndex: 1,
    explanation: 'Puasa wajib mensyaratkan tabyit an-niyyah (niat di malam hari antara maghrib hingga fajar).'
  },
  {
    id: 6,
    type: 'pilihan_ganda',
    question: 'Manakah di antara pilihan berikut yang merupakan dua Rukun Pokok Puasa?',
    options: [
      'Islam dan Baligh',
      'Niat di malam hari dan Menahan Diri (Imsak) sejak fajar sampai maghrib',
      'Makan sahur dan menyegerakan berbuka',
      'Tamyiz dan suci dari haid'
    ],
    correctIndex: 1,
    explanation: 'Dua rukun pokok puasa adalah Niat dan Menahan diri (Imsak).'
  }
];

export const Screen16Assessment: React.FC<Screen16AssessmentProps> = ({ onNext }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');

  const handleSelect = (qId: number, optIdx: number) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIdx });
  };

  const calculateScore = () => {
    let correctCount = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / QUESTIONS.length) * 100);
  };

  const submitQuiz = () => {
    sound.playSuccess();
    setIsSubmitted(true);
  };

  const resetQuiz = () => {
    sound.playClick();
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>Evaluasi & Asesmen Formatif</span>
              <span aria-hidden="true">·</span>
              <span>Uji Pemahaman Mandiri & Kelompok</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Asesmen Pemahaman: Puasa Wajib Kelas 5
            </h1>
            <p className="text-xs text-slate-600">
              Kerjakan 6 soal pemahaman konseptual dan studi kasus kehidupan sehari-hari secara interaktif di layar PID.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isSubmitted && (
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Tes</span>
              </button>
            )}
            <button
              onClick={() => {
                sound.playClick();
                onNext();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Refleksi & Penutup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Student Name Input for Certificate */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <label className="font-bold text-slate-700 whitespace-nowrap">Nama Siswa / Kelompok:</label>
          <input
            type="text"
            placeholder="Masukkan nama untuk sertifikat..."
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="p-2 border border-slate-300 rounded-lg text-xs w-64 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <span className="text-slate-500 text-[11px]">
          {Object.keys(selectedAnswers).length} dari {QUESTIONS.length} Soal Dijawab
        </span>
      </div>

      {/* Question Cards */}
      <div className="space-y-4">
        {QUESTIONS.map((q, idx) => {
          const userAns = selectedAnswers[q.id];
          const isCorrect = userAns === q.correctIndex;
          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-rose-50/60 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Soal {idx + 1} ({q.type === 'situasi' ? 'Studi Kasus' : 'Konsep Fiqih'})
                </span>
                {isSubmitted && (
                  <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {isCorrect ? 'Benar (+17 Poin)' : 'Kurang Tepat'}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-3 leading-snug">{q.question}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAns === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={isSubmitted}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                        isSelected
                          ? isSubmitted
                            ? optIdx === q.correctIndex
                              ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                              : 'bg-rose-600 text-white border-rose-600 font-bold'
                            : 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600 text-emerald-950 font-bold'
                          : isSubmitted && optIdx === q.correctIndex
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-md border border-current flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="mt-3 p-3 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Pembahasan Fiqih:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button or Score Results */}
      {!isSubmitted ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center justify-between">
          <p className="text-xs text-slate-600">
            Pastikan seluruh soal telah dijawab bersama sebelum menekan tombol periksa nilai.
          </p>
          <button
            onClick={submitQuiz}
            disabled={Object.keys(selectedAnswers).length === 0}
            className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              Object.keys(selectedAnswers).length > 0
                ? 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm active:scale-98'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Kirim & Periksa Nilai
          </button>
        </div>
      ) : (
        /* Printable Certificate & Result Banner */
        <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-800 space-y-4 print-area">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                Hasil Asesmen Fiqih Puasa Wajib
              </span>
              <h2 className="text-xl md:text-2xl font-bold font-display text-white mt-1">
                {studentName ? `Sertifikat Santri: ${studentName}` : 'Sertifikat Kelulusan Belajar'}
              </h2>
            </div>
            <div className="bg-emerald-800/80 px-5 py-2.5 rounded-xl border border-emerald-600 text-right">
              <span className="text-[10px] text-emerald-200 block uppercase font-bold">Skor Pemahaman</span>
              <span className="text-3xl font-extrabold font-mono text-amber-300">{score}</span>
              <span className="text-xs text-emerald-200"> / 100</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
              <span className="text-emerald-300 block mb-0.5">Status Ketuntasan:</span>
              <strong className="text-white text-sm">
                {score >= 75 ? '✓ TUNTAS (Mencapai TP)' : 'Perlu Remedial Terbimbing'}
              </strong>
            </div>
            <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
              <span className="text-emerald-300 block mb-0.5">Materi Terkuasai:</span>
              <strong className="text-white text-sm">Pengertian, Rukun, QS 183</strong>
            </div>
            <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
              <span className="text-emerald-300 block mb-0.5">Tindak Lanjut:</span>
              <strong className="text-white text-sm">Siap Lanjut ke Puasa Sunah (Bagian B)</strong>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Hasil Asesmen</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
