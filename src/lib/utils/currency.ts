/**
 * Currency formatting utilities for handling minor/major unit conversions
 */

/**
 * Convert minor units (cents) to major units (dollars) and format as currency
 * @param amountMinor - Amount in minor units as string (e.g., "1250" for $12.50)
 * @param currency - Currency code (e.g., "USD", "EUR")
 * @returns Formatted currency string
 */
export const formatCurrency = (amountMinor: string, currency: string): string => {
  const amount = parseInt(amountMinor) / 100; // Convert cents to dollars
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
};

/**
 * Convert major units (dollars) to minor units (cents)
 * @param amount - Amount in major units as number or string (e.g., 12.50)
 * @returns Amount in minor units as string (e.g., "1250")
 */
export const toMinorUnits = (amount: number | string): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return Math.round(numAmount * 100).toString();
};

/**
 * Convert minor units to major units as a number
 * @param amountMinor - Amount in minor units as string
 * @returns Amount in major units as number
 */
export const toMajorUnits = (amountMinor: string): number => {
  return parseInt(amountMinor) / 100;
};