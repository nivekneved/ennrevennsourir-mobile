/**
 * Currency and date formatting utilities for Enn Rev Enn Sourir mobile app
 */

export function formatCurrency(amount: number, currency: string = 'MUR'): string {
  if (currency === 'MUR') {
    return `Rs ${Math.round(amount).toLocaleString('fr-MU')}`;
  }
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };
  const symbol = symbols[currency] || currency;
  return `${symbol}${amount.toLocaleString('en-US')}`;
}

export function formatMillions(amount: number): string {
  return `${(amount / 1000000).toFixed(1)}M`;
}

export function formatPercentage(raised: number, target: number): number {
  if (!target || target <= 0) return 0;
  return Math.min(Math.round((raised / target) * 100), 100);
}
