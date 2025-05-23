'use client'
import Image from "next/image";
import useAPI from "../hooks/useAPI";
import { CruisePreview } from "../components/cruisePreview";
import { useState, useMemo, useEffect } from "react";
import { Pagination } from "../components/pagination";
import { Cruise } from "../types/cruises";
import { 
  Check, 
  ChevronsUpDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define sort options
type SortField = 'price' | 'duration' | 'departureDate';
type SortDirection = 'asc' | 'desc';

// Define sort option labels
const sortFieldLabels: Record<SortField, string> = {
  price: 'Price',
  duration: 'Duration',
  departureDate: 'Departure Date'
};

export default function Home() {
  const { data, loading, error } = useAPI();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('departureDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const resultsPerPage = 10;

  // Handle sort change
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
    // Reset to page 1 when sorting changes
    setCurrentPage(1);
  };

  // Get the current sort label
  const getCurrentSortLabel = () => {
    const directionText = sortDirection === 'asc' ? 'Low to High' : 'High to Low';
    return `${sortFieldLabels[sortField]}: ${directionText}`;
  };

  // Calculate pagination with sorting
  const { paginatedResults, totalPages, startIndex, endIndex, totalResults } = useMemo(() => {
    if (!Array.isArray(data?.results)) {
      return { paginatedResults: [], totalPages: 0, startIndex: 0, endIndex: 0, totalResults: 0 };
    }
    
    // Create a sorted copy of the results
    const sortedResults = [...data.results].sort((a, b) => {
      // Handle different sort fields
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
    
    const total = sortedResults.length;
    const pages = Math.ceil(total / resultsPerPage);
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const paginated = sortedResults.slice(start, end);
    
    return {
      paginatedResults: paginated,
      totalPages: pages,
      startIndex: start + 1,
      endIndex: Math.min(end, total),
      totalResults: total
    };
  }, [data?.results, currentPage, sortField, sortDirection]);

  // Reset to page 1 when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium">Error loading cruises</div>
          <div className="text-gray-600 mt-2">{error.message}</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading cruises...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Cruise Search Results</h1>
          <div className="flex flex-wrap items-center justify-between">
            {totalResults > 0 && (
              <div className="text-sm text-gray-600">
                {totalResults.toLocaleString()} results 
                {totalPages > 1 && (
                  <span> (showing {startIndex}-{endIndex})</span>
                )}
              </div>
            )}
            
            {/* Sort Controls */}
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <span className="text-sm text-gray-600">Sort by:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8 px-3 gap-1 text-sm">
                    {getCurrentSortLabel()}
                    <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {/* Price options */}
                    <DropdownMenuItem 
                      onClick={() => { setSortField('price'); setSortDirection('asc'); setCurrentPage(1); }}
                      className="flex items-center justify-between"
                    >
                      Price: Low to High
                      {sortField === 'price' && sortDirection === 'asc' && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => { setSortField('price'); setSortDirection('desc'); setCurrentPage(1); }}
                      className="flex items-center justify-between"
                    >
                      Price: High to Low
                      {sortField === 'price' && sortDirection === 'desc' && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    {/* Duration options */}
                    <DropdownMenuItem 
                      onClick={() => { setSortField('duration'); setSortDirection('asc'); setCurrentPage(1); }}
                      className="flex items-center justify-between"
                    >
                      Duration: Shortest First
                      {sortField === 'duration' && sortDirection === 'asc' && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => { setSortField('duration'); setSortDirection('desc'); setCurrentPage(1); }}
                      className="flex items-center justify-between"
                    >
                      Duration: Longest First
                      {sortField === 'duration' && sortDirection === 'desc' && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    {/* Date options */}
                    <DropdownMenuItem 
                      onClick={() => { setSortField('departureDate'); setSortDirection('asc'); setCurrentPage(1); }}
                      className="flex items-center justify-between"
                    >
                      Date: Earliest First
                      {sortField === 'departureDate' && sortDirection === 'asc' && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => { setSortField('departureDate'); setSortDirection('desc'); setCurrentPage(1); }}
                      className="flex items-center justify-between"
                    >
                      Date: Latest First
                      {sortField === 'departureDate' && sortDirection === 'desc' && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Results */}
        <main className="mb-6">
          {paginatedResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No cruises found</div>
            </div>
          ) : (
            <div className="space-y-0">
              {paginatedResults.map((cruise: Cruise, index) => (
                <CruisePreview key={cruise.name + cruise.departureDate + index} cruise={cruise} />
              ))}
            </div>
          )}
        </main>
        {/* Pagination */}
        <div className="flex justify-start">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}