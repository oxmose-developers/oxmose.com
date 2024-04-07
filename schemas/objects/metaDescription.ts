import { defineType } from "sanity";

export default defineType({
  name: "metaDescription",
  type: "text",
  description: "Used for the <meta> description tag for SEO",
  validation: (Rule) => [Rule.required(), Rule.max(155)],
});
