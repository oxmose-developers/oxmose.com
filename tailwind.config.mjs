const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: { xs: "420px" },
      borderWidth: { hairline: "0.5px" },
      colors: {
        oxe: {
          grey: "#7B7878",
          purple: "#BEB9FD",
        },
      },
      fontFamily: {
        sans: ["var(--font-monument-grotesk)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "oxe-xs": ["1.125rem", { lineHeight: "1.5625rem" }],
        "oxe-sm": ["1.5625rem", { lineHeight: "2.125rem" }],
        "oxe-md": ["1.875rem", { lineHeight: "2.1875rem" }],
        "oxe-md-plus": ["2.5rem", { lineHeight: "2.8125rem" }],
        "oxe-lg": ["2.8125rem", { lineHeight: "3.125rem" }],
        "oxe-xxl-mobile": ["2.5rem", { lineHeight: "3.125rem" }],
        "oxe-xxl": ["5rem", { lineHeight: "5.625rem" }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/forms")({ strategy: "class" }),
  ],
};

export default config;
