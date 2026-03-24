import { useState, useEffect, useCallback, useRef } from "react";
import { getAPOD } from "../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle, faCalendar } from '@fortawesome/free-solid-svg-icons';
import ApodHero from "../../components/apod/ApodHero";
import ApodInfo from "../../components/apod/ApodInfo";
import ApodDescription from "../../components/apod/ApodDescription";
import LoadingSpinner from "../../components/common/spinner/LoadingSpinner";
import ErrorMessage from "../../components/common/errorhandler/ErrorMessage";
import { CONFIG } from '../../constants/config';
import styles from './Apod.module.css';

/**
 * APOD Page Astronomy Picture of the Day
 * Fetches and displays NASA's daily astronomy image or video
 * Supports date navigation and random image selection
 * @returns {JSX.Element} APOD page
 */
const Apod = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dateInputRef = useRef(null);

  /**
   * Fetches APOD data from backend
   * @param {string|null} date - Date in YYYY-MM-DD format, null for today
   */
  const fetchApod = useCallback(async (date = null) => {
    try {
      setLoading(true);
      setError(null);
      const params = date ? { date } : {};
      const res    = await getAPOD(params);
      setApod(res.data.data);
    } catch (err) {
      setError(err.userMessage || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApod();
  }, [fetchApod]);

  /**
   * Selects a random date between APOD launch and today
   * then fetches that date's image
   */
  const handleSurprise = () => {
    const start  = new Date(CONFIG.APOD_MIN_DATE);
    const end    = new Date();
    const random = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    fetchApod(random.toISOString().split('T')[0]);
  };

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} onRetry={fetchApod} />;
  if (!apod)   return null;

  return (
    <div className={styles.apodPage}>

      <div className={styles.apodPageHeader}>
        <h1 className={styles.apodPageTitle}>
          Astronomy{' '}
          <span className={styles.apodPageAccent}>Picture</span>
          {' '}of the Day
        </h1>

        <div className={styles.apodPageControls}>
            <input
              type="date"
              className={styles.apodPageDateInput}
              value={apod?.date || ''}
              min={CONFIG.APOD_MIN_DATE}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => fetchApod(e.target.value)}
              onKeyDown={(e) => e.preventDefault()}
            />
          <button
            className={styles.apodPageSurpriseBtn}
            onClick={handleSurprise}
          >
            <FontAwesomeIcon icon={faShuffle} />
            {' '}Surprise Me
          </button>

        </div>
      </div>

      <div className={styles.apodPageMain}>
        <div className={styles.apodPageHero}>
          <ApodHero apod={apod} />
        </div>
        <div className={styles.apodPageInfo}>
          <ApodInfo apod={apod} />
          <ApodDescription apod={apod} />
        </div>
      </div>

    </div>
  );
};

export default Apod;