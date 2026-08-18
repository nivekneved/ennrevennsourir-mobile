import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { X, Heart, ShieldCheck } from 'lucide-react-native';
import { useDonation } from '../context/DonationContext';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS } from '../config/constants';
import { CurrencySelector } from './donation/CurrencySelector';
import { AmountSelector } from './donation/AmountSelector';
import { FrequencyToggle } from './donation/FrequencyToggle';
import { PaymentMethodSelector } from './donation/PaymentMethodSelector';
import { JuiceQrDisplay } from './donation/JuiceQrDisplay';
import { MauCasQrDisplay } from './donation/MauCasQrDisplay';
import { BankTransferInfo } from './donation/BankTransferInfo';
import { TaxReliefBanner } from './donation/TaxReliefBanner';
import { triggerSuccessHaptic } from '../utils/haptics';

export const DonationModal: React.FC = () => {
  const {
    isDonationModalVisible,
    selectedCampaign,
    donationAmount,
    donationCurrency,
    donationFrequency,
    selectedPaymentMethod,
    closeDonationModal,
    setDonationAmount,
    setDonationCurrency,
    setDonationFrequency,
    setSelectedPaymentMethod,
    processDonation,
  } = useDonation();

  const { lang, t } = useLanguage();

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorNicOrBrn, setDonorNicOrBrn] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const campaignTitle = selectedCampaign
    ? lang === 'en'
      ? selectedCampaign.titleEn || selectedCampaign.titleFr
      : selectedCampaign.titleFr
    : 'Fonds d’Urgence Chirurgicale ERES';

  const handleSubmit = async () => {
    setIsSubmitting(true);
    triggerSuccessHaptic();
    await processDonation({
      name: donorName.trim(),
      email: donorEmail.trim(),
      phone: donorPhone.trim(),
      nicOrBrn: donorNicOrBrn.trim(),
    });
    setIsSubmitting(false);
  };

  return (
    <Modal
      visible={isDonationModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeDonationModal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.heartIconWrapper}>
                <Heart size={16} color="#ffffff" fill="#ffffff" />
              </View>
              <View style={styles.headerTextWrapper}>
                <Text style={styles.modalTitle}>{t('donationTitle')}</Text>
                <Text style={styles.campaignSubtitle} numberOfLines={1}>
                  {campaignTitle}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={closeDonationModal}>
              <X size={20} color={THEME_COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Step 1: Amount & Currency */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>{t('chooseAmount')}</Text>
              <FrequencyToggle
                frequency={donationFrequency}
                onSelectFrequency={setDonationFrequency}
              />
              <CurrencySelector
                selectedCurrency={donationCurrency}
                onSelect={setDonationCurrency}
              />
              <AmountSelector
                currency={donationCurrency}
                selectedAmount={donationAmount}
                onSelectAmount={setDonationAmount}
              />
              <TaxReliefBanner amount={donationAmount} currency={donationCurrency} />
            </View>

            {/* Step 2: Payment Method */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>{t('choosePaymentMethod')}</Text>
              <PaymentMethodSelector
                selectedMethod={selectedPaymentMethod}
                onSelectMethod={setSelectedPaymentMethod}
              />

              {/* Dynamic Payment Method View */}
              {selectedPaymentMethod === 'juice' && (
                <JuiceQrDisplay amount={donationAmount} currency={donationCurrency} />
              )}
              {selectedPaymentMethod === 'maucas' && (
                <MauCasQrDisplay amount={donationAmount} currency={donationCurrency} />
              )}
              {selectedPaymentMethod === 'bank_transfer' && <BankTransferInfo />}
            </View>

            {/* Step 3: Donor Details for MRA Receipt */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>{t('donorInfo')}</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('fullName')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Jean Dupont"
                  placeholderTextColor={THEME_COLORS.textMuted}
                  value={donorName}
                  onChangeText={setDonorName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('emailAddress')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: jean.dupont@email.mu"
                  placeholderTextColor={THEME_COLORS.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={donorEmail}
                  onChangeText={setDonorEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('phoneNumber')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: +230 5757 1234"
                  placeholderTextColor={THEME_COLORS.textMuted}
                  keyboardType="phone-pad"
                  value={donorPhone}
                  onChangeText={setDonorPhone}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('nicOrBrn')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: D120492123456A (Optionnel pour déduction MRA)"
                  placeholderTextColor={THEME_COLORS.textMuted}
                  autoCapitalize="characters"
                  value={donorNicOrBrn}
                  onChangeText={setDonorNicOrBrn}
                />
              </View>
            </View>

            {/* Submit CTA */}
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              activeOpacity={0.85}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <ShieldCheck size={18} color="#ffffff" />
                  <Text style={styles.submitButtonText}>{t('generateReceipt')}</Text>
                </>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '92%',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  heartIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME_COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextWrapper: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  campaignSubtitle: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    marginTop: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollArea: {
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingTop: 16,
    paddingBottom: 30,
    gap: 18,
  },
  section: {
    gap: 10,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME_COLORS.textSecondary,
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
  submitButton: {
    backgroundColor: THEME_COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: 16,
    shadowColor: THEME_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
