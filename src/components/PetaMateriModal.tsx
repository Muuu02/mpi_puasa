import React from 'react';
import { X, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { SCREEN_LIST } from '../data/mpiData';
import { sound } from '../utils/audio';

interface PetaMateriModalProps {
  isOpen: boolean;
  currentScreen: number;
  onClose: () => void;
  onSelectScreen: (screenId: number) => void;
}

export const PetaMateriModal: React.FC<PetaMateriModalProps> = ({
  isOpen,
  currentScreen,
  onClose,
  onSelectScreen,
}) => {
  if (!isOpen) return null;

  const categories = [
    { name: 'Pengantar', range: 'Layar 1 - 4' },
    { name: 'Materi A', range: 'Layar 5 - 12' },
    { name: 'PjBL', range: 'Layar 13 - 15' },
    { name: 'Asesmen & Refleksi', range: 'Layar 16 - 17' },
    { name: 'Bagian B', range: 'Layar 18' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-emerald-900 text-white">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-emerald-300" />
            <div>
              <h2 className="text-lg font-bold">Peta Belajar & Navigasi Layar MPI</h2>
              <p className="text-xs text-emerald-200">
                Pilih pos belajar untuk berpindah secara cepat saat pembelajaran di kelas
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Pathway Flow Diagram */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
              Alur Perjalanan Belajar Puasa Wajib:
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-800">
              <span className="bg-white px-2.5 py-1 rounded border border-emerald-300 shadow-xs">1. Pengertian</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="bg-white px-2.5 py-1 rounded border border-emerald-300 shadow-xs">2. Ketentuan</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="bg-white px-2.5 py-1 rounded border border-emerald-300 shadow-xs">3. Dalil</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="bg-white px-2.5 py-1 rounded border border-emerald-300 shadow-xs">4. Hal Pembatal</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="bg-white px-2.5 py-1 rounded border border-emerald-300 shadow-xs">5. Niat & Berbuka</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="bg-white px-2.5 py-1 rounded border border-emerald-300 shadow-xs">6. Hikmah</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="bg-emerald-700 text-white px-2.5 py-1 rounded shadow-xs">7. Proyek PjBL</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="bg-emerald-800 text-white px-2.5 py-1 rounded shadow-xs">8. Penilaian</span>
            </div>
          </div>

          {/* Categorized Screen Grid */}
          <div className="space-y-5">
            {categories.map((cat) => {
              const screensInCat = SCREEN_LIST.filter((s) => s.category === cat.name);
              return (
                <div key={cat.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-1">
                    <span>{cat.name}</span>
                    <span className="font-normal text-slate-400">{cat.range}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {screensInCat.map((item) => {
                      const isActive = item.id === currentScreen;
                      const isPast = item.id < currentScreen;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            sound.playClick();
                            onSelectScreen(item.id);
                            onClose();
                          }}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                            isActive
                              ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30'
                              : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                              isActive
                                ? 'bg-emerald-700 text-white'
                                : isPast
                                ? 'bg-slate-200 text-slate-700'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {isPast ? <CheckCircle className="w-3.5 h-3.5 text-emerald-700" /> : item.id}
                          </div>
                          <div className="min-w-0">
                            <p className={`text-xs font-bold truncate ${isActive ? 'text-emerald-900' : 'text-slate-800'}`}>
                              {item.title}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {item.shortLabel}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors cursor-pointer"
          >
            Tutup Peta
          </button>
        </div>
      </div>
    </div>
  );
};
