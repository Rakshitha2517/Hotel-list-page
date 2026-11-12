export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null
  return (
    <div className="pagination" aria-label="Hotel pages">
      <button className="page-button" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>← Previous</button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button key={page} className={`page-number ${page === currentPage ? 'selected' : ''}`} onClick={() => onPageChange(page)}>{page}</button>
      ))}
      <button className="page-button" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next →</button>
    </div>
  )
}