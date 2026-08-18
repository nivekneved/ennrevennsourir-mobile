/**
 * Mauritian Revenue Authority (MRA) Section 50L Tax Relief Calculation
 * Computes allowable income tax deduction for individuals and corporations.
 */

export interface MraTaxBenefit {
  donationAmount: number;
  allowableDeduction: number;
  estimatedTaxSavedIndividual: number; // Avg 15% - 20% bracket
  estimatedTaxSavedCorporate: number; // 15% Corporate Tax
}

export function calculateMraTaxBenefit(amount: number): MraTaxBenefit {
  const donationAmount = Math.max(0, Number(amount) || 0);
  const allowableDeduction = donationAmount; // 100% deduction under Section 50L
  const estimatedTaxSavedIndividual = Math.round(donationAmount * 0.15); // Standard 15% tax bracket in Mauritius
  const estimatedTaxSavedCorporate = Math.round(donationAmount * 0.15); // 15% corporate income tax

  return {
    donationAmount,
    allowableDeduction,
    estimatedTaxSavedIndividual,
    estimatedTaxSavedCorporate,
  };
}
