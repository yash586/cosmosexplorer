import SolarFlareList from './SolarFlareList';
import GeoStormList from './GeoStormList';
import './SpaceWeatherCommon.css';
import { getSolarFlares, getGeoStorms } from '../../../services/api';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../common/LoadingSpinner';
import ErrorMessage from '../../common/ErrorMessage';

const SpaceWeather = () => {
  const [flares, setFlares] = useState([]);
  const [storms, setStorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const end   = new Date().toISOString().split('T')[0];
      const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const [flaresRes, stormsRes] = await Promise.all([
        getSolarFlares({ start_date: start, end_date: end }),
        getGeoStorms({ start_date: start, end_date: end }),
      ]);
      setFlares(flaresRes.data.data);
      setStorms(stormsRes.data.data);
    } catch (err) {
      setError('Failed to load space weather data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} onRetry={fetchAll} />;

  return (
    <div className='space-weather'>
      <div className='row g-4'>
        <div className='col-md-6'>
          <div className='space-weather_panel'>
            <h3 className='space-weather_heading'>
              ☀️ Solar Flares
            </h3>
            <SolarFlareList flare={flares}/>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='space-weather_panel'>
            <h3 className='space-weather_heading'>
              🌍 Geomagnetic Storms
            </h3>
            <GeoStormList storms={storms}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceWeather;
