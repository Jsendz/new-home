import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    // Hero
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),

    // Our Story
    defineField({ name: "storyHeadline", title: "Story Headline", type: "string" }),
    defineField({
      name: "storyParagraphs",
      title: "Story Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({ name: "quoteText", title: "Featured Quote", type: "text" }),
    defineField({ name: "quoteAuthorName", title: "Quote Author Name", type: "string" }),
    defineField({ name: "quoteAuthorRole", title: "Quote Author Role", type: "string" }),
    defineField({
      name: "quoteAuthorImage",
      title: "Quote Author Photo",
      type: "image",
      options: { hotspot: true },
    }),

    // Mission
    defineField({ name: "missionHeadline", title: "Mission Headline", type: "string" }),
    defineField({
      name: "missions",
      title: "Mission Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),

    // Stats
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

    // Team
    defineField({
      name: "team",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
