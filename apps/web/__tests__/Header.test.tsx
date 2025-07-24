import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../src/components/layout/header';

jest.mock('../src/components/theme-toggle', () => ({
  ThemeToggle: () => <button>Toggle Theme</button>,
}));

describe('Header', () => {
  it('displays "Conectado" when connectionStatus is true', () => {
    render(<Header connectionStatus={true} />);
    expect(screen.getByText('Conectado')).toBeInTheDocument();
  });

  it('displays "Offline" when connectionStatus is false', () => {
    render(<Header connectionStatus={false} />);
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });
});