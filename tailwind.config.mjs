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
    require("@tailwindcss/forms")({ strategy: "class" }),
  ],
};

export default config;
