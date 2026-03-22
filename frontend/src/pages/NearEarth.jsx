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
  const [filters, setFilters] = useState({startDate: start, endDate: end, hazardous: false, minDiameter: 0});

  useEffect(() => {
    fetchAsteroids(filters);
  }, []);

  const fetchAsteroids = async(currentFilters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAsteroids({start_date: currentFilters.startDate, end_date: currentFilters.endDate});
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
    fetchAsteroids(filters);
  }

  const filteredAsteroids = data?.asteroids?.filter(asteroid => {
    const diameterMatch  = asteroid.diameter_km >= filters.minDiameter;
    const hazardousMatch = filters.hazardous ? asteroid.hazardous === true : true;
    return diameterMatch && hazardousMatch;
  }) || [];

  const filteredStats = data ? {
    ...data.stats,
    total: filteredAsteroids.length,
    hazardous: filteredAsteroids.filter(a => a.hazardous).length,
  } : null;

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
          <div className="col-12 col-lg-9 order-2 order-lg-1">
            {/*Asteroids Stat card contain data.stats*/}
            <AsteroidStats stats={filteredStats} />
            {/*Asteroids Charts dailyCount, asteroids, top10 */}
            <AsteroidChart dailyCount={data?.dailyCount} asteroids={filteredAsteroids} top10={data?.top10Largest}/>
            {/* Asteroids Table asteroids, onSelect*/}
            <AsteroidTable asteroids={filteredAsteroids} onSelect={setSelected}/>
          </div>
          <div className="col-12 col-lg-3 order-1 order-lg-2">
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