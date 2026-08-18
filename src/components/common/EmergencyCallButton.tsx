import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { PhoneCall } from 'lucide-react-native';
import { NGO_CONFIG, THEME_COLORS } from '../../config/constants';
import { triggerLightHaptic } from '../../utils/haptics';

interface EmergencyCallButtonProps {
  phoneNumber?: string;
  label?: string;
}

export const EmergencyCallButton: React.FC<EmergencyCallButtonProps> = ({
  phoneNumber = NGO_CONFIG.emergencyPhone,
  label = 'Ligne d’Urgence 24/7',
}) => {
  const handlePress = () => {
    triggerLightHaptic();
    Linking.openURL(`tel:${phoneNumber.replace(/\s+/g, '')}`);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
      <PhoneCall size={18} color="#ffffff" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME_COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    shadowColor: THEME_COLORS.accent,
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
