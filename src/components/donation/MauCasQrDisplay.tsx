import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { BANKING_DETAILS, THEME_COLORS } from '../../config/constants';
import { CopyButton } from '../common/CopyButton';

interface MauCasQrDisplayProps {
  amount: number;
  currency: string;
}

export const MauCasQrDisplay: React.FC<MauCasQrDisplayProps> = ({ amount, currency }) => {
  const qrValue = `${BANKING_DETAILS.maucas.qrPayload}&amount=${amount}&currency=${currency}`;

  return (
    <View style={styles.container}>
      <View style={styles.qrCard}>
        <QRCode
          value={qrValue}
          size={160}
          color="#0f172a"
          backgroundColor="#ffffff"
        />
        <Text style={styles.scanText}>Compatible Blink, SBM, Pop, my.t money</Text>
      </View>

      <View style={styles.detailsBox}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>MauCAS Merchant ID :</Text>
          <Text style={styles.infoValue}>{BANKING_DETAILS.maucas.merchantId}</Text>
        </View>

        <View style={styles.actionRow}>
          <CopyButton valueToCopy={BANKING_DETAILS.maucas.merchantId} label="Copier MauCAS ID" />
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
    fontSize: 11,
    fontWeight: '700',
    color: '#0284c7',
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
