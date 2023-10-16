import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EC1C24",
          light: "#FFE5E6",
        },
        secondary: {
          DEFAULT: "#1890FF",
          light: "#DEF3FE",
        },
        neutral: {
          500: "#D9D9D9",
          black: "#262626",
          gray: "#5C5E64",
        },
        danger: "#FF4D4F",
        warning: "#FAAD14",
      },
      boxShadow: {
        main: "0px 2px 0px 0px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
