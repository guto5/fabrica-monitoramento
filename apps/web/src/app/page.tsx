"use client";

import { Header } from "../components/layout/header";
import { MachineStateCard } from "../components/dashboard/machine-state-card";
import { MetricCard } from "../components/dashboard/metric-card";
import { UptimeCard } from "../components/dashboard/uptime-card";
import { MetricsChart } from "../components/dashboard/metrics-chart";
import { RecentAlerts } from "../components/dashboard/recent-alerts";
import { EfficiencyMetrics } from "../components/dashboard/efficiency-metrics";
import { useMachineData } from "../hooks/use-machine-data";

export default function DashboardPage() {
  const { machineStatus, alerts, history, connectionStatus } = useMachineData();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header connectionStatus={connectionStatus} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <MachineStateCard state={machineStatus.state} />
          <MetricCard
            title="Temperatura"
            value={machineStatus.metrics.temperature.toFixed(1)}
            unit="°C"
            trend={machineStatus.metrics.temperature > 75 ? "up" : "down"}
            goal="Máx: 85°C"
          />
          <MetricCard
            title="RPM"
            value={machineStatus.metrics.rpm.toFixed(3)}
            unit=""
            trend={machineStatus.metrics.rpm > 1200 ? "up" : "down"}
            goal="Máx: 1500"
          />
          <UptimeCard uptime={machineStatus.metrics.uptime} />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <MetricsChart data={history} />
          </div>
          <div className="grid gap-4">
            <RecentAlerts alerts={alerts} />
            <EfficiencyMetrics oee={machineStatus.oee} />
          </div>
        </div>
      </main>
    </div>
  );
}
