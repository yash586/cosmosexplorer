import { COLORS } from '../../../constants/colors';
import styles from './SpaceWeather.module.css';

/**
 * Returns color for geomagnetic storm severity
 * @param {string} severity 'Severe' | 'Moderate' | 'Minor'
 * @returns {string} Hex color
 */
const getSeverityColor = (severity) => ({
  Severe:   COLORS.DANGER,
  Moderate: COLORS.AMBER,
  Minor:    COLORS.SAFE,
}[severity] || COLORS.MUTED);

/**
 * Geo Storm List — displays recent geomagnetic storms
 * Shows Kp index circle and severity badge
 * Kp ≥ 7 = Severe, ≥ 5 = Moderate, < 5 = Minor
 * @param {Array} storms Geomagnetic storm data from DONKI API
 * @returns {JSX.Element} Storm list
 */
const GeoStormList = ({ storms }) => {
  if (!storms?.length) {
    return (
      <p style={{ color: 'var(--color-muted)', padding: '1rem' }}>
        No geomagnetic storms recorded
      </p>
    );
  }

  return (
    <div className={styles.stormList}>
      {storms.map((storm) => {
        const color = getSeverityColor(storm.severity);
        return (
          <div key={storm.id} className={styles.stormItem}>
            <div
              className={styles.stormKp}
              style={{ borderColor: color, color }}
            >
              <span className={styles.stormKpValue}>{storm.kpIndex}</span>
              <span className={styles.stormKpLabel}>Kp</span>
            </div>

            {/* Info */}
            <div className={styles.stormInfo}>
              <p className={styles.stormTime}>{storm.startTime}</p>
              <span
                className={styles.stormBadge}
                style={{
                  backgroundColor: `${color}22`,
                  color,
                  border: `1px solid ${color}44`,
                }}
              >
                {storm.severity}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GeoStormList;