import React from 'react';
import { render, screen } from '@testing-library/react';
import ServiceCard from '../../components/Services/ServiceCard';
import { LanguageProvider } from '../../context/LanguageContext';

describe('ServiceCard Component', () => {
  test('renders service card', () => {
    const mockService = {
      specialty: 'Cardiology',
      name: 'Heart Checkup',
      description: 'Comprehensive heart health checkup',
      keyFeatures: ['Feature 1', 'Feature 2', 'Feature 3'],
      titleEn: 'Heart Checkup',
    };
    render(
      <LanguageProvider>
        <ServiceCard service={mockService} />
      </LanguageProvider>
    );
    const serviceCardElement = screen.getByText((content, element) => {
      const hasText = (node) => node.textContent === 'Heart Checkup';
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element?.children || []).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    });
    expect(serviceCardElement).toBeInTheDocument();
  });
});