// src/Quran.js
import React, { useEffect, useState } from 'react';
import Surah from './Surah';
import './Quran.css';

const Quran = ({ onBack }) => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/surah.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSurahs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching surah list: ', error);
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  const handleSurahClick = async (surah) => {
    const surahPath = `${process.env.PUBLIC_URL}/data/surah_${surah.index}.json`;
    console.log(`Fetching data from: ${surahPath}`);  // إضافة لإظهار المسار في الكونسول
    try {
      const response = await fetch(surahPath);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const surahData = await response.json();
      setSelectedSurah(surahData);
    } catch (error) {
      console.error('Error fetching surah data: ', error);
    }
  };

  return (
    <div className="quran-container">
      <button className="back-button" onClick={onBack} style={{ backgroundColor: '#000' }}>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      {loading ? (
        <p>جاري تحميل السور...</p>
      ) : selectedSurah ? (
        <Surah surah={selectedSurah} onBack={() => setSelectedSurah(null)} />
      ) : (
        <div className="surah-list">
          <h2 style={{ color: '#FDFFF0', marginTop: '80px' }}>سُـــورُ الْقُــرْآنِ الْكَرِيــمِ</h2>
          <div className="surah-boxes">
            {surahs.map((surah) => (
              <div key={surah.index} className="surah-box" onClick={() => handleSurahClick(surah)}>
                سورة {surah.titleAr} {/* إضافة كلمة "سورة" قبل اسم السورة */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quran;