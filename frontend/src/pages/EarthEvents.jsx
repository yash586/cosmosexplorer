import EventTabs from '../components/earthevents/EventTabs';
import './EarthEvents.css';

const EarthEvents = () => {
  return(
    <div className='earth-page'>
      <div className='container-fluid px-4'>
        <div className='earth-page_header text-center'>
          <h1 className='earth-page_title'>
            <span className='earth-page_accent'>NASA</span> Earth Events
          </h1>
          <p className='earth-page_subtitle'>
            Live natural events tracked by NASA satellites - wildfires, storms, volanco and more.
          </p>
        </div>
        <EventTabs />
      </div>
    </div>  
  );
};

export default EarthEvents;
