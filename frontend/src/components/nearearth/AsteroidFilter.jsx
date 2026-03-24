import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './AsteroidCommon.css';

const AsteroidFilter = ({ filters, onChange, onSearch }) => {

  const [show, setShow] = useState(false);

  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  const getMaxEndDate = (startDate) => {
    const max = new Date(startDate);
    max.setDate(max.getDate() + 7);
    return max.toISOString().split('T')[0];
  };

  const handleStartDate = (startDate) => {
    if(!startDate || startDate.length < 10) return;
    const end = new Date(startDate);
    end.setDate(end.getDate() + 7);
    const endDate = end.toISOString().split('T')[0];

    onChange({ ...filters, startDate, endDate });
    onSearch({ ...filters, startDate, endDate });
  };

  const handleClear = () => {
    const today = new Date().toISOString().split('T')[0];
    const next7 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    onChange({
      startDate:   today,
      endDate:     next7,
      hazardous:   false,
      minDiameter: 0,
    });
  };

  const handleEndDate = (endDate) => {
    if (!endDate || endDate.length < 10) return;
    onChange({ ...filters, endDate });
    onSearch({ ...filters, endDate });
  };

  const daysDiff = () => {
    const start = new Date(filters.startDate);
    const end   = new Date(filters.endDate);
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <button
        className="asteroid-filter_trigger align-self-start mt-1"
        onClick={() => setShow(true)}
      >
        ⚙️ Filters
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        contentClassName="asteroid-filter_modal"
      >
        <Modal.Header className="asteroid-filter_modal-header">
          <h5 className="asteroid-filter_modal-title">⚙️ Filters</h5>
          <button
            className="asteroid-filter_modal-close"
            onClick={() => setShow(false)}
          >✕</button>
        </Modal.Header>

        <Modal.Body className="asteroid-filter_modal-body">

          {/* Date Range */}
          <div className="asteroid-filter_section">
            <p className="asteroid-filter_section-label">
              📡 Date Range
              <span className="asteroid-filter_hint">
                Fetches from NASA
              </span>
            </p>

            {/* Start date */}
            <div className="asteroid-filter_group">
              <label className="asteroid-filter_label">
                Start Date
              </label>
              <input
                type="date"
                className="asteroid-filter_input"
                value={filters.startDate}
                onChange={(e) => handleStartDate(e.target.value)}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>

            {/* End date — readonly, auto filled */}
            <div className="asteroid-filter_group">
              <label className="asteroid-filter_label">
                End Date
                <span className="asteroid-filter_auto">
                  auto filled · adjustable
                </span>
              </label>
              <input
                type="date"
                className="asteroid-filter_input"
                value={filters.endDate}
                min={filters.startDate}
                max={getMaxEndDate(filters.startDate)}
                onChange={(e) => handleEndDate(e.target.value)}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>

            {/* Date range display */}
            <p className="asteroid-filter_range-display">
              📅 {filters.startDate} → {filters.endDate}
              <span>({daysDiff()} days)</span>
            </p>
          </div>

          <div className="asteroid-filter_divider" />

          {/* Local Filters */}
          <div className="asteroid-filter_section">
            <p className="asteroid-filter_section-label">
              🔍 Local Filters
              <span className="asteroid-filter_hint">
                Filters loaded data instantly
              </span>
            </p>

            {/* Hazardous toggle */}
            <div className="asteroid-filter_group">
              <div className="d-flex justify-content-between align-items-center">
                <label className="asteroid-filter_label mb-0">
                  Hazardous Only
                  {/* ✅ tooltip */}
                  <span
                    className="asteroid-filter_tooltip-icon"
                    title="Filters already loaded data. No API call needed."
                  >
                    ⓘ
                  </span>
                </label>
                <div
                  className={`asteroid-filter_toggle ${
                    filters.hazardous ? 'asteroid-filter_toggle--on' : ''
                  }`}
                  onClick={() => handleChange('hazardous', !filters.hazardous)}
                >
                  <div className="asteroid-filter_toggle-thumb" />
                </div>
              </div>
            </div>

            {/* Min diameter */}
            <div className="asteroid-filter_group">
              <div className="d-flex justify-content-between">
                <label className="asteroid-filter_label">
                  Min Diameter
                  <span
                    className="asteroid-filter_tooltip-icon"
                    title="Filters already loaded data. No API call needed."
                  >
                    ⓘ
                  </span>
                </label>
                <span className="asteroid-filter_value">
                  {filters.minDiameter} km
                </span>
              </div>
              <input
                type="range"
                className="asteroid-filter_range"
                min="0"
                max="10"
                step="0.1"
                value={filters.minDiameter}
                onChange={(e) =>
                  handleChange('minDiameter', parseFloat(e.target.value))
                }
              />
              <div className="d-flex justify-content-between">
                <span className="asteroid-filter_range-label">0 km</span>
                <span className="asteroid-filter_range-label">10 km</span>
              </div>
            </div>
          </div>

        </Modal.Body>

        <Modal.Footer className="asteroid-filter_modal-footer">
          <button
            className="asteroid-filter_clear"
            onClick={handleClear}
          >
            Clear
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AsteroidFilter;