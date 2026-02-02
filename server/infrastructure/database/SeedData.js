
/**
 * Editable Seed Data for Medical Centers and Programs
 * This mirrors the data provided in the Excel/JSON requirements.
 */
export const seedData = {
  hospitals: [
    {
      id: 'h1',
      nameAr: 'المستشفى التخصصي',
      nameEn: 'Specialty Hospital',
      location: 'عمان، الشميساني',
      rating: 4.9,
      reviewCount: 128,
      specialties: ['CARDIOLOGY', 'ORTHOPEDICS'],
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
      description: 'صرح طبي متميز حاصل على اعتمادات دولية متعددة.',
      accreditations: ['JCI', 'HCAC']
    },
    {
      id: 'h2',
      nameAr: 'مستشفى العبدلي',
      nameEn: 'Abdali Hospital',
      location: 'عمان، العبدلي',
      rating: 4.8,
      reviewCount: 85,
      specialties: ['ONCOLOGY', 'WELLNESS'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      description: 'مركز طبي حديث يقدم رعاية متكاملة في قلب العاصمة.',
      accreditations: ['JCI']
    }
  ],
  programs: [
    {
      id: 'p1',
      hospitalId: 'h1',
      titleAr: 'تغيير مفصل الركبة الكامل',
      titleEn: 'Total Knee Replacement',
      durationDays: 7,
      basePrice: 5500,
      descriptionAr: 'برنامج شامل يتضمن الجراحة، الإقامة، والعلاج الطبيعي الأولي.',
      includes: ['الجراحة', 'إقامة ٣ ليالي', 'فحوصات مخبرية', 'علاج طبيعي']
    },
    {
      id: 'p2',
      hospitalId: 'h2',
      titleAr: 'فحص شامل بلس',
      titleEn: 'Executive Health Checkup',
      durationDays: 1,
      basePrice: 450,
      descriptionAr: 'تقييم صحي كامل مع استشارات كبار الأخصائيين.',
      includes: ['تحاليل دم شاملة', 'تصوير إشعاعي', 'استشارة قلبية', 'وجبة صحية']
    }
  ]
};
