import React from 'react';
import { render, screen } from '@testing-library/react';
import MedicalRecordCard from '../../components/Medical/MedicalRecordCard';

describe('MedicalRecordCard Component', () => {
  test('renders medical record card', () => {
    const mockRecord = {
      category: 'General',
      title: 'Medical Record Title',
      uploadDate: '2023-10-01T00:00:00Z',
    };
    render(<MedicalRecordCard record={mockRecord} />);
    const recordCardElement = screen.getByText(/medical record/i);
    expect(recordCardElement).toBeInTheDocument();
  });
});