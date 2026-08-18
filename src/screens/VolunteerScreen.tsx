import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Users, Heart, CheckCircle } from 'lucide-react-native';
import { Header } from '../components/Header';
import { dal } from '../lib/dal';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS } from '../config/constants';
import { triggerSuccessHaptic } from '../utils/haptics';

export const VolunteerScreen: React.FC = () => {
  const { t } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [roleInterest, setRoleInterest] = useState('medical');
  const [availability, setAvailability] = useState('weekends');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const roles = [
    { id: 'medical', label: t('volunteerRoleMedical') },
    { id: 'logistics', label: t('volunteerRoleLogistics') },
    { id: 'events', label: t('volunteerRoleEvents') },
    { id: 'media', label: t('volunteerRoleMedia') },
  ];

  const availabilities = [
    { id: 'weekends', label: 'Week-ends uniquement' },
    { id: 'weekdays', label: 'En semaine (temps partiel)' },
    { id: 'flexible', label: 'Selon les urgences chirurgicales' },
  ];

  const handleSubmit = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Champs requis', 'Veuillez renseigner votre nom, email et téléphone.');
      return;
    }

    setSubmitting(true);
    triggerSuccessHaptic();

    await dal.submitVolunteerApplication({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      roleInterest,
      availability,
      message: message.trim(),
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <View style={styles.screen}>
      <Header title={t('volunteer')} />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroBanner}>
          <View style={styles.iconCircle}>
            <Users size={28} color={THEME_COLORS.primary} />
          </View>
          <Text style={styles.heroTitle}>{t('volunteerHeroTitle')}</Text>
          <Text style={styles.heroSubtitle}>{t('volunteerSubtitle')}</Text>
        </View>

        {submitted ? (
          <View style={styles.successBox}>
            <CheckCircle size={40} color="#15803d" />
            <Text style={styles.successTitle}>Candidature Envoyée !</Text>
            <Text style={styles.successText}>{t('applicationSubmitted')}</Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setSubmitted(false)}
            >
              <Text style={styles.resetButtonText}>Envoyer une autre candidature</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('fullName')} *</Text>
              <TextInput
                style={styles.input}
                placeholder="Votre nom complet"
                placeholderTextColor={THEME_COLORS.textMuted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('emailAddress')} *</Text>
              <TextInput
                style={styles.input}
                placeholder="votre.email@exemple.mu"
                placeholderTextColor={THEME_COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('phoneNumber')} (WhatsApp) *</Text>
              <TextInput
                style={styles.input}
                placeholder="+230 5757 1234"
                placeholderTextColor={THEME_COLORS.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('volunteerCity')}</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Port-Louis, Curepipe, Flacq..."
                placeholderTextColor={THEME_COLORS.textMuted}
                value={city}
                onChangeText={setCity}
              />
            </View>

            {/* Role selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('volunteerRoleInterest')}</Text>
              <View style={styles.optionsList}>
                {roles.map((r) => (
                  <TouchableOpacity
                    key={r.id}
                    style={[styles.optionChip, roleInterest === r.id && styles.selectedChip]}
                    onPress={() => setRoleInterest(r.id)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[styles.optionText, roleInterest === r.id && styles.selectedOptionText]}
                    >
                      {r.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Availability */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('volunteerAvailability')}</Text>
              <View style={styles.optionsList}>
                {availabilities.map((a) => (
                  <TouchableOpacity
                    key={a.id}
                    style={[styles.optionChip, availability === a.id && styles.selectedChip]}
                    onPress={() => setAvailability(a.id)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[styles.optionText, availability === a.id && styles.selectedOptionText]}
                    >
                      {a.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Message */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('volunteerMessage')}</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Parlez-nous un peu de vous..."
                placeholderTextColor={THEME_COLORS.textMuted}
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={submitting}
              activeOpacity={0.85}
            >
              {submitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <Heart size={18} color="#ffffff" fill="#ffffff" />
                  <Text style={styles.submitButtonText}>{t('submitApplication')}</Text>
                </>
              )}
            </TouchableOpacity>
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
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  heroBanner: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME_COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: THEME_COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 14,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
    color: THEME_COLORS.textPrimary,
  },
  textArea: {
    height: 90,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  optionsList: {
    gap: 6,
  },
  optionChip: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  selectedChip: {
    backgroundColor: THEME_COLORS.primaryLight,
    borderColor: THEME_COLORS.primary,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME_COLORS.textSecondary,
  },
  selectedOptionText: {
    color: THEME_COLORS.primaryDark,
    fontWeight: '800',
  },
  submitButton: {
    backgroundColor: THEME_COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: 16,
    marginTop: 6,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  successBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    gap: 10,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#15803d',
  },
  successText: {
    fontSize: 13,
    color: '#166534',
    textAlign: 'center',
    lineHeight: 18,
  },
  resetButton: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  resetButtonText: {
    color: '#15803d',
    fontSize: 13,
    fontWeight: '700',
  },
});
