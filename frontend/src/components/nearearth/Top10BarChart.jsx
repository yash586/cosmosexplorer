import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';

const Top10BarChart = ({ data }) => {
  if (!data?.length) return <p style={{ color: '#8B949E' }}>No data</p>;

  const chartData = data.map(a => ({
    name:     a.name.replace(/[()]/g, '').trim().slice(0, 15),
    diameter: a.diameter_km,
    hazardous: a.hazardous,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
        <XAxis
          type="number"
          unit=" km"
          tick={{ fill: '#8B949E', fontSize: 11 }}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: '#8B949E', fontSize: 10 }}
          width={80}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#161B22',
            border: '1px solid #30363D',
            borderRadius: '8px',
            color: '#E6EDF3',
          }}
          formatter={(val) => [`${val} km`, 'Diameter']}
        />
        <Bar dataKey="diameter" radius={[0, 4, 4, 0]}>
          {chartData.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.hazardous ? '#FF4444' : '#00B4FF'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Top10BarChart;