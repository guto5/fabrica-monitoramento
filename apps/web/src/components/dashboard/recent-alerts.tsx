import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Info, AlertTriangle, ShieldAlert } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Alert, AlertLevel } from "../../lib/types";
import { cn } from "../../lib/utils";

const alertConfig = {
  INFO: {
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  WARNING: {
    icon: AlertTriangle,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  CRITICAL: {
    icon: ShieldAlert,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
};

function AlertItem({ alert }: { alert: Alert }) {
  const config = alertConfig[alert.level];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted/50">
      <div className={cn("p-2 rounded-full", config.bg)}>
        <Icon className={cn("h-5 w-5", config.color)} />
      </div>
      <div className="grid gap-1">
        <p className="font-semibold text-sm">{alert.message}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{alert.component}</span>
          <span>&middot;</span>
          <span>{formatDistanceToNow(alert.timestamp, { addSuffix: true, locale: ptBR })}</span>
        </div>
      </div>
    </div>
  );
}

export function RecentAlerts({ alerts }: { alerts: Alert[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alertas Recentes</CardTitle>
        <CardDescription>
          Notificações operacionais críticas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-4">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => <AlertItem key={`${alert.id}-${index}`} alert={alert} />)
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Nenhum alerta ativo. O sistema está nominal.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
