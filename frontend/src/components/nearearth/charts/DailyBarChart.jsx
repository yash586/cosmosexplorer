import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { COLORS }  from '../../../constants/colors';
import { CHART_TOOLTIP_STYLE, CHART_TICK_STYLE }  from '../../../constants/config';
import styles from '../Asteroid.module.css';

const DailyBarChart = ({ data }) => {
  if (!data?.length) return <p className={styles.noData}>No data</p>;
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.BORDER} />
        <XAxis
          dataKey="date"
          tick={CHART_TICK_STYLE}
          tickFormatter={(val) => val.slice(5)}
        />
        <YAxis tick={CHART_TICK_STYLE} />
        <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
        <Legend wrapperStyle={{ fontSize: '12px', color: COLORS.MUTED }} />
        <Bar dataKey="total"     name="Total"     fill={COLORS.ACCENT}  radius={[4,4,0,0]} />
        <Bar dataKey="hazardous" name="Hazardous" fill={COLORS.DANGER}  radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyBarChart;