"use client";
import React, { JSX } from "react";
import Image from "next/image";
import { Star, ArrowRight, Ship, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Cruise } from "@/types/cruises";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CruisePreviewProps {
  cruise: Cruise;
}

export function CruisePreview({ cruise }: CruisePreviewProps) {
  function formatDateRange(departureDate: string, returnDate: string): string {
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
    if (isNaN(departure.getTime()) || isNaN(returnD.getTime())) return "";
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const depMonth = months[departure.getMonth()];
    const retMonth = months[returnD.getMonth()];
    const depDay = departure.getDate();
    const retDay = returnD.getDate();
    const depYear = departure.getFullYear();
    const retYear = returnD.getFullYear();
    if (depYear === retYear) {
      if (depMonth === retMonth) {
        return `${depMonth} ${depDay}-${retDay}, ${depYear}`;
      } else {
        return `${depMonth} ${depDay}-${retMonth} ${retDay}, ${depYear}`;
      }
    } else {
      return `${depMonth} ${depDay}, ${depYear}-${retMonth} ${retDay}, ${retYear}`;
    }
  }


// Smart arrangement of itinerary for UI-friendly display
  function formatItinerary(itinerary: string[]): JSX.Element {
    const maxDisplayItems = 4; // Adjust based on available space
    
    if (itinerary.length <= maxDisplayItems) {
      // Show all items in a single row
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
      // For longer itineraries, show first few items, then "... +X more" with tooltip
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
                  +{remainingCount} more ports
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
                
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                  <div className="text-xs text-gray-600 text-center font-medium">
                    {itinerary.length} ports • {cruise.duration} nights
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    }
  }

  const formattedDateRange = formatDateRange(cruise.departureDate, cruise.returnDate);

  return (
    <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-row min-h-48 mb-6">
      {/* Left: Ship Image with Date Overlay */}
      <div className="relative w-60 min-w-60 flex-shrink-0 min-h-38">
        {cruise.ship.image ? (
          <Image
            src={cruise.ship.image}
            alt={cruise.name}
            fill
            className="object-cover rounded-l-2xl"
            sizes="240px"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center rounded-l-2xl">
            <Ship className="text-gray-500" style={{ width: 64, height: 64 }} />
            <span className="text-gray-500 text-sm">No image available</span>
          </div>
        )}
        {/* Date Overlay */}
        <div className="absolute top-3 left-3 bg-black/80 text-white px-3 py-1.5 rounded-lg text-sm font-semibold backdrop-blur-sm">
          {formattedDateRange}
        </div>
      </div>

      {/* Right: Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top 2/3: Cruise Details */}
        <div className="flex-1 px-6 py-5 flex flex-col justify-between min-h-32">
          {/* Header Row: Title and Company Logo */}
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-900 break-words mb-1">
                {cruise.name}
              </h2>
              {/* Region, Duration, and Rating */}
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                <span className="font-medium">{cruise.region}</span>
                <span>{cruise.duration} nights</span>
                <div className="flex items-center gap-1 ml-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{cruise.ship.rating.toFixed(1)}</span>
                  <span className="text-gray-500">{cruise.ship.reviews} reviews</span>
                </div>
              </div>
            </div>
            
            {/* Company Logo and Ship Name */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              {cruise.ship.line.logo ? (
                <>
                  <Image
                    src={cruise.ship.line.logo}
                    alt={cruise.ship.line.name}
                    width={80}
                    height={50}
                    className="object-contain"
                  />
                  <span className="text-xs text-gray-500 text-right font-medium">
                    {cruise.ship.name}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xs text-gray-700 text-right font-semibold">
                    {cruise.ship.line.name}
                  </span>
                  <span className="text-xs text-gray-500 text-right font-medium">
                    {cruise.ship.name}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Itinerary */}
          <div className="mt-auto">
            {formatItinerary(cruise.itinerary)}
          </div>
        </div>

        {/* Bottom 1/3: Price Section */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-6 rounded-br-2xl border-t border-gray-100 min-h-16">
          <div className="flex flex-col items-end">
            <div className="text-xs text-gray-500 font-medium tracking-wide">
              Interior from
            </div>
            <div className="text-2xl text-black">
              ${cruise.price.toLocaleString()}
            </div>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-sm font-semibold transition-colors duration-200"
            size="default"
          >
            See Sailings
          </Button>
        </div>
      </div>
    </Card>
  );
}