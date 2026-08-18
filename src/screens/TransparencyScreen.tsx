import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ShieldCheck, CheckCircle2, Award, Landmark } from 'lucide-react-native';
import { Header } from '../components/Header';
import { TransparencyDocCard } from '../components/transparency/TransparencyDocCard';
import { dal } from '../lib/dal';
import { TransparencyDoc } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS, NGO_CONFIG } from '../config/constants';

export const TransparencyScreen: React.FC = () => {
  const { t } = useLanguage();
  const [docs, setDocs] = useState<TransparencyDoc[]>([]);

  useEffect(() => {
    dal.getTransparencyDocs().then(setDocs);
  }, []);

  return (
    <View style={styles.screen}>
      <Header title={t('transparency')} />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 100% Direct Model Hero */}
        <View style={styles.modelCard}>
          <View style={styles.iconCircle}>
            <ShieldCheck size={32} color="#15803d" />
          </View>
          <Text style={styles.modelTitle}>{t('zeroPercentFeeTitle')}</Text>
          <Text style={styles.modelDesc}>{t('zeroPercentFeeDesc')}</Text>

          <View style={styles.commitmentsList}>
            <View style={styles.commitmentItem}>
              <CheckCircle2 size={16} color="#15803d" />
              <Text style={styles.commitmentText}>
                Comptes audités annuellement par un cabinet indépendant agréé.
              </Text>
            </View>
            <View style={styles.commitmentItem}>
              <CheckCircle2 size={16} color="#15803d" />
              <Text style={styles.commitmentText}>
                Devis hospitaliers publiés en toute transparence pour chaque enfant.
              </Text>
            </View>
            <View style={styles.commitmentItem}>
              <CheckCircle2 size={16} color="#15803d" />
              <Text style={styles.commitmentText}>
                Paiement direct aux hôpitaux partenaires (sans intermédiaire).
              </Text>
            </View>
          </View>
        </View>

        {/* Official Accreditations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('registrationDetailsTitle')}</Text>

          <View style={styles.accreditationCard}>
            <View style={styles.accIconWrap}>
              <Award size={20} color={THEME_COLORS.primary} />
            </View>
            <View style={styles.accContent}>
              <Text style={styles.accTitle}>Enregistrement Officiel ONG</Text>
              <Text style={styles.accValue}>Matricule : {NGO_CONFIG.registrationNumber}</Text>
              <Text style={styles.accSub}>Registrar of Associations of Mauritius</Text>
            </View>
          </View>

          <View style={styles.accreditationCard}>
            <View style={styles.accIconWrap}>
              <Landmark size={20} color={THEME_COLORS.accent} />
            </View>
            <View style={styles.accContent}>
              <Text style={styles.accTitle}>Agrément Fiscal MRA Section 50L</Text>
              <Text style={styles.accValue}>100% Déductible d’impôt</Text>
              <Text style={styles.accSub}>Mauritius Revenue Authority</Text>
            </View>
          </View>
        </View>

        {/* Audited Financial Statements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('auditedReportsTitle')}</Text>
          {docs.map((doc, idx) => (
            <TransparencyDocCard key={idx} doc={doc} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: THEME_COLORS.surface,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  modelCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modelTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME_COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  modelDesc: {
    fontSize: 13,
    color: THEME_COLORS.textSecondary,
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 16,
  },
  commitmentsList: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 12,
    gap: 10,
  },
  commitmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  commitmentText: {
    fontSize: 12,
    color: THEME_COLORS.textPrimary,
    fontWeight: '600',
    flex: 1,
    lineHeight: 16,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  accreditationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  accIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accContent: {
    flex: 1,
  },
  accTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  accValue: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.primaryDark,
    marginTop: 1,
  },
  accSub: {
    fontSize: 11,
    color: THEME_COLORS.textSecondary,
    marginTop: 1,
  },
});
