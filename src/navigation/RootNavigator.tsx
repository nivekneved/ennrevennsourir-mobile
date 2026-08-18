import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Home,
  Heart,
  HeartHandshake,
  Menu,
  Gift,
} from 'lucide-react-native';

import { HomeScreen } from '../screens/HomeScreen';
import { CampaignsScreen } from '../screens/CampaignsScreen';
import { CampaignDetailScreen } from '../screens/CampaignDetailScreen';
import { SponsorshipScreen } from '../screens/SponsorshipScreen';
import { TransparencyScreen } from '../screens/TransparencyScreen';
import { VolunteerScreen } from '../screens/VolunteerScreen';
import { PressScreen } from '../screens/PressScreen';
import { PressDetailScreen } from '../screens/PressDetailScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { MoreScreen } from '../screens/MoreScreen';

import { useLanguage } from '../context/LanguageContext';
import { useDonation } from '../context/DonationContext';
import { THEME_COLORS } from '../config/constants';
import { triggerLightHaptic } from '../utils/haptics';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const EmptyComponent = () => <View style={{ flex: 1, backgroundColor: '#ffffff' }} />;

const BottomTabs = () => {
  const { t } = useLanguage();
  const { openDonationModal } = useDonation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEME_COLORS.accent,
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size }) => <Home size={size - 2} color={color} />,
        }}
      />
      <Tab.Screen
        name="CampaignsTab"
        component={CampaignsScreen}
        options={{
          tabBarLabel: t('campaigns'),
          tabBarIcon: ({ color, size }) => <Heart size={size - 2} color={color} />,
        }}
      />
      <Tab.Screen
        name="DonateTab"
        component={EmptyComponent}
        options={{
          tabBarLabel: t('donate'),
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => {
                triggerLightHaptic();
                openDonationModal();
              }}
              style={styles.centerDonateTabButton}
              activeOpacity={0.85}
            >
              <View style={styles.centerDonateIconCircle}>
                <Gift size={22} color="#ffffff" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="SponsorshipTab"
        component={SponsorshipScreen}
        options={{
          tabBarLabel: t('sponsorship'),
          tabBarIcon: ({ color, size }) => <HeartHandshake size={size - 2} color={color} />,
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreScreen}
        options={{
          tabBarLabel: t('more'),
          tabBarIcon: ({ color, size }) => <Menu size={size - 2} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} />
        <Stack.Screen name="Transparency" component={TransparencyScreen} />
        <Stack.Screen name="Volunteer" component={VolunteerScreen} />
        <Stack.Screen name="Press" component={PressScreen} />
        <Stack.Screen name="PressDetail" component={PressDetailScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centerDonateTabButton: {
    top: -12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerDonateIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME_COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: THEME_COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
});
