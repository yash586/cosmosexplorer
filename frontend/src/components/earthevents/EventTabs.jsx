import NaturalEvents from './EarthEvent/NaturalEvents';
import SpaceWeather from './SpaceWeather/SpaceWeather';
import './EarthEvent/EarthEventCommon.css';
import { useState } from 'react';

const EventTabs = () => {
  const [activeTab, setActiveTab] = useState('natural');
  return (
    <div>
      <ul className='nav event-tabs justify-content-center mb-4'>
        <li className='nav-item'>
          <button className={`event-tabs_btn ${activeTab === 'natural' ? 'event-tabs_btn-active' : ''}`} onClick={() => setActiveTab('natural')}>
            🌍 Natural Events
          </button>
        </li>
        <li className='nav-item'>
          <button className={`event-tabs_btn ${activeTab === 'weather' ? 'event-tabs_btn-active' : ''}`} onClick={() => setActiveTab('weather')}>
            ☀️ Space Weather
          </button>
        </li>
      </ul>
      <div>
        {activeTab === 'natural' ? <NaturalEvents /> : <SpaceWeather />}
      </div>
    </div>
  );
};

export default EventTabs;