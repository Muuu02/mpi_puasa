import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PIDToolbar } from './components/PIDToolbar';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { PetaMateriModal } from './components/PetaMateriModal';
import { PublishGuideModal } from './components/PublishGuideModal';
import { SCREEN_LIST } from './data/mpiData';
import { sound } from './utils/audio';

// Screens
import { Screen1Home } from './components/screens/Screen1Home';
import { Screen2Cover } from './components/screens/Screen2Cover';
import { Screen3Objectives } from './components/screens/Screen3Objectives';
import { Screen4IceBreaking } from './components/screens/Screen4IceBreaking';
import { Screen5Definition } from './components/screens/Screen5Definition';
import { Screen6Requirements } from './components/screens/Screen6Requirements';
import { Screen7Pillars } from './components/screens/Screen7Pillars';
import { Screen8Dalil } from './components/screens/Screen8Dalil';
import { Screen9Invalidators } from './components/screens/Screen9Invalidators';
import { Screen10Niat } from './components/screens/Screen10Niat';
import { Screen11DoaBuka } from './components/screens/Screen11DoaBuka';
import { Screen12Hikmah } from './components/screens/Screen12Hikmah';
import { Screen13PjBLChallenge } from './components/screens/Screen13PjBLChallenge';
import { Screen14PjBLSteps } from './components/screens/Screen14PjBLSteps';
import { Screen15PjBLRubricGallery } from './components/screens/Screen15PjBLRubricGallery';
import { Screen16Assessment } from './components/screens/Screen16Assessment';
import { Screen17Reflection } from './components/screens/Screen17Reflection';
import { ScreenExtensionSunah } from './components/screens/ScreenExtensionSunah';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState<boolean>(false);
  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState<boolean>(false);

  const totalScreens = SCREEN_LIST.length;

  const navigateTo = (screenId: number) => {
    if (screenId >= 1 && screenId <= totalScreens) {
      setCurrentScreen(screenId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextScreen = () => {
    if (currentScreen < totalScreens) {
      navigateTo(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 1) {
      navigateTo(currentScreen - 1);
    }
  };

  // Keyboard navigation for teachers on whiteboard/keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        sound.playClick();
        nextScreen();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        sound.playClick();
        prevScreen();
      } else if (e.key === 'Escape') {
        setIsTeacherGuideOpen(false);
        setIsRoadmapOpen(false);
        setIsPublishGuideOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen]);

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 1:
        return (
          <Screen1Home
            onNavigate={navigateTo}
            onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
            onOpenRoadmap={() => setIsRoadmapOpen(true)}
            onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
          />
        );
      case 2:
        return <Screen2Cover onNext={nextScreen} />;
      case 3:
        return <Screen3Objectives onNext={nextScreen} onNavigate={navigateTo} />;
      case 4:
        return <Screen4IceBreaking onNext={nextScreen} />;
      case 5:
        return <Screen5Definition onNext={nextScreen} />;
      case 6:
        return <Screen6Requirements onNext={nextScreen} />;
      case 7:
        return <Screen7Pillars onNext={nextScreen} />;
      case 8:
        return <Screen8Dalil onNext={nextScreen} />;
      case 9:
        return <Screen9Invalidators onNext={nextScreen} />;
      case 10:
        return <Screen10Niat onNext={nextScreen} />;
      case 11:
        return <Screen11DoaBuka onNext={nextScreen} />;
      case 12:
        return <Screen12Hikmah onNext={nextScreen} />;
      case 13:
        return <Screen13PjBLChallenge onNext={nextScreen} onNavigate={navigateTo} />;
      case 14:
        return <Screen14PjBLSteps onNext={nextScreen} />;
      case 15:
        return <Screen15PjBLRubricGallery onNext={nextScreen} />;
      case 16:
        return <Screen16Assessment onNext={nextScreen} />;
      case 17:
        return <Screen17Reflection onRestart={() => navigateTo(1)} onNavigate={navigateTo} />;
      case 18:
        return <ScreenExtensionSunah onBackToMain={() => navigateTo(2)} onNavigate={navigateTo} />;
      default:
        return (
          <Screen1Home
            onNavigate={navigateTo}
            onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
            onOpenRoadmap={() => setIsRoadmapOpen(true)}
            onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
          />
        );
    }
  };

  const currentScreenMeta = SCREEN_LIST.find((s) => s.id === currentScreen);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-[#1E293B]">
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onOpenRoadmap={() => setIsRoadmapOpen(true)}
        onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
      />

      {/* Screen Category & Title Breadcrumb Subbar */}
      <div className="bg-white/80 border-b border-slate-200/80 px-6 py-2 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-800">
              {currentScreenMeta?.category || 'Materi'}
            </span>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-700">
              {currentScreenMeta?.title || ''}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
            <span>Papan Interaktif Digital (PID) Ready</span>
            <span aria-hidden="true">·</span>
            <span>Navigasi Tombol Sentuh / Keyboard [←] [→]</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {renderActiveScreen()}
      </main>

      {/* Bottom PID Whiteboard Touch Toolbar */}
      <div className="no-print">
        <PIDToolbar
          currentScreen={currentScreen}
          totalScreens={totalScreens}
          onPrev={prevScreen}
          onNext={nextScreen}
          onSelectScreen={navigateTo}
          onOpenRoadmap={() => setIsRoadmapOpen(true)}
        />
      </div>

      {/* Modals */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
        onJumpToScreen={navigateTo}
      />

      <PetaMateriModal
        isOpen={isRoadmapOpen}
        currentScreen={currentScreen}
        onClose={() => setIsRoadmapOpen(false)}
        onSelectScreen={navigateTo}
      />

      <PublishGuideModal
        isOpen={isPublishGuideOpen}
        onClose={() => setIsPublishGuideOpen(false)}
      />
    </div>
  );
}
