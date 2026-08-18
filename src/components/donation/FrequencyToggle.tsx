import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME_COLORS } from '../../config/constants';
import { useLanguage } from '../../context/LanguageContext';
import { triggerLightHaptic } from '../../utils/haptics';

interface FrequencyToggleProps {
  frequency: 'once' | 'monthly';
  onSelectFrequency: (freq: 'once' | 'monthly') => void;
}

export const FrequencyToggle: React.FC<FrequencyToggleProps> = ({
  frequency,
  onSelectFrequency,
}) => {
  const { t } = useLanguage();

  const handleSelect = (freq: 'once' | 'monthly') => {
    triggerLightHaptic();
    onSelectFrequency(freq);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, frequency === 'once' && styles.selectedButton]}
        onPress={() => handleSelect('once')}
        activeOpacity={0.7}
      >
        <Text style={[styles.text, frequency === 'once' && styles.selectedText]}>
          {t('oneTime')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, frequency === 'monthly' && styles.selectedButton]}
        onPress={() => handleSelect('monthly')}
        activeOpacity={0.7}
      >
        <Text style={[styles.text, frequency === 'monthly' && styles.selectedText]}>
          {t('monthly')} ❤️
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME_COLORS.textSecondary,
  },
  selectedText: {
    color: THEME_COLORS.textPrimary,
    fontWeight: '800',
  },
});
