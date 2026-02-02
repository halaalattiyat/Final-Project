# MedicalRecordCard Test

```tsx
import { render, screen } from '@testing-library/react';
import MedicalRecordCard from '../../components/Medical/MedicalRecordCard';

describe('MedicalRecordCard Component', () => {
  test('renders medical record card', () => {
    render(<MedicalRecordCard />);
    const recordCardElement = screen.getByText(/medical record/i);
    expect(recordCardElement).toBeInTheDocument();
  });
});
```