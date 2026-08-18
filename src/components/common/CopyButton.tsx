import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Copy, Check } from 'lucide-react-native';
import { THEME_COLORS } from '../../config/constants';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface CopyButtonProps {
  valueToCopy: string;
  label?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ valueToCopy, label = 'Copier' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(valueToCopy);
    triggerSuccessHaptic();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TouchableOpacity
      style={[styles.button, copied && styles.buttonCopied]}
      onPress={handleCopy}
      activeOpacity={0.7}
    >
      {copied ? (
        <Check size={14} color="#15803d" />
      ) : (
        <Copy size={14} color={THEME_COLORS.primaryDark} />
      )}
      <Text style={[styles.text, copied && styles.textCopied]}>
        {copied ? 'Copié !' : label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: THEME_COLORS.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.2)',
  },
  buttonCopied: {
    backgroundColor: '#dcfce7',
    borderColor: '#86efac',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.primaryDark,
  },
  textCopied: {
    color: '#15803d',
  },
});
