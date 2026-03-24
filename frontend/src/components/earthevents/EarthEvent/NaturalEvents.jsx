import { useEffect, useState, useCallback } from 'react';
import { getEventCategories, getEarthEvents } from '../../../services/api';
import EventFilterChips from './EventFilterChips';
import EventList from './EventList';
import EventDetail from './EventDetail';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import ErrorMessage  from '../../common/errorhandler/ErrorMessage';
import styles from './EarthEvent.module.css';

/**
 * Natural Events EONET natural disaster tracker
 * Fetches categories on mount, events on category change
 * @returns {JSX.Element} Filter chips event list detail panel
 */
const NaturalEvents = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** Fetches event categories — fails silently */
  const fetchCategories = async () => {
    try {
      const res = await getEventCategories();
      setCategories(res.data.data);
    } catch (err) {
      console.warn('Categories failed:', err.message);
    }
  };

  /** Fetches events filtered by active category */
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res  = await getEarthEvents({
        category: activeCategory === 'all' ? null : activeCategory
      });
      const data = res.data.data.events;
      setEvents(data);
      if (data.length > 0) setSelected(data[0]);
    } catch (err) {
      setError(err.userMessage || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => { fetchCategories();}, []);
  useEffect(() => { fetchEvents();}, [fetchEvents]);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} onRetry={fetchEvents} />;

  return (
    <div className={styles.naturalEvents}>
      {/* Filter chips */}
      <EventFilterChips
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Two column layout */}
      <div className="row g-4 mt-2">
        <div className="col-12 col-md-5">
          <EventList
            eventList={events}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
        <div className="col-12 col-md-7">
          <EventDetail eventDetail={selected} />
        </div>
      </div>
    </div>
  );
};

export default NaturalEvents;