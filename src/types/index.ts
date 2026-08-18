/**
 * Enn Rev Enn Sourir (ONG 15420) - Mobile Domain & Database Types
 * Mirrors the Webapp PostgreSQL schema & DAL data types.
 */

export type CampaignCategory = 'all' | 'child' | 'cancer' | 'emergency' | 'prosthetics' | 'adolescent';
export type PaymentMethod = 'juice' | 'maucas' | 'mytmoney' | 'blink' | 'paypal' | 'card' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PressCategory = 'communique' | 'media_coverage' | 'partnership' | 'milestone';

export interface MedicalCostItem {
  id?: string;
  item: string;
  cost: number;
}

export interface CampaignUpdate {
  id?: string;
  date: string;
  title: string;
  text: string;
  image?: string;
}

export interface Campaign {
  id: string;
  slug: string;
  titleFr: string;
  titleEn: string;
  beneficiaryName: string;
  beneficiaryAge: number;
  location: string;
  hospital: string;
  category: 'child' | 'cancer' | 'emergency' | 'prosthetics' | 'adolescent';
  targetAmount: number;
  raisedAmount: number;
  donorCount: number;
  daysLeft: number;
  featuredImage: string;
  gallery: string[];
  isUrgent: boolean;
  isCompleted?: boolean;
  storyFr: string;
  storyEn: string;
  medicalBreakdown: MedicalCostItem[];
  updates: CampaignUpdate[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SponsorshipProfile {
  id: string;
  childName: string;
  age: number;
  condition: string;
  location: string;
  monthlyNeed: number;
  currentSponsors: number;
  targetSponsors: number;
  image: string;
  story: string;
}

export interface TransparencyDoc {
  id?: string;
  year: number;
  title: string;
  auditor: string;
  fileSize: string;
  verified: boolean;
  downloadUrl: string;
}

export interface PressRelease {
  id: string;
  slug: string;
  titleFr: string;
  titleEn: string;
  date: string;
  category: PressCategory;
  mediaSource?: string;
  summaryFr: string;
  summaryEn: string;
  contentFr: string;
  contentEn: string;
  imageUrl: string;
  pdfUrl?: string;
  externalLink?: string;
}

export interface ImpactMetrics {
  totalRaisedMur: number;
  childrenSaved: number;
  surgeriesFunded: number;
  activeVolunteers: number;
  yearsOfImpact: number;
}

export interface DonationSubmission {
  id: string;
  receiptNumber: string;
  campaignId?: string;
  campaignTitle?: string;
  beneficiaryName?: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  donorNicOrBrn?: string;
  amount: number;
  currency: 'MUR' | 'EUR' | 'USD' | 'GBP';
  frequency: 'once' | 'monthly';
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  timestamp: string;
}

export interface VolunteerApplication {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  roleInterest: string;
  availability: string;
  message?: string;
  createdAt?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt?: string;
}
