/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['index.html', './src/**/*.{html,js}'], // Include any files that you want to apply the styles to
    theme: {
      extend: {
        fontFamily: {
          roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#262525",
        secondary: "#DFCE36",
        tertaiary: "#9B9A9A",   
      },
    },
    plugins: []
  },
};