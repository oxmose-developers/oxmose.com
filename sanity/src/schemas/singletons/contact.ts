import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact",
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
      name: "generalSection",
      type: "contentSection",
    }),
    defineField({
      name: "locations",
      type: "array",
      validation: (Rule) => [Rule.required()],
      of: [
        defineArrayMember({
          type: "object",
          name: "location",
          fields: [
            defineField({
              name: "type",
              type: "string",
              validation: (Rule) => [Rule.required()],
            }),
            defineField({
              name: "name",
              type: "string",
              validation: (Rule) => [Rule.required()],
            }),
            defineField({ name: "phone", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "listenLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
      hidden: true,
    }),
    defineField({
      name: "followLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
      hidden: true,
    }),
    defineField({
      name: "pressKit",
      type: "link",
      hidden: true,
    }),
    defineField({
      name: "demoSection",
      type: "contentSection",
      hidden: true,
    }),
    defineField({
      name: "syncSection",
      type: "contentSection",
      hidden: true,
    }),
  ],
});
