import React from 'react';
import { Target, CheckCircle2, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen3ObjectivesProps {
  onNext: () => void;
  onNavigate: (screenId: number) => void;
}

export const Screen3Objectives: React.FC<Screen3ObjectivesProps> = ({ onNext, onNavigate }) => {
  const objectives = [
    {
      id: 1,
      title: 'Menjelaskan Pengertian Puasa Wajib',
      desc: 'Memahami arti puasa secara bahasa (shaum/shiyam) dan syariat Islam dengan benar.',
      targetScreen: 5,
    },
    {
      id: 2,
      title: 'Mengenali Ketentuan: Syarat, Rukun, Hukum & Dalil',
      desc: 'Membedakan syarat wajib & syarat sah, 2 rukun pokok, serta dalil QS. Al-Baqarah ayat 183.',
      targetScreen: 6,
    },
    {
      id: 3,
      title: 'Mengidentifikasi Hal-Hal yang Membatalkan Puasa',
      desc: 'Mampu mengklasifikasikan situasi yang membatalkan, tidak membatalkan, dan yang butuh pendalaman.',
      targetScreen: 9,
    },
    {
      id: 4,
      title: 'Mengenali Bacaan Niat & Doa Berbuka Puasa',
      desc: 'Melafalkan lafal Arab yang benar, latin, waktu berniat, serta adab dan doa saat berbuka.',
      targetScreen: 10,
    },
    {
      id: 5,
      title: 'Menjelaskan Hikmah Puasa melalui Karya Kelompok (PjBL)',
      desc: 'Menghubungkan nilai takwa, sabar, dan empati sosial ke dalam karya panduan visual untuk teman sebaya.',
      targetScreen: 13,
    },
  ];

  const pathwaySteps = [
    { num: '01', label: 'Pengertian', desc: 'Arti Shaum & Syariat', screen: 5 },
    { num: '02', label: 'Ketentuan', desc: 'Syarat & Rukun', screen: 6 },
    { num: '03', label: 'Hukum & Dalil', desc: 'QS. Al-Baqarah 183', screen: 8 },
    { num: '04', label: 'Hal Pembatal', desc: 'Klasifikasi Situasi', screen: 9 },
    { num: '05', label: 'Niat & Berbuka', desc: 'Lafal & Waktu', screen: 10 },
    { num: '06', label: 'Hikmah', desc: 'Nilai & Kepedulian', screen: 12 },
    { num: '07', label: 'Proyek PjBL', desc: 'Panduan Visual', screen: 13 },
    { num: '08', label: 'Penilaian', desc: 'Uji Pemahaman', screen: 16 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <Compass className="w-4 h-4" />
              <span>Kompas Capaian Belajar</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 Fase C</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Tujuan Pembelajaran & Peta Jalur Belajar
            </h1>
            <p className="text-xs text-slate-600">
              Kuasai materi bertahap dari pemahaman konsep fiqih hingga kreasi produk bersama kelompok.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              onNext();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Mulai Pemanasan (Ice Breaking)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Objectives Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600" />
          5 Tujuan Belajar yang Akan Dicapai Hari Ini:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {objectives.map((item, idx) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all flex items-start gap-3 ${
                idx === 4 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.targetScreen);
                }}
                className="text-[11px] font-semibold text-emerald-700 hover:underline shrink-0 cursor-pointer self-center"
              >
                Lihat →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Learning Pathway */}
      <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wide flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-300" />
            Peta Rute Pembelajaran Puasa Wajib (Klik Pos untuk Melompat):
          </h2>
          <span className="text-xs text-emerald-200">8 Pos Belajar Runtut</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {pathwaySteps.map((step) => (
            <button
              key={step.num}
              onClick={() => {
                sound.playClick();
                onNavigate(step.screen);
              }}
              className="p-3 bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-700 rounded-xl text-left transition-all hover:scale-[1.02] flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-extrabold text-emerald-300 block mb-1">
                  POS {step.num}
                </span>
                <p className="text-xs font-bold text-white group-hover:text-emerald-100 leading-tight">
                  {step.label}
                </p>
              </div>
              <p className="text-[10px] text-emerald-200/80 mt-2 line-clamp-1">
                {step.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
