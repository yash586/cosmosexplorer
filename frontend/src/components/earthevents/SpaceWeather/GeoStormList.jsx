import './SpaceWeatherCommon.css';

const getSeverityColor = (severity) => ({
  Severe:   '#FF4444',
  Moderate: '#FFB347',
  Minor:    '#00D4AA',
})[severity] || '#8B949E';

const GeoStormList = ({storms}) => {
  return (
    <div className="storm_list">
      {storms.map((storm) => {
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