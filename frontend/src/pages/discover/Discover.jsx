import { useState, useEffect, useCallback } from "react";
import { searchNASAImages } from "../../services/api";
import SearchBar from "../../components/discover/SearchBar";
import QuickTopics from "../../components/discover/QuickTopics";
import ImageGrid from "../../components/discover/ImageGrid";
import Pagination from "../../components/discover/Pagination";
import LoadingSpinner from "../../components/common/spinner/LoadingSpinner";
import ErrorMessage from "../../components/common/errorhandler/ErrorMessage";
import { CONFIG } from '../../constants/config';
import styles from './Discover.module.css';

/**
 * Discover Page NASA Image Library
 * Search and browse 140,000+ NASA images
 * Supports keyword search, topic filters and pagination
 * @returns {JSX.Element} Discover page
 */
const Discover = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('space');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches NASA images from backend
   * @param {string} searchQuery - Search term
   * @param {number} pageNum - Page number for pagination
   */
  const fetchImages = useCallback(async (searchQuery, pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await searchNASAImages({
        query:     searchQuery,
        page:      pageNum,
        page_size: CONFIG.DISCOVER_PAGE_SIZE,
      });

      setImages(response.data.data.items);
      setTotal(response.data.data.total);
      setQuery(searchQuery);
      setPage(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.userMessage || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages('space');
  }, [fetchImages]);

  const totalPages = Math.ceil(total / CONFIG.DISCOVER_PAGE_SIZE);

  /** @param {string} searchQuery - New search term */
  const handleSearch = (searchQuery) => fetchImages(searchQuery, 1);

  /** @param {string} topic - Quick topic chip selected */
  const handleTopic  = (topic) => fetchImages(topic, 1);

  /** @param {number} p - Page number selected */
  const handlePage   = (p) => fetchImages(query, p);

  return (
    <div className={styles.discoverPage}>
      <div className="container-fluid px-4">
        <div className={styles.header}>
          <h1 className={styles.title}>
            60 Years of {' '}
            <span className={styles.accent}>NASA</span>
            {' '}Exploration
          </h1>
          <p className={styles.subtitle}>
            Search NASA's entire image archive 140,000+ images
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />
        <QuickTopics onSelect={handleTopic} activeQuery={query} />

        {!loading && (
          <p className={styles.count}>
            <span className={styles.countAccent}>
              {total.toLocaleString()}
            </span>
            results for "{query}"
          </p>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage
            message={error}
            onRetry={() => fetchImages(query)}
          />
        ) : (
          <>
            <ImageGrid images={images} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePage}
            />
          </>
        )}

      </div>
    </div>
  );
};

export default Discover;