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
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react-native';
import { Header } from '../components/Header';
import { EmergencyCallButton } from '../components/common/EmergencyCallButton';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { dal } from '../lib/dal';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS, NGO_CONFIG } from '../config/constants';
import { triggerSuccessHaptic } from '../utils/haptics';

export const ContactScreen: React.FC = () => {
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Champs requis', 'Veuillez renseigner votre nom, email et message.');
      return;
    }

    setSending(true);
    triggerSuccessHaptic();

    await dal.submitContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim() || 'Demande d’information Mobile',
      message: message.trim(),
    });

    setSending(false);
    setSent(true);
  };

  return (
    <View style={styles.screen}>
      <Header title={t('contact')} />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Urgent Hotline & WhatsApp Quick Actions */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>Urgences Vitales Enfants</Text>
          <Text style={styles.emergencySubtitle}>
            Notre cellule médicale d’urgence est joignable 24h/24 et 7j/7 pour les évacuations pédiatriques.
          </Text>

          <View style={styles.actionButtonsRow}>
            <View style={styles.actionBtnWrap}>
              <EmergencyCallButton label="Appel d’Urgence 24/7" />
            </View>
            <View style={styles.actionBtnWrap}>
              <WhatsAppButton label="WhatsApp Hotline" />
            </View>
          </View>
        </View>

        {/* Physical Office & Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MapPin size={18} color={THEME_COLORS.primary} />
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Siège de l’ONG</Text>
              <Text style={styles.infoValue}>{NGO_CONFIG.address}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Clock size={18} color={THEME_COLORS.primary} />
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Horaires de permanence</Text>
              <Text style={styles.infoValue}>{NGO_CONFIG.hours}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Mail size={18} color={THEME_COLORS.primary} />
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Email officiel</Text>
              <Text style={styles.infoValue}>{NGO_CONFIG.email}</Text>
            </View>
          </View>
        </View>

        {/* Contact Form */}
        {sent ? (
          <View style={styles.successBox}>
            <CheckCircle size={36} color="#15803d" />
            <Text style={styles.successTitle}>{t('messageSent')}</Text>
            <Text style={styles.successText}>Nous vous répondrons dans les plus brefs délais.</Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => setSent(false)}>
              <Text style={styles.resetBtnText}>Envoyer un autre message</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>{t('sendMessageTitle')}</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('fullName')} *</Text>
              <TextInput
                style={styles.input}
                placeholder="Votre nom"
                placeholderTextColor={THEME_COLORS.textMuted}
                value={name}
                onChangeText={setName}
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
              <Text style={styles.label}>{t('subject')}</Text>
              <TextInput
                style={styles.input}
                placeholder="Objet de votre demande"
                placeholderTextColor={THEME_COLORS.textMuted}
                value={subject}
                onChangeText={setSubject}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('message')} *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Écrivez votre message..."
                placeholderTextColor={THEME_COLORS.textMuted}
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <TouchableOpacity
              style={[styles.sendButton, sending && styles.sendButtonDisabled]}
              onPress={handleSubmit}
              disabled={sending}
              activeOpacity={0.85}
            >
              {sending ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <Send size={16} color="#ffffff" />
                  <Text style={styles.sendButtonText}>{t('send')}</Text>
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
  emergencyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#ffe4e6',
    gap: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: THEME_COLORS.accent,
  },
  emergencySubtitle: {
    fontSize: 13,
    color: THEME_COLORS.textSecondary,
    lineHeight: 18,
  },
  actionButtonsRow: {
    gap: 8,
  },
  actionBtnWrap: {
    width: '100%',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: THEME_COLORS.textSecondary,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
    marginTop: 1,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    marginBottom: 4,
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
  sendButton: {
    backgroundColor: THEME_COLORS.darkNavy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 4,
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  successBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    gap: 8,
  },
  successTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#15803d',
  },
  successText: {
    fontSize: 13,
    color: '#166534',
    textAlign: 'center',
  },
  resetBtn: {
    marginTop: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  resetBtnText: {
    color: '#15803d',
    fontSize: 12,
    fontWeight: '700',
  },
});
