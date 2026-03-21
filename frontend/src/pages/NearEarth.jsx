import { useState, useEffect } from "react";
import { getAsteroids } from '../services/api';
import AsteroidFilters from '../components/nearearth/AsteroidFilter';
import AsteroidStats from '../components/nearearth/AsteroidStats';
import AsteroidChart from '../components/nearearth/AsteroidChart';
import AsteroidTable from '../components/nearearth/AsteroidTable';
import AsteroidModal from "../components/nearearth/AsteroidModal";
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { getDefaultDates } from "../utils/date";
import './NearEarth.css';

const NearEarth = () => {
  const {start, end} = getDefaultDates();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({
    startDate: start, endDate: end, hazardous: false, minDiameter: 0,
  });

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async() => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAsteroids({start_date: filters.startDate, end_date: filters.endDate, ...(filters.hazardous && {hazardous : true})});
      setData(response.data.data);
    } catch (error) {
      setError('Failed to load asteroid data. Please try again');
    }finally{
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    fetchAsteroids();
  }
  if(loading) return <LoadingSpinner />;
  if(error) return <ErrorMessage message={error} onRetry={fetchAsteroids} />;

  return(
    <div className="nearearth_page">
      <div className="container-fluid px-4">
        <div className="nearearth_page_header">
          <h1 className="nearearth_page_title">
            ☄️ Near <span className="nearearth_page_accent">Earth</span> Objects
          </h1>
          <p className="nearearth_page_subtitle">
            Real time asteroid tracking powered by NASA NeoWs API
          </p>
        </div>
        <div className="row g-4">
          <div className="col-lg-9">
            {/*Asteroids Stat card contain data.stats*/}
            <AsteroidStats stats={data.stats} />
            {/*Asteroids Charts dailyCount, asteroids, top10 */}
            <AsteroidChart dailyCount={data?.dailyCount} asteroids={data?.asteroids} top10={data?.top10Largest}/>
            {/* Asteroids Table asteroids, onSelect*/}
            <AsteroidTable asteroids={data?.asteroids} onSelect={setSelected}/>
          </div>
          <div className="col-lg-3">
            <AsteroidFilters filters={filters} onChange={handleFilterChange} onSearch={handleSearch} />
          </div>
        </div>
      </div>
      {
        selected && (<AsteroidModal asteroid={selected} onClose={() => setSelected(null)}/>)
      }
      {/* Modal selected && asteroidModal asteroid, onClose*/}
    </div>
  );
}

export default NearEarth;