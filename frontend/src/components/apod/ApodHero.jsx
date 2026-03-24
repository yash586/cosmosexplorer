import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import styles from './Apod.module.css';

/**
 * APOD Hero displays the main image or video
 * Shows AI Enhanced badge overlay
 * @param {Object} apod APOD data from NASA API
 * @param {string} apod.media_type 'image' or 'video'
 * @param {string} apod.url Media URL
 * @param {string} apod.hdurl HD image URL
 * @param {string} apod.title image title
 * @returns {JSX.Element} Hero media component
 */
const ApodHero = ({ apod }) => {
  const isVideo = apod.media_type === 'video';

  return (
    <div className={styles.hero}>
      {isVideo ? (
        <iframe
          className={styles.heroVideo}
          src={apod.url}
          title={apod.title}
          allowFullScreen
        />
      ) : (
        <img
          className={styles.heroImage}
          src={apod.hdurl || apod.url}
          alt={apod.title}
          loading="lazy"
        />
      )}
      <div className={styles.aiBadge}>
        <FontAwesomeIcon icon={faRobot} size="xs" />
        AI Enhanced
      </div>
    </div>
  );
};

export default ApodHero;