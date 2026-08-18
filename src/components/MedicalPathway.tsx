import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PhoneCall, ShieldCheck, CheckCircle2, HeartHandshake, Smile } from 'lucide-react-native';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS } from '../config/constants';

export const MedicalPathway: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: '1',
      icon: <PhoneCall size={18} color="#0288D1" />,
      tag: 'Écoute Médicale',
      tagColor: '#e0f2fe',
      textColor: '#0288D1',
      title: t('pathwayStep1'),
      desc: t('pathwayStep1Desc'),
    },
    {
      number: '2',
      icon: <ShieldCheck size={18} color="#0d9488" />,
      tag: 'Audit Clinique',
      tagColor: '#ccfbf1',
      textColor: '#0d9488',
      title: t('pathwayStep2'),
      desc: t('pathwayStep2Desc'),
    },
    {
      number: '3',
      icon: <CheckCircle2 size={18} color="#7c3aed" />,
      tag: 'Comité Médical',
      tagColor: '#f3e8ff',
      textColor: '#7c3aed',
      title: t('pathwayStep3'),
      desc: t('pathwayStep3Desc'),
    },
    {
      number: '4',
      icon: <HeartHandshake size={18} color={THEME_COLORS.primary} />,
      tag: 'Collecte & MRA 15%',
      tagColor: '#fdf2f8',
      textColor: THEME_COLORS.primary,
      title: t('pathwayStep4'),
      desc: t('pathwayStep4Desc'),
    },
    {
      number: '5',
      icon: <Smile size={18} color="#059669" />,
      tag: 'Guérison Complète',
      tagColor: '#d1fae5',
      textColor: '#059669',
      title: t('pathwayStep5'),
      desc: t('pathwayStep5Desc'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PROTOCOLE MÉDICAL</Text>
        </View>
        <Text style={styles.sectionTitle}>{t('pathwayTitle')}</Text>
      </View>

      <View style={styles.stepsWrapper}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.stepHeaderRow}>
              <View style={styles.stepNumberBadge}>
                <Text style={styles.stepNumberText}>{step.number}</Text>
              </View>
              <View style={[styles.tagBadge, { backgroundColor: step.tagColor }]}>
                <Text style={[styles.tagText, { color: step.textColor }]}>{step.tag}</Text>
              </View>
            </View>

            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDesc}>{step.desc}</Text>
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
  header: {
    marginBottom: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  stepsWrapper: {
    gap: 12,
  },
  stepCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stepNumberBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: THEME_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#ffffff',
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    lineHeight: 17,
  },
});
