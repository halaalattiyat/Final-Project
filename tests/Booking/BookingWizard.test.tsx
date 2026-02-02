import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingWizard from '../../components/Booking/BookingWizard';

describe('BookingWizard Component', () => {
  test('renders booking wizard', () => {
    const mockProgram = {
      id: '1',
      titleAr: 'برنامج العلاج',
      titleEn: 'Treatment Program',
      hospitalId: '123',
      durationDays: 7,
      descriptionAr: 'وصف البرنامج',
      descriptionEn: 'Program description',
      price: 1000,
    };
    render(<BookingWizard program={mockProgram} />);
    const wizardElement = screen.getByText(/Arrival & Stay/i);
    expect(wizardElement).toBeInTheDocument();
  });
});