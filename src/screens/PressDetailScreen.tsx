import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ArrowLeft, Newspaper } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PressRelease } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS } from '../config/constants';
import { ShareButton } from '../components/common/ShareButton';

export const PressDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { lang } = useLanguage();

  const article: PressRelease = route.params?.article;

  if (!article) return null;

  const title = lang === 'en' ? article.titleEn || article.titleFr : article.titleFr;
  const content = lang === 'en' ? article.contentEn || article.contentFr : article.contentFr;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: article.imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop' }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={[styles.floatingBackButton, { top: Math.max(insets.top, 16) }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ArrowLeft size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.metaRow}>
            <Text style={styles.date}>{article.date}</Text>
            {article.mediaSource && (
              <View style={styles.sourceBadge}>
                <Newspaper size={12} color="#0284c7" />
                <Text style={styles.sourceText}>{article.mediaSource}</Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.contentText}>{content}</Text>

          <View style={styles.shareRow}>
            <ShareButton
              title={title}
              url={`https://ennrevennsourir.org/presse/${article.slug}`}
              beneficiaryName="Enn Rev Enn Sourir"
              label="Partager cet article"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {},
  heroContainer: {
    height: 220,
    width: '100%',
    position: 'relative',
  },
  image: {
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
  content: {
    padding: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.primary,
  },
  sourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  sourceText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284c7',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME_COLORS.textPrimary,
    lineHeight: 26,
    marginBottom: 14,
  },
  contentText: {
    fontSize: 15,
    color: THEME_COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  shareRow: {
    alignItems: 'flex-start',
  },
});
