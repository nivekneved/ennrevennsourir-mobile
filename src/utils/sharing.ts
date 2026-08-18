import { Share, Alert, Platform } from 'react-native';

export async function shareCampaignNative(title: string, url: string, beneficiaryName: string): Promise<void> {
  try {
    await Share.share({
      title: `Soutenez ${beneficiaryName} — Enn Rev Enn Sourir`,
      message: `❤️ Soutenez ${beneficiaryName} avec l'ONG Enn Rev Enn Sourir : ${title}\n\nFaites un don sécurisé ici : ${url}`,
      url: Platform.OS === 'ios' ? url : undefined,
    });
  } catch (error: any) {
    Alert.alert('Erreur', 'Impossible de partager pour le moment.');
  }
}

export async function shareReceiptNative(receiptText: string): Promise<void> {
  try {
    await Share.share({
      title: 'Reçu de Don — Enn Rev Enn Sourir',
      message: receiptText,
    });
  } catch {
    // ignore
  }
}
