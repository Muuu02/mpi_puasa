import React, { useState } from 'react';
import { ArrowRight, RotateCcw, CheckCircle, HelpCircle, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen9InvalidatorsProps {
  onNext: () => void;
}

type CategoryType = 'membatalkan' | 'tidak_membatalkan' | 'perlu_dibahas';

interface InvalidatorItem {
  id: string;
  situation: string;
  category: CategoryType;
  fiqihNote: string;
}

const SITUATIONS: InvalidatorItem[] = [
  {
    id: 's1',
    situation: 'Makan atau minum secara sengaja saat siang hari di bulan Ramadan',
    category: 'membatalkan',
    fiqihNote: 'Membatalkan puasa dengan sepakat ulama. Wajib mengqadha puasa dan bertaubat.'
  },
  {
    id: 's2',
    situation: 'Makan atau minum karena benar-benar lupa bahwa dirinya sedang berpuasa',
    category: 'tidak_membatalkan',
    fiqihNote: 'Tidak batal! Nabi SAW bersabda bahwa itu adalah rezeki dari Allah, segera lanjutkan puasanya.'
  },
  {
    id: 's3',
    situation: 'Memasukkan jari ke tenggorokan agar sengaja muntah',
    category: 'membatalkan',
    fiqihNote: 'Muntah yang disengaja membatalkan puasa dan wajib diqadha di hari lain.'
  },
  {
    id: 's4',
    situation: 'Tiba-tiba muntah karena mabuk kendaraan atau sakit tanpa disengaja',
    category: 'tidak_membatalkan',
    fiqihNote: 'Tidak membatalkan puasa jika tidak ada bagian muntahan yang sengaja ditelan kembali.'
  },
  {
    id: 's5',
    situation: 'Keluar darah haid atau nifas menjelang waktu maghrib',
    category: 'membatalkan',
    fiqihNote: 'Membatalkan puasa seketika walaupun beberapa menit sebelum matahari terbenam. Wajib qadha.'
  },
  {
    id: 's6',
    situation: 'Berkumur-kumur sewajarnya saat berwudhu (tidak berlebihan)',
    category: 'tidak_membatalkan',
    fiqihNote: 'Sunah wudhu tetap berjalan, asalkan tidak mubalaghah (berlebihan) dan sisa air diludahkan.'
  },
  {
    id: 's7',
    situation: 'Mencicipi masakan dengan ujung lidah bagi pemasak lalu segera diludahkan',
    category: 'perlu_dibahas',
    fiqihNote: 'Perlu kehati-hatian: Boleh bagi orang yang memasak jika dibutuhkan, asalkan tidak masuk ke kerongkongan. Hukumnya makruh jika tanpa hajat.'
  },
  {
    id: 's8',
    situation: 'Suntikan obat pereda nyeri ke dalam otot (bukan infus makanan pengenyang)',
    category: 'perlu_dibahas',
    fiqihNote: 'Mayoritas ulama kontemporer berpendapat suntikan obat non-nutrisi tidak membatalkan puasa karena bukan makanan dan tidak melalui rongga terbuka.'
  },
  {
    id: 's9',
    situation: 'Menggunakan obat tetes mata untuk mengobati mata yang merah',
    category: 'perlu_dibahas',
    fiqihNote: 'Mata bukan rongga terbuka pencernaan. Sebagian ulama memakruhkan jika terasa di kerongkongan, namun menurut fatwa mu\'tamad tidak membatalkan.'
  }
];

export const Screen9Invalidators: React.FC<Screen9InvalidatorsProps> = ({ onNext }) => {
  const [unassigned, setUnassigned] = useState<InvalidatorItem[]>(SITUATIONS);
  const [batalBox, setBatalBox] = useState<InvalidatorItem[]>([]);
  const [tidakBatalBox, setTidakBatalBox] = useState<InvalidatorItem[]>([]);
  const [perluBahasBox, setPerluBahasBox] = useState<InvalidatorItem[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const placeItem = (item: InvalidatorItem, target: CategoryType) => {
    sound.playClick();
    setUnassigned((prev) => prev.filter((i) => i.id !== item.id));
    setBatalBox((prev) => prev.filter((i) => i.id !== item.id));
    setTidakBatalBox((prev) => prev.filter((i) => i.id !== item.id));
    setPerluBahasBox((prev) => prev.filter((i) => i.id !== item.id));

    if (target === 'membatalkan') setBatalBox((prev) => [...prev, item]);
    if (target === 'tidak_membatalkan') setTidakBatalBox((prev) => [...prev, item]);
    if (target === 'perlu_dibahas') setPerluBahasBox((prev) => [...prev, item]);

    setIsChecked(false);
  };

  const returnToDeck = (item: InvalidatorItem) => {
    sound.playClick();
    setBatalBox((prev) => prev.filter((i) => i.id !== item.id));
    setTidakBatalBox((prev) => prev.filter((i) => i.id !== item.id));
    setPerluBahasBox((prev) => prev.filter((i) => i.id !== item.id));
    setUnassigned((prev) => [...prev, item]);
    setIsChecked(false);
  };

  const resetAll = () => {
    sound.playClick();
    setUnassigned(SITUATIONS);
    setBatalBox([]);
    setTidakBatalBox([]);
    setPerluBahasBox([]);
    setIsChecked(false);
  };

  const checkResults = () => {
    setIsChecked(true);
    const bOk = batalBox.every((i) => i.category === 'membatalkan');
    const tbOk = tidakBatalBox.every((i) => i.category === 'tidak_membatalkan');
    const pbOk = perluBahasBox.every((i) => i.category === 'perlu_dibahas');
    if (bOk && tbOk && pbOk && unassigned.length === 0) {
      sound.playSuccess();
    } else {
      sound.playNudge();
    }
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
              <span>Hal Pembatal & Fiqih Praktis</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              A2: Hal-Hal yang Membatalkan Puasa
            </h1>
            <p className="text-xs text-slate-600">
              Klasifikasikan situasi sehari-hari ke 3 wadah di PID: Membatalkan, Tidak Membatalkan, atau Perlu Dibahas Lebih Lanjut.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={resetAll}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={checkResults}
              className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Periksa Klasifikasi</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNext();
              }}
              className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Lanjut: Niat & Doa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Note about 3rd category */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <p>
            <strong>Mengapa ada kategori ke-3?</strong> Dalam fiqih Islam, tidak semua kasus langsung dihukumi hitam-putih. Beberapa keadaan seperti suntikan obat medis atau mencicipi masakan memiliki rincian syarat dan fatwa yang memperkaya wawasan fiqih anak-anak.
          </p>
        </div>
      </div>

      {/* Unassigned Situations Deck */}
      {unassigned.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Situasi yang Perlu Dipilah ({unassigned.length} Kasus):
            </h3>
            <span className="text-[11px] text-slate-500">Pilih salah satu dari 3 wadah tujuan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {unassigned.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-300 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-3 hover:border-emerald-500 transition-all"
              >
                <p className="text-xs font-bold text-slate-900 leading-snug">{item.situation}</p>

                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => placeItem(item, 'membatalkan')}
                    className="py-1.5 px-1 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-800 text-[10px] font-bold rounded-lg border border-rose-200 transition-colors cursor-pointer text-center truncate"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => placeItem(item, 'tidak_membatalkan')}
                    className="py-1.5 px-1 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-[10px] font-bold rounded-lg border border-emerald-200 transition-colors cursor-pointer text-center truncate"
                  >
                    Tidak Batal
                  </button>
                  <button
                    onClick={() => placeItem(item, 'perlu_dibahas')}
                    className="py-1.5 px-1 bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-800 text-[10px] font-bold rounded-lg border border-amber-200 transition-colors cursor-pointer text-center truncate"
                  >
                    Perlu Bahas
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3 Interactive Classification Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bucket 1: Membatalkan */}
        <div className="bg-rose-50/70 border-2 border-rose-300 rounded-2xl p-4 space-y-3 min-h-[220px]">
          <div className="flex items-center justify-between border-b border-rose-200 pb-2">
            <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              1. Membatalkan ({batalBox.length})
            </h4>
          </div>
          <div className="space-y-2">
            {batalBox.length === 0 ? (
              <p className="text-[11px] text-rose-400 italic text-center py-6">Belum ada kartu</p>
            ) : (
              batalBox.map((card) => {
                const isErr = isChecked && card.category !== 'membatalkan';
                return (
                  <div
                    key={card.id}
                    className={`bg-white p-2.5 rounded-xl border text-xs space-y-1 shadow-xs ${
                      isChecked
                        ? isErr
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-emerald-500 bg-emerald-50/50'
                        : 'border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-bold text-slate-900 leading-snug">{card.situation}</p>
                      <button
                        onClick={() => returnToDeck(card)}
                        className="text-[10px] text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    {isChecked && (
                      <p className="text-[10px] text-slate-600 pt-1 border-t border-slate-100">
                        <strong>Fiqih:</strong> {card.fiqihNote}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bucket 2: Tidak Membatalkan */}
        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-4 space-y-3 min-h-[220px]">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              2. Tidak Batal ({tidakBatalBox.length})
            </h4>
          </div>
          <div className="space-y-2">
            {tidakBatalBox.length === 0 ? (
              <p className="text-[11px] text-emerald-400 italic text-center py-6">Belum ada kartu</p>
            ) : (
              tidakBatalBox.map((card) => {
                const isErr = isChecked && card.category !== 'tidak_membatalkan';
                return (
                  <div
                    key={card.id}
                    className={`bg-white p-2.5 rounded-xl border text-xs space-y-1 shadow-xs ${
                      isChecked
                        ? isErr
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-emerald-500 bg-emerald-50/50'
                        : 'border-emerald-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-bold text-slate-900 leading-snug">{card.situation}</p>
                      <button
                        onClick={() => returnToDeck(card)}
                        className="text-[10px] text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    {isChecked && (
                      <p className="text-[10px] text-slate-600 pt-1 border-t border-slate-100">
                        <strong>Fiqih:</strong> {card.fiqihNote}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bucket 3: Perlu Dibahas Lebih Lanjut */}
        <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-4 space-y-3 min-h-[220px]">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              3. Perlu Dibahas ({perluBahasBox.length})
            </h4>
          </div>
          <div className="space-y-2">
            {perluBahasBox.length === 0 ? (
              <p className="text-[11px] text-amber-400 italic text-center py-6">Belum ada kartu</p>
            ) : (
              perluBahasBox.map((card) => {
                const isErr = isChecked && card.category !== 'perlu_dibahas';
                return (
                  <div
                    key={card.id}
                    className={`bg-white p-2.5 rounded-xl border text-xs space-y-1 shadow-xs ${
                      isChecked
                        ? isErr
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-emerald-500 bg-emerald-50/50'
                        : 'border-amber-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-bold text-slate-900 leading-snug">{card.situation}</p>
                      <button
                        onClick={() => returnToDeck(card)}
                        className="text-[10px] text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    {isChecked && (
                      <p className="text-[10px] text-slate-600 pt-1 border-t border-slate-100">
                        <strong>Keterangan:</strong> {card.fiqihNote}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
