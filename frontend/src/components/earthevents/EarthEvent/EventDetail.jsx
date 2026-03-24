import './EarthEventCommon.css';
import { getEventConfig } from '../../../utils/eventConfig';
import EventMap from '../../common/EventMap';


const EventDetail = ({eventDetail}) => {
  if (!eventDetail) {
    return (
      <div className="event-detail d-flex align-items-center justify-content-center">
        <p style={{ color: '#8B949E' }}>Select an event to view details</p>
      </div>
    );
  }
  const config = getEventConfig(eventDetail.categoryId);
  const fields = [
    { label: 'Event',    value: eventDetail.title       },
    { label: 'Category', value: eventDetail.category    },
    { label: 'Location', value: eventDetail.coordinates || 'N/A' },
    { label: 'Started',  value: eventDetail.date        },
    { label: 'Source',   value: eventDetail.source || 'NASA EONET v3' },
  ];
  
  return (
    <div className="event_detail">

      {/* Satellite image placeholder */}
      <div className="event_detail_image">
        <EventMap
          coordinates={eventDetail.coordinates}
          color={config.color}
        />
        <span
          className="event_detail_type-badge"
          style={{ backgroundColor: config.color }}
        >
          {config.icon} {config.label}
        </span>
      </div>

      {/* Fields */}
      <div className="event_detail_fields">
        {fields.map(({ label, value }) => (
          <div key={label} className="event_detail_field">
            <span className="event_detail_field_label">{label}</span>
            <span className="event_detail_field-value">{value}</span>
          </div>
        ))}

        {/* Status badge */}
        <div className="event_detail_field">
          <span className="event_detail_field-label">Status</span>
          <span className={`event_detail_status ${
            eventDetail.status === 'open'
              ? 'event_detail_status-active'
              : 'event_detail_status-closed'
          }`}>
            {eventDetail.status === 'open' ? 'Active' : 'Closed'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;