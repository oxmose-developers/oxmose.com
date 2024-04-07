import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "overview",
      type: "metaDescription",
    }),
    defineField({
      name: "part1",
      type: "blockContent",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "part2",
      type: "twoColumn",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "part3",
      type: "blockContent",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "part4",
      type: "twoColumn",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "part5",
      type: "blockContent",
      validation: (Rule) => [Rule.required()],
    }),
  ],
});
