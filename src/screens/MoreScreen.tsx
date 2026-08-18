import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ShieldCheck,
  Users,
  Newspaper,
  PhoneCall,
  Globe,
  ChevronRight,
  Heart,
  FileCheck,
} from 'lucide-react-native';
import { Header } from '../components/Header';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS, NGO_CONFIG } from '../config/constants';
import { triggerLightHaptic } from '../utils/haptics';

export const MoreScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { lang, toggleLang, t } = useLanguage();

  const menuItems = [
    {
      title: t('transparency'),
      subtitle: 'Modèle 100% direct & Rapports financiers audités',
      icon: <ShieldCheck size={20} color={THEME_COLORS.primary} />,
      screen: 'Transparency',
    },
    {
      title: t('volunteer'),
      subtitle: 'Rejoignez l’équipe de bénévoles de l’ONG',
      icon: <Users size={20} color={THEME_COLORS.accent} />,
      screen: 'Volunteer',
    },
    {
      title: t('press'),
      subtitle: 'Communiqués officiels & Couverture médiatique',
      icon: <Newspaper size={20} color="#0284c7" />,
      screen: 'Press',
    },
    {
      title: t('contact'),
      subtitle: 'Urgences 24/7, WhatsApp & Formulaire de contact',
      icon: <PhoneCall size={20} color="#d97706" />,
      screen: 'Contact',
    },
  ];

  const handleNav = (screen: string) => {
    triggerLightHaptic();
    navigation.navigate(screen);
  };

  return (
    <View style={styles.screen}>
      <Header title={t('more')} />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* NGO Registry Info Card */}
        <View style={styles.ngoCard}>
          <View style={styles.ngoHeader}>
            <View style={styles.heartLogo}>
              <Heart size={20} color="#ffffff" fill="#ffffff" />
            </View>
            <View style={styles.ngoTextWrap}>
              <Text style={styles.ngoName}>{NGO_CONFIG.name}</Text>
              <Text style={styles.ngoReg}>{NGO_CONFIG.registrationNumber} • Fondée en 2018</Text>
            </View>
          </View>
          <Text style={styles.ngoMission}>
            Financement à 100% de chirurgies pédiatriques vitales et transferts médicaux pour les enfants de l’Île Maurice.
          </Text>
        </View>

        {/* Menu Items List */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleNav(item.screen)}
              activeOpacity={0.7}
            >
              <View style={styles.itemIconContainer}>{item.icon}</View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={18} color={THEME_COLORS.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Language Toggle */}
        <TouchableOpacity
          style={styles.langToggleCard}
          onPress={toggleLang}
          activeOpacity={0.75}
        >
          <View style={styles.langIconWrap}>
            <Globe size={20} color={THEME_COLORS.primary} />
          </View>
          <View style={styles.langContent}>
            <Text style={styles.langTitle}>Langue de l’application</Text>
            <Text style={styles.langSubtitle}>
              {lang === 'fr' ? 'Français (Actif)' : 'English (Active)'}
            </Text>
          </View>
          <View style={styles.langPill}>
            <Text style={styles.langPillText}>{lang === 'fr' ? 'Passer en EN' : 'Passer en FR'}</Text>
          </View>
        </TouchableOpacity>

        {/* MRA Section 50L Info Notice */}
        <View style={styles.mraNoticeCard}>
          <FileCheck size={18} color="#15803d" />
          <Text style={styles.mraNoticeText}>
            Les dons effectués via cette application sont 100% déductibles des impôts à Maurice sous la Section 50L de l’Income Tax Act.
          </Text>
        </View>
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
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  ngoCard: {
    backgroundColor: THEME_COLORS.darkNavy,
    borderRadius: 20,
    padding: 18,
    gap: 12,
  },
  ngoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heartLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: THEME_COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ngoTextWrap: {
    flex: 1,
  },
  ngoName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
  },
  ngoReg: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME_COLORS.primaryLight,
    marginTop: 2,
  },
  ngoMission: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
  menuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 14,
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  itemSubtitle: {
    fontSize: 11,
    color: THEME_COLORS.textSecondary,
    marginTop: 2,
  },
  langToggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  langIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langContent: {
    flex: 1,
  },
  langTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  langSubtitle: {
    fontSize: 11,
    color: THEME_COLORS.textSecondary,
    marginTop: 1,
  },
  langPill: {
    backgroundColor: THEME_COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  langPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME_COLORS.primaryDark,
  },
  mraNoticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#f0fdf4',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  mraNoticeText: {
    fontSize: 11,
    color: '#166534',
    lineHeight: 16,
    flex: 1,
    fontWeight: '500',
  },
});
