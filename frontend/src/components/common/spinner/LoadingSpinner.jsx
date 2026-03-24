import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS } from '../../../constants/icons';
import styles from './LoadingSpinner.module.css';

/**
 * Loading Spinner full page loading state
 * Shown while API calls are pending
 * Uses FontAwesome spinning star icon
 * @returns {JSX.Element} Centered loading UI
 */
const LoadingSpinner = () => ( 
  <div className={styles.spinner}>
    <FontAwesomeIcon
      icon={ICONS.LOADING}
      spin
      size="3x"
      className={styles.icon}
    />
    <p className={styles.text}>Loading from NASA...</p>
    <p className={styles.subtext}>
      First load may take up to 60 seconds
    </p>
  </div>
);

export default LoadingSpinner;