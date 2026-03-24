import { COLORS } from '../../../constants/colors';
import styles from './SpaceWeather.module.css';

/**
 * Returns color for solar flare class
 * X > M > C > B in descending intensity
 * @param {string} classType e.g. 'X2.5', 'M1.2'
 * @returns {string} Hex color
 */
const getFlareColor = (classType) => ({
  X: COLORS.DANGER,
  M: COLORS.AMBER,
  C: COLORS.SAFE,
  B: COLORS.MUTED,
}[classType?.charAt(0)] || COLORS.MUTED);

/**
 * Returns bar width % for flare intensity visualisation
 * @param {string} classType Flare class
 * @returns {string} CSS width percentage
 */
const getFlareWidth = (classType) => ({
  X: '100%',
  M: '70%',
  C: '40%',
  B: '15%',
}[classType?.charAt(0)] || '10%');

/**
 * Solar Flare List — displays recent solar flares
 * Colour coded by class: X(red) M(amber) C(green) B(grey)
 * @param {Array} flares Solar flare data from DONKI API
 * @returns {JSX.Element} Flare list
 */
const SolarFlareList = ({ flares }) => {
  if (!flares?.length) {
    return (
      <p style={{ color: 'var(--color-muted)', padding: '1rem' }}>
        No solar flares recorded
      </p>
    );
  }

  return (
    <div className={styles.flareList}>
      {flares.map((flare) => {
        const color = getFlareColor(flare.classType);
        return (
          <div key={flare.id} className={styles.flareItem}>
            <span
              className={styles.flareClass}
              style={{ backgroundColor: color, color: '#000' }}
            >
              {flare.classType}
            </span>
            <div className={styles.flareInfo}>
              <p className={styles.flareLocation}>{flare.sourceLocation}</p>
              <p className={styles.flareTime}>Peak: {flare.peakTime}</p>
            </div>
            {/* Intensity bar */}
            <div className={styles.flareBarWrap}>
              <div
                className={styles.flareBar}
                style={{
                  backgroundColor: color,
                  width: getFlareWidth(flare.classType),
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SolarFlareList;