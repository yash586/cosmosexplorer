import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getEventConfig } from '../../../utils/eventConfig';
import styles from './EarthEvent.module.css';

/**
 * Event Card — single event row in the list
 * Shows category badge, title, location and arrow
 * @param {Object} event EONET event data
 * @param {boolean} isActive Whether this card is selected
 * @param {Function} onSelect Click handler
 * @returns {JSX.Element} Event card row
 */
const EventCard = ({ event, isActive, onSelect }) => {
  const config = getEventConfig(event.categoryId);
  return (
    <div
      className={`${styles.eventCard} ${isActive ? styles.eventCardActive : ''}`}
      style={{ '--event-color': config.color }}
      onClick={() => onSelect(event)}
    >
      <span
        className={styles.eventCardBadge}
        style={{ backgroundColor: config.color }}
      >
        <FontAwesomeIcon icon={config.icon} size="xs" />
        {config.label}
      </span>
      <div className={styles.eventCardInfo}>
        <p className={styles.eventCardTitle}>{event.title}</p>
        <p className={styles.eventCardLocation}>
          <FontAwesomeIcon icon={faLocationDot} size="xs" />
          {event.location || event.coordinates || 'Location unknown'}
        </p>
      </div>
      {/* Arrow */}
      <FontAwesomeIcon
        icon={faChevronRight}
        size="sm"
        className={styles.eventCardArrow}
      />
    </div>
  );
};

export default EventCard;