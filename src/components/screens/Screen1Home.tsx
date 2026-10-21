import React from 'react';
import { Play, BookOpen, Map, Users, Award, Sparkles, Globe } from 'lucide-react';
import { IMAGES } from '../../data/mpiData';
import { sound } from '../../utils/audio';

interface Screen1HomeProps {
  onNavigate: (screenId: number) => void;
  onOpenTeacherGuide: () => void;
  onOpenRoadmap: () => void;
  onOpenPublishGuide?: () => void;
}

export const Screen1Home: React.FC<Screen1HomeProps> = ({
  onNavigate,
  onOpenTeacherGuide,
  onOpenRoadmap,
  onOpenPublishGuide,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Hero Visual Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-emerald-900/20 bg-emerald-950 text-white min-h-[420px] flex flex-col justify-end p-8 md:p-12">
        <img
          src={IMAGES.heroGate}
          alt="Gerbang Misi Ramadan PAI Kelas 5"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== IMAGES.fallbackHeroGate) {
              img.src = IMAGES.fallbackHeroGate;
            }
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-900/30" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-300">
            <span>PAI & Budi Pekerti Kelas 5 SD</span>
            <span aria-hidden="true">·</span>
            <span>BAB 4: Fiqih Ibadah</span>
            <span aria-hidden="true">·</span>
            <span>Model PjBL</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
            Masuk ke Misi Ramadan: Puasa Wajib dan Puasa Sunah
          </h1>

          <p className="text-sm md:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
            Satu tautan media interaktif untuk pembelajaran dari pembukaan sampai asesmen di Papan Interaktif Digital (PID). Mari pelajari pengertian, syarat, rukun, dalil, hingga pembuatan panduan visual ramah teman sebaya.
          </p>

          {/* Primary Quick Start Action */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playSuccess();
                onNavigate(2);
              }}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm md:text-base rounded-xl shadow-lg hover:shadow-emerald-500/30 active:scale-98 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Mulai Pembelajaran (Layar 2)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenTeacherGuide();
              }}
              className="flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Panduan Guru</span>
            </button>

            {onOpenPublishGuide && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenPublishGuide();
                }}
                className="flex items-center gap-2 px-5 py-3.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white font-semibold text-sm rounded-xl backdrop-blur-md border border-emerald-500/40 transition-all cursor-pointer"
                title="Panduan publikasi ke GitHub Pages & solusi 404"
              >
                <Globe className="w-4 h-4 text-emerald-300" />
                <span>Publikasi Online</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of 4 Direct Access Hubs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => {
            sound.playClick();
            onOpenRoadmap();
          }}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">
              Peta Materi
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Lihat 8 pos belajar runtut dan akses 17 layar materi secara fleksibel.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 mt-4 flex items-center gap-1">
            Buka Navigasi →
          </span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate(5);
          }}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">
              Materi Puasa Wajib
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pengertian, syarat, rukun, QS Al-Baqarah 183, hal pembatal, dan doa.
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-700 mt-4 flex items-center gap-1">
            Mulai Materi A →
          </span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate(13);
          }}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">
              Proyek Kelompok (PjBL)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tantangan Panduan Visual Puasa Wajib, rubrik, dan galeri karya interaktif.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 mt-4 flex items-center gap-1">
            Buka Proyek →
          </span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate(16);
          }}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">
              Penilaian & Refleksi
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Asesmen pemahaman interaktif, jurnal refleksi, dan sertifikat prestasi.
            </p>
          </div>
          <span className="text-xs font-semibold text-purple-700 mt-4 flex items-center gap-1">
            Uji Pemahaman →
          </span>
        </button>
      </div>
    </div>
  );
};
