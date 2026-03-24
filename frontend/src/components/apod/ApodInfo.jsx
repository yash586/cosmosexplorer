import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCamera, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/date';
import styles from './Apod.module.css';

/**
 * APOD Info displays title and metadata badges
 * @param {Object} apod APOD data
 * @param {string} apod.title Image title
 * @param {string} apod.date Date string YYYY-MM-DD
 * @param {string} apod.media_type 'image' or 'video'
 * @param {string} apod.copyright Copyright holder
 * @returns {JSX.Element} Info panel
 */
const ApodInfo = ({ apod }) => {
  return (
    <div className={styles.info}>
      <h1 className={styles.infoTitle}>{apod.title}</h1>
      <div className={styles.infoBadges}>
        <span className={`${styles.badge} ${styles.badgeDate}`}>
          <FontAwesomeIcon icon={faCalendarDays} size="xs" />
          {formatDate(apod.date)}
        </span>
        <span className={`${styles.badge} ${styles.badgeType}`}>
          <FontAwesomeIcon
            icon={apod.media_type === 'video' ? faVideo : faCamera}
            size="xs"
          />
          {apod.media_type === 'video' ? 'Video' : 'Image'}
        </span>
        {apod.copyright && (
          <span className={`${styles.badge} ${styles.badgeCopy}`}>
            <FontAwesomeIcon icon={faCopyright} size="xs" />
            {apod.copyright.trim()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ApodInfo;