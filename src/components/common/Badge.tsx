import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME_COLORS } from '../../config/constants';

interface BadgeProps {
  label: string;
  variant?: 'urgent' | 'primary' | 'neutral' | 'accent' | 'success';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', icon }) => {
  const getColors = () => {
    switch (variant) {
      case 'urgent':
        return { bg: THEME_COLORS.accent, text: '#ffffff' };
      case 'primary':
        return { bg: THEME_COLORS.primaryLight, text: THEME_COLORS.primaryDark };
      case 'accent':
        return { bg: THEME_COLORS.accentLight, text: THEME_COLORS.accentDark };
      case 'success':
        return { bg: '#dcfce7', text: '#15803d' };
      case 'neutral':
      default:
        return { bg: 'rgba(15, 23, 42, 0.85)', text: '#ffffff' };
    }
  };

  const { bg, text } = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      {icon}
      <Text style={[styles.badgeText, { color: text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
