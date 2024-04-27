const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Monument Grotesk"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "oxe-xs": ["18px", { lineHeight: "25px" }],
        "oxe-sm": ["25px", { lineHeight: "34px" }],
        "oxe-md": ["30px", { lineHeight: "35px" }],
        "oxe-md-plus": ["40px", { lineHeight: "45px" }],
        "oxe-lg": ["45px", { lineHeight: "50px" }],
        "oxe-xxl-mobile": ["40px", { lineHeight: "50px" }],
        "oxe-xxl": ["80px", { lineHeight: "90px" }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
