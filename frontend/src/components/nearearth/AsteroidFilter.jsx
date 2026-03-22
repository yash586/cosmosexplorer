import './AsteroidCommon.css';

const AsteroidFilter = ({filters, onChange, onSearch}) =>{
  const handleChange = (field, value) => {
    onChange({...filters, [field]:value});
  }

  return(
    <div className="asteroid_filters">
      <h3 className="asteroid_filters_heading">⚙️ Filters</h3>
      <div className="asteroid_filters_group">
        <label className="asteroid_filters_label">Start Date</label>
        <input type="date" className="asteroid_filters_input" value={filters.startDate} onChange={(e) => handleChange('startDate', e.target.value)}/>
      </div>
      <div className="asteroid_filters_group">
        <label className="asteroid_filters_label">End Date</label>
        <input type="date" className="asteroid_filters_input" value={filters.endDate} onChange={(e) => handleChange('endDate', e.target.value)}/>
      </div>
      <div className="asteroid_filters_divider"/>
      <div className="asteroid_filters_group">
        <div className="d-flex justify-content-between align-items-center">
          <label className="asteroid_filters_label mb-0">
            Hazardous Only
          </label>
            <div
              className={`asteroid_filters_toggle ${
                filters.hazardous ? 'asteroid_filters_toggle-on' : ''
              }`}
              onClick={() => handleChange('hazardous', !filters.hazardous)}
            >
              <div className="asteroid_filters_toggle_thumb" />
            </div>
        </div>
      </div>
      <div className="asteroid_filters_divider"/>
      <div className="asteroid_filters_group">
        <div className="d-flex justify-content-between">
          <label className="asteroid_filters_label">Min Diameter</label>
          <span className="asteroid_filters_value">
            {filters.minDiameter} km
          </span>
        </div>
        <input type="range" className="asteroid_filters_range" min="0" max="10" step="0.1" value={filters.minDiameter} onChange={(e) => handleChange('minDiameter', parseFloat(e.target.value))}/>
        <div className="d-flex justify-content-between">
          <span className="asteroid_filters_range-label">0 km</span>
          <span className="asteroid_filters_range-label">10 km</span>
        </div>
      </div>
      <div className="asteroid_filters_divider" />

      <button className="asteroid_filters_btn w-100" onClick={onSearch}>
        Search Asteroids
      </button>
      <div className="asteroid_filters_crosslink">
        <p>🌍 Not just asteroids threaten Earth</p>
        <a href="/earth-events">View Earth Events →</a>
      </div>
    </div>
  );
};

export default AsteroidFilter;