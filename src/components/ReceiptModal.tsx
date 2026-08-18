import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { X, CheckCircle, ShieldCheck, Share2 } from 'lucide-react-native';
import { useDonation } from '../context/DonationContext';
import { useLanguage } from '../context/LanguageContext';
import { THEME_COLORS, NGO_CONFIG } from '../config/constants';
import { formatCurrency } from '../utils/formatters';
import { shareReceiptNative } from '../utils/sharing';
import { CopyButton } from './common/CopyButton';

export const ReceiptModal: React.FC = () => {
  const { isReceiptModalVisible, currentReceipt, closeReceiptModal } = useDonation();
  const { t } = useLanguage();

  if (!currentReceipt) return null;

  const formattedDate = new Date(currentReceipt.timestamp).toLocaleDateString('fr-MU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const receiptSummaryText = `🧾 REÇU DE DON OFFICIEL — ENN REV ENN SOURIR (${NGO_CONFIG.registrationNumber})\n` +
    `N° Reçu : ${currentReceipt.receiptNumber}\n` +
    `Date : ${formattedDate}\n` +
    `Donateur : ${currentReceipt.donorName}\n` +
    `Montant : ${formatCurrency(currentReceipt.amount, currentReceipt.currency)}\n` +
    `Affectation : ${currentReceipt.campaignTitle}\n` +
    `Déduction Fiscale MRA : Conforme Section 50L Income Tax Act\n` +
    `Merci de faire battre un cœur d'enfant ! ❤️`;

  const handleShare = async () => {
    await shareReceiptNative(receiptSummaryText);
  };

  return (
    <Modal
      visible={isReceiptModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeReceiptModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.closeButton} onPress={closeReceiptModal}>
            <X size={20} color={THEME_COLORS.textSecondary} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Top Success Badge */}
            <View style={styles.successHeader}>
              <View style={styles.iconCircle}>
                <CheckCircle size={36} color="#15803d" />
              </View>
              <Text style={styles.thankYouText}>Merci infiniment !</Text>
              <Text style={styles.subtitleText}>Votre générosité sauve des vies.</Text>
            </View>

            {/* Official Receipt Frame */}
            <View style={styles.receiptFrame}>
              <View style={styles.receiptHeader}>
                <Text style={styles.ngoName}>{NGO_CONFIG.name}</Text>
                <Text style={styles.ngoReg}>ONG Agréée {NGO_CONFIG.registrationNumber}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>{t('receiptNumber')} :</Text>
                <Text style={styles.fieldValueBold}>{currentReceipt.receiptNumber}</Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>{t('receiptDate')} :</Text>
                <Text style={styles.fieldValue}>{formattedDate}</Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>{t('receiptDonor')} :</Text>
                <Text style={styles.fieldValue}>{currentReceipt.donorName}</Text>
              </View>

              {currentReceipt.donorNicOrBrn ? (
                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>NIC / BRN :</Text>
                  <Text style={styles.fieldValue}>{currentReceipt.donorNicOrBrn}</Text>
                </View>
              ) : null}

              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>{t('receiptBeneficiary')} :</Text>
                <Text style={styles.fieldValue} numberOfLines={1}>
                  {currentReceipt.beneficiaryName}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>{t('receiptAmount')} :</Text>
                <Text style={styles.totalAmount}>
                  {formatCurrency(currentReceipt.amount, currentReceipt.currency)}
                </Text>
              </View>

              {/* MRA Section 50L Compliance Seal */}
              <View style={styles.mraSeal}>
                <ShieldCheck size={16} color="#15803d" />
                <Text style={styles.mraSealText}>{t('receiptTaxStatus')}</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.shareButton}
                onPress={handleShare}
                activeOpacity={0.85}
              >
                <Share2 size={16} color="#ffffff" />
                <Text style={styles.shareButtonText}>{t('shareReceipt')}</Text>
              </TouchableOpacity>

              <View style={styles.copyRow}>
                <CopyButton
                  valueToCopy={currentReceipt.receiptNumber}
                  label="Copier le N° de Reçu"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    width: '100%',
    maxHeight: '90%',
    padding: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME_COLORS.textPrimary,
  },
  subtitleText: {
    fontSize: 13,
    color: THEME_COLORS.textSecondary,
    marginTop: 2,
  },
  receiptFrame: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  receiptHeader: {
    alignItems: 'center',
    marginBottom: 4,
  },
  ngoName: {
    fontSize: 15,
    fontWeight: '900',
    color: THEME_COLORS.darkNavy,
  },
  ngoReg: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME_COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 4,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    fontWeight: '600',
  },
  fieldValue: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  fieldValueBold: {
    fontSize: 12,
    fontWeight: '900',
    color: THEME_COLORS.primaryDark,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME_COLORS.primary,
  },
  mraSeal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ecfdf5',
    padding: 10,
    borderRadius: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  mraSealText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803d',
    flex: 1,
  },
  actionsContainer: {
    marginTop: 16,
    gap: 10,
  },
  shareButton: {
    backgroundColor: THEME_COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  copyRow: {
    alignItems: 'center',
  },
});
