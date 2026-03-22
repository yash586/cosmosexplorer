import './AsteroidCommon.css';

const AsteroidTable = ({asteroids, onSelect}) => {

  if(!asteroids.length) return null;

  return (
    <div className="asteroid_table">
      <h3 className="asteroid_table_heading">
        Detailed Asteroid Data
      </h3>
      <div className="table-responsive">
        <table className="table asteroid_table_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Approach Date</th>
              <th>Miss Distance</th>
              <th>Velocity (km/h)</th>
              <th>Diameter (km)</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {asteroids.map((asteroid) => (
              <tr key={asteroid.id} className="asteroid_table_row" onClick={() => onSelect(asteroid)}>
                <td className="asteroid_table_name">{asteroid.name}</td>
                <td>{asteroid.close_approach_date}</td>
                <td>{asteroid.miss_distance_km ? `${(asteroid.miss_distance_km / 1000000).toFixed(2)}M km` : 'N/A'}</td>  
                <td>{asteroid.velocity_kmh ? asteroid.velocity_kmh.toLocaleString() : 'N/A'}</td>
                <td>{asteroid.diameter_km}</td>
                <td>
                  <span className={`asteroid_table_badge ${
                    asteroid.hazardous
                      ? 'asteroid_table_badge--danger'
                      : 'asteroid_table_badge--safe'
                  }`}>
                    {asteroid.hazardous ? '⚠️ Hazardous' : '✅ Safe'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsteroidTable;