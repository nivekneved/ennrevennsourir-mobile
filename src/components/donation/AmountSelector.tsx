import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { PRESET_AMOUNTS, THEME_COLORS } from '../../config/constants';
import { triggerLightHaptic } from '../../utils/haptics';

interface AmountSelectorProps {
  currency: 'MUR' | 'EUR' | 'USD' | 'GBP';
  selectedAmount: number;
  onSelectAmount: (amount: number) => void;
}

export const AmountSelector: React.FC<AmountSelectorProps> = ({
  currency,
  selectedAmount,
  onSelectAmount,
}) => {
  const presets = PRESET_AMOUNTS[currency] || PRESET_AMOUNTS.MUR;
  const [customValue, setCustomValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    if (!presets.includes(selectedAmount)) {
      setIsCustom(true);
      setCustomValue(selectedAmount.toString());
    } else {
      setIsCustom(false);
    }
  }, [currency, selectedAmount]);

  const handlePresetPress = (amount: number) => {
    triggerLightHaptic();
    setIsCustom(false);
    setCustomValue('');
    onSelectAmount(amount);
  };

  const handleCustomChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setCustomValue(numeric);
    setIsCustom(true);
    const parsed = parseInt(numeric, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onSelectAmount(parsed);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.presetsGrid}>
        {presets.map((amount) => {
          const isSelected = !isCustom && selectedAmount === amount;
          return (
            <TouchableOpacity
              key={amount}
              style={[styles.amountButton, isSelected && styles.selectedAmountButton]}
              onPress={() => handlePresetPress(amount)}
              activeOpacity={0.75}
            >
              <Text style={[styles.amountText, isSelected && styles.selectedAmountText]}>
                {currency === 'MUR' ? `Rs ${amount}` : `${amount} ${currency}`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.customInputContainer, isCustom && styles.customInputFocused]}>
        <Text style={styles.currencyPrefix}>{currency === 'MUR' ? 'Rs' : currency}</Text>
        <TextInput
          style={styles.customInput}
          placeholder="Autre montant..."
          placeholderTextColor={THEME_COLORS.textMuted}
          keyboardType="numeric"
          value={customValue}
          onChangeText={handleCustomChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amountButton: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedAmountButton: {
    backgroundColor: THEME_COLORS.primaryLight,
    borderColor: THEME_COLORS.primary,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  selectedAmountText: {
    color: THEME_COLORS.primaryDark,
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    height: 48,
  },
  customInputFocused: {
    borderColor: THEME_COLORS.primary,
    backgroundColor: '#ffffff',
  },
  currencyPrefix: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME_COLORS.textSecondary,
    marginRight: 8,
  },
  customInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
});
