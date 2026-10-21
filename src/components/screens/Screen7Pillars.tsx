import React, { useState } from 'react';
import { Heart, Sun, ArrowRight, HelpCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen7PillarsProps {
  onNext: () => void;
}

export const Screen7Pillars: React.FC<Screen7PillarsProps> = ({ onNext }) => {
  const [selectedPillar, setSelectedPillar] = useState<'niat' | 'imsak' | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matched, setMatched] = useState<{ [key: string]: string }>({});
  const [showDifference, setShowDifference] = useState(false);

  const definitions = [
    {
      id: 'def_imsak',
      pillarKey: 'imsak',
      title: 'Menahan Diri (Imsak)',
      text: 'Menjaga dan menahan diri dari makan, minum, serta segala hal yang membatalkan puasa sejak fajar shadiq hingga terbenam matahari.',
    },
    {
      id: 'def_niat',
      pillarKey: 'niat',
      title: 'Niat di Malam Hari',
      text: 'Menyengaja di dalam hati untuk menunaikan kewajiban puasa Ramadan karena Allah SWT sebelum terbit fajar shadiq.',
    },
  ];

  const handlePillarClick = (key: 'niat' | 'imsak') => {
    sound.playClick();
    setSelectedPillar(key);
    if (selectedDefinition) {
      checkPair(key, selectedDefinition);
    }
  };

  const handleDefClick = (defId: string) => {
    sound.playClick();
    setSelectedDefinition(defId);
    if (selectedPillar) {
      checkPair(selectedPillar, defId);
    }
  };

  const checkPair = (pillar: 'niat' | 'imsak', defId: string) => {
    const def = definitions.find((d) => d.id === defId);
    if (def && def.pillarKey === pillar) {
      sound.playSuccess();
      setMatched((prev) => ({ ...prev, [pillar]: defId }));
      setSelectedPillar(null);
      setSelectedDefinition(null);
    } else {
      sound.playNudge();
      setSelectedPillar(null);
      setSelectedDefinition(null);
    }
  };

  const resetGame = () => {
    sound.playClick();
    setMatched({});
    setSelectedPillar(null);
    setSelectedDefinition(null);
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
              <span>Rukun Pokok Ibadah</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              A2: Rukun Puasa Wajib
            </h1>
            <p className="text-xs text-slate-600">
              Rukun adalah pilar utama yang wajib ada di dalam ibadah puasa agar sah dan diterima.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <span>Lanjut: Hukum & Dalil</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2 Main Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rukun 1: Niat */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider">
                  RUKUN KE-1
                </span>
                <h3 className="font-bold text-slate-900 text-lg">Niat (النِّيَّةُ)</h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Rukun Batin
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menyengaja di dalam hati untuk berpuasa semata-mata mengharap ridha Allah SWT. Untuk puasa wajib (Ramadan), niat harus dilakukan pada malam hari sebelum terbit fajar shadiq.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 italic">
            Sabda Nabi: "Barang siapa tidak berniat puasa sebelum fajar, maka tiada puasa baginya." (HR. Abu Dawud).
          </div>
        </div>

        {/* Rukun 2: Menahan Diri */}
        <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Sun className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">
                  RUKUN KE-2
                </span>
                <h3 className="font-bold text-slate-900 text-lg">Menahan Diri / Imsak (الإِمْسَاكُ)</h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Rukun Lahiriah
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menahan diri dari segala hal yang membatalkan puasa (makan, minum, muntah disengaja, dll.) mulai dari terbit fajar shadiq hingga terbenam matahari secara penuh.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-amber-800 italic">
            Menahan hawa nafsu fisik dan menjaga anggota tubuh dari perbuatan tercela.
          </div>
        </div>
      </div>

      {/* Interactive PID Matching: Pasangkan Rukun dengan Penjelasannya */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white">
              Aktivitas PID: “Pasangkan Nama Rukun dengan Maknanya”
            </h3>
            <p className="text-xs text-slate-400">
              Sentuh satu kotak Rukun di kiri, lalu sentuh kotak maknanya di kanan untuk memasangkan.
            </p>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Pasangan</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Rukun */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Pilih Rukun:</h4>
            {(['niat', 'imsak'] as const).map((rKey) => {
              const isMatched = !!matched[rKey];
              const isSelected = selectedPillar === rKey;
              return (
                <button
                  key={rKey}
                  onClick={() => !isMatched && handlePillarClick(rKey)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 opacity-90'
                      : isSelected
                      ? 'bg-emerald-600 border-white ring-2 ring-white text-white'
                      : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-sm">
                    {rKey === 'niat' ? 'Rukun 1: Niat Puasa' : 'Rukun 2: Menahan Diri (Imsak)'}
                  </span>
                  {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* Column 2: Definitions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Pilih Makna Penjelasan:</h4>
            {definitions.map((def) => {
              const isMatched = Object.values(matched).includes(def.id);
              const isSelected = selectedDefinition === def.id;
              return (
                <button
                  key={def.id}
                  onClick={() => !isMatched && handleDefClick(def.id)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 opacity-90'
                      : isSelected
                      ? 'bg-emerald-600 border-white ring-2 ring-white text-white'
                      : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200'
                  }`}
                >
                  <strong className="text-xs block text-white mb-1">{def.title}</strong>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{def.text}</p>
                </button>
              );
            })}
          </div>
        </div>

        {Object.keys(matched).length === 2 && (
          <div className="p-3 bg-emerald-600/90 border border-emerald-400 rounded-xl text-xs text-white text-center font-bold">
            ✓ Hebat! Kedua rukun puasa berhasil dipasangkan dengan tepat!
          </div>
        )}
      </div>

      {/* Pertanyaan Guru: Perbedaan Syarat vs Rukun */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            Tanya Guru: “Apa Perbedaan Syarat dan Rukun?”
          </h3>
          <button
            onClick={() => {
              sound.playClick();
              setShowDifference(!showDifference);
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            {showDifference ? 'Sembunyikan' : 'Buka Kunci Perbedaan →'}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900">
            Pertanyaan untuk kelas: “Dua kata ini sering terdengar mirip dalam ibadah. Bagaimana kamu membedakan antara 'Syarat' dan 'Rukun' dengan kalimatmu sendiri?”
          </p>
        </div>

        {showDifference && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <strong className="text-emerald-900 block mb-1">Syarat:</strong>
              Harus dipenuhi <em>sebelum</em> ibadah dimulai (misalnya: Islam, baligh, berakal, suci dari haid). Syarat berada di luar amalan utama.
            </div>
            <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200">
              <strong className="text-teal-900 block mb-1">Rukun:</strong>
              Harus ada dan dikerjakan <em>di dalam proses pelaksanaan</em> ibadah tersebut (yaitu niat dan menahan diri dari fajar sampai maghrib).
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
