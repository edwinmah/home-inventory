export const formatAsCurrency = (number) => {
  return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export const calcTotalValue = (array, obj, property)  => {
  return array.map((i) => obj[i][property]).reduce((a,b) => a + b);
}

export const sanitizeNumber = (string) => {
  if (string === '' || string === null || string === undefined) {
    string = '0';
  }
  return parseInt(string.replace(/[`_+-.,!@#$%^&*();\/|<>"']/g, ''));
}

