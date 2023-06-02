/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      backgroundImage: () => ({
        weather: "url('../images/weather.png')",
      }),
    },
  },
  plugins: [],
};
