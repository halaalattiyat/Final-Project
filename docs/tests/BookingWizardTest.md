# BookingWizard Test

```tsx
import { render, screen } from '@testing-library/react';
import BookingWizard from '../../components/Booking/BookingWizard';

describe('BookingWizard Component', () => {
  test('renders booking wizard', () => {
    render(<BookingWizard />);
    const wizardElement = screen.getByText(/booking wizard/i);
    expect(wizardElement).toBeInTheDocument();
  });
});
```