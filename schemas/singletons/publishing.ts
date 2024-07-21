import { defineField, defineType } from "sanity";

export default defineType({
  name: "publishing",
  title: "Publishing",
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
      name: "creativeServicesSection",
      type: "contentSection",
    }),
    defineField({
      name: "scoreSection",
      type: "contentSection",
    }),
    defineField({
      name: "syncSection",
      type: "contentSection",
    }),
  ],
});
