import './ApodCommon.css';
import { useState } from 'react';
import { explainAPOD } from '../../services/api';

const ApodDescription = ({apod}) => {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requested, setRequested] = useState(false);

  const handleExplain = async() => {
    try {
      setLoading(true);
      setError(null);
      setRequested(true);
      const response = await explainAPOD(apod.title, apod.explanation);
      setAiData(response.data.data);
    } catch (error) {
      setError('Failed to get AI explanation');
    }finally{
      setLoading(false);
    }
  }

  return(
    <div className='apod-desc'>
      <div className='apod-desc_section'>
        <h3 className='apod-desc_heading'>Nasa Description</h3>
        <p className='apod-desc_text'>{apod.explanation}</p>
      </div>
      {!requested && (
        <button className="apod-desc_ai-btn" onClick={handleExplain}>
          ✦ Get AI Explanation
        </button>
      )}
      {loading && (
        <div className='apod-desc_ai-loading'>
          <span>✦</span> Claude is thinking...
        </div>
      )}
      {error && (
        <p className="apod-desc_ai-error">{error}</p>
      )}
      {aiData && (
        <div className="apod-desc_ai-result">
          <div className="apod-desc_ai-header">
            <span>✦</span> AI Explanation
          </div>
          <p className="apod-desc_ai-text">
            {aiData.simple}
          </p>
          {aiData.funFact && (
            <div className="apod-desc_ai-fact">
              <span className="apod-desc_ai-fact-label">
                🌟 Fun Fact
              </span>
              <p>{aiData.funFact}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApodDescription;