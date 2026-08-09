// Shared demo data — no "use client" so it can be imported by both
// server components (page.tsx) and client components (ListingsGrid.tsx)

export interface ListingProperty {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: string;
  status: "for_sale" | "sold" | "rented";
  propertyType?: string;
  mainImage?: { asset: { _ref: string } };
  image?: string;
}

export const DEMO_LISTINGS: ListingProperty[] = [
  {
    _id: "1",
    title: "Ravenwood Corner Condo",
    slug: { current: "ravenwood-corner-condo" },
    price: 489000, bedrooms: 3, bathrooms: 2, sqft: 1020,
    location: "51 Bogard Rd, Wasilla",
    status: "for_sale", propertyType: "Condo",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
  },
  {
    _id: "2",
    title: "Meridian Heights Villa",
    slug: { current: "meridian-heights-villa" },
    price: 875000, bedrooms: 4, bathrooms: 3, sqft: 2400,
    location: "14 Crestline Ave, Anchorage",
    status: "for_sale", propertyType: "Villa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80",
  },
  {
    _id: "3",
    title: "Lakewood Terrace House",
    slug: { current: "lakewood-terrace-house" },
    price: 620000, bedrooms: 3, bathrooms: 2, sqft: 1680,
    location: "88 Lakeshore Dr, Palmer",
    status: "for_sale", propertyType: "House",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80",
  },
  {
    _id: "4",
    title: "Birchwood Modern Townhouse",
    slug: { current: "birchwood-modern-townhouse" },
    price: 395000, bedrooms: 2, bathrooms: 2, sqft: 980,
    location: "22 Birch St, Wasilla",
    status: "for_sale", propertyType: "Townhouse",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80",
  },
  {
    _id: "5",
    title: "Summit View Estate",
    slug: { current: "summit-view-estate" },
    price: 1240000, bedrooms: 5, bathrooms: 4, sqft: 3800,
    location: "7 Summit Ridge, Anchorage",
    status: "for_sale", propertyType: "House",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80",
  },
  {
    _id: "6",
    title: "Glacier Point Apartment",
    slug: { current: "glacier-point-apartment" },
    price: 310000, bedrooms: 1, bathrooms: 1, sqft: 640,
    location: "3 Glacier Blvd, Wasilla",
    status: "rented", propertyType: "Apartment",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
  },
  {
    _id: "7",
    title: "Pinecrest Family Home",
    slug: { current: "pinecrest-family-home" },
    price: 540000, bedrooms: 4, bathrooms: 3, sqft: 2100,
    location: "91 Pinecrest Loop, Palmer",
    status: "sold", propertyType: "House",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80",
  },
  {
    _id: "8",
    title: "Northgate Studio Loft",
    slug: { current: "northgate-studio-loft" },
    price: 249000, bedrooms: 1, bathrooms: 1, sqft: 520,
    location: "12 Northgate Pl, Anchorage",
    status: "for_sale", propertyType: "Apartment",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80",
  },
  {
    _id: "9",
    title: "Aspen Grove Cabin",
    slug: { current: "aspen-grove-cabin" },
    price: 460000, bedrooms: 3, bathrooms: 2, sqft: 1340,
    location: "55 Aspen Way, Wasilla",
    status: "for_sale", propertyType: "House",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=80",
  },
];
