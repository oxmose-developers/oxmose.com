import { defineType, defineField } from "sanity";

export default defineType({
  name: "contentSection",
  title: "Content Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "content",
      type: "blockContent",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "link",
      type: "link",
    }),
  ],
});
