import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ArrowLeft, Heart, MapPin, Building2, Clock, Users, Flame } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dal } from '../lib/dal';
import { Campaign } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useDonation } from '../context/DonationContext';
import { THEME_COLORS, NGO_CONFIG } from '../config/constants';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { ProgressBar } from '../components/common/ProgressBar';
import { ShareButton } from '../components/common/ShareButton';
import { MedicalCostBreakdown } from '../components/campaign/MedicalCostBreakdown';
import { UpdateTimelineItem } from '../components/campaign/UpdateTimelineItem';

export const CampaignDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { lang, t } = useLanguage();
  const { openDonationModal } = useDonation();

  const { slug } = route.params || {};
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dal.getCampaignBySlug(slug).then((data) => {
      setCampaign(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME_COLORS.primary} />
      </View>
    );
  }

  if (!campaign) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Combat introuvable</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const title = lang === 'en' ? campaign.titleEn || campaign.titleFr : campaign.titleFr;
  const story = lang === 'en' ? campaign.storyEn || campaign.storyFr : campaign.storyFr;
  const percent = formatPercentage(campaign.raisedAmount, campaign.targetAmount);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image & Floating Back Button */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: campaign.featuredImage || 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={[styles.floatingBackButton, { top: Math.max(insets.top, 16) }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ArrowLeft size={20} color="#ffffff" />
          </TouchableOpacity>

          {campaign.isUrgent && (
            <View style={[styles.urgentFloatingBadge, { top: Math.max(insets.top, 16) }]}>
              <Flame size={12} color="#ffffff" />
              <Text style={styles.urgentFloatingText}>URGENCE VITALE</Text>
            </View>
          )}
        </View>

        {/* Content Container */}
        <View style={styles.content}>
          {/* Header Info */}
          <Text style={styles.title}>{title}</Text>

          <View style={styles.beneficiaryBadgeRow}>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>
                {campaign.beneficiaryName}, {campaign.beneficiaryAge} {t('yearsOld')}
              </Text>
            </View>

            <View style={styles.metaBadgeNeutral}>
              <MapPin size={12} color={THEME_COLORS.textSecondary} />
              <Text style={styles.metaBadgeNeutralText}>{campaign.location}</Text>
            </View>
          </View>

          {/* Hospital Partner Info */}
          {campaign.hospital ? (
            <View style={styles.hospitalCard}>
              <Building2 size={16} color={THEME_COLORS.primary} />
              <View style={styles.hospitalTextWrap}>
                <Text style={styles.hospitalLabel}>{t('hospital')}</Text>
                <Text style={styles.hospitalName}>{campaign.hospital}</Text>
              </View>
            </View>
          ) : null}

          {/* Progress Card */}
          <View style={styles.progressCard}>
            <View style={styles.amountsRow}>
              <View>
                <Text style={styles.raisedValue}>{formatCurrency(campaign.raisedAmount, 'MUR')}</Text>
                <Text style={styles.targetLabel}>
                  {t('raisedOf')} {formatCurrency(campaign.targetAmount, 'MUR')}
                </Text>
              </View>
              <View style={styles.percentBadge}>
                <Text style={styles.percentText}>{percent}%</Text>
              </View>
            </View>

            <ProgressBar percentage={percent} height={10} style={{ marginVertical: 10 }} />

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Users size={14} color={THEME_COLORS.textSecondary} />
                <Text style={styles.statText}>
                  {campaign.donorCount} {t('donors')}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={14} color={THEME_COLORS.textSecondary} />
                <Text style={styles.statText}>
                  {campaign.daysLeft} {t('daysRemaining')}
                </Text>
              </View>
            </View>
          </View>

          {/* Full Story */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>L’Histoire de {campaign.beneficiaryName}</Text>
            <Text style={styles.storyText}>{story}</Text>
          </View>

          {/* Medical Cost Breakdown Table */}
          {campaign.medicalBreakdown && campaign.medicalBreakdown.length > 0 && (
            <MedicalCostBreakdown items={campaign.medicalBreakdown} />
          )}

          {/* Verified Updates Timeline */}
          {campaign.updates && campaign.updates.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>{t('updatesTitle')}</Text>
              {campaign.updates.map((update, idx) => (
                <UpdateTimelineItem
                  key={idx}
                  update={update}
                  isLast={idx === campaign.updates.length - 1}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Bottom Sticky Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <ShareButton
          title={title}
          url={`${NGO_CONFIG.website}/campaigns/${campaign.slug}`}
          beneficiaryName={campaign.beneficiaryName}
        />

        <TouchableOpacity
          style={styles.donateCta}
          onPress={() => openDonationModal(campaign)}
          activeOpacity={0.85}
        >
          <Heart size={18} color="#ffffff" fill="#ffffff" />
          <Text style={styles.donateCtaText}>{t('supportChild')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    color: THEME_COLORS.textSecondary,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: THEME_COLORS.primary,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {},
  heroContainer: {
    height: 280,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#cbd5e1',
  },
  floatingBackButton: {
    position: 'absolute',
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgentFloatingBadge: {
    position: 'absolute',
    right: 16,
    backgroundColor: THEME_COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  urgentFloatingText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME_COLORS.textPrimary,
    lineHeight: 26,
    marginBottom: 10,
  },
  beneficiaryBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  metaBadge: {
    backgroundColor: THEME_COLORS.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  metaBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME_COLORS.primaryDark,
  },
  metaBadgeNeutral: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f1f5f9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  metaBadgeNeutralText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME_COLORS.textSecondary,
  },
  hospitalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
    marginBottom: 16,
  },
  hospitalTextWrap: {
    flex: 1,
  },
  hospitalLabel: {
    fontSize: 10,
    color: THEME_COLORS.textSecondary,
    fontWeight: '600',
  },
  hospitalName: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    marginBottom: 18,
  },
  amountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  raisedValue: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME_COLORS.textPrimary,
  },
  targetLabel: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    marginTop: 2,
  },
  percentBadge: {
    backgroundColor: THEME_COLORS.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  percentText: {
    fontSize: 14,
    fontWeight: '900',
    color: THEME_COLORS.primaryDark,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME_COLORS.textSecondary,
  },
  section: {
    marginVertical: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    marginBottom: 8,
  },
  storyText: {
    fontSize: 14,
    color: THEME_COLORS.textSecondary,
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  donateCta: {
    flex: 1,
    backgroundColor: THEME_COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  donateCtaText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
