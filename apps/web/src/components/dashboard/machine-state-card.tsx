import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import type { MachineState } from "../../lib/types";

type MachineStateCardProps = {
  state: MachineState;
};

const stateConfig = {
  RUNNING: {
    label: "Operando",
    status: "Operacional",
    color: "bg-green-500",
  },
  STOPPED: {
    label: "Parado",
    status: "Offline",
    color: "bg-gray-500",
  },
  MAINTENANCE: {
    label: "Manutenção",
    status: "Parada programada",
    color: "bg-blue-500",
  },
  ERROR: {
    label: "Erro",
    status: "Falha detectada",
    color: "bg-red-500",
  },
};

export function MachineStateCard({ state }: MachineStateCardProps) {
  const config = stateConfig[state];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Estado da Máquina</CardTitle>
        <span
          className={cn(
            "h-4 w-4 rounded-full animate-pulse",
            config.color
          )}
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{config.label}</div>
        <p className="text-xs text-muted-foreground">Situação: {config.status}</p>
      </CardContent>
    </Card>
  );
}
