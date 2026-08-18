import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Newspaper, ChevronRight } from 'lucide-react-native';
import { PressRelease } from '../../types';
import { THEME_COLORS } from '../../config/constants';
import { useLanguage } from '../../context/LanguageContext';

interface PressArticleCardProps {
  article: PressRelease;
  onPress: () => void;
}

export const PressArticleCard: React.FC<PressArticleCardProps> = ({ article, onPress }) => {
  const { lang } = useLanguage();

  const title = lang === 'en' ? article.titleEn || article.titleFr : article.titleFr;
  const summary = lang === 'en' ? article.summaryEn || article.summaryFr : article.summaryFr;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: article.imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.date}>{article.date}</Text>
          {article.mediaSource && (
            <View style={styles.sourceBadge}>
              <Newspaper size={10} color="#0284c7" />
              <Text style={styles.sourceText}>{article.mediaSource}</Text>
            </View>
          )}
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.summary} numberOfLines={2}>
          {summary}
        </Text>

        <View style={styles.readMoreRow}>
          <Text style={styles.readMoreText}>Lire le communiqué</Text>
          <ChevronRight size={14} color={THEME_COLORS.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 14,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#cbd5e1',
  },
  content: {
    padding: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  date: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME_COLORS.primary,
  },
  sourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  sourceText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0284c7',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    lineHeight: 20,
    marginBottom: 6,
  },
  summary: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    lineHeight: 16,
    marginBottom: 10,
  },
  readMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME_COLORS.primary,
  },
});
