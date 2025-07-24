import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock } from "lucide-react";

type UptimeCardProps = {
  uptime: number;
};

function formatUptime(seconds: number) {
  if (seconds < 0) return "0h 0m";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export function UptimeCard({ uptime }: UptimeCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Tempo em Operação</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatUptime(uptime)}</div>
        <p className="text-xs text-muted-foreground">Tempo total de operação</p>
      </CardContent>
    </Card>
  );
}
