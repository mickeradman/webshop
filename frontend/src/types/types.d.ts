export type Theme = {
  color: {
    bodyBg: string;
    appBg: string;
    primary: string;
    secondary: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
    textInverted: string;

    borderPrimary: string;
    buttonHover: string;
    buttonBg: string;
    buttonBorder: string;
    buttonBorderHover: string;
    buttonDangerBg: string;
    buttonDangerBorder: string;
    cartCountChip: string;
    cartSummaryBg: string;
    delimiterPrimary: string;
    delimiterSecondary: string;
    disabledComponent: string;
    filterBg: string;
    headerFooterBg: string;
    hoverPrimary: string;
    hoverSecondary: string;
    inputBgFocus: string;
    inputBorder: string;
    inputBorderError: string;
    modalBg: string;
    navbarBg: string;
    navLinkActive: string;
    navLinkHover: string;
    negativeRed: string;
    negativeRedHover: string;
    positiveGreen: string;
    positiveGreenHover: string;
    productCardBg: string;
    productCardBgOnHover: string;
  };
};

export type Sizes = {
  size: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
};

export type Product = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  stockQty: number;
  imgPath: string;
  category: string;
};
