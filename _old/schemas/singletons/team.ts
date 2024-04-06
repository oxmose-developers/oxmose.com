import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "team",
  title: "Team Members",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "roles",
      description: "The list of roles in the company",
      title: "Roles",
      type: "array",
      of: [{ type: "role" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        subtitle: "Team",
        title,
      };
    },
  },
});
