import EventCard from './EventCard';
import './EarthEventCommon.css';

const EventList = ({eventList, selected, onSelect}) => {
  return (
    <div className="event-list">
      <h3 className="event-list_heading">
        Active Events
      </h3>
      <div className="event-list_items">
        {eventList.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isActive={selected?.id === event.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;