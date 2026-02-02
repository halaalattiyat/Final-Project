
import { Specialty, Hospital, TreatmentProgram, MedicalService } from '../types';

export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: 's1',
    specialty: Specialty.CARDIOLOGY,
    titleAr: 'جراحة القلب والصدر',
    titleEn: 'Cardiothoracic Surgery',
    descriptionAr: 'عمليات القلب المفتوح والقسطرة العلاجية بأعلى معايير الدقة.',
    icon: '❤️',
    rating: 4.5,
    reviewCount: 450,
    keyFeatures: ['Open Heart', 'Valve Replacement', 'Therapeutic Catheterization']
  },
  {
    id: 's2',
    specialty: Specialty.ONCOLOGY,
    titleAr: 'مركز الحسين للسرطان',
    titleEn: 'Oncology (KHCC)',
    descriptionAr: 'علاجات الأورام المتكاملة، الكيماوي والإشعاعي والجراحي.',
    icon: '🎗️',
    rating: 4.9,
    reviewCount: 1200,
    keyFeatures: ['Chemotherapy', 'Surgical Oncology', 'Bone Marrow Transplant']
  },
  {
    id: 's3',
    specialty: Specialty.NATURAL_THERAPY,
    titleAr: 'العلاج الطبيعي والاستشفاء',
    titleEn: 'Natural Therapy & Wellness',
    descriptionAr: 'استشفاء طبيعي في البحر الميت لعلاج الأمراض الجلدية والمفاصل.',
    icon: '🌊',
    rating: 4.8,
    reviewCount: 890,
    keyFeatures: ['Psoriasis Treatment', 'Dead Sea Mud', 'Rheumatism Therapy']
  },
  {
    id: 's4',
    specialty: Specialty.FERTILITY,
    titleAr: 'الإخصاب وعلاج العقم',
    titleEn: 'IVF & Fertility Services',
    descriptionAr: 'نخبة المراكز المتخصصة في المساعدة على الإنجاب وتقنيات IVF.',
    icon: '👶',
    rating: 4.4,
    reviewCount: 600,
    keyFeatures: ['IVF / ICSI', 'Egg Freezing', 'Genetic Screening']
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    nameAr: 'المستشفى التخصصي',
    nameEn: 'Specialty Hospital',
    location: 'Amman, Shmeisani',
    type: 'Private Hospital',
    category: 'Multi-Specialty',
    rating: 4.9,
    reviewCount: 128,
    specialties: [Specialty.CARDIOLOGY, Specialty.ORTHOPEDICS],
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
    description: 'A leading medical center in the Middle East, accredited by JCI and HCAC.',
    accreditations: ['JCI', 'HCAC'],
    establishedYear: 1996,
    stats: { beds: 300, doctors: 150, surgeryRooms: 15 }
  },
  {
    id: 'h2',
    nameAr: 'مستشفى العبدلي',
    nameEn: 'Abdali Hospital',
    location: 'Amman, Abdali',
    type: 'Private Hospital',
    category: 'Multi-Specialty',
    rating: 4.8,
    reviewCount: 85,
    specialties: [Specialty.ORTHOPEDICS, Specialty.ONCOLOGY, Specialty.WELLNESS],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    description: 'A modern medical facility providing integrated care in the heart of the capital.',
    accreditations: ['JCI'],
    establishedYear: 2019,
    stats: { beds: 200, doctors: 90, surgeryRooms: 10 }
  }
];

export const PROGRAMS: TreatmentProgram[] = [
  {
    id: 'p1',
    hospitalId: 'h1',
    specialty: Specialty.ORTHOPEDICS,
    titleAr: 'تغيير مفصل الركبة الكامل',
    titleEn: 'Total Knee Replacement',
    durationDays: 7,
    basePrice: 5500,
    descriptionAr: 'برنامج شامل يتضمن الجراحة، الإقامة، والعلاج الطبيعي الأولي.',
    includes: ['Surgical Procedure', '3 Nights Stay', 'Lab Tests', 'Initial Physiotherapy'],
    roadmap: [
      { day: '1', titleAr: 'الوصول والتقييم', descriptionAr: 'مقابلة الجراح وإجراء الفحوصات اللازمة.' },
      { day: '2', titleAr: 'يوم الجراحة', descriptionAr: 'إجراء العملية الجراحية تحت إشراف طاقم متخصص.' },
      { day: '3-7', titleAr: 'الاستشفاء والفيزيائي', descriptionAr: 'بدء جلسات العلاج الطبيعي والمراقبة المستمرة.' }
    ]
  },
  {
    id: 'p2',
    hospitalId: 'h2',
    specialty: Specialty.WELLNESS,
    titleAr: 'فحص شامل بلس',
    titleEn: 'Executive Health Checkup',
    durationDays: 1,
    basePrice: 450,
    descriptionAr: 'تقييم صحي كامل مع استشارات كبار الأخصائيين.',
    includes: ['Full Blood Panels', 'Radiology Imaging', 'Cardiac Consult', 'Healthy Meal']
  }
];
