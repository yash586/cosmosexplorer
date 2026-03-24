import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { getEventConfig } from '../../../utils/eventConfig';
import styles from './EarthEvent.module.css';

/**
 * Event Filter Chips — category filter buttons
 * Categories fetched from NASA EONET API dynamically
 * Falls back to icon from eventConfig if category unknown
 * @param {Array} categories EONET categories from API
 * @param {string} activeCategory - Currently selected category ID
 * @param {Function} onSelect Category select handler
 * @returns {JSX.Element} Filter chips row
 */
const EventFilterChips = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      {/* All Events — always first */}
      <button
        className={`${styles.chip} ${
          activeCategory === 'all' ? styles.chipActive : ''
        }`}
        onClick={() => onSelect('all')}
      >
        <FontAwesomeIcon icon={faGlobe} size="xs" />
        All Events
      </button>

      {/* Dynamic from API */}
      {categories?.map((cat) => {
        const config = getEventConfig(cat.id);
        return (
          <button
            key={cat.id}
            className={`${styles.chip} ${
              activeCategory === cat.id ? styles.chipActive : ''
            }`}
            onClick={() => onSelect(cat.id)}
          >
            <FontAwesomeIcon icon={config.icon} size="xs" />
            {cat.title}
          </button>
        );
      })}

    </div>
  );
};

export default EventFilterChips;