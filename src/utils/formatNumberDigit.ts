import { isNil, isNumber } from "lodash";

export const numberWithCommas = (value: any) => {
  if (value === undefined || value === null) return value;

  const stringValue = value?.toString();

  if (stringValue.includes(".")) {
    const [integerPart, decimalPart] = stringValue.split(".");
    const formattedValue = `${integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    )}.${decimalPart}`;
    return formattedValue;
  }

  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatNumberDigit = (number: string | number, digit?: number) => {
  if (number === null || isNil(number)) return number;

  digit = digit ?? 2;
  number = Number(number)?.toFixed(digit);

  return numberWithCommas(number);
};
