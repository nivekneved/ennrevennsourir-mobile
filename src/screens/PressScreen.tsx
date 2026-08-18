import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { PressArticleCard } from '../components/press/PressArticleCard';
import { dal } from '../lib/dal';
import { PressRelease } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS } from '../config/constants';

export const PressScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useLanguage();
  const [articles, setArticles] = useState<PressRelease[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadArticles = async () => {
    const data = await dal.getPressReleases();
    setArticles(data);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadArticles();
    setRefreshing(false);
  }, []);

  const handleArticlePress = (article: PressRelease) => {
    navigation.navigate('PressDetail', { article });
  };

  return (
    <View style={styles.screen}>
      <Header title={t('press')} />

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PressArticleCard article={item} onPress={() => handleArticlePress(item)} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    padding: 16,
    paddingBottom: 40,
  },
});
