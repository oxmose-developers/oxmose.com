import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (SlugRule) => [SlugRule.required()],
    }),
    defineField({
      name: "overview",
      type: "text",
      description: "Used for the <meta> description tag for SEO",
      validation: (Rule) => [Rule.required(), Rule.max(155)],
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "links",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
});
