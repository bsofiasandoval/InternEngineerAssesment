"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Cruise } from "@/types/cruises";
import { formatDateRange } from "@/utils/dateUtils";
import { ShipImageDisplay } from "@/components/cruise/ShipImageDisplay";
import { CruiseDetails } from "@/components/cruise/CruiseDetails";
import { ItineraryDisplay } from "@/components/cruise/ItineraryDisplay";

interface CruisePreviewProps {
  cruise: Cruise;
}

/**
 * cruisePreview component that displays a cruise card with all its details
 */
export function CruisePreview({ cruise }: CruisePreviewProps) {
  const formattedDateRange = formatDateRange(cruise.departureDate, cruise.returnDate);

  return (
    <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-row min-h-48 mb-6">
      {/* Left: Ship Image with Date Overlay */}
      <ShipImageDisplay 
        image={cruise.ship.image}
        shipName={cruise.name}
        dateOverlay={formattedDateRange}
      />

      {/* Right: Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top 2/3: Cruise Details */}
        <div className="flex-1 px-6 py-5 flex flex-col justify-between min-h-32">
          {/* Header Row: Title and Company Logo */}
          <CruiseDetails 
            name={cruise.name}
            region={cruise.region}
            duration={cruise.duration}
            ship={cruise.ship}
          />

          {/* Itinerary */}
          <div className="mt-auto">
            <ItineraryDisplay 
              itinerary={cruise.itinerary}
              duration={cruise.duration}
            />
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