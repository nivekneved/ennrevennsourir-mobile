import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Share2 } from 'lucide-react-native';
import { THEME_COLORS } from '../../config/constants';
import { shareCampaignNative } from '../../utils/sharing';
import { triggerLightHaptic } from '../../utils/haptics';

interface ShareButtonProps {
  title: string;
  url: string;
  beneficiaryName: string;
  label?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  url,
  beneficiaryName,
  label = 'Partager',
}) => {
  const handlePress = async () => {
    triggerLightHaptic();
    await shareCampaignNative(title, url, beneficiaryName);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
      <Share2 size={16} color={THEME_COLORS.darkNavy} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME_COLORS.darkNavy,
  },
});
