import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowUpRightFromSquare,faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './Asteroid.module.css';

/**
 * Asteroid Modal — full detail view for selected asteroid
 * Shows NASA JPL data with link to full NASA page
 * @param {Object|null} asteroid Selected asteroid data or null
 * @param {Function} onClose Close modal handler
 * @returns {JSX.Element|null} Modal or null
 */
const AsteroidModal = ({ asteroid, onClose }) => {
  if (!asteroid) return null;

  const fields = [
    { label: 'NASA ID', value: asteroid.id},
    { label: 'Approach Date', value: asteroid.close_approach_date},
    { label: 'Miss Distance', value: `${(asteroid.miss_distance_km / 1000000).toFixed(2)}M km`},
    { label: 'Velocity', value: `${asteroid.velocity_kmh?.toLocaleString()} km/h`},
    { label: 'Diameter', value: `${asteroid.diameter_km} km`},
    { label: 'Orbiting Body', value: asteroid.orbiting_body || 'Earth'},
  ];

  return (
    <Modal
      show={!!asteroid}
      onHide={onClose}
      centered
      contentClassName={styles.modalContent}
    >
      <Modal.Body className="p-0">
        {/* Header */}
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>{asteroid.name}</h2>
            <span className={asteroid.hazardous ? styles.badgeDanger : styles.badgeSafe}>
              <FontAwesomeIcon
                icon={asteroid.hazardous ? faTriangleExclamation : faCircleCheck}
                size="xs"
              />
              {asteroid.hazardous ? 'Potentially Hazardous' : 'Safe'}
            </span>
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </button>
        </div>

        {/* Fields */}
        <div className={styles.modalFields}>
          {fields.map(({ label, value }) => (
            <div key={label} className={styles.modalField}>
              <span className={styles.modalFieldLabel}>{label}</span>
              <span className={styles.modalFieldValue}>{value}</span>
            </div>
          ))}
        </div>

        {/* NASA link */}
        {asteroid.nasa_url && (
          <div className={styles.modalFooter}>
            <a
              href={asteroid.nasa_url}
              target="_blank"
              rel="noreferrer"
              className={styles.modalLink}
            >
              View on NASA JPL{' '}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
            </a>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AsteroidModal;