import EventFilterChips from './EventFilterChips';
import EventStatCards from './EventStatCards';
import EventList from './EventList';
import EventDetail from './EventDetail';
import { getEventCategories, getEarthEvents } from '../../../services/api';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../common/LoadingSpinner';
import ErrorMessage from '../../common/ErrorMessage';

const NaturalEvents = () => {
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() =>{
    fetchCategories();
  }, []);

  useEffect(() =>{
    fetchEvents();
  }, [activeCategory]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEarthEvents({ category: activeCategory === 'all' ? null : activeCategory});
      setEvents(response.data.data.events);
      if (response.length > 0) setSelected(response[0]);
    } catch (error) {
      setError('Failed to load the events');
    }finally{
      setLoading(false);
    }
  }
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEventCategories();
      setCategory(response.data.data);
    } catch (error) {
      setError('Failed to load Categories');
    }finally{
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner/>;
  if (error) return <ErrorMessage message={error} onRetry={fetchEvents}/>;

  return (
    <div style={{padding:'1.5rem 0'}}>
      <EventFilterChips categories={category} activeCategory={activeCategory} onSelect={setActiveCategory}/>
      <div className='row g-4 mt-2'>
        <div className='col-md-5'>
          <EventList eventList={events} selected={selected} onSelect={setSelected}/>
        </div>
        <div className='col-md-7'>
          <EventDetail eventDetail={selected}/>
        </div>
      </div>
    </div>
  );
};

export default NaturalEvents;