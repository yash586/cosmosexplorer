import SolarFlareList from './SolarFlareList';
import GeoStormList from './GeoStormList';
import './SpaceWeatherCommon.css';

const SpaceWeather = () => {
  return (
    <div className='space-weather'>
      <div className='row g-4'>
        <div className='col-md-6'>
          <div className='space-weather_panel'>
            <h3 className='space-weather_heading'>
              ☀️ Solar Flares
            </h3>
            <SolarFlareList />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='space-weather_panel'>
            <h3 className='space-weather_heading'>
              🌍 Geomagnetic Storms
            </h3>
            <GeoStormList/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceWeather;
