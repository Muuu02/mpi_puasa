import React, { useState } from 'react';
import { Target, CheckSquare, ArrowRight, Layout, FileText, Image as ImageIcon, GitFork, Award } from 'lucide-react';
import { IMAGES, PROJECT_FORMAT_PREVIEWS } from '../../data/mpiData';
import { sound } from '../../utils/audio';

interface Screen13PjBLChallengeProps {
  onNext: () => void;
  onNavigate: (screenId: number) => void;
}

export const Screen13PjBLChallenge: React.FC<Screen13PjBLChallengeProps> = ({ onNext, onNavigate }) => {
  const [selectedFormat, setSelectedFormat] = useState<number>(0);

  const productOptions = [
    {
      id: 0,
      title: '1. Poster Digital Edukasi',
      icon: Layout,
      desc: 'Desain satu lembar bergambar menarik dengan tipografi rapi, ringkasan rukun, dan ilustrasi ibadah puasa.',
      benefit: 'Sangat cocok untuk dipajang di mading kelas atau dibagikan ke grup WhatsApp wali murid.'
    },
    {
      id: 1,
      title: '2. Infografik Runtut',
      icon: FileText,
      desc: 'Bagan berurutan memuat timeline waktu sahur sampai berbuka lengkap dengan dalil dan tips puasa.',
      benefit: 'Memudahkan teman memahami urutan fiqih dari terbit fajar hingga maghrib secara sistematis.'
    },
    {
      id: 2,
      title: '3. Komik Pendek 4 Panel',
      icon: ImageIcon,
      desc: 'Cerita interaksi antara dua sahabat yang saling mengingatkan tentang niat, menahan lapar, dan hikmah berbagi.',
      benefit: 'Menyajikan materi secara jenaka dan kontekstual dengan kehidupan anak usia 10-11 tahun.'
    },
    {
      id: 3,
      title: '4. Peta Konsep / Mind Map',
      icon: GitFork,
      desc: 'Cabang-cabang diagram yang menghubungkan syarat, rukun, hal pembatal, dan hikmah puasa wajib.',
      benefit: 'Membantu visualisasi keterkaitan konsep fiqih secara terstruktur dan komprehensif.'
    }
  ];

  const mandatoryElements = [
    'Pengertian puasa wajib menurut bahasa dan syariat',
    'Syarat wajib & syarat sah serta 2 rukun puasa',
    'Hukum dan dalil Al-Qur’an (QS. Al-Baqarah ayat 183)',
    'Hal-hal yang membatalkan puasa (dan yang tidak membatalkan)',
    'Lafal bacaan niat malam hari dan doa berbuka puasa',
    'Hikmah puasa bagi kehidupan dan pertemanan sehari-hari'
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>Pembelajaran Berbasis Proyek (PjBL)</span>
              <span aria-hidden="true">·</span>
              <span>Karya Kelompok Siswa</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Fase C Kelas 5</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Tantangan Proyek: “Panduan Visual Puasa Wajib untuk Teman Sebaya”
            </h1>
            <p className="text-xs text-slate-600">
              Buatlah karya kreatif yang komunikatif agar teman kelas 5 lainnya dapat memahami ketentuan puasa wajib dengan mudah dan gembira.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate(15);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Lihat Rubrik</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNext();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Lihat Langkah Proyek</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Split: Showcase Poster & 4 Product Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Visual Poster Inspiration */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="p-4 border-b border-slate-100 bg-emerald-50/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
              Contoh Inspirasi Karya
            </span>
            <p className="text-xs text-slate-600">
              {productOptions[selectedFormat].title.replace(/^\d+\.\s*/, '')} — pratinjau format terpilih
            </p>
          </div>
          <div className="p-4 flex-1 flex items-center justify-center bg-slate-50">
            <img
              key={selectedFormat}
              src={PROJECT_FORMAT_PREVIEWS[selectedFormat] ?? IMAGES.projectShowcase}
              alt={`Pratinjau ${productOptions[selectedFormat].title}`}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== IMAGES.fallbackProjectShowcase) {
                  img.src = IMAGES.fallbackProjectShowcase;
                }
              }}
              className="rounded-xl shadow-md max-h-[340px] w-auto object-contain border border-slate-200 animate-in fade-in duration-300"
            />
          </div>
          <div className="p-3 bg-white border-t border-slate-100 text-[11px] text-slate-500 text-center">
            Sentuh format lain di sebelah kanan untuk mengganti pratinjau. Karya jadi dapat dibuat manual atau lewat studio kreasi interaktif di Layar 15.
          </div>
        </div>

        {/* Right Column: 4 Product Format Choices */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              Pilih 1 Format Karya Visual Sesuai Minat Kelompok:
            </h3>
            <p className="text-xs text-slate-500">Sentuh salah satu format untuk melihat karakteristiknya:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {productOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedFormat === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedFormat(opt.id);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md ${isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{opt.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{opt.desc}</p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-emerald-800 font-medium">
                    💡 {opt.benefit}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6 Mandatory Elements Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          Checklist 6 Unsur yang Wajib Dimuat dalam Karya:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {mandatoryElements.map((el, idx) => (
            <div
              key={idx}
              className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-start gap-2 text-xs"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="font-semibold text-emerald-950">{el}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
