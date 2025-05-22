export interface ShipLine {
  logo: string | null;
  name: string;
}

export interface Ship {
  name: string;
  rating: number;
  reviews: number;
  image: string | null;
  line: ShipLine;
}

export interface Cruise {
  price: number;
  name: string;
  ship: Ship;
  itinerary: string[];
  region: string;
  departureDate: string;
  returnDate: string;
  duration: number;
}

export interface ApiResponse {
  results: Cruise[];
}
