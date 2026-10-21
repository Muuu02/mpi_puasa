import React, { useState } from 'react';
import { Volume2, ArrowRight, Heart, Sparkles, CheckCircle2, Coffee } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen11DoaBukaProps {
  onNext: () => void;
}

export const Screen11DoaBuka: React.FC<Screen11DoaBukaProps> = ({ onNext }) => {
  const [activeDoa, setActiveDoa] = useState<1 | 2>(1);
  const [selectedAdab, setSelectedAdab] = useState<number | null>(null);

  const playDoaVoice = (num: 1 | 2) => {
    sound.playClick();
    if (num === 1) {
      sound.speak("Allaahumma laka shumtu wa bika aamantu wa 'alaa rizqika afthartu", 'ar-SA');
    } else {
      sound.speak("Dzahabazh zhama'u wabtallatil 'uruuqu wa tsabatal ajru in syaa'Allaah", 'ar-SA');
    }
  };

  const adabList = [
    {
      id: 1,
      title: 'Menyegerakan Berbuka',
      desc: 'Begitu azan Maghrib berkumandang, sunah langsung membatalkan puasa tanpa menunda-nunda.'
    },
    {
      id: 2,
      title: 'Mendahulukan Kurma & Air Putih',
      desc: 'Memakan 1 atau 3 butir kurma basah (ruthab) atau kurma kering (tamr), atau meminum seteguk air putih yang menyejukkan.'
    },
    {
      id: 3,
      title: 'Membaca Basmalah & Doa Berbuka',
      desc: 'Menghayati doa penuh rasa syukur karena telah diberikan kekuatan menahan lapar seharian.'
    },
    {
      id: 4,
      title: 'Tidak Berlebih-lebihan (Israf)',
      desc: 'Makan dan minum secukupnya agar tubuh tetap ringan dan khusyuk saat menunaikan salat Maghrib dan Isya/Tarawih.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>Materi Pokok A3</span>
              <span aria-hidden="true">·</span>
              <span>Doa & Adab Berbuka</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Kelas 5 SD</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              A3: Doa Berbuka Puasa & Adab Iftar
            </h1>
            <p className="text-xs text-slate-600">
              Waktu berbuka adalah momen terkabulnya doa dan wujud rasa syukur atas nikmat rezeki dari Allah SWT.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <span>Lanjut: Hikmah Puasa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Doa Selection Switcher Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl max-w-md">
        <button
          onClick={() => {
            sound.playClick();
            setActiveDoa(1);
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeDoa === 1 ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Doa Berbuka 1 (Masyhur)
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveDoa(2);
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeDoa === 2 ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Doa Berbuka 2 (HR. Abu Dawud)
        </button>
      </div>

      {/* Large Audio & Script Box */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-800 space-y-5">
        <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
            {activeDoa === 1 ? 'Lafal Doa Berbuka Masyhur' : 'Lafal Doa Sahih Riwayat Abu Dawud'}
          </span>
          <button
            onClick={() => playDoaVoice(activeDoa)}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-emerald-300" />
            <span>Dengarkan Doa</span>
          </button>
        </div>

        {activeDoa === 1 ? (
          <div className="space-y-4">
            <div className="text-center py-4 px-2">
              <p
                dir="rtl"
                className="font-arabic text-2xl sm:text-3xl md:text-4xl leading-[2.2] tracking-wide text-amber-100 font-normal"
              >
                اللَّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ
              </p>
            </div>
            <div className="bg-emerald-900/80 rounded-xl p-4 border border-emerald-800 space-y-2 text-xs">
              <p className="text-emerald-200 italic font-mono text-[11px]">
                "Allāhumma laka shumtu wa bika āmantu wa 'alā rizqika afthartu."
              </p>
              <div className="pt-2 border-t border-emerald-800">
                <strong className="text-emerald-300 block mb-1">Artinya:</strong>
                <p className="text-white text-sm leading-relaxed">
                  “Ya Allah, untuk-Mu aku berpuasa, kepada-Mu aku beriman, dan dengan rezeki-Mu aku berbuka.”
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center py-4 px-2">
              <p
                dir="rtl"
                className="font-arabic text-2xl sm:text-3xl md:text-4xl leading-[2.2] tracking-wide text-amber-100 font-normal"
              >
                ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ
              </p>
            </div>
            <div className="bg-emerald-900/80 rounded-xl p-4 border border-emerald-800 space-y-2 text-xs">
              <p className="text-emerald-200 italic font-mono text-[11px]">
                "Dzahabazh-zhama'u wabtallatil-'urūqu wa tsabatal-ajru in syā'allāh."
              </p>
              <div className="pt-2 border-t border-emerald-800">
                <strong className="text-emerald-300 block mb-1">Artinya:</strong>
                <p className="text-white text-sm leading-relaxed">
                  “Telah hilang rasa dahaga, telah basah tenggorokan, dan semoga tetaplah pahala, jika Allah menghendaki.”
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive PID: Sentuh Adab & Makna Berbuka */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Coffee className="w-5 h-5 text-emerald-600" />
          Aktivitas PID: Sentuh 4 Adab Mulia Saat Berbuka Puasa
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {adabList.map((item) => {
            const isSelected = selectedAdab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedAdab(isSelected ? null : item.id);
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    Sunah #{item.id}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                </div>
                {isSelected && (
                  <span className="text-[10px] font-bold text-emerald-700 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Telah dipahami kelas
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
