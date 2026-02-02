# ServiceCard Test

```tsx
import { render, screen } from '@testing-library/react';
import ServiceCard from '../../components/Services/ServiceCard';

describe('ServiceCard Component', () => {
  test('renders service card', () => {
    render(<ServiceCard />);
    const serviceCardElement = screen.getByText(/service card/i);
    expect(serviceCardElement).toBeInTheDocument();
  });
});
```