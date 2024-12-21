export function maskDate(value: string) {
  const numericValue = value.replace(/\D/g, '');

  let formattedDate = '';
  if (numericValue.length > 0) {
    formattedDate = numericValue.slice(0, 2);
    if (numericValue.length >= 3) {
      formattedDate += '/' + numericValue.slice(2, 4);
    }
    if (numericValue.length >= 5) {
      formattedDate += '/' + numericValue.slice(4, 8);
    }
  }
  return formattedDate;
}