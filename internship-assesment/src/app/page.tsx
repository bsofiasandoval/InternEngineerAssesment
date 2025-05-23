
'use client'
import Image from "next/image";
import useAPI from "../hooks/useAPI";
import { CruisePreview } from "../components/cruisePreview";
import { useState, useMemo, useEffect } from "react";
import { Pagination } from "../components/pagination";
import { Cruise } from "../types/cruises";

export default function Home() {
  const { data, loading, error } = useAPI();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  // Calculate pagination
  const { paginatedResults, totalPages, startIndex, endIndex, totalResults } = useMemo(() => {
    if (!Array.isArray(data?.results)) {
      return { paginatedResults: [], totalPages: 0, startIndex: 0, endIndex: 0, totalResults: 0 };
    }
    
    const total = data.results.length;
    const pages = Math.ceil(total / resultsPerPage);
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const paginated = data.results.slice(start, end);
    
    return {
      paginatedResults: paginated,
      totalPages: pages,
      startIndex: start + 1,
      endIndex: Math.min(end, total),
      totalResults: total
    };
  }, [data?.results, currentPage]);

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
          <h1 className="text-3xl font-normal text-gray-900 mb-2">Cruise Search Results</h1>
          {totalResults > 0 && (
            <div className="text-sm text-gray-600">
              About {totalResults.toLocaleString()} results 
              {totalPages > 1 && (
                <span> (showing {startIndex}-{endIndex})</span>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <main className="mb-8">
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}