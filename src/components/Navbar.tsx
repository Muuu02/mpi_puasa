import React from 'react';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentScreen: number;
  onNavigate: (screenId: number) => void;
  onOpenTeacherGuide: () => void;
  onOpenRoadmap: () => void;
  onOpenPublishGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenTeacherGuide,
  onOpenRoadmap,
  onOpenPublishGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate(1);
          }}
          className="text-lg font-bold tracking-tight text-emerald-900 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          MPI PAI Kelas 5 SD
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate(1);
            }}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScreen === 1 ? 'text-emerald-800 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : 'hover:text-emerald-800'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenRoadmap();
            }}
            className="transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-emerald-800"
          >
            Peta Materi
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate(5);
            }}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScreen >= 5 && currentScreen <= 12 ? 'text-emerald-800 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : 'hover:text-emerald-800'
            }`}
          >
            Puasa Wajib
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate(13);
            }}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScreen >= 13 && currentScreen <= 15 ? 'text-emerald-800 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : 'hover:text-emerald-800'
            }`}
          >
            Proyek PjBL
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate(16);
            }}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScreen === 16 ? 'text-emerald-800 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : 'hover:text-emerald-800'
            }`}
          >
            Penilaian
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onOpenPublishGuide();
            }}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 active:scale-98 transition-all rounded-lg whitespace-nowrap shrink-0 border border-emerald-300 cursor-pointer flex items-center gap-1.5"
            title="Panduan publikasi ke GitHub Pages & solusi 404"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Publikasi Online</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenTeacherGuide();
            }}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 transition-all rounded-lg whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            Panduan Guru
          </button>
        </div>
      </div>
    </header>
  );
};
