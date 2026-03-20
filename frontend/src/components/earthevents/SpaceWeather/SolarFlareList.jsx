import './SpaceWeatherCommon.css';

const DUMMY_FLARES = [
  { id: 1, classType: 'X2.5', startTime: '2026-03-15 08:12', peakTime: '2026-03-15 08:45', location: 'AR3590' },
  { id: 2, classType: 'M4.1', startTime: '2026-03-14 14:33', peakTime: '2026-03-14 15:02', location: 'AR3588' },
  { id: 3, classType: 'C7.3', startTime: '2026-03-13 09:21', peakTime: '2026-03-13 09:44', location: 'AR3585' },
  { id: 4, classType: 'M1.2', startTime: '2026-03-12 22:05', peakTime: '2026-03-12 22:31', location: 'AR3582' },
  { id: 5, classType: 'B8.7', startTime: '2026-03-11 11:47', peakTime: '2026-03-11 12:01', location: 'AR3580' },
];

const getFlareColor = (classType) => {
  const cls = classType?.charAt(0);
  return {
    X: '#FF4444',
    M: '#FFB347',
    C: '#00D4AA',
    B: '#8B949E',
  }[cls] || '#8B949E';
};

const SolarFlareList = () => {
  return (
    <div className="flare_list">
      {DUMMY_FLARES.map((flare) => {
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
              <p className="flare_item_location">{flare.location}</p>
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