const formatAsCurrency = (number) => {
  return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}


exports.formatAsCurrency = formatAsCurrency;

