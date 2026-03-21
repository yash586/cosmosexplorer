import './AsteroidCommon.css';

const AsteroidStats = ({stats}) => {
  const CARDS = [
    {
      label:    'Total Asteroids',
      value:    stats?.total || 0,
      sub:      'This week',
      color:    '#00B4FF',
      icon:     '☄️',
    },
    {
      label:    'Potentially Hazardous',
      value:    stats?.hazardous || 0,
      sub:      'Requires monitoring',
      color:    '#FF4444',
      icon:     '⚠️',
    },
    {
      label:    'Closest Approach',
      value:    stats?.closestApproach
                  ? `${(stats.closestApproach / 1000000).toFixed(1)}M km`
                  : 'N/A',
      sub:      'This week',
      color:    '#FFB347',
      icon:     '🎯',
    },
    {
      label:    'Avg Velocity',
      value:    stats?.avgVelocity
                  ? `${stats.avgVelocity.toLocaleString()} km/h`
                  : 'N/A',
      sub:      'This week',
      color:    '#00D4AA',
      icon:     '💨',
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {CARDS.map((card) => (
        <div key={card.label} className="col-6 col-md-3">
          <div className="asteroid_stat_card" style={{'--card-color': card.color}}>
            <div className="asteroid_stat_card-icon">{card.icon}</div>
            <p className="asteroid_stat_card-value">{card.value}</p>
            <p className="asteroid_stat_card-label">{card.label}</p>
            <p className="asteroid_stat_card-sub">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AsteroidStats;