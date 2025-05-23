"use client";
import React from "react";
import Image from "next/image";
import { Ship } from "lucide-react";

interface ShipImageDisplayProps {
  image: string | null;
  shipName: string;
  dateOverlay: string;
}

/**
 *displays the ship image with a date overlay
 */
export function ShipImageDisplay({ image, shipName, dateOverlay }: ShipImageDisplayProps) {
  return (
    <div className="relative w-60 min-w-60 flex-shrink-0 min-h-38">
      {image ? (
        <Image
          src={image}
          alt={shipName}
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
        {dateOverlay}
      </div>
    </div>
  );
}
