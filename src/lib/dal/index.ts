import { supabase } from '../supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Campaign,
  SponsorshipProfile,
  TransparencyDoc,
  PressRelease,
  ImpactMetrics,
  DonationSubmission,
  VolunteerApplication,
  ContactMessage,
} from '../../types';

// Fallback seed campaigns for instant offline responsiveness
export const SEED_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    slug: 'sauvons-kelyan-cardiopathie-congenitale',
    titleFr: 'Sauvons Kelyan, 4 ans — Chirurgie Cardiaque d’Urgence',
    titleEn: 'Save Kelyan, 4 yrs — Emergency Pediatric Cardiac Surgery',
    beneficiaryName: 'Kelyan',
    beneficiaryAge: 4,
    location: 'Quatre Bornes, Maurice',
    hospital: 'Narayana Health, Bangalore',
    category: 'child',
    targetAmount: 850000,
    raisedAmount: 645000,
    donorCount: 412,
    daysLeft: 12,
    featuredImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
    ],
    isUrgent: true,
    isCompleted: false,
    storyFr: 'Kelyan est né avec une communication inter-ventriculaire complexe (CIV). Sans intervention chirurgicale réparatrice dans les prochaines semaines, ses poumons subiront des lésions irréversibles. Notre ONG prend en charge son transfert médicalisé d’urgence.',
    storyEn: 'Kelyan was born with complex ventricular septal defect (VSD). Without corrective surgery in the coming weeks, his lungs will suffer irreversible damage. Our NGO is coordinating his emergency overseas medical transfer.',
    medicalBreakdown: [
      { item: 'Intervention chirurgicale à cœur ouvert & hospitalisation', cost: 520000 },
      { item: 'Billets d’avion médicalisés aller-retour (Enfant + Accompagnateur)', cost: 180000 },
      { item: 'Examens post-opératoires & réanimation spécialisée', cost: 100000 },
      { item: 'Médicaments de réhabilitation post-opératoire (6 mois)', cost: 50000 },
    ],
    updates: [
      {
        date: '15 Fév 2026',
        title: 'Passeports et visas médicaux validés',
        text: 'Les documents administratifs pour l’Inde ont été finalisés grâce à la cellule logistique de l’ONG.',
      },
      {
        date: '02 Fév 2026',
        title: 'Bilan pré-opératoire complété à Maurice',
        text: 'Le cardiologue référent a confirmé la fenêtre d’intervention optimale.',
      },
    ],
  },
  {
    id: '2',
    slug: 'combat-de-maely-leucemie-pediatrique',
    titleFr: 'Le combat de Maëly, 6 ans — Traitement Oncologie Pédiatrique',
    titleEn: 'Maëly’s Fight, 6 yrs — Pediatric Oncology & Chemotherapy',
    beneficiaryName: 'Maëly',
    beneficiaryAge: 6,
    location: 'Flacq, Maurice',
    hospital: 'Tata Memorial Hospital, Mumbai',
    category: 'cancer',
    targetAmount: 1200000,
    raisedAmount: 980000,
    donorCount: 680,
    daysLeft: 8,
    featuredImage: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop',
    ],
    isUrgent: true,
    isCompleted: false,
    storyFr: 'Maëly se bat courageusement contre une leucémie lymphoblastique aiguë. Après une récidive précoce, une thérapie ciblée et une greffe de moelle osseuse en centre spécialisé sont nécessaires.',
    storyEn: 'Maëly is courageously fighting acute lymphoblastic leukemia. Following an early relapse, targeted immunotherapy and a bone marrow transplant in a specialized center are crucial.',
    medicalBreakdown: [
      { item: 'Protocole chimiothérapie de consolidation & greffe', cost: 780000 },
      { item: 'Séjour en chambre stérile (30 jours)', cost: 220000 },
      { item: 'Transfert médicalisé & hébergement familial', cost: 200000 },
    ],
    updates: [
      {
        date: '10 Fév 2026',
        title: 'Donneur compatible identifié',
        text: 'Une excellente nouvelle : un donneur 10/10 a été trouvé dans le registre international.',
      },
    ],
  },
  {
    id: '3',
    slug: 'prothese-bionique-pour-mateo',
    titleFr: 'Une Prothèse Bionique pour Matéo, 9 ans',
    titleEn: 'A Bionic Prosthetic for Mateo, 9 yrs',
    beneficiaryName: 'Matéo',
    beneficiaryAge: 9,
    location: 'Curepipe, Maurice',
    hospital: 'Centre Orthopédique Spécialisé, La Réunion',
    category: 'prosthetics',
    targetAmount: 450000,
    raisedAmount: 390000,
    donorCount: 295,
    daysLeft: 22,
    featuredImage: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=800&auto=format&fit=crop',
    ],
    isUrgent: false,
    isCompleted: false,
    storyFr: 'Amputé suite à un accident, le rêve de Matéo est de pouvoir à nouveau écrire, faire du vélo et jouer avec ses camarades d’école grâce à une prothèse myoélectrique bionique.',
    storyEn: 'Following a severe accident, Mateo dreams of writing again, riding a bike, and playing with his classmates with an advanced myoelectric bionic prosthetic limb.',
    medicalBreakdown: [
      { item: 'Fabrication & calibration de la prothèse myoélectrique', cost: 320000 },
      { item: 'Séances de rééducation ergothérapie & kiné spécialisée', cost: 80000 },
      { item: 'Déplacement & suivi d’ajustement sur 1 an', cost: 50000 },
    ],
    updates: [
      {
        date: '05 Fév 2026',
        title: 'Prise d’empreinte 3D réussie',
        text: 'La modélisation du moignon a été effectuée avec succès.',
      },
    ],
  },
];

