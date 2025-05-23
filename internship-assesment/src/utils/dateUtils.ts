/**
 * formats a date range into a human-readable string
 * @param departureDate - departure date in ISO format
 * @param returnDate - return date in ISO format
 * @returns formatted date range string
 */
export function formatDateRange(departureDate: string, returnDate: string): string {
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
