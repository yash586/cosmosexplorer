import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faSun } from '@fortawesome/free-solid-svg-icons';
import NaturalEvents from './EarthEvent/NaturalEvents';
import SpaceWeather from './SpaceWeather/SpaceWeather';
import styles from './EarthEvent/EarthEvent.module.css';

/**
 * Event Tabs switches between Natural Events and Space Weather
 * @returns {JSX.Element} Tab navigation content
 */
const EventTabs = () => {
  const [activeTab, setActiveTab] = useState('natural');
  return (
    <div>
      {/* Tab buttons */}
      <ul className={`nav ${styles.tabs} justify-content-center mb-4`}>
        <li className="nav-item">
          <button
            className={`${styles.tabBtn} ${
              activeTab === 'natural' ? styles.tabBtnActive : ''
            }`}
            onClick={() => setActiveTab('natural')}
          >
            <FontAwesomeIcon icon={faEarthAmericas} size="sm" />
            Natural Events
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`${styles.tabBtn} ${
              activeTab === 'weather' ? styles.tabBtnActive : ''
            }`}
            onClick={() => setActiveTab('weather')}
          >
            <FontAwesomeIcon icon={faSun} size="sm" />
            Space Weather
          </button>
        </li>
      </ul>
      {/* Tab content */}
      <div>
        {activeTab === 'natural'
          ? <NaturalEvents />
          : <SpaceWeather />
        }
      </div>
    </div>
  );
};

export default EventTabs;