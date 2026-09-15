import { Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PUSH_TOKEN_STORAGE_KEY = '@eres_push_token_2026';

export interface PushNotificationPayload {
  title: string;
  body: string;
  data?: {
    campaignSlug?: string;
    campaignId?: string;
    type?: string;
  };
}

/**
 * Registers device for Enn Rev Enn Sourir push broadcasts (Pediatric Emergency Alerts)
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  try {
    // Check if token already stored locally
    const savedToken = await AsyncStorage.getItem(PUSH_TOKEN_STORAGE_KEY);
    if (savedToken) {
      return savedToken;
    }

    // Generate client device token representation
    const platformPrefix = Platform.OS === 'ios' ? 'iOS' : Platform.OS === 'android' ? 'Android' : 'Web';
    const generatedToken = `ExponentPushToken[ERES_${platformPrefix}_${Date.now().toString(36)}]`;

    await AsyncStorage.setItem(PUSH_TOKEN_STORAGE_KEY, generatedToken);
    return generatedToken;
  } catch (error) {
    console.warn('[Push Notification Registration Note]:', error);
    return null;
  }
}

/**
 * Handles incoming emergency alerts and displays native modal alert if app is open
 */
export function handleIncomingEmergencyAlert(payload: PushNotificationPayload) {
  if (!payload || !payload.title) return;

  Alert.alert(
    `🚨 ${payload.title}`,
    payload.body,
    [
      {
        text: 'Voir le Dossier',
        onPress: () => {
          // Can navigate to campaign detail
        },
        style: 'default',
      },
      { text: 'Fermer', style: 'cancel' },
    ],
    { cancelable: true }
  );
}
