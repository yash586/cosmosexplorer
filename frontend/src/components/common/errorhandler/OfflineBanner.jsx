import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import useNetworkStatus from '../../../hooks/useNetworkStatus';
import styles from './Common.module.css';

/**
 * Offline Banner fixed bottom banner when network is lost
 * Uses useNetworkStatus hook to detect connectivity
 * Animates up from bottom on appearance
 * @returns {JSX.Element|null} Banner or null when online
 */
const OfflineBanner = () => {
  const isOnline = useNetworkStatus();
  if (isOnline) return null;

  return (
    <div className={styles.offlineBanner}>
      <FontAwesomeIcon icon={faWifi} size="sm" />
      No internet connection some data may be unavailable
    </div>
  );
};

export default OfflineBanner;