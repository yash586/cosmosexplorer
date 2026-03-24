import {
  ScatterChart, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ZAxis
} from 'recharts';
import { COLORS } from '../../../constants/colors';
import { CHART_TOOLTIP_STYLE, CHART_TICK_STYLE } from '../../../constants/config';
import styles from '../Asteroid.module.css';

const ScatterDiagram = ({ asteroids }) => {
  if (!asteroids?.length) return <p className={styles.noData}>No data</p>;

  const safe = asteroids
    .filter(a => !a.hazardous && a.miss_distance_km && a.diameter_km)
    .map(a => ({
      x: Math.round(a.miss_distance_km / 1000),
      y: parseFloat(a.diameter_km.toFixed(3)),
      z: Math.round(a.velocity_kmh / 1000),
      name: a.name,
    }));

  const hazardous = asteroids
    .filter(a => a.hazardous && a.miss_distance_km && a.diameter_km)
    .map(a => ({
      x: Math.round(a.miss_distance_km / 1000),
      y: parseFloat(a.diameter_km.toFixed(3)),
      z: Math.round(a.velocity_kmh / 1000),
      name: a.name,
    }));
  
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ScatterChart margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.BORDER} />
        <XAxis dataKey="x" name="Miss Distance" unit="k km" tick={CHART_TICK_STYLE} />
        <YAxis dataKey="y" name="Diameter"      unit=" km"  tick={CHART_TICK_STYLE} />
        <ZAxis dataKey="z" range={[40, 200]} name="Velocity" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={CHART_TOOLTIP_STYLE} />
        <Scatter name="Safe"      data={safe}      fill={COLORS.SAFE}   opacity={0.8} />
        <Scatter name="Hazardous" data={hazardous} fill={COLORS.DANGER} opacity={0.8} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterDiagram;