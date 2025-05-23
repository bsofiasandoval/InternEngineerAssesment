"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Ship } from "@/types/cruises";

interface CruiseDetailsProps {
  name: string;
  region: string;
  duration: number;
  ship: Ship;
}

/**
 * displays the cruise details including name, region, duration, and ship information
 */
export function CruiseDetails({ name, region, duration, ship }: CruiseDetailsProps) {
  return (
    <div className="flex justify-between items-start gap-4 mb-4">
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold text-gray-900 break-words mb-1">
          {name}
        </h2>
        {/* region, duration, and rating */}
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          <span className="font-medium">{region}</span>
          <span>{duration} nights</span>
          <div className="flex items-center gap-1 ml-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{ship.rating.toFixed(1)}</span>
            <span className="text-gray-500">{ship.reviews} reviews</span>
          </div>
        </div>
      </div>
      
      {/* company logo and ship name */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        {ship.line.logo ? (
          <>
            <Image
              src={ship.line.logo}
              alt={ship.line.name}
              width={80}
              height={50}
              className="object-contain"
            />
            <span className="text-xs text-gray-500 text-right font-medium">
              {ship.name}
            </span>
          </>
        ) : (
          <>
            <span className="text-xs text-gray-700 text-right font-semibold">
              {ship.line.name}
            </span>
            <span className="text-xs text-gray-500 text-right font-medium">
              {ship.name}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
