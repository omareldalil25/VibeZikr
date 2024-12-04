import React from 'react';
import './Home.css';

const Home = ({ goToQuran, goToAdhkar, goToTalaweeh, goToLive }) => {
  return (
    <div className="home-container">
      <img 
        src="/images/logo5.svg" 
        alt="Logo" 
        className="home-logo"
      />
      <nav className="home-nav">
        <ul>
          <li onClick={goToQuran} className="nav-item">
            <img src="/images/moshaf2.svg" alt="Quran" className="nav-icon" />
            <span>القـــــرءان الكريــــــم</span>
          </li>
          <li onClick={goToAdhkar} className="nav-item">
            <img src="/images/pray.svg" alt="Azkar" className="nav-icon" />
            <span>الأذكــــــــــــــــــــــــــــــار</span>
          </li>
          <li onClick={goToTalaweeh} className="nav-item">
          <img src="/images/sound.svg" alt="Talaweeh" className="nav-icon" />
            <span>تلاوة القرءان الكريم</span>
          </li>
          <li onClick={goToLive} className="nav-item">
            <img src="/images/live.svg" alt="Live" className="nav-icon" />
            <span>البـــــــث المبــــاشـــــر</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;