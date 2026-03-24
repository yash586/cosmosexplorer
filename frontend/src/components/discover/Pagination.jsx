import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Pagination component
 * Shows page numbers with ellipsis for large page counts
 * Uses Bootstrap pagination with dark theme override
 * @param {number} currentPage Active page number
 * @param {number} totalPages Total number of pages
 * @param {Function} onPageChange Callback with new page number
 * @returns {JSX.Element|null} Pagination nav or null if single page
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 4) pages.push('...');
    const start = Math.max(2, currentPage - 2);
    const end   = Math.min(totalPages - 1, currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 3) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <nav className="d-flex justify-content-center my-5">
      <ul className="pagination pagination-cosmos">
        {/* Prev */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="xs" />
          </button>
        </li>

        {/* Pages */}
        {getPages().map((p, i) =>
          p === '...' ? (
            <li key={`e-${i}`} className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          ) : (
            <li
              key={p}
              className={`page-item ${p === currentPage ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(p)}
                aria-label={`Page ${p}`}
                aria-current={p === currentPage ? 'page' : undefined}
              >
                {p}
              </button>
            </li>
          )
        )}

        {/* Next */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
          >
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;