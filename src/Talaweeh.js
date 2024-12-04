import React, { useState, useEffect, useRef } from "react";
import "./Talaweeh.css";

const Talaweeh = ({ onBack }) => {
  const [surahs, setSurahs] = useState([]);
  const [reciters, setReciters] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // تحميل أسماء السور
    fetch("https://api.alquran.cloud/v1/surah")
      .then((response) => response.json())
      .then((data) => setSurahs(data.data))
      .catch((error) => console.error("Error loading surahs:", error));

    // تحميل قائمة القراء
    fetch(
      "https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_audio.json"
    )
      .then((response) => response.json())
      .then((data) => setReciters(data))
      .catch((error) => console.error("Error loading reciters:", error));
  }, []);

  const handlePlayAudio = (surah) => {
    if (!selectedReciter) {
      alert("من فضلك اختر قارئ أولاً.");
      return;
    }

    const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter}/${surah.number}.mp3`;

    if (audioSrc === audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setAudioSrc(audioUrl);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();
      setIsPlaying(true);

      // تحديث الوقت والمدة
      audioRef.current.addEventListener("timeupdate", () =>
        setCurrentTime(audioRef.current.currentTime)
      );
      audioRef.current.addEventListener("loadedmetadata", () =>
        setDuration(audioRef.current.duration)
      );
    }
  }, [audioSrc]);

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="talaweeh-container">
<button className="back-button" onClick={onBack} style={{ backgroundColor: '#000' }}>        <i className="fa-solid fa-arrow-right"></i>
      </button>
      <h1 className="title" style={{ color: '#FDFFF0', marginTop: '80px',fontSize:"40px" }}>تِــلَاوَةُ الْقُــرْآنِ الْكَرِيــمِ</h1>
      <div className="reciter-selection">
      <label htmlFor="reciter-select" style={{color:"#FDFFF0"}}>اختر القارئ:</label>        <select
          id="reciter-select"
          value={selectedReciter}
          onChange={(e) => setSelectedReciter(e.target.value)}
        >
          <option value="">اختر القارئ</option>
          {reciters.map((reciter) => (
            <option key={reciter.identifier} value={reciter.identifier}>
              {reciter.name} ({reciter.language})
            </option>
          ))}
        </select>
      </div>

      <div className="surah-list">
        <h2 style={{color:"#FDFFF0"}}>اخــــتر الســـورة:</h2>
        <ul>
          {surahs.map((surah) => (
            <li key={surah.number}>
              <span>{surah.name}</span>
              <button onClick={() => handlePlayAudio(surah)}>
                {audioSrc ===
                  `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter}/${surah.number}.mp3` &&
                isPlaying ? (
                  <i className="fa-solid fa-pause"></i>
                ) : (
                  <i className="fa-solid fa-play"></i>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {audioSrc && (
        <div className="audio-bar-modern">
          <button
            className="play-pause-btn"
            onClick={() => {
              if (isPlaying) {
                audioRef.current.pause();
              } else {
                audioRef.current.play();
              }
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
          </button>
          <span className="time">
            {duration ? new Date(duration * 1000).toISOString().substr(14, 5) : "00:00"}
          </span>
          <input
            type="range"
            className="progress-bar"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
          />
          <span className="time">{new Date(currentTime * 1000).toISOString().substr(14, 5)}</span>
        </div>
      )}
      <audio ref={audioRef} hidden />
    </div>
  );
};

export default Talaweeh;
