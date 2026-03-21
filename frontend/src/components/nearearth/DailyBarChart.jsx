import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const DailyBarChart = ({ data }) => {
  if (!data?.length) return <p style={{ color: '#8B949E' }}>No data</p>;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#8B949E', fontSize: 11 }}
          tickFormatter={(val) => val.slice(5)} // ← shows MM-DD only
        />
        <YAxis tick={{ fill: '#8B949E', fontSize: 11 }} />
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
        <Bar dataKey="total"     name="Total"     fill="#00B4FF" radius={[4,4,0,0]} />
        <Bar dataKey="hazardous" name="Hazardous" fill="#FF4444" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyBarChart;