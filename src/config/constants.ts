/**
 * Enn Rev Enn Sourir (ONG 15420) - Mobile Configuration & Constants
 */

export const NGO_CONFIG = {
  name: 'Enn Rev Enn Sourir',
  legalName: 'Enn Rev Enn Sourir NGO',
  registrationNumber: 'ONG 15006',
  foundedYear: 2016,
  mraTaxReliefSection: 'Section 50L of Income Tax Act 1995',
  mraDeductionRate: '100% Tax Deductible (Mauritius)',
  phone: '(+230) 5909 92 19',
  whatsappNumber: '+23059099219',
  whatsappLink: 'https://wa.me/23059099219?text=Bonjour%20Enn%20Rev%20Enn%20Sourir,%20je%20souhaite%20des%20renseignements',
  emergencyPhone: '(+230) 5909 92 19',
  email: 'info@ennrevennsourir.org',
  website: 'https://ennrevennsourir.org',
  address: 'Farquhar St, Port Louis, Mauritius',
  googleMapsUrl: 'https://www.google.com/search?sca_esv=477d0fc8f5dc8163&sxsrf=APpeQnsGxhnkoysOnfIl-krpbY9K1bRHqQ:1792408551143&q=enn+rev+enn+sourir+address&ludocid=5278710577023341572&sa=X&ved=2ahUKEwiYse6X-sWXAxUPwAIHHR7xJlsQ6BN6BAgyEAI',
  hours: 'Lun - Sam: 08:30 - 18:00 (Urgences 24/7)',
};

export const BANKING_DETAILS = {
  juice: {
    name: 'MCB Juice',
    merchantNumber: '5909 9219',
    accountName: 'ENN REV ENN SOURIR',
    qrPayload: 'JUICEPAY:0023059099219?name=ENN%20REV%20ENN%20SOURIR&ref=ERES-MOBILE',
  },
  maucas: {
    name: 'MauCAS Instant QR',
    merchantId: 'ERES-MAUCAS-58169420',
    qrPayload: 'MAUCAS:ERES-MAUCAS-58169420?name=ENN%20REV%20ENN%20SOURIR',
  },
  bankAccounts: [
    {
      bank: 'MCB (Mauritius Commercial Bank)',
      accountName: 'Enn Rev Enn Sourir',
      accountNumber: '000445241977',
      iban: 'MU23MCBL09010000445241977000',
      swift: 'MCBLMUMU',
      currency: 'MUR',
    },
    {
      bank: 'SBM (State Bank of Mauritius)',
      accountName: 'Enn Rev Enn Sourir',
      accountNumber: '61030100089123',
      iban: 'MU45STBL088900061030100089123',
      swift: 'STBLMUMU',
      currency: 'MUR',
    },
    {
      bank: 'Absa Bank Mauritius (EUR / USD)',
      accountName: 'Enn Rev Enn Sourir Overseas Aid',
      accountNumber: '0151029384',
      iban: 'MU78BARC08870000015102938400',
      swift: 'BARCMUMU',
      currency: 'EUR / USD',
    },
  ],
  blink: {
    name: 'Blink / Emtel',
    id: '5816 9420',
  },
  mytMoney: {
    name: 'my.t money (Mauritius Telecom)',
    id: '5816 9420',
  },
};

export const PRESET_AMOUNTS = {
  MUR: [250, 500, 1000, 2500, 5000],
  EUR: [10, 25, 50, 100, 200],
  USD: [15, 30, 60, 120, 250],
  GBP: [10, 20, 50, 100, 200],
};

export const THEME_COLORS = {
  primary: '#059669', // Emerald 600
  primaryDark: '#047857',
  primaryLight: '#d1fae5',
  accent: '#e11d48', // Rose 600
  accentDark: '#be123c',
  accentLight: '#ffe4e6',
  warning: '#d97706', // Amber 600
  darkNavy: '#0f172a', // Slate 900
  darkBg: '#1e293b', // Slate 800
  cardBg: '#ffffff',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  surface: '#f8fafc',
  white: '#ffffff',
  success: '#10b981',
};
