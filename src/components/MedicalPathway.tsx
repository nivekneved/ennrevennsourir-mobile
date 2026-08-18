import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stethoscope, ShieldCheck, PlaneTakeoff, Smile } from 'lucide-react-native';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS } from '../config/constants';

export const MedicalPathway: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Stethoscope size={20} color={THEME_COLORS.primary} />,
      title: t('pathwayStep1'),
      desc: t('pathwayStep1Desc'),
    },
    {
      icon: <ShieldCheck size={20} color="#0284c7" />,
      title: t('pathwayStep2'),
      desc: t('pathwayStep2Desc'),
    },
    {
      icon: <PlaneTakeoff size={20} color={THEME_COLORS.accent} />,
      title: t('pathwayStep3'),
      desc: t('pathwayStep3Desc'),
    },
    {
      icon: <Smile size={20} color="#d97706" />,
      title: t('pathwayStep4'),
      desc: t('pathwayStep4Desc'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('pathwayTitle')}</Text>
      <View style={styles.stepsWrapper}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.stepIcon}>{step.icon}</View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
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
  stepsWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 16,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    lineHeight: 16,
  },
});
