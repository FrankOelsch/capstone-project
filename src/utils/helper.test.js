import "@testing-library/jest-dom";

import { getLocaleStringFromNumber, getSquareMeters } from "./helper";

describe("Check getLocaleStringFromNumber", () => {
  test("with null", () => {
    let number = null;
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });

  test("with undefined", () => {
    let number = undefined;
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });

  test("with string/NaN", () => {
    let number = "blub";
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });

  test("with empty string", () => {
    let number = "";
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });

  test("with integer", () => {
    let number = 123456789;
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("123.456.789,00");
  });

  test("with float", () => {
    let number = 12345.6789;
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("12.345,68");
  });

  test("with negative float", () => {
    let number = -2345.123;
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("-2.345,12");
  });

  test("with percent", () => {
    let number = "100%";
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });

  test("with currency", () => {
    let number = "123.45 €";
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });
});

describe("Check getSquareMeters", () => {
  test("with NaN", () => {
    let number1 = "hundert";
    let number2 = "11.11.2011";
    let squareMeters = getSquareMeters(number1, number2);

    expect(squareMeters).toEqual(0);
  });

  test("with undefined and null", () => {
    let number1 = undefined;
    let number2 = null;
    let squareMeters = getSquareMeters(number1, number2);

    expect(squareMeters).toEqual(0);
  });

  test("with negative number", () => {
    let number1 = 123;
    let number2 = -456;
    let squareMeters = getSquareMeters(number1, number2);

    expect(squareMeters).toEqual(0);
  });
});
