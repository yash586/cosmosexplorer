import { useState, useEffect } from "react";
import { getAPOD, getTodayAsteroids } from "../services/api";
import ApodHero from "../components/apod/ApodHero";
import ApodInfo from "../components/apod/ApodInfo";
import ApodDescription from "../components/apod/ApodDescription";
import TimeTravelPicker from "../components/apod/TimeTravelPicker";
import ApodCrossLink from "../components/apod/ApodCrossLink";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import './Apod.css';

const Apod = () => {
  const [apod, setApod] = useState(null);
  const [asteroidCount, setAsteroidCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    fetchApod();
    fetchAsteroidCount();
  }, []);

  const fetchApod = async (date = null) => {
    try {
      setLoading(true);
      setError(null);
      const params = date ? { date } : {};
      const response = await getAPOD(params);
      setApod(response.data.data);
    } catch (error) {
      setError(error.message);
    }finally{
      setLoading(false);
    }
  }

  const fetchAsteroidCount = async () => {
    try {
      const response = await getTodayAsteroids();
      setAsteroidCount(response.data.data.stats.total);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleDateChange = (date) => fetchApod(date);

  const handleSurprise = () =>{
    const start = new Date('1995-06-16');
    const end   = new Date();
    const random = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    const dateStr = random.toISOString().split('T')[0];
    fetchApod(dateStr);
  }

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} onRetry={fetchApod} />;
  if (!apod)   return null;

  return (
    <div className="apod-page">
      <div className="apod-page_main">
        <div className="apod-page_hero">
          <ApodHero apod={apod}/>
        </div>
        <div className="apod-page_info">
          <ApodInfo apod={apod}/>
          <ApodDescription apod={apod}/>
        </div>
      </div>
      <div className="apod-page_bottom">
        <TimeTravelPicker onDateChange={handleDateChange} onSurprise={handleSurprise} currentDate={apod.date}/>
        {asteroidCount && (<ApodCrossLink count={asteroidCount}/>)}
      </div>
    </div>
  )
};
export default Apod;

