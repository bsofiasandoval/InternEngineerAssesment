import { useState, useMemo } from 'react';
import { Cruise } from '@/types/cruises';

// define sort options
export type SortField = 'price' | 'duration' | 'departureDate';
export type SortDirection = 'asc' | 'desc';

// define sort option labels
export const sortFieldLabels: Record<SortField, string> = {
  price: 'Price',
  duration: 'Duration',
  departureDate: 'Departure Date'
};

/**
 * custom hook for handling cruise sorting
 */
export function useSorting(initialData: Cruise[] = [], initialField: SortField = 'departureDate', initialDirection: SortDirection = 'asc') {
  const [sortField, setSortField] = useState<SortField>(initialField);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialDirection);
  
  // handle sort change
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
    
    return true; // indicates that sort changed (can be used to reset pagination)
  };

  // get the current sort label
  const getCurrentSortLabel = () => {
    const directionText = sortDirection === 'asc' ? 'Low to High' : 'High to Low';
    return `${sortFieldLabels[sortField]}: ${directionText}`;
  };

  // sort the data
  const sortedData = useMemo(() => {
    if (!Array.isArray(initialData)) {
      return [];
    }
    
    return [...initialData].sort((a, b) => {
      // handle different sort fields
      switch (sortField) {
        case 'price':
          return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
        
        case 'duration':
          return sortDirection === 'asc' ? a.duration - b.duration : b.duration - a.duration;
        
        case 'departureDate':
          const dateA = new Date(a.departureDate).getTime();
          const dateB = new Date(b.departureDate).getTime();
          return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        
        default:
          return 0;
      }
    });
  }, [initialData, sortField, sortDirection]);

  return {
    sortField,
    sortDirection,
    sortedData,
    handleSort,
    getCurrentSortLabel,
    setSortField,
    setSortDirection
  };
}
