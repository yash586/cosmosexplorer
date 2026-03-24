import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Common.module.css';

/**
 * 404 Not Found Page
 * Shown when user navigates to unknown route
 * @returns {JSX.Element} 404 page
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundContent}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.notFoundIcon}
          size="3x"
        />
        <h1 className={styles.notFoundCode}>404</h1>
        <p className={styles.notFoundSubtitle}>
          Lost in space...
        </p>
        <p className={styles.notFoundText}>
          The page you're looking for doesn't exist
        </p>
        <button
          className={styles.primaryBtn}
          onClick={() => navigate('/')}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="sm" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;