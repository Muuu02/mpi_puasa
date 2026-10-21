import React, { useState } from 'react';
import { ShieldCheck, Check, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen6RequirementsProps {
  onNext: () => void;
}

interface QuizCard {
  id: number;
  text: string;
  category: 'syarat_wajib' | 'syarat_sah' | 'bukan_syarat';
  explanation: string;
}

const CARDS: QuizCard[] = [
  { id: 1, text: 'Islam (Bukan Non-Muslim)', category: 'syarat_wajib', explanation: 'Puasa hanya diwajibkan dan diterima dari seorang muslim.' },
  { id: 2, text: 'Baligh (Cukup Umur)', category: 'syarat_wajib', explanation: 'Anak kecil belum wajib puasa penuh, namun dianjurkan berlatih.' },
  { id: 3, text: 'Berakal Sehat (Tidak Gila)', category: 'syarat_wajib', explanation: 'Orang yang hilang akal terbebas dari beban kewajiban syariat (taklif).' },
  { id: 4, text: 'Mampu / Kuat Berpuasa', category: 'syarat_wajib', explanation: 'Orang sakit berat atau lansia renta yang tak mampu boleh mengganti fidyah.' },
  { id: 5, text: 'Tamyiz (Dapat Membedakan Baik & Buruk)', category: 'syarat_sah', explanation: 'Anak yang sudah tamyiz puasanya sah berpahala meski belum baligh.' },
  { id: 6, text: 'Suci dari Haid dan Nifas', category: 'syarat_sah', explanation: 'Wanita yang haid atau nifas tidak sah berpuasa dan wajib mengqadha di luar Ramadan.' },
  { id: 7, text: 'Waktu yang Diperbolehkan Berpuasa', category: 'syarat_sah', explanation: 'Tidak sah berpuasa pada hari tasyrik dan dua hari raya (Idulfitri & Iduladha).' },
  { id: 8, text: 'Harus Memiliki Pakaian Baru', category: 'bukan_syarat', explanation: 'Bukan syarat puasa! Puasa adalah ibadah batin dan menahan diri.' },
  { id: 9, text: 'Harus Sahur dengan Makanan Mewah', category: 'bukan_syarat', explanation: 'Bukan syarat! Sahur dengan seteguk air putih pun sudah mendapatkan sunah.' },
];

export const Screen6Requirements: React.FC<Screen6RequirementsProps> = ({ onNext }) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<'eksplorasi' | 'kuis'>('eksplorasi');

  const toggleSelectCard = (id: number) => {
    sound.playClick();
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((c) => c !== id));
    } else {
      setSelectedCards([...selectedCards, id]);
    }
    setShowFeedback(false);
  };

  const verifySelection = () => {
    setShowFeedback(true);
    const validSelected = selectedCards.every((id) => {
      const card = CARDS.find((c) => c.id === id);
      return card && card.category !== 'bukan_syarat';
    });
    if (validSelected && selectedCards.length >= 6) {
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
              <span>Ketentuan Puasa</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              A2: Syarat Wajib & Syarat Sah Puasa
            </h1>
            <p className="text-xs text-slate-600">
              Pahami perbedaan mendasar antara syarat yang mewajibkan puasa dan syarat agar puasa dianggap sah.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab(activeTab === 'eksplorasi' ? 'kuis' : 'eksplorasi');
              }}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              {activeTab === 'eksplorasi' ? 'Buka Kuis Interaktif PID' : 'Buka Tabel Materi'}
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNext();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Lanjut: Rukun Puasa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'eksplorasi' ? (
        /* Visual Overview of Requirements */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Syarat Wajib */}
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Syarat Wajib Puasa</h3>
                <p className="text-xs text-slate-500">Hal yang membuat seseorang diwajibkan berpuasa</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-0.5">
                <span className="font-bold text-emerald-900 block">1. Beragama Islam</span>
                Puasa Ramadan tidak diwajibkan atas orang non-muslim.
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-0.5">
                <span className="font-bold text-emerald-900 block">2. Baligh (Cukup Umur)</span>
                Telah mencapai usia baligh (anak-anak belum wajib, tetapi dilatih berpuasa bertahap).
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-0.5">
                <span className="font-bold text-emerald-900 block">3. Berakal Sehat</span>
                Orang yang gila, pingsan lama, atau hilang ingatan tidak dikenai kewajiban berpuasa.
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-0.5">
                <span className="font-bold text-emerald-900 block">4. Mampu (Kuat Berpuasa)</span>
                Orang yang sakit berat atau lansia tua renta yang tidak mampu boleh berbuka dan membayar fidyah.
              </div>
            </div>
          </div>

          {/* Syarat Sah */}
          <div className="bg-white rounded-2xl border border-teal-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Check className="w-6 h-6 text-teal-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Syarat Sah Puasa</h3>
                <p className="text-xs text-slate-500">Hal yang membuat ibadah puasa seseorang sah diterima</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 space-y-0.5">
                <span className="font-bold text-teal-900 block">1. Beragama Islam</span>
                Ibadah puasa hanya sah dilakukan oleh orang yang beriman kepada Allah SWT.
              </div>
              <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 space-y-0.5">
                <span className="font-bold text-teal-900 block">2. Mumayyiz / Tamyiz</span>
                Dapat membedakan mana perbuatan yang baik dan yang buruk (biasanya usia 7 tahun ke atas).
              </div>
              <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 space-y-0.5">
                <span className="font-bold text-teal-900 block">3. Suci dari Haid dan Nifas</span>
                Khusus wanita, apabila dalam masa haid atau nifas maka haram dan tidak sah berpuasa (wajib qadha).
              </div>
              <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 space-y-0.5">
                <span className="font-bold text-teal-900 block">4. Pada Waktu yang Boleh Berpuasa</span>
                Tidak dilakukan pada hari terlarang (dua hari raya Idulfitri & Iduladha, serta hari tasyrik 11, 12, 13 Dzulhijjah).
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Interactive PID Section: Pilih yang Termasuk Syarat */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Interaksi PID: “Pilih Semua Kartu yang Termasuk Syarat Puasa”
            </h3>
            <p className="text-xs text-slate-500">
              Sentuh kartu di bawah yang merupakan syarat wajib atau syarat sah puasa (hindari yang bukan syarat).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedCards([]);
                setShowFeedback(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={verifySelection}
              className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm cursor-pointer"
            >
              Cek Pemahaman
            </button>
          </div>
        </div>

        {/* 9 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CARDS.map((card) => {
            const isSelected = selectedCards.includes(card.id);
            const isWrong = showFeedback && isSelected && card.category === 'bukan_syarat';
            const isMissed = showFeedback && !isSelected && card.category !== 'bukan_syarat';
            const isCorrect = showFeedback && isSelected && card.category !== 'bukan_syarat';

            return (
              <button
                key={card.id}
                onClick={() => toggleSelectCard(card.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? isWrong
                      ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-400'
                      : isCorrect
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400'
                      : 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-600/30'
                    : isMissed
                    ? 'bg-amber-50/50 border-amber-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Kartu #{card.id}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-emerald-700 text-white' : 'border border-slate-300'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-snug">{card.text}</p>
                </div>

                {showFeedback && (
                  <p
                    className={`text-[11px] mt-2 pt-2 border-t leading-relaxed ${
                      card.category === 'bukan_syarat'
                        ? 'text-rose-700 border-rose-200'
                        : 'text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {card.explanation}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
