import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "authorName", title: "Author Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "authorImage", title: "Author Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "rating", title: "Rating (1–5)", type: "number",
      validation: (r) => r.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({ name: "authorRole", title: "Author Role / Property", type: "string" }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "quote", media: "authorImage" },
  },
});
