import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS } from '../../constants/icons';
import { COLORS } from '../../constants/colors';
import styles from './Asteroid.module.css';

/**
 * Asteroid Stat Cards 4 key metrics
 * Values recalculated from locally filtered asteroids
 * @param {Object} stats Calculated stats
 * @param {number} stats.total Total asteroid count
 * @param {number} stats.hazardous Hazardous count
 * @param {number} stats.closestApproach Closest miss in km
 * @param {number} stats.avgVelocity Average velocity km/h
 * @returns {JSX.Element} 4 stat cards
 */
const AsteroidStats = ({ stats }) => {
  const CARDS = [
    {
      label: 'Total Asteroids',
      value: stats?.total || 0,
      sub:   'This week',
      color: COLORS.ACCENT,
      icon:  ICONS.NEAR_EARTH,
    },
    {
      label: 'Potentially Hazardous',
      value: stats?.hazardous || 0,
      sub:   'Requires monitoring',
      color: COLORS.DANGER,
      icon:  ICONS.HAZARDOUS,
    },
    {
      label: 'Closest Approach',
      value: stats?.closestApproach
        ? `${(stats.closestApproach / 1000000).toFixed(1)}M km`
        : 'N/A',
      sub:   'This week',
      color: COLORS.AMBER,
      icon:  ICONS.TARGET,
    },
    {
      label: 'Avg Velocity',
      value: stats?.avgVelocity
        ? `${stats.avgVelocity.toLocaleString()} km/h`
        : 'N/A',
      sub:   'This week',
      color: COLORS.SAFE,
      icon:  ICONS.VELOCITY,
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {CARDS.map((card) => (
        <div key={card.label} className="col-6 col-md-3">
          <div
            className={styles.statCard}
            style={{ '--card-color': card.color }}
          >
            <div className={styles.statIcon}>
              <FontAwesomeIcon icon={card.icon} size="lg" />
            </div>
            <p className={styles.statValue}>{card.value}</p>
            <p className={styles.statLabel}>{card.label}</p>
            <p className={styles.statSub}>{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AsteroidStats;