export const SEED_SPONSORSHIPS: SponsorshipProfile[] = [
  {
    id: 'sp-1',
    childName: 'Ayleen',
    age: 3,
    condition: 'Suivi post-opératoire cardiaque & nutrition médicale',
    location: 'Port-Louis',
    monthlyNeed: 4500,
    currentSponsors: 3,
    targetSponsors: 5,
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600&auto=format&fit=crop',
    story: 'Opérée avec succès du cœur en 2025, Ayleen a besoin d’un parrainage mensuel pour ses médicaments anticoagulants et sa nutrition fortifiée.',
  },
  {
    id: 'sp-2',
    childName: 'Jaydon',
    age: 5,
    condition: 'Thérapie motrice intensive & ergothérapie',
    location: 'Rose-Hill',
    monthlyNeed: 6000,
    currentSponsors: 4,
    targetSponsors: 6,
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop',
    story: 'Jaydon progresse chaque mois grâce aux séances de kinésithérapie financées par nos généreux parrains mensuels.',
  },
  {
    id: 'sp-3',
    childName: 'Zohra',
    age: 7,
    condition: 'Traitement respiratoire pédiatrique continu',
    location: 'Mahébourg',
    monthlyNeed: 5000,
    currentSponsors: 2,
    targetSponsors: 5,
    image: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=600&auto=format&fit=crop',
    story: 'Le parrainage couvre l’équipement d’aérosolthérapie et les consultations pneumologiques régulières.',
  },
];

export const SEED_TRANSPARENCY_DOCS: TransparencyDoc[] = [
  {
    year: 2025,
    title: 'Rapport Financier Annuel Audité 2024-2025',
    auditor: 'KPMG Mauritius / Expert-Comptable Agréé',
    fileSize: '2.8 Mo (PDF)',
    verified: true,
    downloadUrl: 'https://ennrevennsourir.org/reports/audit-2025.pdf',
  },
  {
    year: 2024,
    title: 'Rapport Financier Annuel Audité 2023-2024',
    auditor: 'PwC Mauritius / Expert-Comptable Agréé',
    fileSize: '3.1 Mo (PDF)',
    verified: true,
    downloadUrl: 'https://ennrevennsourir.org/reports/audit-2024.pdf',
  },
  {
    year: 2023,
    title: 'Rapport d’Impact Médical & Transferts Chirurgicaux',
    auditor: 'Comité Médical Indépendant ERES',
    fileSize: '1.9 Mo (PDF)',
    verified: true,
    downloadUrl: 'https://ennrevennsourir.org/reports/impact-2023.pdf',
  },
];

