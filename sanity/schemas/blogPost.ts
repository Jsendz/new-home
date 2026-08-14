import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "Slug", type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author", title: "Author", type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({
      name: "mainImage", title: "Main Image", type: "image", options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string", description: "Falls back to the post title." }),
      ],
    }),
    defineField({
      name: "excerpt", title: "Excerpt", type: "text", rows: 3,
      description: "Also used as the fallback search-result snippet — keep it under ~155 characters.",
      validation: (r) => r.max(200).warning("Long excerpts get truncated in search results"),
    }),
    defineField({ name: "readTime", title: "Read Time (minutes)", type: "number" }),
    defineField({
      name: "body", title: "Body", type: "array",
      of: [
        { type: "block" },
        {
          type: "image", options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
        },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "mainImage" },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `by ${author}` : "", media };
    },
  },
});
