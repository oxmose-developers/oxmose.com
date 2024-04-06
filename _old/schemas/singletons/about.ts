import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: DocumentIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: "title",
      description: "This field is the title of your website.",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      description:
        "Used both for the <meta> description tag for SEO, and the website subheader.",
      title: "Description",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [],
          },
          styles: [],
          type: "block",
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: "listenLinks",
      title: "External Listening Links",
      description:
        "Used in the contact page as a list of external listening links.",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      description:
        "Used in the contact page as a list of external social media links.",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "press",
      title: "Press Kit",
      description: "Here you can upload a Press Kit to be downloaded.",
      type: "file",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        subtitle: "About",
        title,
      };
    },
  },
});
