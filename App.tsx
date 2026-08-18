import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from './src/context/LanguageContext';
import { DonationProvider } from './src/context/DonationContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { DonationModal } from './src/components/DonationModal';
import { ReceiptModal } from './src/components/ReceiptModal';

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <DonationProvider>
          <StatusBar style="light" />
          <RootNavigator />
          <DonationModal />
          <ReceiptModal />
        </DonationProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
