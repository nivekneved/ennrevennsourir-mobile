import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { NGO_CONFIG } from '../../config/constants';
import { triggerLightHaptic } from '../../utils/haptics';

interface WhatsAppButtonProps {
  label?: string;
  customMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  label = 'WhatsApp',
  customMessage,
}) => {
  const handlePress = () => {
    triggerLightHaptic();
    const url = customMessage
      ? `https://wa.me/${NGO_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(customMessage)}`
      : NGO_CONFIG.whatsappLink;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
      <MessageCircle size={18} color="#ffffff" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});
