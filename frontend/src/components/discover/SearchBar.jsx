import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS } from '../../constants/icons';
import styles from './Discover.module.css';

/**
 * Search Bar component for NASA Image Library
 * Submits search query on form submit
 * @param {Function} onSearch - Callback with search query string
 * @returns {JSX.Element} Search form
 */
const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={`input-group ${styles.searchGroup}`}>
        <input
          type="text"
          className={`form-control ${styles.searchInput}`}
          placeholder='Search NASA images...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className={`btn ${styles.searchBtn}`}>
          <FontAwesomeIcon icon={ICONS.SEARCH} size="sm" />
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;