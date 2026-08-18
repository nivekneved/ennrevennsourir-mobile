import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, Clock, Users, Flame, MapPin } from 'lucide-react-native';
import { Campaign } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useDonation } from '../context/DonationContext';
import { THEME_COLORS } from '../config/constants';

interface CampaignCardProps {
  campaign: Campaign;
  onPress: () => void;
  featured?: boolean;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onPress, featured = false }) => {
  const { lang, t } = useLanguage();
  const { openDonationModal } = useDonation();

  const title = lang === 'en' ? campaign.titleEn || campaign.titleFr : campaign.titleFr;
  const progressPercent = Math.min(Math.round((campaign.raisedAmount / (campaign.targetAmount || 1)) * 100), 100);

  const formatMur = (num: number) => {
    return 'Rs ' + num.toLocaleString('fr-MU');
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'child':
        return t('catChild');
      case 'cancer':
        return t('catCancer');
      case 'emergency':
        return t('catEmergency');
      case 'prosthetics':
        return t('catProsthetics');
      default:
        return category.toUpperCase();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, featured && styles.featuredCard]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: campaign.featuredImage || 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop' }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.badgeRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{getCategoryLabel(campaign.category)}</Text>
          </View>
          {campaign.isUrgent && (
            <View style={styles.urgentBadge}>
              <Flame size={12} color="#ffffff" />
              <Text style={styles.urgentBadgeText}>URGENCE</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.beneficiaryRow}>
          <Text style={styles.beneficiaryName}>
            {campaign.beneficiaryName}, {campaign.beneficiaryAge} {t('yearsOld')}
          </Text>
          <View style={styles.locationContainer}>
            <MapPin size={12} color={THEME_COLORS.textSecondary} />
            <Text style={styles.locationText}>{campaign.location}</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>

          <View style={styles.amountsRow}>
            <View>
              <Text style={styles.raisedAmount}>{formatMur(campaign.raisedAmount)}</Text>
              <Text style={styles.targetLabel}>
                {t('raisedOf')} {formatMur(campaign.targetAmount)}
              </Text>
            </View>
            <View style={styles.percentBadge}>
              <Text style={styles.percentText}>{progressPercent}%</Text>
            </View>
          </View>
        </View>

        {/* Footer Meta & Donate CTA */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Users size={14} color={THEME_COLORS.textSecondary} />
            <Text style={styles.metaText}>
              {campaign.donorCount} {t('donors')}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color={THEME_COLORS.textSecondary} />
            <Text style={styles.metaText}>
              {campaign.daysLeft} {t('daysRemaining')}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => openDonationModal(campaign)}
          activeOpacity={0.8}
        >
          <Heart size={16} color="#ffffff" fill="#ffffff" />
          <Text style={styles.donateButtonText}>{t('supportChild')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  featuredCard: {
    borderColor: THEME_COLORS.accentLight,
    borderWidth: 1.5,
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
    backgroundColor: '#cbd5e1',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  urgentBadge: {
    backgroundColor: THEME_COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  urgentBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  content: {
    padding: 16,
  },
  beneficiaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  beneficiaryName: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME_COLORS.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locationText: {
    fontSize: 11,
    color: THEME_COLORS.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    lineHeight: 22,
    marginBottom: 12,
  },
  progressSection: {
    marginVertical: 4,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: THEME_COLORS.primary,
    borderRadius: 4,
  },
  amountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  raisedAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  targetLabel: {
    fontSize: 11,
    color: THEME_COLORS.textSecondary,
    marginTop: 1,
  },
  percentBadge: {
    backgroundColor: THEME_COLORS.primaryLight,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  percentText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME_COLORS.primaryDark,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    fontWeight: '600',
  },
  donateButton: {
    backgroundColor: THEME_COLORS.accent,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 4,
  },
  donateButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});
