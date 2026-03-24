import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { getEventConfig } from '../../../utils/eventConfig';
import EventMap from '../../common/map/EventMap';
import styles from './EarthEvent.module.css';

/**
 * Event Detail right panel showing selected event info
 * Shows interactive map metadata fields
 * @param {Object|null} eventDetail Selected EONET event or null
 * @returns {JSX.Element} Detail panel
 */
const EventDetail = ({ eventDetail }) => {
  if (!eventDetail) {
    return (
      <div className={`${styles.eventDetail} ${styles.eventDetailEmpty}`}>
        <p>Select an event to view details</p>
      </div>
    );
  }

  const config = getEventConfig(eventDetail.categoryId);

  const fields = [
    { label: 'Event', value: eventDetail.title},
    { label: 'Category', value: eventDetail.category},
    { label: 'Coordinates', value: eventDetail.coordinates || 'N/A'},
    { label: 'Started', value: eventDetail.date},
    { label: 'Source', value: eventDetail.source || 'NASA EONET v3'},
  ];

  return (
    <div className={styles.eventDetail}>

      {/* Map */}
      <div className={styles.eventDetailMap}>
        <EventMap
          coordinates={eventDetail.coordinates}
          color={config.color}
        />
        <span
          className={styles.eventDetailTypeBadge}
          style={{ backgroundColor: config.color }}
        >
          <FontAwesomeIcon icon={config.icon} size="xs" />
          {config.label}
        </span>
      </div>

      {/* Fields */}
      <div className={styles.eventDetailFields}>
        {fields.map(({ label, value }) => (
          <div key={label} className={styles.eventDetailField}>
            <span className={styles.eventDetailFieldLabel}>{label}</span>
            <span className={styles.eventDetailFieldValue}>{value}</span>
          </div>
        ))}

        {/* Status */}
        <div className={styles.eventDetailField}>
          <span className={styles.eventDetailFieldLabel}>Status</span>
          <span className={
            eventDetail.status === 'open'
              ? styles.statusActive
              : styles.statusClosed
          }>
            <FontAwesomeIcon
              icon={eventDetail.status === 'open'
                ? faCircleCheck
                : faCircleXmark}
              size="xs"
            />
            {eventDetail.status === 'open' ? 'Active' : 'Closed'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;