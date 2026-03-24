import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found_content">
        <span className="not-found_icon">🔭</span>
        <h1 className="not-found_title">404</h1>
        <p className="not-found_subtitle">
          Lost in space...
        </p>
        <p className="not-found_text">
          The page you're looking for doesn't exist
        </p>
        <button
          className="not-found_btn"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;