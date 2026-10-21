import React from 'react';
import { X, BookOpen, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { TEACHER_GUIDE, SCREEN_LIST } from '../data/mpiData';
import { sound } from '../utils/audio';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToScreen: (screenId: number) => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({
  isOpen,
  onClose,
  onJumpToScreen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-emerald-800 text-white">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-300" />
            <div>
              <h2 className="text-lg font-bold">Panduan Fasilitasi Guru (Pedoman PID)</h2>
              <p className="text-xs text-emerald-100">
                {TEACHER_GUIDE.curriculum} · {TEACHER_GUIDE.chapter}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          {/* Key Pedagogical Card */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-emerald-900 mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Gagasan Utama Multimedia Pembelajaran Interaktif (MPI)
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Satu tautan ini dirancang sebagai panduan mengajar menyeluruh dari pembukaan, apersepsi, eksplorasi materi fiqih puasa, aktivitas sentuh di Papan Interaktif Digital (PID), proyek PjBL, hingga asesmen dan refleksi. Guru dapat mengalirkan pembelajaran secara runtut atau melompat langsung ke layar yang dibutuhkan.
            </p>
          </div>

          {/* Syntax & Timing Table */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              Alur Waktu & Sintaks Pembelajaran PjBL (Alokasi: 3 JP / 105 Menit)
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-1/4">Layar & Tahapan</th>
                    <th className="p-3 w-1/4">Aktivitas Murid & Guru</th>
                    <th className="p-3 w-20">Waktu</th>
                    <th className="p-3">Catatan & Tips di PID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {TEACHER_GUIDE.stepsGuide.map((step, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">{step.screen}</td>
                      <td className="p-3 text-slate-700">{step.activity}</td>
                      <td className="p-3 font-medium text-emerald-700">{step.time}</td>
                      <td className="p-3 text-slate-600">{step.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Model Project Based Learning (PjBL) */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Sintaks PjBL: Panduan Visual Puasa Wajib untuk Teman Sebaya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-emerald-800 block mb-1">1. Penentuan Pertanyaan Mendasar:</span>
                Bagaimana kita merancang panduan visual yang menarik agar teman sebaya paham syarat, rukun, dan hikmah puasa wajib?
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-emerald-800 block mb-1">2. Perencanaan Produk:</span>
                Kelompok memilih antara poster digital, infografik ringkas, komik edukasi, atau peta konsep visual.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-emerald-800 block mb-1">3. Penyusunan Jadwal & Pembuatan:</span>
                Manfaatkan timer kelompok 20-30 menit di PID saat kelompok bekerja kolaboratif.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-emerald-800 block mb-1">4. Penilaian & Evaluasi Pengalaman:</span>
                Pameran galeri PID, pemberian tanggapan antar kelompok, dan asesmen pemahaman.
              </div>
            </div>
          </div>

          {/* PID Operational Tips */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Kiat Interaksi Papan Interaktif Digital (PID)
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              {TEACHER_GUIDE.pidTips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>

          {/* Quick Jump Buttons */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Lompat Langsung ke Layar Tertentu:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {SCREEN_LIST.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    sound.playClick();
                    onJumpToScreen(sc.id);
                    onClose();
                  }}
                  className="px-2.5 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 hover:border-emerald-600 hover:text-emerald-800 rounded-lg text-left truncate transition-colors"
                >
                  <span className="font-bold text-slate-400 mr-1">{sc.id}.</span>
                  {sc.shortLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Fokus: Bagian A (Puasa Wajib) · Bagian B (Puasa Sunah) dapat dibuka di menu lanjutan
          </p>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
