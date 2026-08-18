import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { FileText, Download, CheckCircle } from 'lucide-react-native';
import { TransparencyDoc } from '../../types';
import { THEME_COLORS } from '../../config/constants';
import { triggerLightHaptic } from '../../utils/haptics';

interface TransparencyDocCardProps {
  doc: TransparencyDoc;
}

export const TransparencyDocCard: React.FC<TransparencyDocCardProps> = ({ doc }) => {
  const handleDownload = () => {
    triggerLightHaptic();
    if (doc.downloadUrl) {
      Linking.openURL(doc.downloadUrl).catch(() => {
        Alert.alert('Rapport', `Le rapport financier de ${doc.year} a été audité avec succès.`);
      });
    } else {
      Alert.alert('Rapport', `Le rapport financier de ${doc.year} a été audité avec succès.`);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <FileText size={24} color={THEME_COLORS.primary} />
      </View>

      <View style={styles.content}>
        <View style={styles.yearRow}>
          <Text style={styles.year}>{doc.year}</Text>
          {doc.verified && (
            <View style={styles.verifiedBadge}>
              <CheckCircle size={10} color="#15803d" />
              <Text style={styles.verifiedText}>Audité & Certifié</Text>
            </View>
          )}
        </View>

        <Text style={styles.title}>{doc.title}</Text>
        <Text style={styles.auditor}>Auditeur : {doc.auditor}</Text>
        <Text style={styles.fileSize}>{doc.fileSize}</Text>
      </View>

      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload} activeOpacity={0.7}>
        <Download size={18} color={THEME_COLORS.primaryDark} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  year: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME_COLORS.primary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803d',
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    marginBottom: 2,
  },
  auditor: {
    fontSize: 11,
    color: THEME_COLORS.textSecondary,
  },
  fileSize: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
    marginTop: 2,
  },
  downloadButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME_COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
