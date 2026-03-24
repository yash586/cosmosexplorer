import './EarthEventCommon.css';
import { getEventConfig } from '../../../utils/eventConfig';

const EventCard = ({ event, isActive, onSelect}) => {
  const config = getEventConfig(event.categoryId);
  return (
    <div
      className={`event_card ${isActive ? 'event_card-active' : ''}`}
      style={{ '--event-color': config.color }} onClick={() => onSelect(event)}
    >
      {/* Category badge */}
      <span
        className="event_card_badge"
        style={{ backgroundColor: config.color }}
      >
        {config.icon} {config.label}
      </span>

      {/* Info */}
      <div className="event_card_info">
        <p className="event_card_title">{event.title}</p>
        <p className="event_card_location">📍 {event.coordinates}</p>
      </div>
    </div>
  );
};

export default EventCard;