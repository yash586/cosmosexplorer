import { useState, useEffect } from "react";
import { searchNASAImages } from "../services/api";
import SearchBar from "../components/discover/SearchBar";
import QuickTopics from "../components/discover/QuickTopics";
import ImageGrid from "../components/discover/ImageGrid";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import './Discover.css';
import Pagination from "../components/discover/Pagination";

const PAGE_SIZE = 20;
const Discover = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('space');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages('space', 1);
  }, []);

  const fetchImages = async (searchQuery, pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchNASAImages({query: searchQuery, page:pageNum, page_size: 20});
      setImages(response.data.data.items);
      setTotal(response.data.data.total);
      setQuery(searchQuery);
      setPage(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setError(error.userMessage || error.message || 'Something went wrong');
    }finally{
      setLoading(false);
    }
  };

   const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearch = (searchQuery) => fetchImages(searchQuery, 1);
  const handleTopic = (topic) => fetchImages(topic, 1);
  const handlePage = (p) => fetchImages(query, p);

  return (
    <div className="discover-page">
      <div className="container-fluid px-4">
        <div className="discover-page_header text-center">
          <h1 className="discover-page_title"> 60 years of <span className="discover-page_accent">NASA</span>Exploration</h1>
          <p className="discover-page_subtitle">
            Search NASA's entire image archive - 140,000+ images
          </p>
        </div>
        <SearchBar onSearch={handleSearch}/>
        <QuickTopics onSelect={handleTopic} activeQuery={query}/>

        {!loading && (
          <p className="discover-page_count">
            <span className="discover-page_accent">{total.toLocaleString()}</span> results for "{query}"
          </p>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => fetchImages(query)} />
        ) : (
          <>
            <ImageGrid images={images} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePage}/>
          </>
        )}
      </div>
    </div>
  );
};

export default Discover;