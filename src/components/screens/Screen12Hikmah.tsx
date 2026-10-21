import React, { useState } from 'react';
import { Heart, Users, Sparkles, ArrowRight, HelpCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { IMAGES } from '../../data/mpiData';
import { sound } from '../../utils/audio';

interface Screen12HikmahProps {
  onNext: () => void;
}

interface HikmahPair {
  id: string;
  hikmah: string;
  exampleId: string;
  example: string;
}

const PAIRS: HikmahPair[] = [
  {
    id: 'h1',
    hikmah: 'Melatih Kesabaran (Shabr)',
    exampleId: 'e1',
    example: 'Tidak mudah marah dan membalas saat diejek teman di waktu istirahat sekolah.'
  },
  {
    id: 'h2',
    hikmah: 'Empati & Kepedulian Sosial',
    exampleId: 'e2',
    example: 'Menyisihkan uang jajan untuk paket makanan berbuka bagi fakir miskin dan yatim.'
  },
  {
    id: 'h3',
    hikmah: 'Menumbuhkan Rasa Syukur',
    exampleId: 'e3',
    example: 'Menghargai setiap suap nasi dan setetes air putih yang selama ini sering disia-siakan.'
  },
  {
    id: 'h4',
    hikmah: 'Meningkatkan Ketakwaan',
    exampleId: 'e4',
    example: 'Tetap tidak makan meski berada sendirian di kamar tertutup karena sadar Allah Maha Melihat.'
  }
];

export const Screen12Hikmah: React.FC<Screen12HikmahProps> = ({ onNext }) => {
  const [selectedHikmah, setSelectedHikmah] = useState<string | null>(null);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: string }>({});
  const [showDiscussion, setShowDiscussion] = useState(false);

  const handleHikmahClick = (id: string) => {
    sound.playClick();
    setSelectedHikmah(id);
    if (selectedExample) {
      evalMatch(id, selectedExample);
    }
  };

  const handleExampleClick = (exId: string) => {
    sound.playClick();
    setSelectedExample(exId);
    if (selectedHikmah) {
      evalMatch(selectedHikmah, exId);
    }
  };

  const evalMatch = (hId: string, exId: string) => {
    const pair = PAIRS.find((p) => p.id === hId && p.exampleId === exId);
    if (pair) {
      sound.playSuccess();
      setMatchedPairs((prev) => ({ ...prev, [hId]: exId }));
      setSelectedHikmah(null);
      setSelectedExample(null);
    } else {
      sound.playNudge();
      setSelectedHikmah(null);
      setSelectedExample(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>Materi Pokok A4</span>
              <span aria-hidden="true">·</span>
              <span>Nilai Karakter & Akhlak</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              A4: Hikmah & Manfaat Puasa Wajib
            </h1>
            <p className="text-xs text-slate-600">
              Puasa mendidik jiwa menjadi lebih sabar, bersyukur, dan peka terhadap penderitaan sesama manusia.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <span>Buka Tantangan Proyek</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Showcase Card with Generated Illustration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="lg:col-span-5 relative min-h-[240px] bg-emerald-950">
          <img
            src={IMAGES.hikmahCaring}
            alt="Anak-anak berbagi di bulan Ramadan"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== IMAGES.fallbackHikmahCaring) {
                img.src = IMAGES.fallbackHikmahCaring;
              }
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-4">
            <p className="text-xs text-white font-medium">
              Berbagi paket iftar melatih empati dan kepedulian sosial sejak dini.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 space-y-4 flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            6 Nilai Luhur Ibadah Puasa Ramadan
          </span>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <strong className="text-emerald-900 block font-bold">1. Ketakwaan (Taqwa)</strong>
              <span className="text-slate-600 text-[11px]">Merasa senantiasa diawasi Allah di mana pun.</span>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <strong className="text-emerald-900 block font-bold">2. Kesabaran (Shabr)</strong>
              <span className="text-slate-600 text-[11px]">Kuat menahan haus, lapar, dan amarah.</span>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <strong className="text-emerald-900 block font-bold">3. Rasa Syukur</strong>
              <span className="text-slate-600 text-[11px]">Menghargai rezeki nikmat makan & minum.</span>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <strong className="text-emerald-900 block font-bold">4. Empati Sosial</strong>
              <span className="text-slate-600 text-[11px]">Merasakan perihnya lapar kaum dhuafa.</span>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <strong className="text-emerald-900 block font-bold">5. Kesehatan Fisik</strong>
              <span className="text-slate-600 text-[11px]">Sistem pencernaan istirahat & detoksifikasi.</span>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <strong className="text-emerald-900 block font-bold">6. Disiplin Waktu</strong>
              <span className="text-slate-600 text-[11px]">Disiplin sahur, berbuka, dan ibadah malam.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Matching on PID */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-600" />
            Interaksi PID: “Hubungkan Hikmah dengan Contoh Perilaku Nyata”
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {Object.keys(matchedPairs).length} / {PAIRS.length} Terpasang
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Hikmah */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Pilih Nilai Hikmah:
            </span>
            {PAIRS.map((p) => {
              const isMatched = !!matchedPairs[p.id];
              const isSelected = selectedHikmah === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => !isMatched && handleHikmahClick(p.id)}
                  disabled={isMatched}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : isSelected
                      ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span className="text-xs font-bold">{p.hikmah}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Contoh Perilaku */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Pilih Contoh Perilaku di Sekolah/Rumah:
            </span>
            {PAIRS.map((p) => {
              const isMatched = Object.values(matchedPairs).includes(p.exampleId);
              const isSelected = selectedExample === p.exampleId;
              return (
                <button
                  key={p.exampleId}
                  onClick={() => !isMatched && handleExampleClick(p.exampleId)}
                  disabled={isMatched}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : isSelected
                      ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span className="text-xs leading-relaxed block">{p.example}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Classroom Discussion Prompt */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-700" />
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
              Pertanyaan Diskusi Kelas Berbantuan PID
            </h4>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              setShowDiscussion(!showDiscussion);
            }}
            className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
          >
            {showDiscussion ? 'Tutup Jawaban Murid' : 'Tampilkan Kata Kunci Guru →'}
          </button>
        </div>

        <p className="text-sm font-bold text-slate-900 leading-snug">
          “Bagaimana latihan menahan diri saat berpuasa bisa membantu kita bersikap lebih ramah dan peduli kepada teman-teman di sekolah?”
        </p>

        {showDiscussion && (
          <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-xs text-slate-700 leading-relaxed space-y-1">
            <p className="font-semibold text-emerald-900">Kata Kunci Respon Murid:</p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600">
              <li>Saat kita lapar, kita belajar merasakan bagaimana rasanya orang yang berkekurangan, sehingga kita tidak sombong.</li>
              <li>Kita terbiasa mengontrol amarah dan tidak terburu-buru membalas perbuatan buruk teman.</li>
              <li>Puasa menumbuhkan semangat berbagi bekal dan tolong menolong sesama teman sekelas.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
