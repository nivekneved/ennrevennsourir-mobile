import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { MedicalCostItem } from '../../types';
import { THEME_COLORS } from '../../config/constants';
import { formatCurrency } from '../../utils/formatters';

interface MedicalCostBreakdownProps {
  items: MedicalCostItem[];
}

export const MedicalCostBreakdown: React.FC<MedicalCostBreakdownProps> = ({ items }) => {
  const total = items.reduce((sum, it) => sum + (it.cost || 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <ShieldCheck size={18} color={THEME_COLORS.primary} />
        <Text style={styles.title}>Transparence & Ventilation des Coûts</Text>
      </View>
      <Text style={styles.subtitle}>
        Devis hospitaliers vérifiés et audités par notre comité médical.
      </Text>

      <View style={styles.table}>
        {items.map((item, index) => (
          <View key={index} style={[styles.row, index % 2 === 1 && styles.alternateRow]}>
            <Text style={styles.itemText}>{item.item}</Text>
            <Text style={styles.costText}>{formatCurrency(item.cost, 'MUR')}</Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Requis :</Text>
          <Text style={styles.totalValue}>{formatCurrency(total, 'MUR')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    marginBottom: 12,
  },
  table: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  alternateRow: {
    backgroundColor: '#f8fafc',
  },
  itemText: {
    fontSize: 12,
    color: THEME_COLORS.textPrimary,
    flex: 1,
    paddingRight: 10,
  },
  costText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.darkNavy,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#ecfdf5',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME_COLORS.primaryDark,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '900',
    color: THEME_COLORS.primaryDark,
  },
});
