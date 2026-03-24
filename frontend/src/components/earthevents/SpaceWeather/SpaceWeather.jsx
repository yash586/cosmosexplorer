import { useEffect, useState } from 'react';
import { FontAwesomeIcon }     from '@fortawesome/react-fontawesome';
import { faSun, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { getSolarFlares, getGeoStorms } from '../../../services/api';
import SolarFlareList from './SolarFlareList';
import GeoStormList from './GeoStormList';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import ErrorMessage from '../../common/errorhandler/ErrorMessage';
import styles from './SpaceWeather.module.css';

/**
 * Space Weather DONKI solar flares geomagnetic storms
 * Fetches last 30 days of data on mount
 * @returns {JSX.Element} Two column space weather panels
 */
const SpaceWeather = () => {
  const [flares, setFlares] = useState([]);
  const [storms, setStorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchAll(); }, []);

  /**
   * Fetches solar flares and geo storms in parallel
   * Uses last 30 days as default date range
   */
  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const end   = new Date().toISOString().split('T')[0];
      const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const [flaresRes, stormsRes] = await Promise.all([
        getSolarFlares({ start_date: start, end_date: end }),
        getGeoStorms({ start_date: start, end_date: end }),
      ]);
      setFlares(flaresRes.data.data);
      setStorms(stormsRes.data.data);
    } catch (err) {
      setError(err.userMessage || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} onRetry={fetchAll} />;

  return (
    <div className={styles.spaceWeather}>
      <div className="row g-4">
        {/* Solar Flares */}
        <div className="col-md-6">
          <div className={styles.panel}>
            <h3 className={styles.panelHeading}>
              <FontAwesomeIcon icon={faSun} />
              Solar Flares
            </h3>
            <SolarFlareList flares={flares} />
          </div>
        </div>

        {/* Geo Storms */}
        <div className="col-md-6">
          <div className={styles.panel}>
            <h3 className={styles.panelHeading}>
              <FontAwesomeIcon icon={faEarthAmericas} />
              Geomagnetic Storms
            </h3>
            <GeoStormList storms={storms} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SpaceWeather;