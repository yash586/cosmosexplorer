import { Modal } from 'react-bootstrap';
import './AsteroidCommon.css';

const AsteroidModal = ({ asteroid, onClose }) => {
  if (!asteroid) return null;

  const fields = [
    { label: 'NASA ID',        value: asteroid.id                                           },
    { label: 'Approach Date',  value: asteroid.close_approach_date                          },
    { label: 'Miss Distance',  value: `${(asteroid.miss_distance_km/1000000).toFixed(2)}M km` },
    { label: 'Velocity',       value: `${asteroid.velocity_kmh?.toLocaleString()} km/h`     },
    { label: 'Diameter',       value: `${asteroid.diameter_km} km`                          },
    { label: 'Orbiting Body',  value: asteroid.orbiting_body || 'Earth'                     },
  ];

  return (
    <Modal
      show={!!asteroid}
      onHide={onClose}
      centered
      contentClassName="asteroid_modal_content"
    >
      <Modal.Body className="p-0">

        {/* Header */}
        <div className="asteroid_modal_header">
          <div>
            <h2 className="asteroid_modal_title">{asteroid.name}</h2>
            <span className={`asteroid_modal_badge ${
              asteroid.hazardous
                ? 'asteroid_modal_badge--danger'
                : 'asteroid_modal_badge--safe'
            }`}>
              {asteroid.hazardous ? '⚠️ Potentially Hazardous' : '✅ Safe'}
            </span>
          </div>
          <button className="asteroid_modal_close" onClick={onClose}>✕</button>
        </div>

        {/* Fields */}
        <div className="asteroid_modal_fields">
          {fields.map(({ label, value }) => (
            <div key={label} className="asteroid_modal_field">
              <span className="asteroid_modal_field-label">{label}</span>
              <span className="asteroid_modal_field-value">{value}</span>
            </div>
          ))}
        </div>

        {/* NASA link */}
        {asteroid.nasa_url && (
          <div className="asteroid_modal_footer">
            <a
              href={asteroid.nasa_url}
              target="_blank"
              rel="noreferrer"
              className="asteroid_modal_link"
            >
              View on NASA JPL →
            </a>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AsteroidModal;