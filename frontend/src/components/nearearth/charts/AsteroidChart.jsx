import DailyBarChart  from './DailyBarChart';
import ScatterDiagram from './ScatterDiagram';
import Top10BarChart  from './Top10BarChart';
import RiskDonutChart from './RiskDonutChart';
import styles from '../Asteroid.module.css';

/**
 * Asteroid Charts 2x2 dashboard grid
 * All charts update when local filters change
 * @param {Array}  dailyCount Daily approach counts
 * @param {Array}  asteroids Filtered asteroid array
 * @param {Array}  top10 Top 10 largest asteroids
 * @returns {JSX.Element} 2x2 chart grid
 */
const AsteroidChart = ({ dailyCount, asteroids, top10 }) => {
  return (
    <div className="row g-4 mb-4">
      {/* Daily bar chart */}
      <div className="col-md-6">
        <div className={styles.chartPanel}>
          <h3 className={styles.chartTitle}>
            Daily Asteroid Approaches
          </h3>
          <DailyBarChart data={dailyCount} />
        </div>
      </div>

      {/* Risk donut */}
      <div className="col-md-6">
        <div className={styles.chartPanel}>
          <h3 className={styles.chartTitle}>
            Risk Assessment
          </h3>
          <RiskDonutChart asteroids={asteroids} />
        </div>
      </div>

      {/* Scatter */}
      <div className="col-md-6">
        <div className={styles.chartPanel}>
          <h3 className={styles.chartTitle}>
            Threat Profile — Miss Distance vs Diameter
          </h3>
          <ScatterDiagram asteroids={asteroids} />
        </div>
      </div>

      {/* Top 10 */}
      <div className="col-md-6">
        <div className={styles.chartPanel}>
          <h3 className={styles.chartTitle}>
            Top 10 Largest Asteroids
          </h3>
          <Top10BarChart data={top10} />
        </div>
      </div>

    </div>
  );
};

export default AsteroidChart;