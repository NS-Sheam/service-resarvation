/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00509d",
        darkPrimary: "#003f88",
        nevyBlue: "#00296b",
        orange: "#fdc500",
        warning: "#ffd500",
        gray: "#5f6c72",
        grayBlack: "#191C1F",
        grayWhite: "#E4E7E9",
        grayWhite2: "#F2F4F5",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
