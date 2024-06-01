/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {},
    fontFamily: {
      nanumEB: ["nanumEB"],
      nanumB: ["nanumB"],
      nanum: ["namnum"],
    },
  },
  plugins: [],
};
