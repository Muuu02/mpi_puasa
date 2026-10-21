import React, { useState } from 'react';
import { Sunrise, Sunset, Heart, Coffee, HelpCircle, ArrowRight, MessageSquareQuote } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen2CoverProps {
  onNext: () => void;
}

export const Screen2Cover: React.FC<Screen2CoverProps> = ({ onNext }) => {
  const [activePrompt, setActivePrompt] = useState<number | null>(null);

  const interactiveHotspots = [
    {
      id: 1,
      title: '1. Terbit Fajar (Imsak & Subuh)',
      icon: Sunrise,
      badge: 'Batas Awal',
      bgClass: 'bg-amber-500/10 text-amber-700 border-amber-200',
      question: 'Kapan tepatnya puasa dimulai? Apakah kita masih boleh makan setelah fajar shadiq (azan Subuh) terbit?',
      clue: 'Puasa dimulai sejak terbit fajar shadiq sampai maghrib. Waktu imsak (10 menit sebelum subuh) adalah kehati-hatian agar kita bersiap menahan diri.'
    },
    {
      id: 2,
      title: '2. Terbenam Matahari (Maghrib)',
      icon: Sunset,
      badge: 'Batas Akhir',
      bgClass: 'bg-orange-500/10 text-orange-700 border-orange-200',
      question: 'Tanda alam apa yang menandakan waktu berpuasa hari itu telah tuntas?',
      clue: 'Terbenamnya seluruh piringan matahari di ufuk barat yang diiringi dengan berkumandangnya azan Maghrib.'
    },
    {
      id: 3,
      title: '3. Niat di Malam Hari',
      icon: Heart,
      badge: 'Rukun Batin',
      bgClass: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
      question: 'Jika seseorang berpuasa seharian tanpa ada niat di malam hari karena lupa, apakah puasanya sah?',
      clue: 'Niat adalah rukun pokok puasa wajib. Niat harus dilakukan pada malam hari (tabyit an-niyyah) sebelum terbit fajar.'
    },
    {
      id: 4,
      title: '4. Berbuka Puasa (Iftar)',
      icon: Coffee,
      badge: 'Kebahagiaan Berbuka',
      bgClass: 'bg-teal-500/10 text-teal-700 border-teal-200',
      question: 'Mengapa Rasulullah SAW mengajarkan kita untuk menyegerakan berbuka dengan doa dan kurma atau air?',
      clue: 'Menyegerakan berbuka adalah sunah utama yang menunjukkan rasa syukur dan menjaga kebugaran tubuh setelah seharian beribadah.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Chapter Cover Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
              <span>BAB 4</span>
              <span aria-hidden="true">·</span>
              <span>PAI & Budi Pekerti Kelas 5</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Pendidikan Agama Islam</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
              BAB 4: Puasa Wajib dan Puasa Sunah
            </h1>
            <p className="text-sm font-semibold text-emerald-800 mt-1">
              Fokus Pembelajaran Hari Ini: <span className="underline decoration-emerald-500 underline-offset-4">Bagian A. Puasa Wajib</span>
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 shrink-0 cursor-pointer"
          >
            <span>Tujuan & Peta Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Big Essential Question Card */}
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Pertanyaan Pemantik Hari Ini
              </span>
              <h2 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                “Selain menahan lapar dan haus, apa yang perlu kita ketahui agar puasa wajib dapat dilakukan dengan benar?”
              </h2>
              <p className="text-xs text-slate-600">
                Ayo sentuh 4 ilustrasi momen puasa di bawah ini pada layar PID untuk membuka bahan diskusi kelas!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Hotspot Cards for PID Touch */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          Sentuh Momen Puasa di Papan Interaktif (PID):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {interactiveHotspots.map((item) => {
            const Icon = item.icon;
            const isSelected = activePrompt === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playChime();
                  setActivePrompt(isSelected ? null : item.id);
                }}
                className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 shadow-md scale-[1.02]'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-lg border ${item.bgClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {item.title}
                  </h4>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-emerald-700' : 'text-slate-500'}>
                    {isSelected ? 'Tutup Diskusi' : 'Sentuh untuk Tanya'}
                  </span>
                  <span className="text-emerald-600">{isSelected ? '▲' : '▼'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Pop-up Discussion Drawer when student touches a card */}
      {activePrompt !== null && (
        <div className="bg-white rounded-xl border border-emerald-300 p-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {(() => {
            const current = interactiveHotspots.find((h) => h.id === activePrompt);
            if (!current) return null;
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Diskusi Kelas #{current.id}: {current.title}
                  </span>
                  <button
                    onClick={() => setActivePrompt(null)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Tutup
                  </button>
                </div>
                <div className="bg-emerald-50/70 p-3.5 rounded-lg border border-emerald-100 text-sm font-semibold text-emerald-950">
                  ❓ "{current.question}"
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-700 leading-relaxed border border-slate-200">
                  <strong className="text-slate-900">Kata Kunci Fiqih:</strong> {current.clue}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
