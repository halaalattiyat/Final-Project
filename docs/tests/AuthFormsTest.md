# AuthForms Test

```tsx
import { render, screen } from '@testing-library/react';
import AuthForms from '../../components/Auth/AuthForms';

describe('AuthForms Component', () => {
  test('renders login form', () => {
    render(<AuthForms />);
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
  });
});
```