export type MachineState = "RUNNING" | "STOPPED" | "MAINTENANCE" | "ERROR";

export type AlertLevel = "INFO" | "WARNING" | "CRITICAL";

export interface MachineStatus {
  id: string;
  timestamp: Date;
  state: MachineState;
  metrics: {
    temperature: number;
    rpm: number;
    uptime: number;
    efficiency: number;
  };
  oee: {
    overall: number;
    availability: number;
    performance: number;
    quality: number;
  };
}

export interface Alert {
  id: string;
  level: AlertLevel;
  message: string;
  component: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface MetricHistoryPoint {
  timestamp: string;
  temperature: number;
  rpm: number;
  efficiency: number;
}
