export function getLocaleString(number) {
  if (isNaN(number)) {
    return "NaN";
  } else {
    return number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }
}
