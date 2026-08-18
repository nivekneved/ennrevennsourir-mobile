import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { QrCode, Landmark, CreditCard, Smartphone } from 'lucide-react-native';
import { PaymentMethod } from '../../types';
import { THEME_COLORS } from '../../config/constants';
import { triggerLightHaptic } from '../../utils/haptics';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  const methods: { id: PaymentMethod; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'juice',
      label: 'MCB Juice QR',
      icon: <QrCode size={18} color={selectedMethod === 'juice' ? '#ffffff' : THEME_COLORS.accent} />,
      badge: 'Instantané',
    },
    {
      id: 'maucas',
      label: 'MauCAS / Blink',
      icon: <Smartphone size={18} color={selectedMethod === 'maucas' ? '#ffffff' : '#0284c7'} />,
      badge: 'Toutes Banques',
    },
    {
      id: 'bank_transfer',
      label: 'Virement Bancaire',
      icon: <Landmark size={18} color={selectedMethod === 'bank_transfer' ? '#ffffff' : THEME_COLORS.primary} />,
      badge: 'MCB / SBM / Absa',
    },
    {
      id: 'card',
      label: 'Carte / PayPal',
      icon: <CreditCard size={18} color={selectedMethod === 'card' ? '#ffffff' : '#7c3aed'} />,
      badge: 'International',
    },
  ];

  const handleSelect = (method: PaymentMethod) => {
    triggerLightHaptic();
    onSelectMethod(method);
  };

  return (
    <View style={styles.grid}>
      {methods.map((m) => {
        const isSelected = selectedMethod === m.id;
        return (
          <TouchableOpacity
            key={m.id}
            style={[styles.card, isSelected && styles.selectedCard]}
            onPress={() => handleSelect(m.id)}
            activeOpacity={0.75}
          >
            <View style={[styles.iconWrapper, isSelected && styles.selectedIconWrapper]}>
              {m.icon}
            </View>
            <View style={styles.textWrapper}>
              <Text style={[styles.title, isSelected && styles.selectedTitle]}>{m.label}</Text>
              {m.badge && (
                <Text style={[styles.badge, isSelected && styles.selectedBadge]}>{m.badge}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  selectedCard: {
    backgroundColor: THEME_COLORS.darkNavy,
    borderColor: THEME_COLORS.darkNavy,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedIconWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'transparent',
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  selectedTitle: {
    color: '#ffffff',
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME_COLORS.textSecondary,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  selectedBadge: {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
