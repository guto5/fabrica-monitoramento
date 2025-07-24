import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UptimeCard } from '../src/components/dashboard/uptime-card';

describe('UptimeCard', () => {
  it('renders the title correctly', () => {
    render(<UptimeCard uptime={0} />);
    expect(screen.getByText('Tempo em Operação')).toBeInTheDocument();
  });

  it('formats uptime correctly for zero seconds', () => {
    render(<UptimeCard uptime={0} />);
    expect(screen.getByText('0h 0m')).toBeInTheDocument();
  });

  it('formats uptime correctly for less than an hour', () => {
    render(<UptimeCard uptime={1800} />);
    expect(screen.getByText('0h 30m')).toBeInTheDocument();
  });

  it('formats uptime correctly for more than an hour', () => {
    render(<UptimeCard uptime={4980} />);
    expect(screen.getByText('1h 23m')).toBeInTheDocument();
  });
});