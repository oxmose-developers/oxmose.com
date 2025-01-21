import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "track",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "number",
      type: "number",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "length",
      type: "string",
      placeholder: "e.g. 03:45",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "file",
      type: "file",
    }),
    defineField({
      name: "artists",
      type: "array",
      description: "To add tracks, the artist must be published.",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "artist" },
        }),
      ],
      validation: (Rule) => [Rule.required()],
    }),
  ],
});
