"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { MachineStatus, Alert, MetricHistoryPoint, MachineState } from "../lib/types";

// Define o número máximo de pontos de dados a serem mantidos no histórico do gráfico.
const MAX_HISTORY_LENGTH = 30;
// Define o número máximo de alertas a serem exibidos na lista.
const MAX_ALERTS_LENGTH = 5;

// Gera um número aleatório dentro de um intervalo para simular variações de dados.
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Define o ponto de partida para os dados da máquina quando o dashboard é carregado.
const initialStatus: MachineStatus = {
  id: "mixer-01",
  timestamp: new Date(),
  state: "RUNNING",
  metrics: {
    temperature: 70,
    rpm: 1200,
    uptime: 0,
    efficiency: 95,
  },
  oee: {
    overall: 92,
    availability: 98,
    performance: 95,
    quality: 99,
  },
};

/**
 * Hook customizado para gerenciar e simular os dados da máquina em tempo real.
 */
export function useMachineData() {
  const [machineStatus, setMachineStatus] = useState<MachineStatus>(initialStatus);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [history, setHistory] = useState<MetricHistoryPoint[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<boolean>(true);

  // Efeito para simular a chegada de novos dados em um intervalo de tempo.
  useEffect(() => {
    // A cada 2.5 segundos, uma nova atualização de dados é gerada.
    const interval = setInterval(() => {
      // Atualiza o estado da máquina com base no estado anterior.
      setMachineStatus((prevStatus) => {
        const newTimestamp = new Date();
        let newState: MachineState = prevStatus.state;
        let newTemp = prevStatus.metrics.temperature + random(-1, 1);
        let newRpm = prevStatus.metrics.rpm + random(-10, 10);
        let newUptime = prevStatus.metrics.uptime + 2; // Incrementa o tempo de operação.
        
        // Simula uma pequena variação na eficiência
        let newEfficiency = prevStatus.metrics.efficiency + random(-0.1, 0.1);
        newEfficiency = Math.max(90, Math.min(99, newEfficiency)); // Mantém a eficiência entre 90 e 99

        // Simula mudanças de estado (Erro, Manutenção) com base em uma probabilidade.
        const stateChance = Math.random();
        if (stateChance > 0.98) {
          newState = "ERROR";
          newTemp += 20; // Aumenta a temperatura drasticamente em caso de erro.
          const newAlert: Alert = {
            id: newTimestamp.toISOString(),
            level: 'CRITICAL',
            message: 'Falha crítica de componente.',
            component: 'Motor',
            timestamp: newTimestamp,
            acknowledged: false
          };
          // Adiciona um novo alerta crítico e mantém a lista com no máximo 5 alertas.
          setAlerts((prev) => [newAlert, ...prev].slice(0, MAX_ALERTS_LENGTH));
        } else if (stateChance > 0.95) {
          newState = "MAINTENANCE";
          const newAlert: Alert = {
            id: newTimestamp.toISOString(),
            level: 'INFO',
            message: 'Manutenção programada iniciada.',
            component: 'System',
            timestamp: newTimestamp,
            acknowledged: false
          };
          setAlerts((prev) => [newAlert, ...prev].slice(0, MAX_ALERTS_LENGTH));
        } else {
          newState = "RUNNING";
        }
        
        // Se a máquina estiver operando, verifica anomalias nas métricas.
        if (newState === 'RUNNING') {
            if (newTemp > 85) { // Gera alerta de temperatura alta.
                const newAlert: Alert = {
                  id: newTimestamp.toISOString(),
                  level: 'WARNING',
                  message: 'Temperatura alta detectada.',
                  component: 'Cooling System',
                  timestamp: newTimestamp,
                  acknowledged: false
                };
                setAlerts((prev) => [newAlert, ...prev].slice(0, MAX_ALERTS_LENGTH));
                newTemp = Math.min(newTemp, 90);
            } else {
                 newTemp = Math.max(newTemp, 60); // Garante que a temperatura não caia muito.
            }

            if (newRpm > 1450 || newRpm < 950) { // Gera alerta de RPM.
                 const newAlert: Alert = {
                   id: newTimestamp.toISOString(),
                   level: 'WARNING',
                   message: 'RPM fora de tolerância.',
                   component: 'Drive',
                   timestamp: newTimestamp,
                   acknowledged: false
                 };
                 setAlerts((prev) => [newAlert, ...prev].slice(0, MAX_ALERTS_LENGTH));
                 newRpm = Math.max(Math.min(newRpm, 1500), 900);
            } else {
                 newRpm = Math.max(Math.min(newRpm, 1400), 1000);
            }
        } else {
            newRpm = 0; // Se a máquina não estiver rodando, o RPM é zero.
        }

        // Simula uma pequena degradação nas métricas de OEE.
        const newOeeAvailability = prevStatus.oee.availability - random(0, 0.01);
        const newOeePerformance = prevStatus.oee.performance - random(0, 0.02);
        const newOeeQuality = prevStatus.oee.quality - random(0, 0.005);
        const newOeeOverall = (newOeeAvailability / 100) * (newOeePerformance / 100) * (newOeeQuality / 100) * 100;

        // Cria o novo objeto de estado completo para a máquina.
        const newStatus: MachineStatus = {
          ...prevStatus,
          timestamp: newTimestamp,
          state: newState,
          metrics: {
            temperature: newTemp,
            rpm: newRpm,
            uptime: newUptime,
            efficiency: newEfficiency,
          },
          oee: {
            availability: Math.max(80, newOeeAvailability),
            performance: Math.max(80, newOeePerformance),
            quality: Math.max(80, newOeeQuality),
            overall: Math.max(70, newOeeOverall),
          },
        };

        // Adiciona os novos dados ao histórico do gráfico, mantendo o tamanho máximo.
        setHistory((prevHistory) => [
          ...prevHistory,
          {
            timestamp: format(newTimestamp, "HH:mm:ss"),
            temperature: newStatus.metrics.temperature,
            rpm: newStatus.metrics.rpm,
            efficiency: newStatus.metrics.efficiency,
          },
        ].slice(-MAX_HISTORY_LENGTH));

        return newStatus;
      });

      // Simula uma perda de conexão aleatória.
      if (Math.random() > 0.99) {
          setConnectionStatus(prev => !prev);
      }

    }, 2500);

    // Função de limpeza: remove o intervalo quando o componente é desmontado para evitar vazamentos de memória.
    return () => clearInterval(interval);
  }, []);

  // Retorna todos os estados para serem consumidos pela UI do dashboard.
  return { machineStatus, alerts, history, connectionStatus };
}