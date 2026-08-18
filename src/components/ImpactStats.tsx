import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart, Activity, Users, ShieldCheck } from 'lucide-react-native';
import { ImpactMetrics } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS } from '../config/constants';

interface ImpactStatsProps {
  metrics: ImpactMetrics;
}

export const ImpactStats: React.FC<ImpactStatsProps> = ({ metrics }) => {
  const { t } = useLanguage();

  const formattedMur = (metrics.totalRaisedMur / 1000000).toFixed(1) + 'M';

  const stats = [
    {
      icon: <Activity size={20} color={THEME_COLORS.primary} />,
      value: `Rs ${formattedMur}`,
      label: t('totalRaised'),
      bgColor: '#ecfdf5',
    },
    {
      icon: <Heart size={20} color={THEME_COLORS.accent} />,
      value: `${metrics.childrenSaved}+`,
      label: t('childrenSaved'),
      bgColor: '#fff1f2',
    },
    {
      icon: <ShieldCheck size={20} color="#0284c7" />,
      value: `${metrics.surgeriesFunded}`,
      label: t('surgeriesFunded'),
      bgColor: '#f0f9ff',
    },
    {
      icon: <Users size={20} color="#d97706" />,
      value: `${metrics.activeVolunteers}`,
      label: t('activeVolunteers'),
      bgColor: '#fffbeb',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('impactTitle')}</Text>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.card, { backgroundColor: stat.bgColor }]}>
            <View style={styles.iconContainer}>{stat.icon}</View>
            <Text style={styles.valueText}>{stat.value}</Text>
            <Text style={styles.labelText}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '48%',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  iconContainer: {
    marginBottom: 8,
  },
  valueText: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME_COLORS.textSecondary,
    marginTop: 2,
  },
});
