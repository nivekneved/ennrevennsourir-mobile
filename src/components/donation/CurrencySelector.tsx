import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME_COLORS } from '../../config/constants';
import { triggerLightHaptic } from '../../utils/haptics';

interface CurrencySelectorProps {
  selectedCurrency: 'MUR' | 'EUR' | 'USD' | 'GBP';
  onSelect: (currency: 'MUR' | 'EUR' | 'USD' | 'GBP') => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onSelect,
}) => {
  const currencies: ('MUR' | 'EUR' | 'USD' | 'GBP')[] = ['MUR', 'EUR', 'USD', 'GBP'];

  const handleSelect = (curr: 'MUR' | 'EUR' | 'USD' | 'GBP') => {
    triggerLightHaptic();
    onSelect(curr);
  };

  return (
    <View style={styles.container}>
      {currencies.map((curr) => {
        const isSelected = selectedCurrency === curr;
        return (
          <TouchableOpacity
            key={curr}
            style={[styles.pill, isSelected && styles.selectedPill]}
            onPress={() => handleSelect(curr)}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, isSelected && styles.selectedText]}>
              {curr}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  pill: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  selectedPill: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.textSecondary,
  },
  selectedText: {
    color: THEME_COLORS.textPrimary,
    fontWeight: '800',
  },
});
