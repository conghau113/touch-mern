/** @type {import('tailwindcss').Config} */
const defaultTheme = require('./node_modules/tailwindcss/defaultTheme');

const minHeight = {
  ...defaultTheme.spacing,
};

const maxWidth = {
  ...defaultTheme.spacing,
};

const fontFamily = {
  inter: ['Inter', ...defaultTheme.fontFamily.sans],
};

export default {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        ...minHeight,
      },
      maxWidth: {
        ...maxWidth,
      },
      fontFamily: {
        ...fontFamily,
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
  container: {
    center: true,
  },
  plugins: [],
};
