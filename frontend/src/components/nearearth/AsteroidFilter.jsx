import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faXmark, faSatellite,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './Asteroid.module.css';

/**
 * Asteroid Filters modal with date range local filters
 * API filters (trigger NASA fetch):
 * Start dateauto fills end date (+7 days)
 * End date adjustable within 7 day limit
 * Local filters (instant, no API call):
 * Hazardous only toggle
 * Min diameter slider
 * @param {Object}   filters Current filter state
 * @param {Function} onChange Update filter state
 * @param {Function} onSearch Trigger API fetch
 * @returns {JSX.Element} Filter trigger modal
 */
const AsteroidFilter = ({ filters, onChange, onSearch }) => {
  const [show, setShow] = useState(false);

  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  /** @param {string} startDate YYYY-MM-DD */
  const getMaxEndDate = (startDate) => {
    const max = new Date(startDate);
    max.setDate(max.getDate() + 7);
    return max.toISOString().split('T')[0];
  };

  /**
   * Selects start date → auto fills end (+7 days) fetches
   * @param {string} startDate - YYYY-MM-DD
   */
  const handleStartDate = (startDate) => {
    if (!startDate || startDate.length < 10) return;
    const end = new Date(startDate);
    end.setDate(end.getDate() + 7);
    const endDate = end.toISOString().split('T')[0];
    onChange({ ...filters, startDate, endDate });
    onSearch({ ...filters, startDate, endDate });
  };

  /**
   * Updates end date fetches with new range
   * @param {string} endDate - YYYY-MM-DD
   */
  const handleEndDate = (endDate) => {
    if (!endDate || endDate.length < 10) return;
    if (new Date(endDate) < new Date(filters.startDate)) return;
    onChange({ ...filters, endDate });
    onSearch({ ...filters, endDate });
  };

  /** Resets all filters to default (today + 7 days) */
  const handleClear = () => {
    const today = new Date().toISOString().split('T')[0];
    const next7 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    onChange({ startDate: today, endDate: next7, hazardous: false, minDiameter: 0 });
  };

  const daysDiff = () => {
    const start = new Date(filters.startDate);
    const end   = new Date(filters.endDate);
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      {/* Trigger button */}
      <button
        className={styles.filterTrigger}
        onClick={() => setShow(true)}
      >
        <FontAwesomeIcon icon={faGear} size="sm" />
        Filters
      </button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        contentClassName={styles.filterModalContent}
      >
        <Modal.Header className={styles.filterModalHeader}>
          <h5 className={styles.filterModalTitle}>
            <FontAwesomeIcon icon={faGear} size="sm" />
            Filters
          </h5>
          <button
            className={styles.filterModalClose}
            onClick={() => setShow(false)}
          >
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </button>
        </Modal.Header>

        <Modal.Body className={styles.filterModalBody}>

          {/* API Filters */}
          <div className={styles.filterSection}>
            <p className={styles.filterSectionLabel}>
              <FontAwesomeIcon icon={faSatellite} size="xs" />
              Date Range
              <span className={styles.filterHint}>
                Fetches from NASA
              </span>
            </p>

            {/* Start date */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Start Date</label>
              <input
                type="date"
                className={styles.filterInput}
                value={filters.startDate}
                onChange={(e) => handleStartDate(e.target.value)}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>

            {/* End date */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                End Date
                <span className={styles.filterAutoTag}>
                  auto filled adjustable
                </span>
              </label>
              <input
                type="date"
                className={styles.filterInput}
                value={filters.endDate}
                min={filters.startDate}
                max={getMaxEndDate(filters.startDate)}
                onChange={(e) => handleEndDate(e.target.value)}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>

            {/* Range display */}
            <p className={styles.filterRangeDisplay}>
              {filters.startDate} → {filters.endDate}
              <span className={styles.filterRangeAccent}>
                ({daysDiff()} days)
              </span>
            </p>
          </div>

          <div className={styles.filterDivider} />

          {/* Local Filters */}
          <div className={styles.filterSection}>
            <p className={styles.filterSectionLabel}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
              Local Filters
              <span className={styles.filterHint}>
                Filters loaded data instantly
              </span>
            </p>

            {/* Hazardous toggle */}
            <div className={styles.filterGroup}>
              <div className="d-flex justify-content-between align-items-center">
                <label className={`${styles.filterLabel} mb-0`}>
                  Hazardous Only
                  <span
                    className={styles.filterTooltipIcon}
                    title="Filters already loaded data. No API call needed."
                  >
                    ⓘ
                  </span>
                </label>
                <div
                  className={`${styles.filterToggle} ${
                    filters.hazardous ? styles.filterToggleOn : ''
                  }`}
                  onClick={() => handleChange('hazardous', !filters.hazardous)}
                >
                  <div className={styles.filterToggleThumb} />
                </div>
              </div>
            </div>

            {/* Min diameter */}
            <div className={styles.filterGroup}>
              <div className="d-flex justify-content-between">
                <label className={styles.filterLabel}>
                  Min Diameter
                  <span
                    className={styles.filterTooltipIcon}
                    title="Filters already loaded data. No API call needed."
                  >
                    ⓘ
                  </span>
                </label>
                <span className={styles.filterValue}>
                  {filters.minDiameter} km
                </span>
              </div>
              <input
                type="range"
                className={styles.filterRange}
                min="0"
                max="10"
                step="0.1"
                value={filters.minDiameter}
                onChange={(e) =>
                  handleChange('minDiameter', parseFloat(e.target.value))
                }
              />
              <div className="d-flex justify-content-between">
                <span className={styles.filterRangeLabel}>0 km</span>
                <span className={styles.filterRangeLabel}>10 km</span>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className={styles.filterModalFooter}>
          {/* Clear */}
          <button className={styles.filterClearBtn} onClick={handleClear}>
            Clear Filters
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AsteroidFilter;