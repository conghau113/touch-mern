import { type ThemeConfig } from 'antd/es/config-provider/context';

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
