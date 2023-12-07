import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'team',
  title: 'Team Members',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: "position",
      description: "This field is the title of the position in the team. eg Founder",
      title: "Position",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "members",
      title: "Team Members",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ]
})