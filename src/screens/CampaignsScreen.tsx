import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { Search, Heart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { CampaignCard } from '../components/CampaignCard';
import { CategoryChip } from '../components/common/CategoryChip';
import { dal } from '../lib/dal';
import { Campaign, CampaignCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS } from '../config/constants';

export const CampaignsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useLanguage();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadCampaigns = async () => {
    const data = await dal.getCampaigns();
    setCampaigns(data);
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCampaigns();
    setRefreshing(false);
  }, []);

  const categories: { id: CampaignCategory; label: string }[] = [
    { id: 'all', label: t('allCategories') },
    { id: 'child', label: t('catChild') },
    { id: 'cancer', label: t('catCancer') },
    { id: 'emergency', label: t('catEmergency') },
    { id: 'prosthetics', label: t('catProsthetics') },
  ];

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const matchCat =
        selectedCategory === 'all' ||
        (selectedCategory === 'emergency' && c.isUrgent) ||
        c.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.beneficiaryName.toLowerCase().includes(q) ||
        c.titleFr.toLowerCase().includes(q) ||
        c.titleEn.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.hospital.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [campaigns, selectedCategory, searchQuery]);

  const handleCampaignPress = (campaign: Campaign) => {
    navigation.navigate('CampaignDetail', { slug: campaign.slug });
  };

  return (
    <View style={styles.screen}>
      <Header title={t('campaigns')} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={18} color={THEME_COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={THEME_COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Pills Carousel */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((cat) => (
            <CategoryChip
              key={cat.id}
              label={cat.label}
              isSelected={selectedCategory === cat.id}
              onPress={() => setSelectedCategory(cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Campaigns List */}
      <FlatList
        data={filteredCampaigns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CampaignCard campaign={item} onPress={() => handleCampaignPress(item)} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Heart size={36} color={THEME_COLORS.textMuted} />
            <Text style={styles.emptyText}>Aucun combat trouvé pour ces critères.</Text>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    height: 46,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: THEME_COLORS.textPrimary,
  },
  categoriesContainer: {
    paddingBottom: 8,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 10,
  },
  emptyText: {
    fontSize: 14,
    color: THEME_COLORS.textSecondary,
  },
});
