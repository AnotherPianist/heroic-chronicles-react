/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html", "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Silkscreen', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

