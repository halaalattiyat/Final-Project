
import React, { createContext, useContext } from 'react';

interface LanguageContextType {
  // Fix: Update type to include 'ar' to allow valid comparisons in components
  language: 'en' | 'ar';
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<string, string> = {
  // Navigation
  'nav.home': 'Home',
  'nav.services': 'Specialties',
  'nav.hospitals': 'Hospitals',
  'nav.login': 'Login',
  'nav.logout': 'Logout',
  'nav.profile': 'My Medical Profile',
  'nav.admin': 'Dashboard',
  'nav.register': 'Register',
  
  // Auth Forms
  'auth.login_title': 'Welcome Back',
  'auth.login_subtitle': 'Login to manage your medical journey',
  'auth.email': 'Email Address',
  'auth.password': 'Password',
  'auth.login_btn': 'Login to Platform',
  'auth.demo_accounts': 'Demo Accounts',
  'auth.fill_hint': 'Click to fill',
  'auth.admin_account': 'Admin Account',
  'auth.patient_account': 'Patient Account',
  'auth.no_account': "Don't have an account?",
  'auth.register_link': 'Create new account',
  'auth.register_title': 'Join Tabasheer Khair',
  'auth.register_subtitle': 'Start your healing journey in Jordan today',
  'auth.first_name': 'First Name',
  'auth.last_name': 'Last Name',
  'auth.password_hint': '8+ characters',
  'auth.agree_terms': 'I agree to the Terms and Conditions of Tabasheer Khair',
  'auth.create_btn': 'Create Account',
  'auth.have_account': 'Already have an account?',
  'auth.login_link': 'Login now',
  'auth.error_invalid': 'Invalid email or password',
  
  // Hero
  'hero.title': 'Your Healing Journey Starts in Jordan',
  'hero.subtitle': 'We coordinate the best medical care in top-tier hospitals with international accreditations, ensuring a premium travel experience.',
  'hero.badge': 'Medical Excellence in Jordan',
  
  // Home & Sections
  'home.spec_title': 'Leading Medical Specialties',
  'hosp.partners': 'Our Medical Partners',
  'hosp.desc': 'We take pride in our partnerships with elite hospitals and specialized centers in Jordan to ensure global quality standards.',
  'hosp.view_all': 'View All',
  'hosp.confirmed': 'Certified Center',
  'hosp.established': 'Est.',
  'hosp.beds': 'Beds',
  'hosp.doctors': 'Doctors',
  'hosp.surgery_rooms': 'ORs',
  'hosp.contact_title': 'Contact Facility',
  'hosp.send_report': 'Send Report for Review',
  'hosp.guarantee': 'We guarantee a response to all medical inquiries within 24 business hours.',
  'hosp.overview': 'Overview',
  'hosp.programs_tab': 'Treatment Programs',
  'hosp.infra': 'Infrastructure & Capacity',

  // Services Page
  'serv.title': 'Jordanian Medical Excellence',
  'serv.desc': 'We put at your fingertips the finest medical specialties that Jordan has excelled in across the Middle East.',
  'serv.help_title': 'Need help choosing the right specialty?',
  'serv.help_desc': 'Talk to one of our medical coordinators for a free consultation and guidance to the most suitable center.',
  'serv.contact_btn': 'Contact Medical Coordinator',
  'serv.hosp_count': 'Certified Centers',
  'serv.prog_count': 'Treatment Programs',

  // Discovery & Search
  'discovery.title': 'Discover Your Treatment',
  'discovery.desc': 'We offer the best medical options in the Kingdom with full transparency and quality assurance.',
  'discovery.search_placeholder': 'Search treatment or hospital...',
  'discovery.starts_from': 'Starts from',
  'discovery.details': 'Details',
  'discovery.all': 'All',
  
  // Common
  'common.currency': 'JOD',
  'common.search_no_results': 'No results matching your search were found.',
  'footer.rights': 'All rights reserved © 2024 Tabasheer Khair',
  'footer.desc': 'Your trusted gateway to premium medical care in Jordan. Experience deep medical expertise with authentic Jordanian hospitality.',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = (key: string) => translations[key] || key;
  // Fix: Explicitly type language as 'en' | 'ar' so components can compare it to 'ar' without type errors
  const language: 'en' | 'ar' = 'en';
  const isRTL = false;

  return (
    <LanguageContext.Provider value={{ language, t, isRTL }}>
      <div className="font-sans">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
