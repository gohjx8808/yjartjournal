export const formatPrice = (amount: number, currency: string) => {
  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return numberFormat.format(amount);
};

export const internationalPhoneNumberFormatter = (
  countryCode: number,
  phoneNumber: number
) => `+${countryCode} ${phoneNumber}`;

export const getProductVariationSuffix = (
  isKeyChainSeries: boolean,
  selectedItemVariation?: string
) => {
  let variationSuffix = "";
  if (isKeyChainSeries) {
    if (selectedItemVariation === "With Keychain") {
      variationSuffix = " (W)";
    } else {
      variationSuffix = " (N)";
    }
  }
  return variationSuffix;
};

export const compareString = (a: string, b: string) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

export const roundTo2Dp = (value: number) => Number(value.toFixed(2));

export const getLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(String(localStorage.getItem(key)));
    } catch (error) {
      return localStorage.getItem(key);
    }
  }
  return null;
};

export const generateHeader = (title: string) => `${title} | YJ Art Journal`;
