import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';
import { explainAPOD } from '../../services/api';
import styles from './Apod.module.css';

/**
 * APOD Description — NASA text + AI explanation
 * Fetches AI explanation from backend on demand
 * Caches result so repeated clicks are instant
 *
 * @param {Object} apod APOD data
 * @param {string} apod.explanation NASA description text
 * @param {string} apod.title Image title
 * @returns {JSX.Element} Description panel
 */
const ApodDescription = ({ apod }) => {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requested, setRequested] = useState(false);

  /**
   * Fetches AI explanation from backend
   * Uses Gemini API via backend service
   */
  const handleExplain = async () => {
    try {
      setLoading(true);
      setError(null);
      setRequested(true);
      const response = await explainAPOD(apod.title, apod.explanation);
      setAiData(response.data.data);
    } catch (err) {
      setError('Failed to get AI explanation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.desc}>
      {/* NASA description */}
      <h3 className={styles.descHeading}>NASA Description</h3>
      <p className={styles.descText}>{apod.explanation}</p>

      {/* AI button */}
      {!requested && (
        <button className={styles.aiBtn} onClick={handleExplain}>
          <FontAwesomeIcon icon={faRobot} size="sm" />
          Get AI Explanation
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className={styles.aiLoading}>
          <FontAwesomeIcon icon={faSpinner} spin />
          Claude is thinking...
        </div>
      )}

      {/* Error */}
      {error && (
        <p className={styles.aiError}>{error}</p>
      )}
      {aiData && (
        <div className={styles.aiResult}>
          <div className={styles.aiHeader}>
            <FontAwesomeIcon icon={faRobot} size="xs" />
            AI Explanation
          </div>
          <p className={styles.aiText}>{aiData.simple}</p>
          {aiData.funFact && (
            <div className={styles.aiFact}>
              <span className={styles.aiFactLabel}>
                <FontAwesomeIcon icon={faStar} size="xs" />
                Fun Fact
              </span>
              <p className={styles.aiFactText}>{aiData.funFact}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApodDescription;