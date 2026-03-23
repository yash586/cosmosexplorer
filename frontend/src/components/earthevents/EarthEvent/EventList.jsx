import EventCard from './EventCard';
import './EarthEventCommon.css';

const EventList = ({eventList, selected, onSelect}) => {
  if (!events?.length) {
    return (
      <div className="event-list">
        <h3 className="event-list_heading">Active Events</h3>
        <div className="text-center py-4">
          <p style={{ fontSize: '2rem' }}>🌍</p>
          <p style={{ color: '#8B949E', fontSize: '0.85rem' }}>
            No events found for this category
          </p>
        </div>
      </div>
    );
  }

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