import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { ChevronRight, Sparkles, HeartHandshake } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { UrgentBanner } from '../components/common/UrgentBanner';
import { HeroDonationCard } from '../components/donation/HeroDonationCard';
import { ImpactStats } from '../components/ImpactStats';
import { CampaignCard } from '../components/CampaignCard';
import { MedicalPathway } from '../components/MedicalPathway';
import { SponsorshipCard } from '../components/SponsorshipCard';
import { dal, SEED_IMPACT_METRICS } from '../lib/dal';
import { Campaign, SponsorshipProfile, ImpactMetrics } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS } from '../config/constants';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useLanguage();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [sponsorships, setSponsorships] = useState<SponsorshipProfile[]>([]);
  const [metrics, setMetrics] = useState<ImpactMetrics>(SEED_IMPACT_METRICS);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const [cData, sData, mData] = await Promise.all([
      dal.getCampaigns(),
      dal.getSponsorshipProfiles(),
      dal.getImpactMetrics(),
    ]);
    setCampaigns(cData);
    setSponsorships(sData);
    setMetrics(mData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const urgentCampaign = campaigns.find((c) => c.isUrgent) || campaigns[0];

  const handleCampaignPress = (campaign: Campaign) => {
    navigation.navigate('CampaignDetail', { slug: campaign.slug });
  };

  return (
    <View style={styles.screen}>
      <Header />
      {urgentCampaign && (
        <UrgentBanner
          urgentCampaignTitle={urgentCampaign.beneficiaryName + ' — ' + urgentCampaign.titleFr}
          onPress={() => handleCampaignPress(urgentCampaign)}
        />
      )}

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Quick Direct Donation Hero */}
        <HeroDonationCard />

        {/* Real-time Impact Metrics */}
        <ImpactStats metrics={metrics} />

        {/* Urgent Emergency Spotlight */}
        {urgentCampaign && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Sparkles size={18} color={THEME_COLORS.accent} />
                <Text style={styles.sectionTitle}>{t('featuredEmergency')}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('CampaignsTab')}
                style={styles.seeAllBtn}
              >
                <Text style={styles.seeAllText}>{t('seeAllCampaigns')}</Text>
                <ChevronRight size={14} color={THEME_COLORS.primary} />
              </TouchableOpacity>
            </View>

            <CampaignCard
              campaign={urgentCampaign}
              onPress={() => handleCampaignPress(urgentCampaign)}
              featured={true}
            />
          </View>
        )}

        {/* 4-Step Medical Pathway */}
        <MedicalPathway />

        {/* Parrainage Spotlight */}
        {sponsorships.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <HeartHandshake size={18} color={THEME_COLORS.primary} />
                <Text style={styles.sectionTitle}>{t('sponsorshipHeroTitle')}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('SponsorshipTab')}
                style={styles.seeAllBtn}
              >
                <Text style={styles.seeAllText}>Voir tous</Text>
                <ChevronRight size={14} color={THEME_COLORS.primary} />
              </TouchableOpacity>
            </View>
            <SponsorshipCard profile={sponsorships[0]} />
          </View>
        )}
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
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.primary,
  },
});
