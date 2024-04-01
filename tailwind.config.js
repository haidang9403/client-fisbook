/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',

  ],
  theme: {
    extend: {},
    screens: {
      'sm': '567px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1440px',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

