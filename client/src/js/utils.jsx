export const formatAsCurrency = (number) => {
  if (number === '' || number === null || number === undefined) {
    number = 0;
  }
  return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export const calcTotalValue = (array, obj, property)  => {
  return array.map((i) => obj[i][property]).reduce((a,b) => a + b);
}

export const sanitizeNumber = (string) => {
  if (string === '' || string === null || string === undefined) {
    string = '0';
  }
  return parseInt(string.replace(/[\D]/g, ''));
}

