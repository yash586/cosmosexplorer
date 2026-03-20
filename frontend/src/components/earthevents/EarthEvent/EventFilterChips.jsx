import './EarthEventCommon.css';
import { getEventConfig } from '../../../utils/eventConfig';

const EventFilterChips = ({categories, activeCategory, onSelect}) => {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      <button
        className={`event_chip ${
          activeCategory === 'all' ? 'event_chip-active' : ''
        }`}
        onClick={() => onSelect('all')}
      >
        🌐 All Events
      </button>
      {categories?.map((cat) => {
        const config = getEventConfig(cat.id);
        return(
          <button
          key={cat.id}
          className={`event_chip ${
            activeCategory === cat.id ? 'event_chip-active' : ''
          }`}
          onClick={() => onSelect(cat.id)}
        >
          {config.icon} {cat.title}
        </button>
        );
      })}
    </div>
  );
};

export default EventFilterChips;
