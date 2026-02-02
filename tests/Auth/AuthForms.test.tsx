import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginForm } from '../../components/Auth/AuthForms';
import { AuthProvider } from '../../context/AuthContext';
import { LanguageProvider } from '../../context/LanguageContext';

describe('AuthForms Component', () => {
  test('renders login form', () => {
    render(
      <LanguageProvider>
        <AuthProvider>
          <LoginForm onToggle={() => {}} />
        </AuthProvider>
      </LanguageProvider>
    );
    const loginButton = screen.getByRole('button', { name: /login to platform/i });
    expect(loginButton).toBeInTheDocument();
  });
});