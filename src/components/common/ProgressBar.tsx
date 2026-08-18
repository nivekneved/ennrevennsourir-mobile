import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { THEME_COLORS } from '../../config/constants';

interface ProgressBarProps {
  percentage: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  height = 8,
  color = THEME_COLORS.primary,
  backgroundColor = '#f1f5f9',
  style,
}) => {
  const clamped = Math.min(Math.max(percentage, 0), 100);

  return (
    <View style={[styles.background, { height, backgroundColor }, style]}>
      <View style={[styles.fill, { width: `${clamped}%`, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});
