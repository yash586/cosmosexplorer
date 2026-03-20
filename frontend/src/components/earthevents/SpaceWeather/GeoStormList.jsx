import './SpaceWeatherCommon.css';

const DUMMY_STORMS = [
  { id: 1, startTime: '2026-03-15 06:00', kpIndex: 8, severity: 'Severe'   },
  { id: 2, startTime: '2026-03-13 18:00', kpIndex: 6, severity: 'Moderate' },
  { id: 3, startTime: '2026-03-11 12:00', kpIndex: 4, severity: 'Minor'    },
  { id: 4, startTime: '2026-03-09 00:00', kpIndex: 7, severity: 'Severe'   },
  { id: 5, startTime: '2026-03-07 09:00', kpIndex: 5, severity: 'Moderate' },
];

const getSeverityColor = (severity) => ({
  Severe:   '#FF4444',
  Moderate: '#FFB347',
  Minor:    '#00D4AA',
})[severity] || '#8B949E';

const GeoStormList = () => {
  return (
    <div className="storm_list">
      {DUMMY_STORMS.map((storm) => {
        const color = getSeverityColor(storm.severity);
        return (
          <div key={storm.id} className="storm_item">

            {/* Kp index */}
            <div
              className="storm_item_kp"
              style={{ borderColor: color, color }}
            >
              <span className="storm_item_kp-value">{storm.kpIndex}</span>
              <span className="storm_item_kp-label">Kp</span>
            </div>

            {/* Info */}
            <div className="storm_item_info">
              <p className="storm_item_time">{storm.startTime}</p>
              <span
                className="storm_item_badge"
                style={{
                  backgroundColor: `${color}22`,
                  color,
                  border: `1px solid ${color}44`
                }}
              >
                {storm.severity}
              </span>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default GeoStormList;