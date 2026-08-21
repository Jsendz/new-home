// Shared demo data — no "use client" so it can be imported by both
// server components (page.tsx) and client components (ListingsGrid.tsx)

import type { Translations } from "@/lib/utils";

export interface PropertyAddress {
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
  geo?: { lat?: number; lng?: number };
}

export interface PropertySeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: { asset: { _ref: string } };
  noIndex?: boolean;
}

export interface ListingProperty {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number | null;
  location: string;
  area?: string;
  address?: PropertyAddress;
  description?: string;
  status: "for_sale" | "sold" | "rented";
  propertyType?: string;
  mainImage?: { asset: { _ref: string }; alt?: string };
  image?: string;
  seo?: PropertySeo;
  translations?: Translations;
}

export const DEMO_LISTINGS: ListingProperty[] = [
  {
    _id: "1",
    title: "Àtic al Centre d'Andorra la Vella",
    slug: { current: "atic-centre-andorra-la-vella" },
    price: 650000, bedrooms: 3, bathrooms: 2, sqft: 145,
    location: "Avinguda Meritxell, Andorra la Vella",
    area: "Andorra la Vella",
    status: "for_sale", propertyType: "Condo",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
  },
  {
    _id: "2",
    title: "Pis Modern a Escaldes-Engordany",
    slug: { current: "pis-modern-escaldes-engordany" },
    price: 495000, bedrooms: 2, bathrooms: 2, sqft: 98,
    location: "Avinguda Carlemany, Escaldes-Engordany",
    area: "Escaldes-Engordany",
    status: "for_sale", propertyType: "Apartment",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80",
  },
  {
    _id: "3",
    title: "Xalet amb Vistes a Ordino",
    slug: { current: "xalet-vistes-ordino" },
    price: 1250000, bedrooms: 4, bathrooms: 3, sqft: 280,
    location: "Els Cortals, Ordino",
    area: "Ordino",
    status: "for_sale", propertyType: "House",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=80",
  },
  {
    _id: "4",
    title: "Casa Adossada a La Massana",
    slug: { current: "casa-adossada-la-massana" },
    price: 780000, bedrooms: 3, bathrooms: 3, sqft: 190,
    location: "Sispony, La Massana",
    area: "La Massana",
    status: "for_sale", propertyType: "Townhouse",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80",
  },
  {
    _id: "5",
    title: "Pis amb Terrassa a Encamp",
    slug: { current: "pis-terrassa-encamp" },
    price: 385000, bedrooms: 2, bathrooms: 1, sqft: 75,
    location: "Carrer de la Ribeta, Encamp",
    area: "Encamp",
    status: "for_sale", propertyType: "Apartment",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
  },
  {
    _id: "6",
    title: "Àtic Duplex a Canillo",
    slug: { current: "atic-duplex-canillo" },
    price: 890000, bedrooms: 3, bathrooms: 2, sqft: 160,
    location: "Prop de Grandvalira, Canillo",
    area: "Canillo",
    status: "for_sale", propertyType: "Condo",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80",
  },
  {
    _id: "7",
    title: "Estudi al Centre d'Andorra la Vella",
    slug: { current: "estudi-centre-andorra-la-vella" },
    price: 245000, bedrooms: 1, bathrooms: 1, sqft: 42,
    location: "Carrer Bonaventura Riberaygua, Andorra la Vella",
    area: "Andorra la Vella",
    status: "rented", propertyType: "Apartment",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80",
  },
  {
    _id: "8",
    title: "Casa Unifamiliar a Sant Julià de Lòria",
    slug: { current: "casa-unifamiliar-sant-julia-loria" },
    price: 950000, bedrooms: 4, bathrooms: 3, sqft: 240,
    location: "Fontaneda, Sant Julià de Lòria",
    area: "Sant Julià de Lòria",
    status: "sold", propertyType: "House",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80",
  },
  {
    _id: "9",
    title: "Pis Reformat a Escaldes-Engordany",
    slug: { current: "pis-reformat-escaldes-engordany" },
    price: 560000, bedrooms: 3, bathrooms: 2, sqft: 110,
    location: "Plaça Coprínceps, Escaldes-Engordany",
    area: "Escaldes-Engordany",
    status: "for_sale", propertyType: "Apartment",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80",
  },
];
