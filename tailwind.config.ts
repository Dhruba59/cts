import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EC1C24",
          light: "#FFE5E6",
          border: "#e2e8f0"
        },
        secondary: {
          DEFAULT: "#1890FF",
          light: "#DEF3FE",
        },
        neutral: {
          100: "#F0F0F0",
          200: "#F2F3F3",
          400: "#DDE2E4",
          500: "#D9D9D9",
          600: "#BFBFBF",
          black: "#262626",
          gray: "#5C5E64",
        },
        
        dark: {
          DEFAULT: "#212731",
          900: "#1A1919",
          darkBlue: "#1a222c",
          lightBlue: '#24303f',
          lightBlueForTableHeader: '#313d4a',
          inputField: '#1d2a39',
          placeholder: '#CCCCCC',
          border: '#3d4d60',
          inputFieldRing: '#1890ff',
        },
        light: {
          100: "#fafafd",
          200: "#f5f7f9",
          500: "#F9F9F9",
        },
        gold: {
          100: "#FFFBE6",
          300: "#FFE58F",
        },
        "polar-green": {
          100: "#F6FFED",
          300: "#B7EB8F",
        },
        body: "#F7F9FA",
        danger: "#FF4D4F",
        warning: "#FAAD14",
        divider: "rgba(0,0,0,0.06)",
      },
      boxShadow: {
        main: "0px 2px 0px 0px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;

