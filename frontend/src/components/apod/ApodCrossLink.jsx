import { useNavigate } from 'react-router-dom';
import './ApodCommon.css';

const ApodCrossLink = ({ count}) => {
  const navigate = useNavigate();

  return(
    <div className='apod-crosslink' onClick={() => navigate('/near-earth')}>
      <span>☄️</span>
      <span>
        <strong>{count}</strong> asteroids flying past Earth today
      </span>
      <span className='apod-crosslink_arrow'>→</span>
    </div>
  )
}

export default ApodCrossLink;