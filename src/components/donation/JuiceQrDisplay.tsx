import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { BANKING_DETAILS, THEME_COLORS } from '../../config/constants';
import { CopyButton } from '../common/CopyButton';

interface JuiceQrDisplayProps {
  amount: number;
  currency: string;
}

export const JuiceQrDisplay: React.FC<JuiceQrDisplayProps> = ({ amount, currency }) => {
  const qrValue = `${BANKING_DETAILS.juice.qrPayload}&amount=${amount}&currency=${currency}`;

  return (
    <View style={styles.container}>
      <View style={styles.qrCard}>
        <QRCode
          value={qrValue}
          size={160}
          color="#0f172a"
          backgroundColor="#ffffff"
        />
        <Text style={styles.scanText}>Scannez avec l’App MCB Juice</Text>
      </View>

      <View style={styles.detailsBox}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Numéro Marchand Juice :</Text>
          <Text style={styles.infoValue}>{BANKING_DETAILS.juice.merchantNumber}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Bénéficiaire :</Text>
          <Text style={styles.infoValue}>{BANKING_DETAILS.juice.accountName}</Text>
        </View>

        <View style={styles.actionRow}>
          <CopyButton valueToCopy="57570000" label="Copier le N° 5757 0000" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 8,
  },
  qrCard: {
    padding: 14,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  scanText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.accent,
    marginTop: 10,
  },
  detailsBox: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
  },
  actionRow: {
    marginTop: 4,
    alignItems: 'center',
  },
});
