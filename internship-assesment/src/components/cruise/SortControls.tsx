"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { SortField, SortDirection } from "@/hooks/useSorting";

interface SortControlsProps {
  sortField: SortField;
  sortDirection: SortDirection;
  setSortField: (field: SortField) => void;
  setSortDirection: (direction: SortDirection) => void;
  onSortChange: () => void;
  getCurrentSortLabel: () => string;
}

/**
 * component for displaying and managing sort controls
 */
export function SortControls({
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
  onSortChange,
  getCurrentSortLabel,
}: SortControlsProps) {
  // helper function to handle sort changes
  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
    onSortChange();
  };

  return (
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
            {/* price options */}
            <DropdownMenuItem 
              onClick={() => handleSortChange('price', 'asc')}
              className="flex items-center justify-between"
            >
              Price: Low to High
              {sortField === 'price' && sortDirection === 'asc' && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleSortChange('price', 'desc')}
              className="flex items-center justify-between"
            >
              Price: High to Low
              {sortField === 'price' && sortDirection === 'desc' && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            {/* duration options */}
            <DropdownMenuItem 
              onClick={() => handleSortChange('duration', 'asc')}
              className="flex items-center justify-between"
            >
              Duration: Shortest First
              {sortField === 'duration' && sortDirection === 'asc' && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleSortChange('duration', 'desc')}
              className="flex items-center justify-between"
            >
              Duration: Longest First
              {sortField === 'duration' && sortDirection === 'desc' && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            {/* date options */}
            <DropdownMenuItem 
              onClick={() => handleSortChange('departureDate', 'asc')}
              className="flex items-center justify-between"
            >
              Date: Earliest First
              {sortField === 'departureDate' && sortDirection === 'asc' && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleSortChange('departureDate', 'desc')}
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
  );
}
