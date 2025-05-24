'use client'
import useAPI from "../hooks/useAPI";
import { CruisePreview } from "@/components/CruisePreview";
import { Pagination } from "@/components/Pagination";
import { Cruise } from "../types/cruises";
import { SortControls } from "@/components/cruise/SortControls";
import { useSorting } from "@/hooks/useSorting";
import { usePagination } from "@/hooks/usePagination";

export default function Home() {
  // fetch data using API hook
  const { data, loading, error } = useAPI();
  
  // use sorting hook to manage sorting state and logic
  const { 
    sortField, 
    sortDirection, 
    sortedData, 
    getCurrentSortLabel,
    setSortField,
    setSortDirection 
  } = useSorting(data?.results || []);
  
  // use pagination hook to manage pagination state and logic
  const { 
    currentPage, 
    setCurrentPage, 
    paginatedItems: paginatedResults, 
    totalPages, 
    startIndex, 
    endIndex, 
    totalItems: totalResults 
  } = usePagination(sortedData, 10);
  
  // handle sort changes and reset pagination
  const handleSortChange = () => {
    setCurrentPage(1);
  };

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
        {/* header */}
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
            
            {/* sort controls */}
            <SortControls 
              sortField={sortField}
              sortDirection={sortDirection}
              setSortField={setSortField}
              setSortDirection={setSortDirection}
              onSortChange={handleSortChange}
              getCurrentSortLabel={getCurrentSortLabel}
            />
          </div>
        </div>

        {/* results */}
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
        {/* pagination */}
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