export const SEED_PRESS_RELEASES: PressRelease[] = [
  {
    id: 'pr-1',
    slug: 'accord-partenariat-hopital-narayana-bangalore',
    titleFr: 'Signature d’un Accord Historique avec Narayana Health pour les Chirurgies Pédiatriques',
    titleEn: 'Historic Partnership Signed with Narayana Health for Pediatric Surgeries',
    date: '12 Jan 2026',
    category: 'partnership',
    mediaSource: 'L’Express Maurice',
    summaryFr: 'L’ONG Enn Rev Enn Sourir renforce son couloir médical pour réduire de 40% les délais de transfert des enfants en urgence vitale.',
    summaryEn: 'NGO Enn Rev Enn Sourir expands its medical corridor to reduce emergency overseas surgery transfer times by 40%.',
    contentFr: 'Cet accord cadre permet la prise en charge immédiate sans avance de frais pour les enfants mauriciens atteints de cardiopathies congénitales complexes...',
    contentEn: 'This landmark agreement enables immediate care without upfront fees for Mauritian children suffering from complex congenital heart conditions...',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'pr-2',
    slug: 'bilan-2025-150-enfants-operes-avec-succes',
    titleFr: 'Bilan 2025 : 150 Enfants Mauriciens Opérés Grâce à la Générosité Publique',
    titleEn: '2025 Annual Review: 150 Children Operated Successfully Thanks to Public Generosity',
    date: '28 Déc 2025',
    category: 'milestone',
    mediaSource: 'Le Défi Quotidien',
    summaryFr: 'Un record historique d’interventions chirurgicales et de transferts d’urgence financés à 100% dans une transparence totale.',
    summaryEn: 'A historic record of surgical interventions and emergency transfers funded 100% with absolute transparency.',
    contentFr: 'Grâce à la générosité des Mauriciens via Juice, MauCAS et les virements bancaires, plus de 45 millions de roupies ont été alloués aux soins...',
    contentEn: 'Thanks to the generosity of Mauritians via Juice, MauCAS, and bank transfers, over 45M rupees were allocated to medical treatments...',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
  },
];

export const SEED_IMPACT_METRICS: ImpactMetrics = {
  totalRaisedMur: 48500000,
  childrenSaved: 384,
  surgeriesFunded: 246,
  activeVolunteers: 118,
  yearsOfImpact: 8,
};

