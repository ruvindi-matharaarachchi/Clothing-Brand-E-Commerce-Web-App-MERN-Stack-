import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      margin: '20px 0'
    }}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white',
          color: currentPage === 1 ? '#999' : '#333',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          disabled={loading}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            backgroundColor: pageNum === currentPage ? '#007bff' : 'white',
            color: pageNum === currentPage ? 'white' : '#333',
            cursor: loading ? 'not-allowed' : 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: pageNum === currentPage ? 'bold' : 'normal'
          }}
        >
          {pageNum}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          backgroundColor: currentPage === totalPages ? '#f5f5f5' : 'white',
          color: currentPage === totalPages ? '#999' : '#333',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
