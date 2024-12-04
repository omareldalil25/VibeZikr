import React from 'react';
import './Surah.css';

const Surah = ({ surah, onBack }) => {
    const verseKeys = Object.keys(surah.verse);

    return (
        <div className="surah-container">
            <button className="back-button" onClick={onBack} style={{ backgroundColor: '#000' }}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>
            <h2 className="h2s" style={{color:"#000"}}>{surah.name}</h2>
            <p className="bismillah-text">بِسۡــمِ ٱللَّـــهِ ٱلرَّحۡمَـٰـــــنِ ٱلرَّحِیـــــمِ</p>
            <div className="verses-container">
                {verseKeys.length === 0 ? (
                    <p>لا توجد آيات لعرضها</p>
                ) : (
                    <p className="verses-text">
                        {verseKeys.map((key) => (
                            <span key={key}>
                                {surah.verse[key]}{' '}
                                <span className="verse-number">({key.split('_')[1]})</span>{' '}
                            </span>
                        ))}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Surah;
