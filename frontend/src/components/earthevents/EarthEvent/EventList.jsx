import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import EventCard from './EventCard';
import styles from './EarthEvent.module.css';

/**
 * Event List — scrollable list of active events
 * Shows empty state if no events found
 * @param {Array} eventList Array of EONET events
 * @param {Object} selected Currently selected event
 * @param {Function} onSelect Event select handler
 * @returns {JSX.Element} Event list panel
 */
const EventList = ({ eventList, selected, onSelect }) => {
  return (
    <div className={styles.eventList}>
      <h3 className={styles.eventListHeading}>Active Events</h3>
      {!eventList?.length ? (
        <div className={styles.eventListEmpty}>
          <FontAwesomeIcon
            icon={faEarthAmericas}
            size="2x"
            style={{ marginBottom: '0.5rem', color: 'var(--color-border)' }}
          />
          <p>No active events found for this category</p>
        </div>
      ) : (
        <div className={styles.eventListItems}>
          {eventList.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isActive={selected?.id === event.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;