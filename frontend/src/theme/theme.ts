import { Theme, Sizes } from '../types/types';
import palette from './palette';

const lightMode: Theme = {
  color: {
    bodyBg: '#fffcf7',
    appBg: '#fefefe',
    primary: palette.soilScale[500],
    secondary: palette.greeneryScale[500],
    accent: palette.skyScale[400],
    textPrimary: '#000000 ',
    textSecondary: '#FFFFFF', // Ändra denna till en mörkare grå färg
    textInverted: '#FFFFFF',

    borderPrimary: palette.soilScale[300],
    buttonBg: 'linear-gradient(135deg, #dceaff, #acceff)',
    buttonBorder: '#c8deff',
    buttonBorderHover: '#6ca9ff',
    buttonDangerBg: 'linear-gradient(135deg, #ff9a9e, #ff6a6a)',
    buttonDangerBorder: '#ff6a6a',
    buttonHover: palette.greeneryScale[400],
    cartCountChip: '#6DD76D',
    cartSummaryBg: '#BAEBC4',
    delimiterPrimary: palette.soilScale[600],
    delimiterSecondary: '#BDBDBD',
    disabledComponent: '#9E9E9E',
    filterBg: 'rgba(239, 239, 239, 1)',
    headerFooterBg: '#D7FEE5',
    hoverPrimary: palette.sunshineScale[700],
    hoverSecondary: '#CC5035',
    inputBgFocus: 'rgba(211, 237, 255, 0.4)',
    inputBorder: '#3b3b3b',
    inputBorderError: '#3b3b3b',
    modalBg: '#F5F5F5',
    navbarBg: '#FFFFFF',
    navLinkActive: '#000000',
    navLinkHover: '#9E9E9E',
    negativeRed: '#D8000C',
    negativeRedHover: '#FD9494',
    positiveGreen: '#00b000',
    positiveGreenHover: '#94FD94',
    productCardBg: '#F6F6F6',
    productCardBgOnHover: '#E8E8E8',
  },
};

const darkMode: Theme = {
  color: {
    bodyBg: '#121212',
    appBg: '#171717',
    primary: '#BB86FC',
    secondary: '#03DAC6',
    accent: '#82B1FF',
    textPrimary: '#E0E0E0',
    textSecondary: '#B0B0B0',
    textInverted: '#000000',

    borderPrimary: '#333333',
    buttonBg: 'linear-gradient(45deg, #3f8fff, #100e88)',
    buttonBorder: '#3f8fff',
    buttonBorderHover: '#3f8fff',
    buttonDangerBg: 'linear-gradient(45deg, #ff6a6a, #ff9a9e)',
    buttonDangerBorder: '#ff6a6a',
    buttonHover: '#116476',
    cartCountChip: '#008000',
    cartSummaryBg: '#212121',
    delimiterPrimary: '#484848',
    delimiterSecondary: '#3E3E3E',
    disabledComponent: '#828282',
    filterBg: '#2F2E2D',
    headerFooterBg: '#56655f',
    hoverPrimary: '#D59100',
    hoverSecondary: '#02B5A5',
    inputBgFocus: 'rgba(0, 0, 0, 0.5)',
    inputBorder: '#bbc1ff',
    inputBorderError: '#727dfb',
    modalBg: '#171717',
    navbarBg: '#251F26',
    navLinkActive: '#E0E0E0',
    navLinkHover: '#929292',
    negativeRed: '#D8000C',
    negativeRedHover: '#FD9494',
    positiveGreen: '#008000',
    positiveGreenHover: '#94FD94',
    productCardBg: '#212121',
    productCardBgOnHover: '#31573D',
  },
};

const defaultTheme: Sizes = {
  size: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.5rem',
  },
};

const theme = {
  light: {
    ...lightMode,
    ...defaultTheme,
  },
  dark: {
    ...darkMode,
    ...defaultTheme,
  },
};

export default theme;
