import { CONFIG } from '../../constants/config';
import styles from './Discover.module.css';

/**
 * Quick Topics filter chips for common NASA searches
 * Topics sourced from CONFIG constants
 * @param {Function} onSelect    - Callback with selected topic
 * @param {string}   activeQuery - Currently active search query
 * @returns {JSX.Element} Topic chips row
 */
const QuickTopics = ({ onSelect, activeQuery }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
      {CONFIG.QUICK_TOPICS.map((topic) => (
        <button
          key={topic}
          className={`${styles.chip} ${
            activeQuery?.toLowerCase() === topic.toLowerCase()
              ? styles.chipActive
              : ''
          }`}
          onClick={() => onSelect(topic)}
        >
          {topic}
        </button>
      ))}
    </div>
  );
};

export default QuickTopics;