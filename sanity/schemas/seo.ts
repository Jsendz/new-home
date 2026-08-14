import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Overrides the page title in search results. Leave blank to auto-generate. ~60 characters.",
      validation: (r) => r.max(60).warning("Longer titles get truncated in search results"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Shown as the search-result snippet. Leave blank to auto-generate. ~155 characters.",
      validation: (r) => r.max(160).warning("Longer descriptions get truncated in search results"),
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description: "Used for social previews (Facebook, LinkedIn, X, WhatsApp). Falls back to the main image. Recommended 1200×630.",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description: "Enable to keep this page out of Google/Bing (e.g. duplicate or outdated listings). Sold/rented listings are hidden automatically.",
      initialValue: false,
    }),
  ],
});
