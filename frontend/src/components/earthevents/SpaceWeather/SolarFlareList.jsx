import './SpaceWeatherCommon.css';

const getFlareColor = (classType) => {
  const cls = classType?.charAt(0);
  return {
    X: '#FF4444',
    M: '#FFB347',
    C: '#00D4AA',
    B: '#8B949E',
  }[cls] || '#8B949E';
};

const SolarFlareList = ({flare}) => {
  return (
    <div className="flare_list">
      {flare.map((flare) => {
        const color = getFlareColor(flare.classType);
        return (
          <div key={flare.id} className="flare_item">
            {/* Class badge */}
            <span
              className="flare_item_class"
              style={{ backgroundColor: color, color: '#000' }}
            >
              {flare.classType}
            </span>

            {/* Info */}
            <div className="flare_item_info">
              <p className="flare_item_location">{flare.sourceLocation}</p>
              <p className="flare_item_time">
                Peak: {flare.peakTime}
              </p>
            </div>

            {/* Intensity bar */}
            <div className="flare_item_bar-wrap">
              <div
                className="flare_item_bar"
                style={{
                  backgroundColor: color,
                  width: flare.classType.charAt(0) === 'X' ? '100%'
                       : flare.classType.charAt(0) === 'M' ? '70%'
                       : flare.classType.charAt(0) === 'C' ? '40%'
                       : '15%'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SolarFlareList;