import { defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "Slug (English)", type: "slug",
      description: "Used for the /en/ URL, and as the fallback URL for any locale without its own translated slug below.",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "price", title: "Price (EUR)", type: "number", validation: (r) => r.required() }),
    defineField({ name: "bedrooms", title: "Bedrooms", type: "number" }),
    defineField({ name: "bathrooms", title: "Bathrooms", type: "number" }),
    defineField({ name: "sqft", title: "Square Meters (m²)", type: "number", description: "Enter the value in square meters — it's displayed as m² across the site." }),
    defineField({
      name: "propertyType", title: "Property Type", type: "string",
      options: { list: ["Condo", "House", "Townhouse", "Villa", "Apartment", "Land"] },
    }),
    defineField({ name: "parking", title: "Parking Spots", type: "number" }),
    defineField({ name: "description", title: "Description (English)", type: "text", rows: 4 }),
    defineField({
      name: "translations",
      title: "Translations",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "title_es", title: "Title (Spanish)", type: "string" }),
        defineField({
          name: "slug_es", title: "Slug (Spanish)", type: "slug",
          description: "Leave blank to fall back to the English slug for Spanish pages.",
          options: { source: "title_es", maxLength: 96 },
        }),
        defineField({ name: "title_fr", title: "Title (French)", type: "string" }),
        defineField({
          name: "slug_fr", title: "Slug (French)", type: "slug",
          description: "Leave blank to fall back to the English slug for French pages.",
          options: { source: "title_fr", maxLength: 96 },
        }),
        defineField({ name: "title_ca", title: "Title (Catalan)", type: "string" }),
        defineField({
          name: "slug_ca", title: "Slug (Catalan)", type: "slug",
          description: "Leave blank to fall back to the English slug for Catalan pages.",
          options: { source: "title_ca", maxLength: 96 },
        }),
        defineField({ name: "description_es", title: "Description (Spanish)", type: "text", rows: 4 }),
        defineField({ name: "description_fr", title: "Description (French)", type: "text", rows: 4 }),
        defineField({ name: "description_ca", title: "Description (Catalan)", type: "text", rows: 4 }),
      ],
    }),
    defineField({
      name: "amenities", title: "Amenities", type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "mainImage", title: "Main Image", type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt", title: "Alt Text", type: "string",
          description: "Describe the image for search engines and screen readers, e.g. \"Sunlit living room with mountain view\". Falls back to the property title.",
        }),
      ],
    }),
    defineField({
      name: "gallery", title: "Gallery", type: "array",
      of: [{
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({ name: "alt", title: "Alt Text", type: "string" }),
        ],
      }],
    }),
    defineField({ name: "location", title: "Location / Address (display)", type: "string", description: "Shown to visitors, e.g. \"Avinguda Meritxell, Andorra la Vella\"" }),
    defineField({
      name: "area", title: "Area (Parish)", type: "string",
      description: "Used to match this property against the area filter on the search bar and listings page — must be one of the 7 parishes.",
      options: {
        list: ["Andorra la Vella", "Escaldes-Engordany", "Encamp", "La Massana", "Ordino", "Sant Julià de Lòria", "Canillo"],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "address",
      title: "Structured Address",
      type: "object",
      description: "Used for local SEO and map/rich-result markup — keep in sync with the display address above.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "addressLocality", title: "City / Town", type: "string" }),
        defineField({ name: "addressRegion", title: "Parish / Region", type: "string" }),
        defineField({ name: "postalCode", title: "Postal Code", type: "string" }),
        defineField({ name: "addressCountry", title: "Country Code", type: "string", initialValue: "AD", description: "ISO 3166-1 alpha-2, e.g. AD for Andorra" }),
        defineField({
          name: "geo", title: "Coordinates", type: "object",
          fields: [
            defineField({ name: "lat", title: "Latitude", type: "number" }),
            defineField({ name: "lng", title: "Longitude", type: "number" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "status", title: "Status", type: "string",
      options: { list: ["for_sale", "sold", "rented"], layout: "radio" },
      initialValue: "for_sale",
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "mainImage" },
  },
});
