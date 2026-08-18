import React, { createContext, useContext, useState } from 'react';
import { Campaign, DonationSubmission, PaymentMethod } from '../types';
import { dal } from '../lib/dal';

interface DonationContextType {
  isDonationModalVisible: boolean;
  selectedCampaign: Campaign | null;
  donationAmount: number;
  donationCurrency: 'MUR' | 'EUR' | 'USD' | 'GBP';
  donationFrequency: 'once' | 'monthly';
  selectedPaymentMethod: PaymentMethod;
  isReceiptModalVisible: boolean;
  currentReceipt: DonationSubmission | null;

  openDonationModal: (campaign?: Campaign | null, defaultAmount?: number, frequency?: 'once' | 'monthly') => void;
  closeDonationModal: () => void;
  setDonationAmount: (amount: number) => void;
  setDonationCurrency: (currency: 'MUR' | 'EUR' | 'USD' | 'GBP') => void;
  setDonationFrequency: (freq: 'once' | 'monthly') => void;
  setSelectedPaymentMethod: (method: PaymentMethod) => void;

  processDonation: (donorData: {
    name: string;
    email: string;
    phone?: string;
    nicOrBrn?: string;
  }) => Promise<DonationSubmission>;

  openReceiptModal: (receipt: DonationSubmission) => void;
  closeReceiptModal: () => void;
}

const DonationContext = createContext<DonationContextType>({} as DonationContextType);

export const DonationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDonationModalVisible, setIsDonationModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(1000);
  const [donationCurrency, setDonationCurrency] = useState<'MUR' | 'EUR' | 'USD' | 'GBP'>('MUR');
  const [donationFrequency, setDonationFrequency] = useState<'once' | 'monthly'>('once');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('juice');

  const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<DonationSubmission | null>(null);

  const openDonationModal = (campaign: Campaign | null = null, defaultAmount?: number, frequency: 'once' | 'monthly' = 'once') => {
    setSelectedCampaign(campaign);
    if (defaultAmount) setDonationAmount(defaultAmount);
    setDonationFrequency(frequency);
    setIsDonationModalVisible(true);
  };

  const closeDonationModal = () => {
    setIsDonationModalVisible(false);
  };

  const openReceiptModal = (receipt: DonationSubmission) => {
    setCurrentReceipt(receipt);
    setIsReceiptModalVisible(true);
  };

  const closeReceiptModal = () => {
    setIsReceiptModalVisible(false);
  };

  const processDonation = async (donorData: {
    name: string;
    email: string;
    phone?: string;
    nicOrBrn?: string;
  }): Promise<DonationSubmission> => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const receiptNumber = `ERES-2026-${randomSuffix}`;

    const submission: DonationSubmission = {
      id: `don_${Date.now()}`,
      receiptNumber,
      campaignId: selectedCampaign?.id,
      campaignTitle: selectedCampaign ? selectedCampaign.titleFr : 'Fonds d’Urgence Chirurgicale ERES',
      beneficiaryName: selectedCampaign ? selectedCampaign.beneficiaryName : 'Enfants en Attente de Soins',
      donorName: donorData.name || 'Donateur Anonyme',
      donorEmail: donorData.email || '',
      donorPhone: donorData.phone,
      donorNicOrBrn: donorData.nicOrBrn,
      amount: donationAmount,
      currency: donationCurrency,
      frequency: donationFrequency,
      paymentMethod: selectedPaymentMethod,
      paymentStatus: 'completed',
      timestamp: new Date().toISOString(),
    };

    await dal.submitDonation(submission);
    setCurrentReceipt(submission);
    setIsDonationModalVisible(false);
    setIsReceiptModalVisible(true);

    return submission;
  };

  return (
    <DonationContext.Provider
      value={{
        isDonationModalVisible,
        selectedCampaign,
        donationAmount,
        donationCurrency,
        donationFrequency,
        selectedPaymentMethod,
        isReceiptModalVisible,
        currentReceipt,
        openDonationModal,
        closeDonationModal,
        setDonationAmount,
        setDonationCurrency,
        setDonationFrequency,
        setSelectedPaymentMethod,
        processDonation,
        openReceiptModal,
        closeReceiptModal,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => useContext(DonationContext);
