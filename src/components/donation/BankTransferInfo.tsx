import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BANKING_DETAILS, THEME_COLORS } from '../../config/constants';
import { CopyButton } from '../common/CopyButton';

export const BankTransferInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Comptes Bancaires Officiels ONG 15420</Text>
      <Text style={styles.subtitle}>
        Virement local ou international sans frais intermédiaires.
      </Text>

      <View style={styles.cardsList}>
        {BANKING_DETAILS.bankAccounts.map((acc, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.bankName}>{acc.bank}</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Titulaire :</Text>
              <Text style={styles.value}>{acc.accountName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>N° Compte :</Text>
              <Text style={styles.value}>{acc.accountNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>IBAN :</Text>
              <Text style={styles.valueCode}>{acc.iban}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>SWIFT / BIC :</Text>
              <Text style={styles.valueCode}>{acc.swift}</Text>
            </View>
            <View style={styles.copyRow}>
              <CopyButton valueToCopy={acc.iban} label={`Copier IBAN ${acc.currency}`} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    marginBottom: 12,
  },
  cardsList: {
    gap: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 4,
  },
  bankName: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME_COLORS.primary,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    color: THEME_COLORS.textSecondary,
    fontWeight: '500',
  },
  value: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  valueCode: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
    fontFamily: 'monospace',
  },
  copyRow: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
});
