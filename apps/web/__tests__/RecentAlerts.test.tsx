import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecentAlerts } from '../src/components/dashboard/recent-alerts';
import type { Alert } from '../src/lib/types';

describe('RecentAlerts', () => {
  it('displays a message when there are no alerts', () => {
    render(<RecentAlerts alerts={[]} />);
    expect(screen.getByText('Nenhum alerta ativo. O sistema está nominal.')).toBeInTheDocument();
  });

  it('renders a list of alerts when data is provided', () => {
    const mockAlerts: Alert[] = [
      {
        id: '1',
        level: 'CRITICAL',
        message: 'Falha crítica de componente.',
        component: 'Motor',
        timestamp: new Date(),
        acknowledged: false,
      },
      {
        id: '2',
        level: 'WARNING',
        message: 'Temperatura alta detectada.',
        component: 'Cooling System',
        timestamp: new Date(),
        acknowledged: false,
      },
    ];

    render(<RecentAlerts alerts={mockAlerts} />);

    expect(screen.queryByText('Nenhum alerta ativo. O sistema está nominal.')).not.toBeInTheDocument();

    expect(screen.getByText('Falha crítica de componente.')).toBeInTheDocument();
    expect(screen.getByText('Temperatura alta detectada.')).toBeInTheDocument();
  });
});