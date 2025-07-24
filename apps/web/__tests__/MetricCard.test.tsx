import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetricCard } from '../src/components/dashboard/metric-card';

describe('MetricCard', () => {
  it('renders the title, value, and unit correctly', () => {
    render(
      <MetricCard title="Temperatura" value="75.1" unit="°C" trend="up" goal="Máx: 85°C" />
    );
    expect(screen.getByText('Temperatura')).toBeInTheDocument();
    expect(screen.getByText(/75.1/)).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
  });

  it('shows an upward trend icon with red color when trend is "up"', () => {
    render(
      <MetricCard title="Temperatura" value="80" unit="°C" trend="up" goal="Máx: 85°C" />
    );
    const trendContainer = screen.getByText('Máx: 85°C').previousSibling;
    expect(trendContainer).toHaveClass('text-red-500');
  });

  it('shows a downward trend icon with green color when trend is "down"', () => {
    render(
      <MetricCard title="RPM" value="1100" unit="" trend="down" goal="Máx: 1500" />
    );
    const trendContainer = screen.getByText('Máx: 1500').previousSibling;
    expect(trendContainer).toHaveClass('text-green-500');
  });
});