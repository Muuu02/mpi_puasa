import React, { useState } from 'react';
import { Award, Star, MessageSquare, ArrowRight, Printer, Sparkles, CheckCircle2, Plus } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen15PjBLRubricGalleryProps {
  onNext: () => void;
}

interface RubricScore {
  materi: number;
  kelengkapan: number;
  keterbacaan: number;
  kreativitas: number;
  kerjasama: number;
}

interface PeerFeedback {
  id: string;
  groupName: string;
  praisedPoint: string;
  suggestionPoint: string;
  reviewerGroup: string;
}

export const Screen15PjBLRubricGallery: React.FC<Screen15PjBLRubricGalleryProps> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState<'rubrik' | 'galeri' | 'tanggapan'>('rubrik');

  // Rubric Scores
  const [scores, setScores] = useState<RubricScore>({
    materi: 4,
    kelengkapan: 4,
    keterbacaan: 3,
    kreativitas: 4,
    kerjasama: 4,
  });

  const totalScore = scores.materi + scores.kelengkapan + scores.keterbacaan + scores.kreativitas + scores.kerjasama;
  const finalGrade = (totalScore / 20) * 100;

  // Peer Feedbacks
  const [feedbacks, setFeedbacks] = useState<PeerFeedback[]>([
    {
      id: 'fb1',
      groupName: 'Kelompok 1 (Bintang Ramadan)',
      praisedPoint: 'Penjelasan dalil QS Al-Baqarah 183 sangat jelas dan harakat hurufnya mudah dibaca.',
      suggestionPoint: 'Ukuran tulisan bagian hal pembatal puasa bisa diperbesar sedikit agar terlihat dari baris belakang kelas.',
      reviewerGroup: 'Kelompok 3 (Cahaya Fajar)'
    },
    {
      id: 'fb2',
      groupName: 'Kelompok 2 (Generasi Ikhlas)',
      praisedPoint: 'Komik 4 panelnya sangat lucu dan menyentuh tentang menahan lapar saat jam olahraga!',
      suggestionPoint: 'Bisa ditambahkan doa berbuka riwayat Abu Dawud agar lebih lengkap.',
      reviewerGroup: 'Kelompok 4 (Ksatria Sabar)'
    }
  ]);

  const [newGroupName, setNewGroupName] = useState('');
  const [newPraise, setNewPraise] = useState('');
  const [newSuggestion, setNewSuggestion] = useState('');
  const [newReviewer, setNewReviewer] = useState('');

  const addFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim() || !newPraise.trim()) return;
    sound.playSuccess();
    setFeedbacks([
      ...feedbacks,
      {
        id: 'fb_' + Date.now(),
        groupName: newGroupName,
        praisedPoint: newPraise,
        suggestionPoint: newSuggestion || 'Sudah sangat baik dan inspiratif!',
        reviewerGroup: newReviewer || 'Siswa Kelas 5'
      }
    ]);
    setNewGroupName('');
    setNewPraise('');
    setNewSuggestion('');
    setNewReviewer('');
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>Evaluasi & Pameran PjBL</span>
              <span aria-hidden="true">·</span>
              <span>Rubrik & Umpan Balik Teman</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Rubrik Penilaian, Galeri Karya & Tanggapan Teman
            </h1>
            <p className="text-xs text-slate-600">
              Gunakan kalkulator rubrik guru, amati karya kelompok di layar PID, dan saling memberikan saran konstruktif.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Cetak Rubrik / Hasil PjBL"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Hasil</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNext();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Lanjut: Asesmen Pemahaman</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('rubrik');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'rubrik'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. Rubrik Penilaian Guru
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('galeri');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'galeri'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            2. Showcase Galeri PID
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('tanggapan');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'tanggapan'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3. Tanggapan Teman Sebaya
          </button>
        </div>
      </div>

      {/* Tab 1: Rubrik Penilaian Interaktif */}
      {activeTab === 'rubrik' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Kalkulator Rubrik Penilaian Produk Visual (Skor 1 - 4)
              </h3>
              <p className="text-xs text-slate-500">Sentuh level skor untuk menilai kelompok secara transparan di PID</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-right">
              <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Nilai Akhir:</span>
              <span className="text-xl font-extrabold text-emerald-950 font-mono">
                {finalGrade.toFixed(0)} <span className="text-xs font-normal text-emerald-700">/ 100</span>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                key: 'materi' as const,
                title: '1. Ketepatan Materi Puasa Wajib',
                desc: 'Definisi, syarat sah, syarat wajib, dan rukun sesuai dengan hukum syariat fiqih Islam.'
              },
              {
                key: 'kelengkapan' as const,
                title: '2. Kelengkapan Unsur yang Diminta',
                desc: 'Memuat 6 unsur wajib: pengertian, syarat/rukun, QS 183, hal pembatal, niat/doa, dan hikmah.'
              },
              {
                key: 'keterbacaan' as const,
                title: '3. Kejelasan dan Keterbacaan',
                desc: 'Ejaan bahasa Indonesia baku, teks Arab berharakat jelas, serta mudah dibaca dari jarak kelas.'
              },
              {
                key: 'kreativitas' as const,
                title: '4. Kreativitas Penyajian Visual',
                desc: 'Tata letak harmonis, pemilihan warna ramah anak, dan ilustrasi yang mendukung pesan materi.'
              },
              {
                key: 'kerjasama' as const,
                title: '5. Kerja Sama & Kemampuan Menjelaskan',
                desc: 'Semua anggota terlibat aktif, kompak, dan lugas saat menjawab pertanyaan teman.'
              },
            ].map((criterion) => (
              <div key={criterion.key} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{criterion.title}</h4>
                    <p className="text-[11px] text-slate-500">{criterion.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 shrink-0">
                    Skor: {scores[criterion.key]} / 4
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[
                    { val: 1, label: '1 (Perlu Bimbingan)' },
                    { val: 2, label: '2 (Cukup)' },
                    { val: 3, label: '3 (Baik)' },
                    { val: 4, label: '4 (Sangat Baik)' },
                  ].map((lvl) => (
                    <button
                      key={lvl.val}
                      onClick={() => {
                        sound.playClick();
                        setScores({ ...scores, [criterion.key]: lvl.val });
                      }}
                      className={`py-2 px-1 text-center text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        scores[criterion.key] === lvl.val
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Showcase Galeri PID */}
      {activeTab === 'galeri' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Galeri Pameran Digital Kelas 5 di Papan Interaktif (PID)
              </h3>
              <p className="text-xs text-slate-500">
                Kelompok memajang karya mereka di depan kelas untuk diapresiasi bersama.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Mode Presentasi Kelas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase">Karya Kelompok 1</span>
                <span className="text-[11px] text-slate-500">Format: Poster Edukasi</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                “Ramadan Penuh Berkah: Panduan Puasa Sahabat Cilik”
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Poster bergambar warna-warni yang memuat rukun menahan diri, batas imsak, dalil QS 183, dan jadwal berbuka sehat dengan kurma.
              </p>
              <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-900 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Apresiasi: Desain sangat rapi dan tipografinya menarik!</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border-2 border-teal-300 bg-teal-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800 uppercase">Karya Kelompok 2</span>
                <span className="text-[11px] text-slate-500">Format: Komik Edukasi</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                “Petualangan Ali & Hasan: Menjaga Puasa Tetap Sah”
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Komik ceria tentang seorang anak yang hampir minum karena lupa, lalu diingatkan sahabatnya untuk bersyukur dan melanjutkan puasa.
              </p>
              <div className="flex items-center gap-2 pt-2 text-[11px] text-teal-900 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Apresiasi: Dialog ceritanya sangat sesuai kehidupan sehari-hari anak SD!</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Tanggapan Teman Sebaya */}
      {activeTab === 'tanggapan' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Papan Tanggapan Teman Sebaya (Peer Review Feedback)
            </h3>
            <p className="text-xs text-slate-500">
              Gunakan kalimat pemantik: “Satu hal yang saya pahami...” dan “Satu saran agar informasinya makin jelas...”
            </p>
          </div>

          {/* Existing Feedbacks */}
          <div className="space-y-3">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-emerald-900">{fb.groupName}</h4>
                  <span className="text-[11px] text-slate-500">Penilai: {fb.reviewerGroup}</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <p>
                    <strong className="text-emerald-700">★ Hal yang saya pahami:</strong> “{fb.praisedPoint}”
                  </p>
                  <p>
                    <strong className="text-amber-700">💡 Saran perbaikan:</strong> “{fb.suggestionPoint}”
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Form to add feedback in classroom on PID */}
          <form onSubmit={addFeedback} className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-3 text-xs">
            <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-emerald-700" />
              Tulis Tanggapan Teman Baru di Papan Interaktif:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Kelompok yang Ditanggapi:</label>
                <input
                  type="text"
                  placeholder="Contoh: Kelompok 1"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Kelompok Penilai:</label>
                <input
                  type="text"
                  placeholder="Contoh: Kelompok 2"
                  value={newReviewer}
                  onChange={(e) => setNewReviewer(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Satu hal yang saya pahami dari karya ini:</label>
              <input
                type="text"
                placeholder="Contoh: Saya jadi tahu bahwa berniat harus dilakukan malam hari sebelum fajar..."
                value={newPraise}
                onChange={(e) => setNewPraise(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Satu saran agar informasinya makin jelas:</label>
              <input
                type="text"
                placeholder="Contoh: Tambahkan keterangan waktu imsak agar teman tidak terlambat sahur..."
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors cursor-pointer"
            >
              Kirim Tanggapan ke Papan
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
