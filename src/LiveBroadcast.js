import React from 'react';
import './LiveBroadcast.css';

const LiveBroadcast = ({ onBack }) => {
    return (
        <div className="live-broadcast-container">
            <button onClick={onBack} className="back-button" style={{backgroundColor:"#000"}}>
                <i className="fa-solid fa-arrow-right" style={{color:"#fff"}}></i>
            </button>
            <h2 style={{ color: '#FDFFF0', marginTop: '80px' }}>الْبَـــــثُّ الْمُبَــــاشِــــــرُ</h2>
            <div className="channels-container">
                {/* Makkah Live Box */}
                <div className="channel-box">
                    <h3>قناة مكــة -🔴مباشر</h3>
                    <iframe
                        src="https://www.youtube.com/embed/bGe_YpYngrU"
                        title="Makkah Live"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* Mishary Alafasy Box */}
                <div className="channel-box">
                    <h3>مشاري راشد العفاسي -🔴مباشر</h3>
                    <iframe
                        src="https://www.youtube.com/embed/6xYLMHiLMRY"
                        title="Mishary Alafasy Live"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* Almajd Quran Box */}
                <div className="channel-box">
                    <h3>قناة المـجد للقرآن الكريم -🔴مباشر</h3>
                    <iframe
                        src="https://www.elahmad.com/tv/live/channel.php?id=almajd_quran"
                        title="Almajd Quran"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* Quran Radio Box */}
                <div className="channel-box">
                    <h3>إذاعة القرآن الكريـم -🔴مباشر</h3>
                    <iframe
                        src="https://www.youtube.com/embed/WcIUKlizRgA"
                        title="Quran Radio Live"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* Sunnah Radio Box */}
                <div className="channel-box">
                    <h3>السنة النبوية - 🔴مباشر</h3>
                    <iframe
                        src="https://www.youtube.com/embed/Kt7hKHlArl8"
                        title="Sunnah Radio Live"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default LiveBroadcast;
