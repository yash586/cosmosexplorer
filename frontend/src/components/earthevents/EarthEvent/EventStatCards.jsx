import './EarthEventCommon.css';
import { getEventConfig } from '../../../utils/eventConfig';

const STAT_CATEGORIES = [
  'all',
  'wildfires',
  'severeStorms',
  'volcanoes',
];

const EventStatCards = ({stats}) => {
  const getCount = (categoryId) => {
    if(categoryId !== 'all'){
      return stats.filter(stat => stat.categoryId === categoryId.length);
    }
    return stats.length;
  }

  const STATS = [
    {
      categoryId: 'all', label: 'Active Events', ...getEventConfig('default')
    },
    { categoryId: 'wildfires',    ...getEventConfig('wildfires')    },
    { categoryId: 'severeStorms', ...getEventConfig('severeStorms') },
    { categoryId: 'volcanoes',    ...getEventConfig('volcanoes')    },
  ]
  
  return (
    <div className="row g-3 mb-4">
      {STATS.map((stat) => (
        <div key={stat.categoryId} className="col-6 col-md-3">
          <div
            className="event_stat-card"
            style={{ '--stat-color': stat.color }}
          >
            <div className="event_stat-card_icon">{stat.icon}</div>
            <p className="event_stat-card_value">{getCount(stat.categoryId)}</p>
            <p className="event_stat-card_label">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventStatCards;