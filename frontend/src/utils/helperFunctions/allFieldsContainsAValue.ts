export const allFieldsContainsAValue = (fields: {
  [key: string]: string | number;
}): boolean => {
  return Object.values(fields).every((value) => value !== '');
};
