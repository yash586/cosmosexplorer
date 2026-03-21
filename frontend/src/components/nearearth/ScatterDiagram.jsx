import {
  ScatterChart, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ZAxis
} from 'recharts';

const ScatterDiagram = ({ asteroids }) => {
  if (!asteroids?.length) return <p style={{ color: '#8B949E' }}>No data</p>;

  const safe = asteroids
    .filter(a => !a.hazardous && a.miss_distance_km && a.diameter_km)
    .map(a => ({
      x: Math.round(a.miss_distance_km / 1000), // → thousands km
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

  const tooltipStyle = {
    backgroundColor: '#161B22',
    border: '1px solid #30363D',
    borderRadius: '8px',
    color: '#E6EDF3',
  };
  
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ScatterChart margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
        <XAxis
          dataKey="x"
          name="Miss Distance"
          unit="k km"
          tick={{ fill: '#8B949E', fontSize: 11 }}
        />
        <YAxis
          dataKey="y"
          name="Diameter"
          unit=" km"
          tick={{ fill: '#8B949E', fontSize: 11 }}
        />
        <ZAxis dataKey="z" range={[40, 200]} name="Velocity" />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={tooltipStyle}
        />
        <Scatter name="Safe"      data={safe}      fill="#00D4AA" opacity={0.8} />
        <Scatter name="Hazardous" data={hazardous} fill="#FF4444" opacity={0.8} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterDiagram;