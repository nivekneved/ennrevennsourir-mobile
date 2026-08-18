import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, MapPin, Sparkles } from 'lucide-react-native';
import { SponsorshipProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useDonation } from '../context/DonationContext';
import { THEME_COLORS } from '../config/constants';

interface SponsorshipCardProps {
  profile: SponsorshipProfile;
}

export const SponsorshipCard: React.FC<SponsorshipCardProps> = ({ profile }) => {
  const { t } = useLanguage();
  const { openDonationModal } = useDonation();

  const progressPercent = Math.min(
    Math.round((profile.currentSponsors / (profile.targetSponsors || 1)) * 100),
    100
  );

  return (
    <View style={styles.card}>
      <Image source={{ uri: profile.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>
            {profile.childName}, {profile.age} {t('yearsOld')}
          </Text>
          <View style={styles.locationContainer}>
            <MapPin size={12} color={THEME_COLORS.textSecondary} />
            <Text style={styles.locationText}>{profile.location}</Text>
          </View>
        </View>

        <Text style={styles.condition}>{profile.condition}</Text>
        <Text style={styles.story} numberOfLines={3}>
          {profile.story}
        </Text>

        <View style={styles.monthlyNeedBox}>
          <Text style={styles.monthlyNeedLabel}>Besoin mensuel médical</Text>
          <Text style={styles.monthlyNeedAmount}>Rs {profile.monthlyNeed.toLocaleString('fr-MU')} / mois</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <View style={styles.sponsorsRow}>
            <Text style={styles.sponsorsText}>
              <Text style={styles.sponsorsBold}>{profile.currentSponsors}</Text> {t('sponsorsCount')}
            </Text>
            <Text style={styles.sponsorsText}>
              Objectif: <Text style={styles.sponsorsBold}>{profile.targetSponsors}</Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.sponsorButton}
          onPress={() => openDonationModal(null, 500, 'monthly')}
          activeOpacity={0.8}
        >
          <Sparkles size={16} color="#ffffff" />
          <Text style={styles.sponsorButtonText}>{t('monthlyPledge')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#cbd5e1',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locationText: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    fontWeight: '500',
  },
  condition: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME_COLORS.primary,
    marginBottom: 6,
  },
  story: {
    fontSize: 13,
    color: THEME_COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  monthlyNeedBox: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  monthlyNeedLabel: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    fontWeight: '600',
  },
  monthlyNeedAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  progressContainer: {
    marginBottom: 14,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: THEME_COLORS.primary,
    borderRadius: 3,
  },
  sponsorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sponsorsText: {
    fontSize: 11,
    color: THEME_COLORS.textSecondary,
  },
  sponsorsBold: {
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  sponsorButton: {
    backgroundColor: THEME_COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
  },
  sponsorButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});
