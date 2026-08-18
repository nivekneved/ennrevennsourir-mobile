import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { THEME_COLORS } from '../../config/constants';
import { triggerLightHaptic } from '../../utils/haptics';

interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  count?: number;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  isSelected,
  onPress,
  count,
}) => {
  const handlePress = () => {
    triggerLightHaptic();
    onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.selectedChip]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
        {label}
      </Text>
      {count !== undefined && count > 0 && (
        <Text style={[styles.countText, isSelected && styles.selectedCountText]}>
          {count}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  selectedChip: {
    backgroundColor: THEME_COLORS.darkNavy,
    borderColor: THEME_COLORS.darkNavy,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME_COLORS.textSecondary,
  },
  selectedChipText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME_COLORS.textSecondary,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  selectedCountText: {
    color: THEME_COLORS.darkNavy,
    backgroundColor: '#ffffff',
  },
});
