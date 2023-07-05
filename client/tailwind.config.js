/** @type {import('tailwindcss').Config} */
const defaultTheme = require('./node_modules/tailwindcss/defaultTheme');

const colors = {
  accent: {
    1: '#111',
    2: '#222',
    3: '#333',
    4: '#444',
    5: '#555',
    6: '#666',
    7: '#777',
    8: '#888',
    9: '#999',
  },
  black: {
    1: '#000000',
    2: '#242424',
    3: '#202020',
    4: '#262626',
    5: '#282828',
    6: '#2f2f2f',
    7: '#000000e0',
    8: '#00000099',
    9: '#000000cc',
    10: '#000000b3',
    11: '#000000e6',
  },
  light: {
    1: '#aeaeae',
    2: '#c7c7c7',
    3: '#d1d1d1',
    5: '#eaeaea',
    6: '#e5e5e5',
    7: '#fafafa',
    8: '#f2f2f2',
    9: '#f1f1f1',
    10: '#f9f9f9',
    11: '#F3F3F3',
    12: '#B3B3B3',
    13: '#f0f2f5',
    14: '#D9D9D9',
    15: '#FCFCFC',
    16: '#7a7a7a',
    17: '#F2F5F8',
    18: '#F9FAFB',
    19: '#F5F5F5',
    20: '#EBEFF5',
    21: '#ACACAC',
  },
  dark: {
    1: '#636363',
    2: '#484848',
    3: '#3a3a3a',
    6: '#595959',
    7: '#8C8C8C',
    8: '#BFBFBF',
    9: '#E8E8E8',
    10: '#404040',
    11: '#39496099',
    12: '#00000066',
  },
  blue: {
    1: '#150A5A',
    2: '#341AD2',
    3: '#4155A5',
    4: '#E6F4FF',
    5: '#1979FF',
    6: '#1677FF',
    7: '#69b1FF',
    8: '#00204D',
    9: '#E8E8E8',
    10: '#f3feff',
    11: '#464FEB',
    12: '#EDEDFD',
    13: '#366AE2',
    14: '#799CEC',
    15: '#00358033',
    16: '#00358014',
    17: '#394960',
    18: '#CCD7E6',
    19: '#003580',
    20: '#D3DCE9',
  },
  orange: {
    1: '#FA8C16',
    3: '#ffab6e',
    4: '#FFF7E6',
    5: '#F3EDE9',
    6: '#FFC69D',
    7: '#FFF6EF',
    8: '#F5EBEB',
    9: '#FFA940',
    10: '#FFA582',
    11: '#FE7C5B',
    12: '#FC6B03',
    13: '#FFEDE1',
  },
  purple: {
    1: '#943CDD',
    3: '#F3F5FF',
    4: '#C8CBF9',
    5: '#B87DE8',
    6: '#D3AFF1',
  },
  green: {
    1: '#b3ebc5',
    2: '#b7eb8f',
    3: '#52c41a',
    4: '#2EB553',
    5: '#F6FFED',
    6: '#39AC6D',
    7: '#E8F7EF',
    8: '#eaffea',
    9: '#3AAC6D',
  },
  yellow: {
    1: '#ffc53d',
    2: '#fffeec',
  },
  scrollbar: {
    hover: 'rgb(153, 149, 149)',
    pure: 'rgba(233, 228, 228, 0.807)',
  },
  none: {
    0: 'none',
  },
  red: {
    1: '#FFA39E',
    2: '#FFF1F0',
    3: '#ff4d4f',
    4: '#F5222D',
    5: '#E14337',
    6: '#FCEEED',
    7: '#fff9f8',
  },
};

const minHeight = {
  ...defaultTheme.spacing,
};

const minWidth = {
  ...defaultTheme.spacing,
};

const maxWidth = {
  ...defaultTheme.spacing,
};

// const backgroundImage = {
//   login: 'url("./assets/images/png/login-background.png")',
//   'coming-soon': 'url("./assets/images/png/coming-soon.png")',
//   home: 'url("./assets/images/png/home-background.png")',
// }

const fontFamily = {
  inter: ['Inter', ...defaultTheme.fontFamily.sans],
};

module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      minHeight: {
        ...minHeight,
      },
      maxWidth: {
        ...maxWidth,
      },
      minWidth: {
        ...minWidth,
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
