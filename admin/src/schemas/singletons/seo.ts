import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: 'Used for the "About | Oxmose", page title. Only put Oxmose',
      initialValue: "Oxmose",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "description",
      type: "text",
      description: "Used for the <meta> description tag for SEO",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "twitterSite",
      type: "string",
      description: "X (Twitter) handle, e.g. @oxmose_records",
    }),
    defineField({
      name: "keywords",
      type: "string",
      description:
        "SEO keywords, e.g. oxmose, oxmose records, oxmose label, oxmose music, label, musique, music, independant",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "followLinks",
      description: "Social media follow links in the footer popup",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
    }),
    defineField({
      name: "cataloguePageTitle",
      type: "string",
      description:
        "The page title for the catalogue page, e.g. Catalogue | Oxmose",
      initialValue: "Catalogue | Oxmose",
      validation: (Rule) => [Rule.required()],
    }),
  ],
});
