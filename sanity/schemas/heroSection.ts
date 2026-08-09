import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "mainImage",
      title: "Main Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "secondaryImage",
      title: "Secondary Floating Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "badgeText",
      title: "Floating Badge Text",
      type: "string",
      description: 'e.g. "+500 Listings"',
    }),
    defineField({
      name: "clientCount",
      title: "Happy Clients Count",
      type: "string",
      description: 'e.g. "1.5K+"',
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Hero Section" }) },
});
