import { defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "Slug", type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "price", title: "Price (USD)", type: "number", validation: (r) => r.required() }),
    defineField({ name: "bedrooms", title: "Bedrooms", type: "number" }),
    defineField({ name: "bathrooms", title: "Bathrooms", type: "number" }),
    defineField({ name: "sqft", title: "Square Feet", type: "number" }),
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
        defineField({ name: "title_fr", title: "Title (French)", type: "string" }),
        defineField({ name: "title_ca", title: "Title (Catalan)", type: "string" }),
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
    }),
    defineField({
      name: "gallery", title: "Gallery", type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "location", title: "Location / Address", type: "string" }),
    defineField({
      name: "status", title: "Status", type: "string",
      options: { list: ["for_sale", "sold", "rented"], layout: "radio" },
      initialValue: "for_sale",
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "mainImage" },
  },
});
