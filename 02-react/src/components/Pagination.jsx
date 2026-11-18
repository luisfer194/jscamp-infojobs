import styles from './Pagination.module.css'

export function Pagination({ currentPage = 1, totalPages, onPageChange }) {

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const stylePrevButton = isFirstPage ? { opacity: 0.5, pointerEvents: 'none' } : {};
  const styleNextButton = isLastPage ? { opacity: 0.5, pointerEvents: 'none' } : {};

  const handlePrevPage = (event) => {
    event.preventDefault();
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  }

  const handleNextPage = (event) => {
    event.preventDefault();
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  }

  const handleChangePage = (event, page) => {
    event.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  }

  return (
    <nav className={styles.pagination}>
      <button style={stylePrevButton} onClick={handlePrevPage}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={currentPage === page ? styles['is-active'] : ""}
          onClick={(event) => handleChangePage(event, page)}
        >
          {page}
        </button>
      ))}

      <button style={styleNextButton} onClick={handleNextPage}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </button>
    </nav>
  )
}