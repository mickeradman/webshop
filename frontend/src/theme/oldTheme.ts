import { Theme, Sizes } from '../types/types';

const lightMode: Theme = {
  color: {
    bgPrimary: '#FFFFFF',
    bgSecondary: '#FFF6F6',
    borderPrimary: '#1B172E',
    buttonBg: '#CBB3BA',
    cartCountChip: '#6DD76D',
    disabledComponent: '#9E9E9E',
    headerFooterBg: '#FFFFFF',
    iconHoverPrimary: '#D59100',
    modalBg: '#F5F5F5',
    navbarBg: '#FFFFFF',
    navLinkActive: '#000000',
    navLinkHover: '#9E9E9E',
    negativeRed: '#D8000C',
    negativeRedHover: '#FD9494',
    positiveGreen: '#008000',
    positiveGreenHover: '#94FD94',
    productCardBg: '#F6F6F6',
    productCardBgOnHover: '#E8E8E8',
    delimiterPrimary: '#5D5D5D',
    delimiterSecondary: '#BDBDBD',
    textPrimary: '#000000 ',
    textSecondary: '#FFFFFF',
  },
};

const darkMode: Theme = {
  color: {
    bgPrimary: '#181818',
    bgSecondary: '#3C3C3C',
    borderPrimary: '#4B535A',
    buttonBg: '#000000',
    cartCountChip: '#008000',
    disabledComponent: '#9E9E9E',
    headerFooterBg: '#181818',
    iconHoverPrimary: '#EBD322',
    modalBg: '#181818',
    navbarBg: '#251F26',
    navLinkActive: '#FFFFFF',
    navLinkHover: '#9E9E9E',
    negativeRed: '#D8000C',
    negativeRedHover: '#FD9494',
    positiveGreen: '#008000',
    positiveGreenHover: '#94FD94',
    productCardBg: '#181818',
    productCardBgOnHover: '#242424',
    delimiterPrimary: '#5D5D5D',
    delimiterSecondary: '#3E3E3E',
    textPrimary: '#FFFFFF',
    textSecondary: '#000000',
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
