import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faRotate,faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './Common.module.css';

/**
 * Error Message displayed when API calls fail
 * Shows contextual icon based on error type
 * Provides retry button and home link
 * @param {string} message Error message to display
 * @param {Function} onRetry Optional retry callback
 * @returns {JSX.Element} Error state UI
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles.errorMessage}>
      <FontAwesomeIcon
        icon={faCircleExclamation}
        className={styles.errorIcon}
        size="3x"
      />
      <h3 className={styles.errorTitle}>
        {message?.includes('timeout') ? 'Request Timed Out':
         message?.includes('internet') ? 'No Connection':
         message?.includes('404') ? 'Not Found' :'Something Went Wrong'}
      </h3>
      <p className={styles.errorText}>
        {message || 'Something went wrong. Please try again.'}
      </p>
      {onRetry && (
        <button className={styles.primaryBtn} onClick={onRetry}>
          <FontAwesomeIcon icon={faRotate} size="sm" />
          Try Again
        </button>
      )}
      <Link to="/" className={styles.errorHomeLink}>
        <FontAwesomeIcon icon={faHouse} size="xs" />
        {' '}Back to Home
      </Link>
    </div>
  );
};

export default ErrorMessage;