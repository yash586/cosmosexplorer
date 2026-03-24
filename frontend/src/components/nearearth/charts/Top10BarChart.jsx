import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';
import { COLORS } from '../../../constants/colors';
import { CHART_TOOLTIP_STYLE, CHART_TICK_STYLE } from '../../../constants/config';
import styles from '../Asteroid.module.css';

const Top10BarChart = ({ data }) => {
  if (!data?.length) return <p className={styles.noData}>No data</p>;

  const chartData = data.map(a => ({
    name:     a.name.replace(/[()]/g, '').trim().slice(0, 15),
    diameter: a.diameter_km,
    hazardous: a.hazardous,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.BORDER} />
        <XAxis type="number" unit=" km"      tick={CHART_TICK_STYLE} />
        <YAxis type="category" dataKey="name" tick={{ ...CHART_TICK_STYLE, fontSize: 10 }} width={80} />
        <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(val) => [`${val} km`, 'Diameter']} />
        <Bar dataKey="diameter" radius={[0, 4, 4, 0]}>
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.hazardous ? COLORS.DANGER : COLORS.ACCENT} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Top10BarChart;