// The 7 parishes of Andorra — shared by the hero search bar and the
// listings page filters so both stay in sync.
export const ANDORRA_PARISHES = [
  "Andorra la Vella",
  "Escaldes-Engordany",
  "Encamp",
  "La Massana",
  "Ordino",
  "Sant Julià de Lòria",
  "Canillo",
] as const;

// Shared price-range slider bounds — the hero search bar and the listings
// page filters both need to agree on these so a URL built by one is
// interpreted the same way by the other.
export const PRICE_MIN = 0;
export const PRICE_MAX = 1_500_000;
export const PRICE_STEP = 25_000;
