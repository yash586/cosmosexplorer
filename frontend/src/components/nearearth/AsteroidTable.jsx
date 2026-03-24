import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor, faTriangleExclamation,faCircleCheck,faChevronLeft,faChevronRight }  from '@fortawesome/free-solid-svg-icons';
import { CONFIG } from '../../constants/config';
import styles from './Asteroid.module.css';

/**
 * Asteroid Table paginated data table
 * Shows filtered asteroids with key metrics
 * Click row opens detail modal
 * Hides columns on mobile for readability
 * @param {Array} asteroids Filtered asteroid array
 * @param {Function} onSelect Row click handler
 * @returns {JSX.Element} Data table with pagination
 */
const AsteroidTable = ({ asteroids, onSelect }) => {
  const [page, setPage] = useState(1);

  if (!asteroids?.length) {
    return (
      <div className={styles.table}>
        <div className="text-center py-5">
          <FontAwesomeIcon
            icon={faMeteor}
            size="3x"
            style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}
          />
          <p style={{ color: 'var(--color-muted)' }}>
            No asteroids found for selected filters
          </p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(asteroids.length / CONFIG.ASTEROID_PAGE_SIZE);
  const start      = (page - 1) * CONFIG.ASTEROID_PAGE_SIZE;
  const paginated  = asteroids.slice(start, start + CONFIG.ASTEROID_PAGE_SIZE);

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (page > 4) pages.push('...');
    const s = Math.max(2, page - 2);
    const e = Math.min(totalPages - 1, page + 2);
    for (let i = s; i <= e; i++) pages.push(i);
    if (page < totalPages - 3) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className={styles.table}>
      {/* Header */}
      <div className={styles.tableHeader}>
        <h3 className={styles.tableHeading}>Detailed Asteroid Data</h3>
        <span className={styles.tableCount}>
          Showing{' '}
          <span className={styles.tableCountAccent}>
            {start + 1} {Math.min(start + CONFIG.ASTEROID_PAGE_SIZE, asteroids.length)}
          </span>
          {' '}of{' '}
          <span className={styles.tableCountAccent}>
            {asteroids.length}
          </span>
        </span>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className={`table ${styles.asteroidTable}`}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Approach Date</th>
              <th>Miss Distance</th>
              <th>Velocity (km/h)</th>
              <th>Diameter (km)</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((asteroid) => (
              <tr
                key={asteroid.id}
                className={styles.tableRow}
                onClick={() => onSelect(asteroid)}
              >
                <td className={styles.tableName}>{asteroid.name}</td>
                <td>{asteroid.close_approach_date}</td>
                <td>
                  {asteroid.miss_distance_km
                    ? `${(asteroid.miss_distance_km / 1000000).toFixed(2)}M km`
                    : 'N/A'}
                </td>
                <td>
                  {asteroid.velocity_kmh
                    ? asteroid.velocity_kmh.toLocaleString()
                    : 'N/A'}
                </td>
                <td>{asteroid.diameter_km}</td>
                <td>
                  <span className={
                    asteroid.hazardous ? styles.badgeDanger : styles.badgeSafe
                  }>
                    <FontAwesomeIcon
                      icon={asteroid.hazardous
                        ? faTriangleExclamation
                        : faCircleCheck}
                      size="xs"
                    />
                    {asteroid.hazardous ? 'Hazardous' : 'Safe'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-3">
          <ul className="pagination pagination-cosmos mb-0">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>
                <FontAwesomeIcon icon={faChevronLeft} size="xs" />
              </button>
            </li>
            {getPages().map((p, i) =>
              p === '...' ? (
                <li key={`e-${i}`} className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              ) : (
                <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setPage(p)}>
                    {p}
                  </button>
                </li>
              )
            )}
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(page + 1)}>
                <FontAwesomeIcon icon={faChevronRight} size="xs" />
              </button>
            </li>
          </ul>
        </nav>
      )}

    </div>
  );
};

export default AsteroidTable;