import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Timer,
  Play,
  Pause,
  RotateCcw,
  ListOrdered
} from 'lucide-react';
import { SCREEN_LIST } from '../data/mpiData';
import { sound } from '../utils/audio';

interface PIDToolbarProps {
  currentScreen: number;
  totalScreens: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectScreen: (id: number) => void;
  onOpenRoadmap: () => void;
}

export const PIDToolbar: React.FC<PIDToolbarProps> = ({
  currentScreen,
  totalScreens,
  onPrev,
  onNext,
  onSelectScreen,
  onOpenRoadmap,
}) => {
  const [soundActive, setSoundActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(15 * 60); // default 15 min for group activity
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      sound.playSuccess();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    sound.soundEnabled = next;
    if (next) sound.playClick();
  };

  const toggleFullscreen = () => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <footer className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Quick screen indicator & selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenRoadmap();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Buka Peta Materi Lengkap"
          >
            <ListOrdered className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Peta Layar</span>
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="screen-selector" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Layar <span className="text-emerald-700 font-bold">{currentScreen}</span> / {totalScreens}
            </label>
            <select
              id="screen-selector"
              value={currentScreen}
              onChange={(e) => {
                sound.playClick();
                onSelectScreen(Number(e.target.value));
              }}
              className="text-xs bg-slate-100 border border-slate-300 rounded-md px-2 py-1 text-slate-700 font-medium cursor-pointer focus:ring-1 focus:ring-emerald-500"
            >
              {SCREEN_LIST.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id}. {s.shortLabel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Interactive Classroom Timer for Activities / PjBL */}
        <div className="flex items-center gap-2">
          {showTimer ? (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
              <span className="text-xs font-bold text-emerald-900 font-mono tracking-wider">
                ⏱ {formatTimer(timerSeconds)}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setTimerRunning(!timerRunning);
                }}
                className="p-1 text-emerald-700 hover:text-emerald-900"
                title={timerRunning ? 'Jeda' : 'Mulai'}
              >
                {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setTimerRunning(false);
                  setTimerSeconds(15 * 60);
                }}
                className="p-1 text-slate-500 hover:text-slate-800"
                title="Reset 15 Menit"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowTimer(false)}
                className="text-[10px] text-slate-400 hover:text-slate-600 ml-1"
              >
                Tutup
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                setShowTimer(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              title="Buka Timer PjBL / Diskusi PID"
            >
              <Timer className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-medium hidden md:inline">Timer Aktivitas</span>
            </button>
          )}

          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer ${
              !soundActive ? 'text-rose-500' : ''
            }`}
            title={soundActive ? 'Matikan Suara Audio' : 'Nyalakan Suara Audio'}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Mode Papan Interaktif (Layar Penuh)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Right: Big Touch Buttons for Teacher & Students on PID */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onPrev();
            }}
            disabled={currentScreen <= 1}
            className={`flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              currentScreen <= 1
                ? 'opacity-40 border-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-98'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            disabled={currentScreen >= totalScreens}
            className={`flex items-center gap-1 px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              currentScreen >= totalScreens
                ? 'opacity-40 bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-700 text-white hover:bg-emerald-800 active:scale-98 shadow-sm'
            }`}
          >
            <span>Lanjut</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
