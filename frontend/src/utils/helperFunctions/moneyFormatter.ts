export const moneyFormatter = Intl.NumberFormat('sv-SE', {
  currency: 'SEK',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
  minimumIntegerDigits: 1,
});
