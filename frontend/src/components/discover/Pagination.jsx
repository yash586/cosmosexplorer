import './DiscoverCommon.css';

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  if(totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if(totalPages <= 7){
      for(let index=1; index <= totalPages; index++){
        pages.push(index);
        return pages;
      }
    }
    pages.push(1);

    if(currentPage > 4){
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);
    for(let index=start; index <= end; index++){
      pages.push(index);
    }
    if(currentPage < totalPages - 3){
      pages.push('...');
    }

    pages.push(totalPages);
    return pages;
  }

  return (
    <nav className="d-flex justify-content-center my-5">
      <ul className="pagination pagination-cosmos">

        {/* Prev */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            ←
          </button>
        </li>

        {/* Page numbers */}
        {getPages().map((p, i) =>
          p === '...' ? (
            <li key={`ellipsis-${i}`} className="page-item disabled">
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
          >
            →
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;