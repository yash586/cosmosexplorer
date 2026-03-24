import EventTabs from '../../components/earthevents/EventTabs';
import styles from './EarthEvents.module.css';

/**
 * Earth Events Page
 * Displays live natural events tracked by NASA satellites
 * via EONET API and space weather data via DONKI API
 * Tabs:
 * Natural Events (EONET) wildfires, storms, volcanoes
 * Space Weather (DONKI) solar flares, geomagnetic storms
 * @returns {JSX.Element} Earth Events page
 */
const EarthEvents = () => {
  return (
    <div className={styles.earthPage}>
      <div className="container-fluid px-4">
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.accent}>NASA</span>
            {' '}Earth Events
          </h1>
          <p className={styles.subtitle}>
            Live natural events tracked by NASA satellites
            wildfires, storms, volcanoes and more.
          </p>
        </div>
        <EventTabs />
      </div>
    </div>
  );
};

export default EarthEvents;