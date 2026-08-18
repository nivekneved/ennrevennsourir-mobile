import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Flame, ChevronRight } from 'lucide-react-native';
import { THEME_COLORS } from '../../config/constants';
import { useLanguage } from '../../context/LanguageContext';

interface UrgentBannerProps {
  urgentCampaignTitle?: string;
  onPress?: () => void;
}

export const UrgentBanner: React.FC<UrgentBannerProps> = ({
  urgentCampaignTitle,
  onPress,
}) => {
  const { t } = useLanguage();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Flame size={16} color="#ffffff" fill="#ffffff" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.alertLabel}>{t('urgentAlert')}</Text>
          {urgentCampaignTitle ? (
            <Text style={styles.campaignTitle} numberOfLines={1}>
              {urgentCampaignTitle}
            </Text>
          ) : null}
        </View>
      </View>
      {onPress && <ChevronRight size={18} color="#ffffff" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.accent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  alertLabel: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  campaignTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.95,
  },
});
