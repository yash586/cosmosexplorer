import {
  PieChart, Pie, Cell,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { COLORS } from '../../../constants/colors';
import { CHART_TOOLTIP_STYLE } from '../../../constants/config';
import styles from '../Asteroid.module.css';

const RiskDonutChart = ({ asteroids }) => {
  if (!asteroids?.length) return <p className={styles.noData}>No data</p>;

  const hazardous = asteroids.filter(a => a.hazardous).length;
  const nonHazardous = asteroids.length - hazardous;
  const hazardousPct = Math.round((hazardous / asteroids.length) * 100);
  const isAllHazardous = hazardousPct === 100;

  const data = [
    { name: 'Safe', value: nonHazardous, color: COLORS.SAFE},
    { name: 'Hazardous', value: hazardous, color: COLORS.DANGER},
  ];

  const displayPct = isAllHazardous ? 100 : Math.round((nonHazardous / asteroids.length) * 100);
  const displayLabel = isAllHazardous ? 'Hazardous' : 'Safe';
  const displayColor = isAllHazardous ? COLORS.DANGER : COLORS.SAFE;

  return (
    <div style={{ position: 'relative' }}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={3} dataKey="value">
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Legend wrapperStyle={{ fontSize: '12px', color: COLORS.MUTED }} />
        </PieChart>
      </ResponsiveContainer>
      <div className={styles.donutCenter}>
        <p className={styles.donutPct} style={{ color: displayColor }}>
          {displayPct}%
        </p>
        <p className={styles.donutLabel} style={{ color: displayColor }}>
          {displayLabel}
        </p>
      </div>
    </div>
  );
};

export default RiskDonutChart;