import React, { useEffect } from 'react';
import './Intro.css'; // تأكد من المسار الصحيح لملف CSS

const Intro = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 ثواني
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="intro-container">
      <img src="/images/logo5.svg" alt="Logo" className="intro-logo" /> {/* مسار الشعار في public */}
    </div>
  );
};

export default Intro;
