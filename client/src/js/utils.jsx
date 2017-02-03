const formatAsCurrency = (number) => {
  return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

const calcTotalValue = (array, obj, property)  => {
  return array.map((i) => obj[i][property]).reduce((a,b) => a + b);
}


exports.formatAsCurrency = formatAsCurrency;
exports.calcTotalValue   = calcTotalValue;

