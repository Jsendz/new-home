import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "agencyName", title: "Agency Name", type: "string" }),
    defineField({
      name: "logo", title: "Logo", type: "image", options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({
      name: "socialLinks", title: "Social Links", type: "object",
      fields: [
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "x", title: "X (Twitter)", type: "url" },
      ],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "object",
      description: "Site-wide fallbacks used whenever a page doesn't set its own SEO fields.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "metaTitleTemplate", title: "Title Template", type: "string",
          description: 'Use %s as a placeholder for the page title, e.g. "%s | The Sweet Home Co."',
        }),
        defineField({ name: "metaDescription", title: "Default Meta Description", type: "text", rows: 3, validation: (r) => r.max(160) }),
        defineField({ name: "ogImage", title: "Default Social Share Image", type: "image", options: { hotspot: true } }),
      ],
    }),
  ],
  preview: { select: { title: "agencyName" } },
});
