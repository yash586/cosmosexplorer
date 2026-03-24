import { useState, useEffect } from "react";
import { getAsteroids } from '../../services/api';
import AsteroidFilters from '../../components/nearearth/AsteroidFilter';
import AsteroidStats from '../../components/nearearth/AsteroidStats';
import AsteroidChart from '../../components/nearearth/charts/AsteroidChart';
import AsteroidTable from '../../components/nearearth/AsteroidTable';
import AsteroidModal from "../../components/nearearth/AsteroidModal";
import LoadingSpinner from '../../components/common/spinner/LoadingSpinner';
import ErrorMessage from '../../components/common/errorhandler/ErrorMessage';
import { getDefaultDates } from "../../utils/date";
import styles from './NearEarth.module.css';

/**
 * Near Earth Objects Page
 * Tracks asteroids passing near Earth using NASA NeoWs API
 * Features:
 * Date range filter (max 7 days NASA API limit)
 * Hazardous only toggle (local filter)
 * Min diameter slider (local filter)
 * 4 stat cards
 * 2x2 chart dashboard
 * Data table with pagination
 * Click row asteroid detail modal
 * @returns {JSX.Element} Near Earth page
 */
const NearEarth = () => {
  const { start, end } = getDefaultDates();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({
    startDate:   start,
    endDate:     end,
    hazardous:   false,
    minDiameter: 0,
  });

  useEffect(() => {
    fetchAsteroids(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fetches asteroid data from backend
   * Only sends date range to API other filters applied locally
   * @param {Object} currentFilters Filter state
   */
  const fetchAsteroids = async (currentFilters) => {
    const f = currentFilters || filters;
    try {
      setLoading(true);
      setError(null);
      const response = await getAsteroids({
        start_date: f.startDate,
        end_date: f.endDate,
      });
      setData(response.data.data);
    } catch (err) {
      setError(err.userMessage || err.message || 'Failed to load asteroid data');
    } finally {
      setLoading(false);
    }
  };

  /** @param {Object} newFilters Updated filter values */
  const handleFilterChange = (newFilters) => setFilters(newFilters);

  /**
   * Filters loaded asteroids by diameter and hazardous status
   * No API call needed filters already loaded data
   */
  const filteredAsteroids = data?.asteroids?.filter((asteroid) => {
    const diameterMatch = asteroid.diameter_km >= filters.minDiameter;
    const hazardousMatch = filters.hazardous
      ? asteroid.hazardous === true
      : true;
    return diameterMatch && hazardousMatch;
  }) || [];

  /** Recalculates stats from filtered asteroids */
  const filteredStats = data ? {
    ...data.stats,
    total: filteredAsteroids.length,
    hazardous: filteredAsteroids.filter((a) => a.hazardous).length,
  } : null;

  /** Recalculates daily count chart from filtered asteroids */
  const filteredDailyCount = filteredAsteroids.reduce((acc, asteroid) => {
      const date = asteroid.close_approach_date;
      if (!date) return acc;
      const existing = acc.find((d) => d.date === date);
      if (existing) {
        existing.total++;
        if (asteroid.hazardous) existing.hazardous++;
      } else {
        acc.push({
          date,
          total: 1,
          hazardous: asteroid.hazardous ? 1 : 0,
        });
      }
      return acc;
    }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

  /** Top 10 largest asteroids by diameter */
  const filteredTop10 = [...filteredAsteroids]
    .sort((a, b) => b.diameter_km - a.diameter_km)
    .slice(0, 10);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} onRetry={fetchAsteroids} />;

  return (
    <div className={styles.nearEarthPage}>
      <div className="container-fluid px-4">

        {/* Header Filter trigger */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              Near{' '}
              <span className={styles.accent}>Earth</span>
              {' '}Objects
            </h1>
            <p className={styles.subtitle}>
              Real time asteroid tracking powered by NASA NeoWs API
            </p>
          </div>

          {/* Filter modal trigger */}
          <AsteroidFilters
            filters={filters}
            onChange={handleFilterChange}
            onSearch={fetchAsteroids}
          />
        </div>

        {/* Content */}
        <div className="row g-4">
          <div className="col-12">
            <AsteroidStats stats={filteredStats} />
            <AsteroidChart
              dailyCount={filteredDailyCount}
              asteroids={filteredAsteroids}
              top10={filteredTop10}
            />
            <AsteroidTable
              asteroids={filteredAsteroids}
              onSelect={setSelected}
            />
          </div>
        </div>

      </div>

      {/* Asteroid detail modal */}
      {selected && (
        <AsteroidModal
          asteroid={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default NearEarth;