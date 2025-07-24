import React from 'react';
import { render, screen } from '@testing-library/react';
import { MachineStateCard } from "../src/components/dashboard/machine-state-card";
import '@testing-library/jest-dom';
import type { MachineState } from '../src/lib/types';

describe('MachineStateCard', () => {
  it('renders correctly for RUNNING state', () => {
    render(<MachineStateCard state="RUNNING" />);
    
    expect(screen.getByText('Estado da Máquina')).toBeInTheDocument();
    expect(screen.getByText('Operando')).toBeInTheDocument();
    expect(screen.getByText('Situação: Operacional')).toBeInTheDocument();
  });

  it('renders correctly for ERROR state', () => {
    render(<MachineStateCard state="ERROR" />);
    
    expect(screen.getByText('Estado da Máquina')).toBeInTheDocument();
    expect(screen.getByText('Erro')).toBeInTheDocument();
    expect(screen.getByText('Situação: Falha detectada')).toBeInTheDocument();
  });

  it('renders correctly for MAINTENANCE state', () => {
    render(<MachineStateCard state="MAINTENANCE" />);
    
    expect(screen.getByText('Estado da Máquina')).toBeInTheDocument();
    expect(screen.getByText('Manutenção')).toBeInTheDocument();
    expect(screen.getByText('Situação: Parada programada')).toBeInTheDocument();
  });

  it('renders correctly for STOPPED state', () => {
    render(<MachineStateCard state="STOPPED" />);
    
    expect(screen.getByText('Estado da Máquina')).toBeInTheDocument();
    expect(screen.getByText('Parado')).toBeInTheDocument();
    expect(screen.getByText('Situação: Offline')).toBeInTheDocument();
  });
});
