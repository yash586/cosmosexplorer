import { useState, useEffect } from "react";
import { getAPOD } from "../services/api";
import ApodHero from "../components/apod/ApodHero";
import ApodInfo from "../components/apod/ApodInfo";
import ApodDescription from "../components/apod/ApodDescription";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/errorhandler/ErrorMessage";
import './Apod.css';

const Apod = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    fetchApod();
  }, []);

  const fetchApod = async (date = null) => {
    try {
      setLoading(true);
      setError(null);
      const params = date ? { date } : {};
      const response = await getAPOD(params);
      setApod(response.data.data);
    } catch (error) {
      setError(error.userMessage || error.message || 'Something went wrong');
    }finally{
      setLoading(false);
    }
  }

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
      <div className="apod-page_header">
        <h1 className="apod-page_title">
          Astronomy <span className="apod-page_accent">Picture</span> of the Day
        </h1>
        <div className="apod-page_controls">
          <input 
            type="date"
            className="apod-page_date-input"
            value={apod?.date || ''}
            min="1995-06-16"
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => fetchApod(e.target.value)}
          />
          <button className="apod-page_surprise-btn" onClick={handleSurprise}>
            ✦ Surprise Me
          </button>
        </div>
      </div>
      <div className="apod-page_main">
        <div className="apod-page_hero">
          <ApodHero apod={apod}/>
        </div>
        <div className="apod-page_info">
          <ApodInfo apod={apod}/>
          <ApodDescription apod={apod}/>
        </div>
      </div>
    </div>
  )
};
export default Apod;

