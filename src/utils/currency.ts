/**
 * Currency utilities for formatting, parsing, and masking
 */

export interface CurrencyConfig {
  symbol: string;
  decimalSeparator: string;
  thousandsSeparator: string;
  decimalPlaces: number;
  symbolPosition: 'before' | 'after';
}

export const DEFAULT_CURRENCY_CONFIG: CurrencyConfig = {
  symbol: '$',
  decimalSeparator: '.',
  thousandsSeparator: ',',
  decimalPlaces: 2,
  symbolPosition: 'before'
};

/**
 * Formats a number as currency string
 */
export const formatCurrency = (
  value: number,
  config: CurrencyConfig = DEFAULT_CURRENCY_CONFIG
): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return '';
  }

  const { symbol, decimalSeparator, thousandsSeparator, decimalPlaces, symbolPosition } = config;
  
  // Format number with decimal places
  const formattedNumber = value.toFixed(decimalPlaces);
  
  // Split integer and decimal parts
  const [integerPart, decimalPart] = formattedNumber.split('.');
  
  // Add thousands separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  
  // Combine parts
  const formattedValue = decimalPart 
    ? `${formattedInteger}${decimalSeparator}${decimalPart}`
    : formattedInteger;
  
  // Add currency symbol
  return symbolPosition === 'before' 
    ? `${symbol}${formattedValue}`
    : `${formattedValue}${symbol}`;
};

/**
 * Parses a currency string to number (in cents)
 */
export const parseCurrencyToCents = (
  value: string,
  config: CurrencyConfig = DEFAULT_CURRENCY_CONFIG
): number => {
  if (!value || value.trim() === '') {
    return 0;
  }

  const { symbol, decimalSeparator, thousandsSeparator } = config;
  
  // Remove currency symbol and whitespace
  let cleanValue = value.replace(new RegExp(`\\${symbol}`, 'g'), '').trim();
  
  // Remove thousands separators
  cleanValue = cleanValue.replace(new RegExp(`\\${thousandsSeparator}`, 'g'), '');
  
  // Replace decimal separator with standard dot
  cleanValue = cleanValue.replace(decimalSeparator, '.');
  
  // Parse to number
  const parsed = parseFloat(cleanValue);
  
  if (isNaN(parsed)) {
    return 0;
  }
  
  // Convert to cents
  return Math.round(parsed * 100);
};

/**
 * Parses a currency string to number (in dollars)
 */
export const parseCurrencyToDollars = (
  value: string,
  config: CurrencyConfig = DEFAULT_CURRENCY_CONFIG
): number => {
  return parseCurrencyToCents(value, config) / 100;
};

/**
 * Formats cents to currency string
 */
export const formatCentsToCurrency = (
  cents: number,
  config: CurrencyConfig = DEFAULT_CURRENCY_CONFIG
): string => {
  return formatCurrency(cents / 100, config);
};

/**
 * Applies currency masking to input value
 */
export const applyCurrencyMask = (
  value: string,
  config: CurrencyConfig = DEFAULT_CURRENCY_CONFIG
): string => {
  if (!value) return '';
  
  const { symbol, decimalSeparator, thousandsSeparator, decimalPlaces } = config;
  
  // Remove all non-numeric characters except decimal separator
  let cleanValue = value.replace(/[^\d.]/g, '');
  
  // Ensure only one decimal separator
  const decimalParts = cleanValue.split('.');
  if (decimalParts.length > 2) {
    cleanValue = decimalParts[0] + '.' + decimalParts.slice(1).join('');
  }
  
  // Limit decimal places
  if (decimalParts.length === 2) {
    cleanValue = decimalParts[0] + '.' + decimalParts[1].substring(0, decimalPlaces);
  }
  
  // Parse to number to format properly
  const numValue = parseFloat(cleanValue);
  if (isNaN(numValue)) {
    return '';
  }
  
  // Format with thousands separators
  const formattedNumber = numValue.toFixed(decimalPlaces);
  const [integerPart, decimalPart] = formattedNumber.split('.');
  
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  const formattedValue = decimalPart 
    ? `${formattedInteger}${decimalSeparator}${decimalPart}`
    : formattedInteger;
  
  return `${symbol}${formattedValue}`;
};

/**
 * Removes currency mask from input value
 */
export const removeCurrencyMask = (
  value: string,
  config: CurrencyConfig = DEFAULT_CURRENCY_CONFIG
): string => {
  if (!value) return '';
  
  const { symbol, decimalSeparator, thousandsSeparator } = config;
  
  // Remove currency symbol and thousands separators
  let cleanValue = value
    .replace(new RegExp(`\\${symbol}`, 'g'), '')
    .replace(new RegExp(`\\${thousandsSeparator}`, 'g'), '')
    .trim();
  
  // Ensure decimal separator is a dot
  cleanValue = cleanValue.replace(decimalSeparator, '.');
  
  return cleanValue;
};

/**
 * Validates if a string is a valid currency format
 */
export const isValidCurrency = (
  value: string,
  config: CurrencyConfig = DEFAULT_CURRENCY_CONFIG
): boolean => {
  if (!value || value.trim() === '') return true; // Empty is valid
  
  const cleanValue = removeCurrencyMask(value, config);
  const numValue = parseFloat(cleanValue);
  
  return !isNaN(numValue) && numValue >= 0;
};

/**
 * Gets the raw numeric value from a currency string
 */
export const getNumericValue = (
  value: string,
  config: CurrencyConfig = DEFAULT_CURRENCY_CONFIG
): number => {
  const cleanValue = removeCurrencyMask(value, config);
  const numValue = parseFloat(cleanValue);
  return isNaN(numValue) ? 0 : numValue;
};
