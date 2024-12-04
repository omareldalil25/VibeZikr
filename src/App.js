import React, { useState } from 'react';
import Intro from './Intro';
import Home from './Home';
import Quran from './Quran';
import Adhkar from './Adhkar';
import Talaweeh from './Talaweeh';
import LiveBroadcast from './LiveBroadcast'; // استيراد مكون البث المباشر

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showHome, setShowHome] = useState(false);
  const [showQuran, setShowQuran] = useState(false);
  const [showAdhkar, setShowAdhkar] = useState(false);
  const [showTalaweeh, setShowTalaweeh] = useState(false);
  const [showLive, setShowLive] = useState(false); // حالة البث المباشر

  const handleFinish = () => {
    setShowIntro(false);
    setShowHome(true);
  };

  const goToQuran = () => {
    setShowHome(false);
    setShowQuran(true);
  };

  const goToAdhkar = () => {
    setShowHome(false);
    setShowAdhkar(true);
  };

  const goToTalaweeh = () => {
    setShowHome(false);
    setShowTalaweeh(true);
  };

  const goToLive = () => {
    setShowHome(false);
    setShowLive(true);
  };

  const goBackToHome = () => {
    setShowQuran(false);
    setShowAdhkar(false);
    setShowTalaweeh(false);
    setShowLive(false);
    setShowHome(true);
  };

  return (
    <div>
      {showIntro && <Intro onFinish={handleFinish} />}
      {showHome && (
        <Home
          goToQuran={goToQuran}
          goToAdhkar={goToAdhkar}
          goToTalaweeh={goToTalaweeh}
          goToLive={goToLive} // تمرير دالة البث المباشر
        />
      )}
      {showQuran && <Quran onBack={goBackToHome} />}
      {showAdhkar && <Adhkar onBack={goBackToHome} />}
      {showTalaweeh && <Talaweeh onBack={goBackToHome} />}
      {showLive && <LiveBroadcast onBack={goBackToHome} />} {/* عرض البث المباشر */}
    </div>
  );
};

export default App;
