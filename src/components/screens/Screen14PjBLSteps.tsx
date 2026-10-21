import React, { useState } from 'react';
import { ListOrdered, CheckCircle, RotateCcw, ArrowRight, Users, Sparkles, Clock } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen14PjBLStepsProps {
  onNext: () => void;
}

interface StepItem {
  id: number;
  stepNumber: number;
  title: string;
  desc: string;
  roleHint: string;
}

const SHUFFLED_STEPS: StepItem[] = [
  {
    id: 3,
    stepNumber: 3,
    title: 'Kumpulkan Data dari Materi A1 - A4',
    desc: 'Buka kembali pos pengertian, syarat, rukun, dalil QS 183, hal pembatal, dan doa.',
    roleHint: 'Pencatat Materi bertugas merangkum kata kunci fiqih.'
  },
  {
    id: 1,
    stepNumber: 1,
    title: 'Bentuk Kelompok & Bagi Peran',
    desc: 'Tentukan Ketua Kelompok, Pencatat Materi, Desainer Visual, dan Presenter.',
    roleHint: 'Setiap anggota bertanggung jawab aktif.'
  },
  {
    id: 5,
    stepNumber: 5,
    title: 'Periksa & Edit Ketepatan Fiqih',
    desc: 'Cek ejaan kata bahasa Arab, kejelasan tulisan dari jarak 3 meter, dan kelengkapan 6 rukun materi.',
    roleHint: 'Ketua dan seluruh anggota membaca ulang bersama.'
  },
  {
    id: 2,
    stepNumber: 2,
    title: 'Pilih Format Produk Visual',
    desc: 'Sepakati apakah kelompok ingin membuat poster, infografik, komik, atau peta konsep.',
    roleHint: 'Musyawarahkan bersama sesuai keahlian tim.'
  },
  {
    id: 6,
    stepNumber: 6,
    title: 'Simulasi Presentasi Singkat di PID',
    desc: 'Latih pembagian bicara saat pameran karya di depan layar proyektor / whiteboard interaktif.',
    roleHint: 'Presenter memimpin pemaparan, anggota siap menjawab tanggapan.'
  },
  {
    id: 4,
    stepNumber: 4,
    title: 'Rancang Tata Letak & Ilustrasi',
    desc: 'Gunakan warna yang harmonis, pisahkan poin dengan rapi, dan beri judul mencolok.',
    roleHint: 'Desainer Visual memimpin sketsa tata letak gambar.'
  }
];

export const Screen14PjBLSteps: React.FC<Screen14PjBLStepsProps> = ({ onNext }) => {
  const [orderedList, setOrderedList] = useState<StepItem[]>([]);
  const [unselectedPool, setUnselectedPool] = useState<StepItem[]>(SHUFFLED_STEPS);
  const [isCompleted, setIsCompleted] = useState(false);

  const addStepToSequence = (step: StepItem) => {
    sound.playClick();
    const updated = [...orderedList, step];
    setOrderedList(updated);
    setUnselectedPool((prev) => prev.filter((s) => s.id !== step.id));

    if (updated.length === 6) {
      const isSequenceCorrect = updated.every((s, idx) => s.stepNumber === idx + 1);
      if (isSequenceCorrect) {
        sound.playSuccess();
        setIsCompleted(true);
      } else {
        sound.playNudge();
      }
    }
  };

  const removeStepFromSequence = (step: StepItem) => {
    sound.playClick();
    setOrderedList((prev) => prev.filter((s) => s.id !== step.id));
    setUnselectedPool((prev) => [...prev, step]);
    setIsCompleted(false);
  };

  const resetOrder = () => {
    sound.playClick();
    setOrderedList([]);
    setUnselectedPool(SHUFFLED_STEPS);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>Sintaks Pembelajaran PjBL</span>
              <span aria-hidden="true">·</span>
              <span>Langkah Kerja Terstruktur</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Langkah Kerja Kelompok & Pembagian Peran
            </h1>
            <p className="text-xs text-slate-600">
              Bekerja sama secara tertib melalui 6 tahapan terarah dari perencanaan hingga presentasi di layar PID.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <span>Lanjut: Rubrik & Galeri Karya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Group Roles Reference Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" />
          Panduan Pembagian Peran Kelompok:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-emerald-900 block font-bold">1. Ketua Kelompok</strong>
            <p className="text-[11px] text-slate-600 mt-1">Mengatur waktu, memimpin musyawarah, dan memastikan semua anggota bekerja.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-emerald-900 block font-bold">2. Pencatat Materi</strong>
            <p className="text-[11px] text-slate-600 mt-1">Mencatat poin syarat, rukun, dalil, dan doa dari layar materi dengan akurat.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-emerald-900 block font-bold">3. Desainer Visual</strong>
            <p className="text-[11px] text-slate-600 mt-1">Mengatur tata letak tulisan, kombinasi warna, gambar, dan kerapian karya.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-emerald-900 block font-bold">4. Juru Bicara / Presenter</strong>
            <p className="text-[11px] text-slate-600 mt-1">Mempresentasikan karya di depan PID dan menjawab tanggapan teman.</p>
          </div>
        </div>
      </div>

      {/* Interactive PID: Urutkan Langkah Kerja */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-xl border border-emerald-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Aktivitas PID: “Urutkan 6 Langkah Kerja Proyek Kelompok”
              </h3>
              <p className="text-xs text-emerald-300">
                Sentuh kartu langkah di bawah sesuai urutan 1 sampai 6 yang logis
              </p>
            </div>
          </div>
          <button
            onClick={resetOrder}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-emerald-200 bg-emerald-900 hover:bg-emerald-800 rounded-lg cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Urutan</span>
          </button>
        </div>

        {/* Ordered Slot Container */}
        <div className="space-y-2 min-h-[140px] bg-emerald-900/60 p-4 rounded-xl border border-emerald-800">
          {orderedList.length === 0 ? (
            <p className="text-xs text-emerald-300/70 italic text-center py-6">
              Pilih kartu di bawah secara berurutan dari Tahap 1 sampai Tahap 6...
            </p>
          ) : (
            orderedList.map((step, idx) => (
              <div
                key={step.id}
                className="bg-emerald-800/90 border border-emerald-600 p-3 rounded-xl flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-emerald-500 text-emerald-950 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{step.title}</h4>
                    <p className="text-[11px] text-emerald-200">{step.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeStepFromSequence(step)}
                  className="text-xs text-emerald-300 hover:text-white px-2 py-1 rounded bg-emerald-900 cursor-pointer"
                >
                  Batal
                </button>
              </div>
            ))
          )}
        </div>

        {/* Unselected Cards Pool */}
        {unselectedPool.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-emerald-200">
              Pilihan Langkah yang Belum Diurutkan ({unselectedPool.length}):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {unselectedPool.map((step) => (
                <button
                  key={step.id}
                  onClick={() => addStepToSequence(step)}
                  className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-left transition-all active:scale-95 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-white">{step.title}</h5>
                    <p className="text-[11px] text-emerald-100/90 leading-tight">{step.desc}</p>
                  </div>
                  <span className="text-[10px] text-emerald-300 mt-2 block font-medium">
                    + Pilih ke Urutan Berikutnya
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {isCompleted && (
          <div className="p-3.5 bg-emerald-500 text-emerald-950 rounded-xl flex items-center gap-2 text-xs font-bold">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>Alhamdulillah! 6 Tahapan langkah kerja proyek telah tersusun dengan sangat baik!</span>
          </div>
        )}
      </div>
    </div>
  );
};
