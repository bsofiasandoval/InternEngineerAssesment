"use client";
import React from "react";
import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Cruise } from "@/types/cruises";

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

  const formattedDateRange = formatDateRange(cruise.departureDate, cruise.returnDate);

  return (
    <Card className="overflow-hidden rounded-2xl shadow flex flex-row items-stretch p-0">
      {/* Left: Image with overlay */}
      <div className="relative w-60 min-w-60 h-48 flex-shrink-0">
        {cruise.ship.image ? (
          <Image
            src={cruise.ship.image || "/placeholder-cruise.jpg"}
            alt={cruise.name}
            fill
            className="object-cover rounded-l-2xl"
            style={{ minWidth: 240, minHeight: 192, maxWidth: 240, maxHeight: 192 }}
            sizes="240px"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center rounded-l-2xl" style={{ minWidth: 240, minHeight: 192, maxWidth: 240, maxHeight: 192 }}>
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap shadow">
          {formattedDateRange}
        </div>
      </div>

      {/* Right: Details and price bar */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Top: cruise details and logo/ship */}
        <div className="flex flex-row justify-between items-start px-6 pt-6 pb-2">
          {/* Cruise details */}
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">{cruise.name}</h2>
            {/* Horizontally scrollable meta info */}
            <div className="flex items-center gap-2 mb-1 text-base overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent max-w-full">
              <span className="text-muted-foreground whitespace-nowrap">{cruise.region}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground whitespace-nowrap">{cruise.duration} nights</span>
              <span className="flex items-center gap-1 ml-2 whitespace-nowrap">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{cruise.ship.rating.toFixed(2)}</span>
                <span className="text-muted-foreground text-sm">{cruise.ship.reviews} reviews</span>
              </span>
            </div>
            {/* Horizontally scrollable itinerary */}
            <div className="flex items-center gap-1 mt-2 text-base font-medium overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent max-w-full">
              {cruise.itinerary.map((stop, index) => (
                <span key={index} className="flex items-center whitespace-nowrap">
                  <span>{stop}</span>
                  {index < cruise.itinerary.length - 1 && (
                    <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                  )}
                </span>
              ))}
            </div>
          </div>
          {/* Logo and ship name */}
          <div className="flex flex-col items-end ml-4">
            {cruise.ship.line.logo && (
              <Image
                src={cruise.ship.line.logo || "/placeholder-cruise.jpg"}
                alt={cruise.ship.line.name}
                width={80}
                height={32}
                className="object-contain mb-1"
              />
            )}
            <div className="text-xs text-muted-foreground text-right">{cruise.ship.name}</div>
          </div>
        </div>
        {/* Bottom: price bar */}
        <div className="flex flex-row items-center justify-end bg-gray-50 px-6 py-3 rounded-br-2xl">
          <div className="text-xs text-muted-foreground mr-3">Interior from</div>
          <div className="text-2xl font-bold mr-4">${cruise.price}</div>
          <Button className="w-32">See sailings</Button>
        </div>
      </div>
    </Card>
  );
}