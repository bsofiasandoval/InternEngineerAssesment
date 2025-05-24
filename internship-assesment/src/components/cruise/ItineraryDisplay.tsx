"use client";
import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ItineraryDisplayProps {
  itinerary: string[];
  duration: number;
}


export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  const maxDisplayItems = 4; // adjust based on available space
  
  if (itinerary.length <= maxDisplayItems) {
    // show all items in a single row
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {itinerary.map((stop, index) => (
          <span key={index} className="flex items-center">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{stop}</span>
            {index < itinerary.length - 1 && (
              <ArrowRight className="h-3 w-3 mx-1 text-blue-600 flex-shrink-0" />
            )}
          </span>
        ))}
      </div>
    );
  } else {
    // for longer itineraries, show first few items, then "... +X more" with tooltip
    const visibleItems = itinerary.slice(0, maxDisplayItems - 1);
    const hiddenItems = itinerary.slice(maxDisplayItems - 1);
    const remainingCount = hiddenItems.length;
    
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {visibleItems.map((stop, index) => (
          <span key={index} className="flex items-center">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{stop}</span>
            <ArrowRight className="h-3 w-3 mx-1 text-blue-600 flex-shrink-0" />
          </span>
        ))}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap underline decoration-dotted underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1">
                +{remainingCount} more
              </button>
            </TooltipTrigger>
            <TooltipContent 
              className="p-0 w-80 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden"
              sideOffset={8}
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="h-4 w-4" />
                  <span className="font-semibold">Complete Itinerary</span>
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="p-4 space-y-2">
                  {itinerary.map((stop, index) => (
                    <div key={index} className="flex items-center gap-3 py-1">
                      <div className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900 block truncate">{stop}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
}
