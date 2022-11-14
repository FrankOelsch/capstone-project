import "@testing-library/jest-dom";

import { getLocaleStringFromNumber, getSquareMeters } from "./helper";

describe("Check getLocaleStringFromNumber", () => {
  test("with null", async () => {
    let number = null;
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });

  test("with undefined", async () => {
    let number = undefined;
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });

  test("with string/NaN", async () => {
    let number = "blub";
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });

  test("with empty string", async () => {
    let number = "";
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });

  test("with integer", async () => {
    let number = 123456789;
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("123.456.789,00");
  });

  test("with float", async () => {
    let number = 12345.6789;
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("12.345,68");
  });

  test("with negative float", async () => {
    let number = -2345.123;
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("-2.345,12");
  });

  test("with percent", async () => {
    let number = "100%";
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });

  test("with currency", async () => {
    let number = "123.45 €";
    let formattedNumber = getLocaleStringFromNumber(number);

    expect(formattedNumber).toEqual("0,00");
  });
});

describe("Check getSquareMeters", () => {
  test("with NaN", async () => {
    let number1 = "abc";
    let number2 = null;
    let squareMeters = getSquareMeters(number1, number2);

    expect(squareMeters).toEqual(0);
  });

  test("with negative number", async () => {
    let number1 = 123;
    let number2 = -456;
    let squareMeters = getSquareMeters(number1, number2);

    expect(squareMeters).toEqual(0);
  });
});
