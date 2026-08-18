import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { HeartHandshake, Sparkles } from 'lucide-react-native';
import { Header } from '../components/Header';
import { SponsorshipCard } from '../components/SponsorshipCard';
import { dal } from '../lib/dal';
import { SponsorshipProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS } from '../config/constants';

export const SponsorshipScreen: React.FC = () => {
  const { t } = useLanguage();
  const [profiles, setProfiles] = useState<SponsorshipProfile[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadProfiles = async () => {
    const data = await dal.getSponsorshipProfiles();
    setProfiles(data);
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProfiles();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.screen}>
      <Header title={t('sponsorship')} />

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SponsorshipCard profile={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <View style={styles.heroBanner}>
            <View style={styles.badgeRow}>
              <HeartHandshake size={18} color={THEME_COLORS.primary} />
              <Text style={styles.badgeText}>PARRAINAGE RÉGULIER</Text>
            </View>
            <Text style={styles.heroTitle}>{t('sponsorshipHeroTitle')}</Text>
            <Text style={styles.heroSubtitle}>{t('sponsorshipSubtitle')}</Text>

            <View style={styles.perksBox}>
              <View style={styles.perkItem}>
                <Sparkles size={14} color="#15803d" />
                <Text style={styles.perkText}>Rapport de santé trimestriel envoyé aux parrains</Text>
              </View>
              <View style={styles.perkItem}>
                <Sparkles size={14} color="#15803d" />
                <Text style={styles.perkText}>Reçu fiscal MRA Section 50L annuel automatisé</Text>
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: THEME_COLORS.surface,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  heroBanner: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME_COLORS.primary,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME_COLORS.textPrimary,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: THEME_COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  perksBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  perkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
    flex: 1,
  },
});
