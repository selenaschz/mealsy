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
            className={`${currentPage > 1 ? "cursor-pointer hover:text-beige-light hover:bg-brown-light" : ""} px-3 py-1 rounded-full `}
          >
            {"<"}
          </button>
  
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1 rounded-full hover:bg-brown-dark cursor-pointer hover:text-beige-light ${currentPage === pageNumber ? "bg-brown-dark text-white" : ""}`}
            >
              {pageNumber}
            </button>
          ))}
  
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${currentPage === totalPages ? "" : "cursor-pointer hover:text-beige-light hover:bg-brown-light"} px-3 py-1 rounded-full`}
          >
            {">"}
          </button>
        </nav>
      </div>
    )
  }

export default Pagination