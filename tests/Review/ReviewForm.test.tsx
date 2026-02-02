import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewForm from '../../components/Review/ReviewForm';

describe('ReviewForm Component', () => {
  test('renders review form', () => {
    render(<ReviewForm />);
    const reviewFormElement = screen.getByText(/تقييم رحلتك العلاجية/i);
    expect(reviewFormElement).toBeInTheDocument();
  });
});