import { useState, useMemo, useEffect } from 'react';

/**
 * custom hook for handling pagination
 */
export function usePagination<T>(
  items: T[],
  itemsPerPage: number = 10,
  initialPage: number = 1
) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // reset to page 1 when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);
  
  // calculate pagination data
  const paginationData = useMemo(() => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedItems = items.slice(startIndex, endIndex);
    
    return {
      paginatedItems,
      totalPages,
      startIndex: totalItems > 0 ? startIndex + 1 : 0,
      endIndex,
      totalItems
    };
  }, [items, currentPage, itemsPerPage]);
  
  return {
    currentPage,
    setCurrentPage,
    ...paginationData
  };
}