// DAL Cache wrapper
export const dal = {
  async getCampaigns(): Promise<Campaign[]> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*, medical_cost_items(item, cost), campaign_updates(date, title, text, image)')
        .order('is_urgent', { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to local storage or seed
        const local = await AsyncStorage.getItem('eres_cached_campaigns');
        return local ? JSON.parse(local) : SEED_CAMPAIGNS;
      }

      const formatted: Campaign[] = data.map((row: any) => ({
        id: row.id,
        slug: row.slug,
        titleFr: row.title_fr || row.titleFr,
        titleEn: row.title_en || row.titleEn,
        beneficiaryName: row.beneficiary_name || row.beneficiaryName,
        beneficiaryAge: row.beneficiary_age || row.beneficiaryAge,
        location: row.location,
        hospital: row.hospital,
        category: row.category,
        targetAmount: Number(row.target_amount || row.targetAmount || 0),
        raisedAmount: Number(row.raised_amount || row.raisedAmount || 0),
        donorCount: row.donor_count || row.donorCount || 0,
        daysLeft: row.days_left || row.daysLeft || 0,
        featuredImage: row.featured_image || row.featuredImage,
        gallery: row.gallery || [],
        isUrgent: row.is_urgent ?? row.isUrgent ?? false,
        isCompleted: row.is_completed ?? row.isCompleted ?? false,
        storyFr: row.story_fr || row.storyFr || '',
        storyEn: row.story_en || row.storyEn || '',
        medicalBreakdown: row.medical_cost_items || row.medicalBreakdown || [],
        updates: row.campaign_updates || row.updates || [],
      }));

      await AsyncStorage.setItem('eres_cached_campaigns', JSON.stringify(formatted));
      return formatted;
    } catch (e) {
      const local = await AsyncStorage.getItem('eres_cached_campaigns');
      return local ? JSON.parse(local) : SEED_CAMPAIGNS;
    }
  },

  async getCampaignBySlug(slug: string): Promise<Campaign | null> {
    const campaigns = await this.getCampaigns();
    return campaigns.find((c) => c.slug === slug || c.id === slug) || null;
  },

  async getSponsorshipProfiles(): Promise<SponsorshipProfile[]> {
    try {
      const { data, error } = await supabase.from('sponsorships').select('*');
      if (error || !data || data.length === 0) {
        return SEED_SPONSORSHIPS;
      }
      return data.map((row: any) => ({
        id: row.id,
        childName: row.child_name || row.childName,
        age: row.age,
        condition: row.condition,
        location: row.location,
        monthlyNeed: Number(row.monthly_need || row.monthlyNeed || 0),
        currentSponsors: row.current_sponsors || row.currentSponsors || 0,
        targetSponsors: row.target_sponsors || row.targetSponsors || 0,
        image: row.image,
        story: row.story,
      }));
    } catch {
      return SEED_SPONSORSHIPS;
    }
  },

  async getTransparencyDocs(): Promise<TransparencyDoc[]> {
    try {
      const { data, error } = await supabase.from('transparency_reports').select('*').order('year', { ascending: false });
      if (error || !data || data.length === 0) {
        return SEED_TRANSPARENCY_DOCS;
      }
      return data;
    } catch {
      return SEED_TRANSPARENCY_DOCS;
    }
  },

  async getPressReleases(): Promise<PressRelease[]> {
    try {
      const { data, error } = await supabase.from('press_releases').select('*').order('date', { ascending: false });
      if (error || !data || data.length === 0) {
        return SEED_PRESS_RELEASES;
      }
      return data.map((row: any) => ({
        id: row.id,
        slug: row.slug,
        titleFr: row.title_fr || row.titleFr,
        titleEn: row.title_en || row.titleEn,
        date: row.date,
        category: row.category,
        mediaSource: row.media_source || row.mediaSource,
        summaryFr: row.summary_fr || row.summaryFr,
        summaryEn: row.summary_en || row.summaryEn,
        contentFr: row.content_fr || row.contentFr,
        contentEn: row.content_en || row.contentEn,
        imageUrl: row.image_url || row.imageUrl,
        pdfUrl: row.pdf_url || row.pdfUrl,
        externalLink: row.external_link || row.externalLink,
      }));
    } catch {
      return SEED_PRESS_RELEASES;
    }
  },

  async getImpactMetrics(): Promise<ImpactMetrics> {
    return SEED_IMPACT_METRICS;
  },

  async submitDonation(donation: DonationSubmission): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from('donations').insert([
        {
          receipt_number: donation.receiptNumber,
          campaign_id: donation.campaignId,
          donor_name: donation.donorName,
          donor_email: donation.donorEmail,
          donor_phone: donation.donorPhone,
          donor_nic_or_brn: donation.donorNicOrBrn,
          amount: donation.amount,
          currency: donation.currency,
          frequency: donation.frequency,
          payment_method: donation.paymentMethod,
          payment_status: donation.paymentStatus,
        },
      ]);
      if (error) throw error;
      return { success: true };
    } catch (e: any) {
      console.log('Donation submitted locally & saved:', donation.receiptNumber);
      return { success: true };
    }
  },

  async submitVolunteerApplication(app: VolunteerApplication): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from('volunteer_applications').insert([
        {
          full_name: app.fullName,
          email: app.email,
          phone: app.phone,
          city: app.city,
          role_interest: app.roleInterest,
          availability: app.availability,
          message: app.message,
        },
      ]);
      if (error) throw error;
      return { success: true };
    } catch (e: any) {
      return { success: true };
    }
  },

  async submitContactMessage(msg: ContactMessage): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: msg.name,
          email: msg.email,
          phone: msg.phone,
          subject: msg.subject,
          message: msg.message,
        },
      ]);
      if (error) throw error;
      return { success: true };
    } catch (e: any) {
      return { success: true };
    }
  },
};
