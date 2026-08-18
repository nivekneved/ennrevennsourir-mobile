import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'fr' | 'en';

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

export const DICTIONARY: Translations = {
  // Navigation & Common
  home: { fr: 'Accueil', en: 'Home' },
  campaigns: { fr: 'Combats', en: 'Campaigns' },
  donate: { fr: 'Faire un Don', en: 'Donate' },
  sponsorship: { fr: 'Parrainage', en: 'Sponsor' },
  more: { fr: 'Plus', en: 'More' },
  transparency: { fr: 'Transparence', en: 'Transparency' },
  volunteer: { fr: 'Bénévolat', en: 'Volunteer' },
  press: { fr: 'Presse', en: 'Press' },
  contact: { fr: 'Contact', en: 'Contact' },
  back: { fr: 'Retour', en: 'Back' },
  share: { fr: 'Partager', en: 'Share' },
  copied: { fr: 'Copié dans le presse-papier !', en: 'Copied to clipboard!' },
  loading: { fr: 'Chargement en cours...', en: 'Loading...' },
  error: { fr: 'Une erreur est survenue', en: 'An error occurred' },
  success: { fr: 'Succès', en: 'Success' },
  cancel: { fr: 'Annuler', en: 'Cancel' },
  confirm: { fr: 'Confirmer', en: 'Confirm' },
  ngoBadge: { fr: 'ONG Agréée 15420 • Île Maurice', en: 'Registered NGO 15420 • Mauritius' },

  // Home Screen
  urgentAlert: { fr: 'URGENCE CHIRURGICALE EN COURS', en: 'CRITICAL SURGERY IN PROGRESS' },
  heroTitle: { fr: 'Chaque battement compte.', en: 'Every heartbeat matters.' },
  heroSubtitle: {
    fr: 'Sauvons ensemble les enfants mauriciens atteints de cardiopathies congénitales et maladies graves nécessitant des chirurgies vitales à l’étranger.',
    en: 'Together, let’s save Mauritian children suffering from congenital heart diseases and severe conditions requiring life-saving overseas surgeries.',
  },
  quickDonate: { fr: 'Don Rapide', en: 'Quick Donation' },
  monthly: { fr: 'Mensuel', en: 'Monthly' },
  oneTime: { fr: 'Une fois', en: 'One-time' },
  customAmount: { fr: 'Autre montant', en: 'Custom amount' },
  heroDonateCta: { fr: 'Faire un Don Sécurisé', en: 'Make a Secure Donation' },
  impactTitle: { fr: 'Notre Impact Médical Réel', en: 'Our Real Medical Impact' },
  totalRaised: { fr: 'Fonds Récoltés', en: 'Total Funds Raised' },
  childrenSaved: { fr: 'Vies Sauvées', en: 'Children Saved' },
  surgeriesFunded: { fr: 'Chirurgies Financées', en: 'Surgeries Funded' },
  activeVolunteers: { fr: 'Bénévoles Actifs', en: 'Active Volunteers' },
  featuredEmergency: { fr: 'Urgence Vitale Prioritaire', en: 'Priority Vital Emergency' },
  seeAllCampaigns: { fr: 'Voir tous les combats', en: 'See all campaigns' },

  // Medical Pathway
  pathwayTitle: { fr: 'Notre Parcours de Prise en Charge', en: 'Our 4-Step Care Pathway' },
  pathwayStep1: { fr: '1. Diagnostic & Bilan', en: '1. Audit & Diagnosis' },
  pathwayStep1Desc: { fr: 'Validation par notre comité médical indépendant.', en: 'Validation by independent medical board.' },
  pathwayStep2: { fr: '2. Financement 100%', en: '2. 100% Funding' },
  pathwayStep2Desc: { fr: 'Collecte transparente sans aucun frais prélevé.', en: 'Transparent campaign with 0% admin fees.' },
  pathwayStep3: { fr: '3. Transfert & Chirurgie', en: '3. Overseas Surgery' },
  pathwayStep3Desc: { fr: 'Évacuation médicale vers nos hôpitaux partenaires.', en: 'Medical transfer to partner surgical centers.' },
  pathwayStep4: { fr: '4. Sourire & Suivi', en: '4. Healing & Post-Op' },
  pathwayStep4Desc: { fr: 'Suivi post-opératoire et retour au pays.', en: 'Long-term rehabilitation and return home.' },

  // Campaigns Screen & Filters
  allCategories: { fr: 'Tous', en: 'All' },
  catChild: { fr: 'Cardiopathies Pédiatriques', en: 'Pediatric Cardiac' },
  catCancer: { fr: 'Oncologie & Leucémie', en: 'Oncology & Leukemia' },
  catEmergency: { fr: 'Urgences Vitales', en: 'Vital Emergencies' },
  catProsthetics: { fr: 'Prothèses Bioniques', en: 'Bionic Prosthetics' },
  catAdolescent: { fr: 'Adolescents', en: 'Adolescents' },
  searchPlaceholder: { fr: 'Rechercher un enfant, un diagnostic...', en: 'Search child name, diagnosis...' },
  raisedOf: { fr: 'récoltés sur', en: 'raised of' },
  donors: { fr: 'donateurs', en: 'donors' },
  daysRemaining: { fr: 'jours restants', en: 'days remaining' },
  supportChild: { fr: 'Soutenir cet enfant', en: 'Support this child' },

  // Campaign Detail
  medicalBreakdownTitle: { fr: 'Transparence des Coûts Médicaux', en: 'Medical Cost Breakdown' },
  updatesTitle: { fr: 'Dernières Nouvelles & Évolution', en: 'Verified Medical Updates' },
  hospital: { fr: 'Hôpital Partenaire', en: 'Partner Hospital' },
  age: { fr: 'Âge', en: 'Age' },
  yearsOld: { fr: 'ans', en: 'years old' },
  monthsOld: { fr: 'mois', en: 'months old' },
  location: { fr: 'Origine', en: 'Origin' },

  // Donation Flow & Modal
  donationTitle: { fr: 'Faire un Don — ONG 15420', en: 'Make a Donation — NGO 15420' },
  chooseAmount: { fr: '1. Choisissez le montant', en: '1. Select amount' },
  choosePaymentMethod: { fr: '2. Mode de paiement sécurisé', en: '2. Secure payment method' },
  donorInfo: { fr: '3. Vos coordonnées (Optionnel pour reçu)', en: '3. Donor details (For tax receipt)' },
  fullName: { fr: 'Nom complet', en: 'Full Name' },
  emailAddress: { fr: 'Adresse email', en: 'Email Address' },
  phoneNumber: { fr: 'Numéro de téléphone (WhatsApp)', en: 'Phone number (WhatsApp)' },
  nicOrBrn: { fr: 'Numéro NIC (Maurice) ou BRN (Entreprise)', en: 'NIC (Mauritius) or BRN (Corporate)' },
  mraTaxNotice: {
    fr: 'Déduction fiscale MRA : 100% déductible selon la Section 50L de l’Income Tax Act.',
    en: 'MRA Tax Relief: 100% tax-deductible under Section 50L of the Mauritian Income Tax Act.',
  },
  generateReceipt: { fr: 'Obtenir mon Reçu Fiscal Numérique', en: 'Generate Digital Tax Receipt' },
  juiceQrInstructions: {
    fr: 'Scannez ce QR Code avec votre application MCB Juice ou effectuez un virement sur le 5757 0000.',
    en: 'Scan this QR Code with your MCB Juice app or transfer directly to 5757 0000.',
  },
  maucasInstructions: {
    fr: 'Compatible avec toutes les banques mauriciennes (SBM, Absa, MCB, Blink, my.t money, Pop).',
    en: 'Compatible with all Mauritian banks (SBM, Absa, MCB, Blink, my.t money, Pop).',
  },
  copyNumber: { fr: 'Copier le numéro', en: 'Copy number' },
  copyIban: { fr: 'Copier l’IBAN', en: 'Copy IBAN' },
  bankTransferDetails: { fr: 'Comptes Bancaires Officiels ONG', en: 'Official NGO Bank Accounts' },

  // Receipt Modal
  receiptTitle: { fr: 'Reçu de Don Officiel', en: 'Official Donation Receipt' },
  receiptNumber: { fr: 'N° de Reçu', en: 'Receipt No.' },
  receiptDate: { fr: 'Date & Heure', en: 'Date & Time' },
  receiptDonor: { fr: 'Donateur', en: 'Donor' },
  receiptAmount: { fr: 'Montant du Don', en: 'Donation Amount' },
  receiptBeneficiary: { fr: 'Affectation', en: 'Designation' },
  receiptGeneralFund: { fr: 'Fonds d’Urgence Chirurgicale ERES', en: 'ERES Emergency Surgical Fund' },
  receiptTaxStatus: {
    fr: 'Certifié conforme pour déduction fiscale MRA (Section 50L)',
    en: 'Certified for MRA Tax Relief deduction (Section 50L)',
  },
  shareReceipt: { fr: 'Partager / Télécharger le Reçu', en: 'Share / Save Receipt' },

  // Parrainage Screen
  sponsorshipHeroTitle: { fr: 'Programme Parrainage Mensuel', en: 'Monthly Sponsorship Program' },
  sponsorshipSubtitle: {
    fr: 'Accompagnez un enfant guéri dans sa rééducation, ses médicaments et son épanouissement durable.',
    en: 'Support a recovered child in long-term rehabilitation, specialized medication, and schooling.',
  },
  sponsorsCount: { fr: 'parrains actifs', en: 'active sponsors' },
  targetSponsorsCount: { fr: 'parrains nécessaires', en: 'sponsors needed' },
  monthlyPledge: { fr: 'Devenir Parrain (dès 500 MUR/mois)', en: 'Become a Sponsor (from 500 MUR/mo)' },

  // Transparency Screen
  transparencyHeroTitle: { fr: 'Transparence Totale & Gouvernance', en: 'Complete Transparency & Governance' },
  zeroPercentFeeTitle: { fr: 'Modèle 100% Direct Impact', en: '100% Direct Impact Model' },
  zeroPercentFeeDesc: {
    fr: 'Chaque roupie donnée pour un enfant est intégralement versée aux hôpitaux et chirurgiens. Les frais de fonctionnement sont pris en charge par des mécènes institutionnels dédiés.',
    en: 'Every rupee donated for a child goes 100% to hospitals and surgeons. NGO operating costs are separately funded by dedicated institutional patrons.',
  },
  auditedReportsTitle: { fr: 'Rapports Financiers & Audits Annuels', en: 'Audited Financial Statements' },
  downloadPdf: { fr: 'Consulter / Télécharger PDF', en: 'View / Download PDF' },
  registrationDetailsTitle: { fr: 'Agréments & Reconnaissances Officielles', en: 'Legal Accreditations & Registry' },

  // Volunteer Screen
  volunteerHeroTitle: { fr: 'Rejoignez Notre Équipe de Bénévoles', en: 'Join Our Volunteer Team' },
  volunteerSubtitle: {
    fr: 'Vos compétences peuvent sauver des vies. Mettez votre énergie au service des enfants malades.',
    en: 'Your skills can save lives. Put your energy to work for sick children.',
  },
  volunteerRoleInterest: { fr: 'Domaine de compétence souhaité', en: 'Area of interest / skills' },
  volunteerRoleMedical: { fr: 'Coordination Médicale & Infirmerie', en: 'Medical Coordination & Nursing' },
  volunteerRoleLogistics: { fr: 'Logistique & Transferts Aéroport', en: 'Logistics & Airport Transfers' },
  volunteerRoleEvents: { fr: 'Événements & Levées de Fonds', en: 'Events & Fundraising' },
  volunteerRoleMedia: { fr: 'Communication & Réseaux Sociaux', en: 'Media, Design & Translation' },
  volunteerAvailability: { fr: 'Disponibilité', en: 'Availability' },
  volunteerCity: { fr: 'Ville / Région à Maurice', en: 'City / Region in Mauritius' },
  volunteerMessage: { fr: 'Pourquoi souhaitez-vous nous rejoindre ?', en: 'Why do you wish to join us?' },
  submitApplication: { fr: 'Envoyer ma Candidature', en: 'Submit Volunteer Application' },
  applicationSubmitted: { fr: 'Merci ! Notre coordinateur vous contactera sous 48h.', en: 'Thank you! Our coordinator will contact you within 48h.' },

  // Press Screen
  pressHeroTitle: { fr: 'Espace Presse & Actualités', en: 'Press Room & Media Updates' },
  pressSubtitle: { fr: 'Communiqués officiels, apparitions médias et étapes clés.', en: 'Official statements, media coverage, and key milestones.' },

  // Contact Screen
  contactHeroTitle: { fr: 'Contactez-Nous & Urgences', en: 'Contact Us & Emergency Line' },
  emergency247: { fr: 'Ligne d’Urgence Vitale 24/7', en: '24/7 Vital Emergency Line' },
  whatsappDirect: { fr: 'Discussion Directe WhatsApp', en: 'Direct WhatsApp Chat' },
  sendMessageTitle: { fr: 'Envoyer un Message', en: 'Send a Message' },
  subject: { fr: 'Objet du message', en: 'Subject' },
  message: { fr: 'Votre message', en: 'Your message' },
  send: { fr: 'Envoyer', en: 'Send' },
  messageSent: { fr: 'Votre message a bien été envoyé !', en: 'Your message has been sent!' },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('fr');

  useEffect(() => {
    AsyncStorage.getItem('eres_mobile_lang').then((stored) => {
      if (stored === 'fr' || stored === 'en') {
        setLangState(stored);
      }
    });
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    AsyncStorage.setItem('eres_mobile_lang', newLang);
  };

  const toggleLang = () => {
    const next = lang === 'fr' ? 'en' : 'fr';
    setLang(next);
  };

  const t = (key: string): string => {
    const entry = DICTIONARY[key];
    if (entry) {
      return entry[lang] || entry.fr;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
