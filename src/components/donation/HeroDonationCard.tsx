import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react-native';
import { THEME_COLORS } from '../../config/constants';
import { useLanguage } from '../../context/LanguageContext';
import { useDonation } from '../../context/DonationContext';
import { CurrencySelector } from './CurrencySelector';
import { AmountSelector } from './AmountSelector';
import { FrequencyToggle } from './FrequencyToggle';
import { TaxReliefBanner } from './TaxReliefBanner';

export const HeroDonationCard: React.FC = () => {
  const { t } = useLanguage();
  const {
    donationAmount,
    donationCurrency,
    donationFrequency,
    setDonationAmount,
    setDonationCurrency,
    setDonationFrequency,
    openDonationModal,
  } = useDonation();

  const handleDonatePress = () => {
    openDonationModal(null, donationAmount, donationFrequency);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <View style={styles.liveBadge}>
            <Sparkles size={12} color="#ffffff" />
            <Text style={styles.liveBadgeText}>DON SÉCURISÉ</Text>
          </View>
          <View style={styles.taxBadge}>
            <ShieldCheck size={12} color="#15803d" />
            <Text style={styles.taxBadgeText}>MRA 100% Déductible</Text>
          </View>
        </View>

        <Text style={styles.title}>{t('heroTitle')}</Text>
        <Text style={styles.subtitle}>{t('heroSubtitle')}</Text>
      </View>

      <View style={styles.formSection}>
        <FrequencyToggle
          frequency={donationFrequency}
          onSelectFrequency={setDonationFrequency}
        />

        <CurrencySelector
          selectedCurrency={donationCurrency}
          onSelect={setDonationCurrency}
        />

        <AmountSelector
          currency={donationCurrency}
          selectedAmount={donationAmount}
          onSelectAmount={setDonationAmount}
        />

        <TaxReliefBanner
          amount={donationAmount}
          currency={donationCurrency}
        />

        <TouchableOpacity
          style={styles.donateButton}
          onPress={handleDonatePress}
          activeOpacity={0.85}
        >
          <Heart size={18} color="#ffffff" fill="#ffffff" />
          <Text style={styles.donateButtonText}>{t('heroDonateCta')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: -20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  header: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  liveBadge: {
    backgroundColor: THEME_COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  liveBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  taxBadge: {
    backgroundColor: '#dcfce7',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  taxBadgeText: {
    color: '#15803d',
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: THEME_COLORS.textSecondary,
    lineHeight: 18,
  },
  formSection: {
    gap: 12,
  },
  donateButton: {
    backgroundColor: THEME_COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: THEME_COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 4,
  },
  donateButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
