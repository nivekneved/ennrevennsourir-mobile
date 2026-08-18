import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, Globe, MessageCircle } from 'lucide-react-native';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS, NGO_CONFIG } from '../config/constants';

interface HeaderProps {
  showBack?: boolean;
  title?: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const insets = useSafeAreaInsets();
  const { lang, toggleLang, t } = useLanguage();

  const handleWhatsApp = () => {
    Linking.openURL(NGO_CONFIG.whatsappLink);
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Heart size={18} color="#ffffff" fill="#ffffff" />
          </View>
          <View>
            <Text style={styles.brandName}>Enn Rev Enn Sourir</Text>
            <Text style={styles.brandTagline}>{t('ngoBadge')}</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.langButton}
            onPress={toggleLang}
            activeOpacity={0.7}
            accessibilityLabel="Changer de langue"
          >
            <Globe size={14} color={THEME_COLORS.primary} />
            <Text style={styles.langText}>{lang.toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={handleWhatsApp}
            activeOpacity={0.7}
            accessibilityLabel="Contacter par WhatsApp"
          >
            <MessageCircle size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {title ? (
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle}>{title}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.darkNavy,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: THEME_COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: THEME_COLORS.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  brandTagline: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME_COLORS.primaryLight,
    marginTop: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  whatsappButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 12,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
});
