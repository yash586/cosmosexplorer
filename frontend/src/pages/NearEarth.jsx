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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAsteroids = async(currentFilters) => {
    const filter = currentFilters || filters;
    try {
      setLoading(true);
      setError(null);
      const response = await getAsteroids({start_date: filter.startDate, end_date: filter.endDate});
      setData(response.data.data);
    } catch (error) {
      setError(error.userMessage || error.message || 'Failed to load asteroid data');
    }finally{
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

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

  const filteredDailyCount = filteredAsteroids.reduce((acc, asteroid) => {
    const date = asteroid.close_approach_date;
    if(!date) return acc;
    const existing = acc.find(data => data.date === date);
    if(existing){
      existing.total++;
      if(asteroid.hazardous) existing.hazardous++;
    }else{
      acc.push({date, total: 1, hazardous: asteroid.hazardous ? 1: 0,})
    }
    return acc;
  }, []).sort((a,b) => new Date(a.date) - new Date(b.date));
  
  const filteredTop10 = [...filteredAsteroids]
  .sort((a, b) => b.diameter_km - a.diameter_km)
  .slice(0, 10);

  if(loading) return <LoadingSpinner />;
  if(error) return <ErrorMessage message={error} onRetry={fetchAsteroids} />;

  return(
    <div className="nearearth_page">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
          <div className="">
            <h1 className="nearearth_page_title">
              Asteroids Near <span className="nearearth_page_accent">Earth</span> Objects
            </h1>
            <p className="nearearth_page_subtitle">
              Real time asteroid tracking powered by NASA NeoWs API
            </p>
          </div>
          <AsteroidFilters filters={filters} onChange={handleFilterChange} onSearch={fetchAsteroids}/>
        </div>

        <div className="row g-4">
          <div className="col-12">
            {/*Asteroids Stat card contain data.stats*/}
            <AsteroidStats stats={filteredStats} />
            {/*Asteroids Charts dailyCount, asteroids, top10 */}
            <AsteroidChart dailyCount={filteredDailyCount} asteroids={filteredAsteroids} top10={filteredTop10}/>
            {/* Asteroids Table asteroids, onSelect*/}
            <AsteroidTable asteroids={filteredAsteroids} onSelect={setSelected}/>
          </div>
        </div>
      </div>
      {
        selected && (<AsteroidModal asteroid={selected} onClose={() => setSelected(null)}/>)
      }
    </div>
  );
}

export default NearEarth;