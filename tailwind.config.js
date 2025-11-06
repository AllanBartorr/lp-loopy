/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    // 🚨 COLOQUE ESTA LINHA: Ela escaneia todos os seus componentes na pasta 'src'.
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}