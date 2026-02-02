
export enum Specialty {
  CARDIOLOGY = 'CARDIOLOGY',
  ORTHOPEDICS = 'ORTHOPEDICS',
  ONCOLOGY = 'ONCOLOGY',
  OPHTHALMOLOGY = 'OPHTHALMOLOGY',
  FERTILITY = 'FERTILITY',
  DENTAL = 'DENTAL',
  WELLNESS = 'WELLNESS',
  DERMATOLOGY = 'DERMATOLOGY',
  HAIR_TRANSPLANT = 'HAIR_TRANSPLANT',
  NEUROSURGERY = 'NEUROSURGERY',
  GENERAL_SURGERY = 'GENERAL_SURGERY',
  REHABILITATION = 'REHABILITATION',
  NATURAL_THERAPY = 'NATURAL_THERAPY'
}

export interface MedicalService {
  id: string;
  specialty: Specialty;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  icon: string;
  rating: number;
  reviewCount: number;
  keyFeatures: string[];
}

export interface Hospital {
  id: string;
  nameAr: string;
  nameEn: string;
  location: string;
  type: string;
  category: string;
  rating: number;
  reviewCount: number;
  specialties: Specialty[];
  image: string;
  description: string;
  accreditations: string[];
  establishedYear?: number;
  stats?: {
    beds: number;
    doctors: number;
    surgeryRooms: number;
  };
  gallery?: string[];
}

export interface TreatmentProgram {
  id: string;
  titleAr: string;
  titleEn: string;
  hospitalId: string;
  specialty: Specialty;
  durationDays: number;
  basePrice: number;
  descriptionAr: string;
  includes: string[];
  roadmap?: { day: string; titleAr: string; descriptionAr: string; }[];
  mainDoctor?: {
    id: string;
    nameAr: string;
    titleAr: string;
    image: string;
    specialty: Specialty;
    experienceYears: number;
  };
}

export enum BookingStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Booking {
  id: string;
  patientId: string;
  programId: string;
  status: BookingStatus;
  preferredDate: string;
  medicalNotes: string;
  files: string[];
  createdAt: string;
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  VERIFYING = 'VERIFYING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface PriceBreakdown {
  baseTreatment: number;
  hospitalFees: number;
  platformFee: number;
  total: number;
}

export interface ChatThread {
  id: string;
  bookingId: string;
  patientId: string;
  lastMessage: string;
  updatedAt: string;
  participants: string[];
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export enum MedicalRecordCategory {
  RADIOLOGY = 'RADIOLOGY',
  LAB_RESULTS = 'LAB_RESULTS',
  PRESCRIPTION = 'PRESCRIPTION',
  SURGERY_REPORT = 'SURGERY_REPORT',
  GENERAL = 'GENERAL'
}

export enum VisibilityLevel {
  PRIVATE = 'PRIVATE',
  COORDINATOR = 'COORDINATOR',
  HOSPITAL = 'HOSPITAL'
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  title: string;
  category: MedicalRecordCategory;
  fileUrl: string;
  fileType: string;
  uploadDate: string;
  visibility: VisibilityLevel;
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED'
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  bookingId: string;
  hospitalId: string;
  programId: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
}
