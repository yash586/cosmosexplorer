import {
  PieChart, Pie, Cell,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const RiskDonutChart = ({ asteroids }) => {
  if (!asteroids?.length) return <p style={{ color: '#8B949E' }}>No data</p>;

  const hazardous    = asteroids.filter(a => a.hazardous).length;
  const nonHazardous = asteroids.length - hazardous;

  const data = [
    { name: 'Safe', value: nonHazardous, color: '#00D4AA' },
    { name: 'Hazardous', value: hazardous,    color: '#FF4444' },
  ];

  const safePct = Math.round((nonHazardous / asteroids.length) * 100);
  const hazardousPct = Math.round((hazardous / asteroids.length) * 100);
  const isAllHazardous = hazardousPct === 100;
  const displayPct   = isAllHazardous ? 100 : safePct;
  const displayLabel = isAllHazardous ? 'Hazardous' : 'Safe';
  const displayColor = isAllHazardous ? '#FF4444' : '#00D4AA';

  return (
    <div style={{ position: 'relative' }}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#161B22',
              border: '1px solid #30363D',
              borderRadius: '8px',
              color: '#E6EDF3',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#8B949E' }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Centre text */}
      <div style={{
        position:  'absolute',
        top:       '50%',
        left:      '50%',
        transform: 'translate(-50%, -60%)',
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <p style={{ color: displayColor, fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>
          {displayPct}%
        </p>
        <p style={{ color: displayColor, fontSize: '0.75rem', margin: 0 }}>{displayLabel}</p>
      </div>
    </div>
  );
};

export default RiskDonutChart;