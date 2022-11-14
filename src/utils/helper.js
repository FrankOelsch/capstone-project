export function getLocaleStringFromNumber(number) {
  if (!number || isNaN(number)) {
    return "0,00";
  } else {
    return (+number).toLocaleString("de", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }
}

export function getSquareMeters(number1, number2) {
  if (!number1 || !number2 || isNaN(number1) || isNaN(number2)) {
    return 0;
  } else {
    let squareMeters = (+number1 * +number2) / 10000;
    if (squareMeters < 0) {
      squareMeters = 0;
    }
    return squareMeters;
  }
}
