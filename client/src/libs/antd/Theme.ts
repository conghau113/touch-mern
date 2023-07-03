import { type ThemeConfig } from 'antd/es/config-provider/context';

export const colorTokens = {
  grey: {
    0: '#FFFFFF',
    10: '#F6F6F6',
    50: '#F0F0F0',
    100: '#E0E0E0',
    200: '#C2C2C2',
    300: '#A3A3A3',
    400: '#858585',
    500: '#666666',
    600: '#4D4D4D',
    700: '#333333',
    800: '#1A1A1A',
    900: '#0A0A0A',
    1000: '#000000',
  },
  primary: {
    50: '#E6FBFF',
    100: '#CCF7FE',
    200: '#99EEFD',
    300: '#66E6FC',
    400: '#33DDFB',
    500: '#00D5FA',
    600: '#00A0BC',
    700: '#006B7D',
    800: '#00353F',
    900: '#001519',
  },
};

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#341AD2',
  },
  components: {
    Typography: {},
    Anchor: {},
    Menu: {},
    Tree: {},
    Divider: {
      marginXXS: 0,
      marginXS: 0,
      marginSM: 0,
      marginMD: 0,
      marginLG: 0,
      marginXL: 0,
      marginXXL: 0,
      margin: 0,
    },
    Input: {
      borderRadius: 8,
    },
    Button: {
      borderRadius: 8,
    },
    Checkbox: {
      colorPrimary: '#FFC69D',
      colorPrimaryHover: '#FFC69D',
      colorWhite: '#341AD2',
      borderRadius: 8,
    },
    Select: {
      borderRadius: 8,
    },
  },
};

export default theme;
