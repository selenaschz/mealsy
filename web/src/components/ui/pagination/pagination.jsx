function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  
    return (
      <div className="mt-8 flex items-center justify-center">
        <nav className="flex items-center space-x-2" aria-label="Pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded"
          >
            Anterior
          </button>
  
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1 border rounded ${currentPage === pageNumber ? "bg-blue-500 text-white" : ""}`}
            >
              {pageNumber}
            </button>
          ))}
  
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded"
          >
            Siguiente
          </button>
        </nav>
      </div>
    )
  }

export default Pagination