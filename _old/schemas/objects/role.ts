import { defineField } from "sanity";

export default defineField({
    title: "Role",
    name: "role",
    type: "object",
    fields: [
      {
        name: "position", 
        type: "string", 
        title: "Position", 
        description: "This field is the title of the position in the company.",
      },
      {
        name: "members", 
        type: "string", 
        title: "Team Members", 
        description: "This field is the list of team members in the position.",
      },
    ]
})
