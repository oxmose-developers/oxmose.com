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
      name: "listenLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
    }),
    defineField({
      name: "followLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
    }),
    defineField({
      name: "pressKit",
      type: "link",
    }),
    defineField({
      name: "demoSection",
      type: "contentSection",
    }),
    defineField({
      name: "syncSection",
      type: "contentSection",
    }),
  ],
});
