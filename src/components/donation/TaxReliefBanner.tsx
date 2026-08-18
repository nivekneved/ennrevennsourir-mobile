import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { THEME_COLORS, NGO_CONFIG } from '../../config/constants';
import { calculateMraTaxBenefit } from '../../utils/tax';
import { formatCurrency } from '../../utils/formatters';

interface TaxReliefBannerProps {
  amount: number;
  currency: string;
}

export const TaxReliefBanner: React.FC<TaxReliefBannerProps> = ({ amount, currency }) => {
  const benefit = calculateMraTaxBenefit(amount);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <ShieldCheck size={18} color="#15803d" />
        <Text style={styles.title}>Déduction Fiscale MRA Section 50L</Text>
      </View>

      <Text style={styles.description}>
        Votre don est déductible à 100% de votre revenu imposable à Maurice (ONG Agréée {NGO_CONFIG.registrationNumber}).
      </Text>

      {currency === 'MUR' && amount > 0 && (
        <View style={styles.calculationRow}>
          <View style={styles.calcBox}>
            <Text style={styles.calcLabel}>Économie d’impôt estimée</Text>
            <Text style={styles.calcValue}>
              ~ {formatCurrency(benefit.estimatedTaxSavedIndividual, 'MUR')}
            </Text>
          </View>
          <View style={styles.calcBox}>
            <Text style={styles.calcLabel}>Coût net réel du don</Text>
            <Text style={styles.calcValueNet}>
              {formatCurrency(amount - benefit.estimatedTaxSavedIndividual, 'MUR')}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fdf4',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    gap: 6,
    marginVertical: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#15803d',
  },
  description: {
    fontSize: 11,
    color: '#166534',
    lineHeight: 16,
  },
  calculationRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  calcBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  calcLabel: {
    fontSize: 10,
    color: '#166534',
    fontWeight: '600',
  },
  calcValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#15803d',
    marginTop: 2,
  },
  calcValueNet: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    marginTop: 2,
  },
});
