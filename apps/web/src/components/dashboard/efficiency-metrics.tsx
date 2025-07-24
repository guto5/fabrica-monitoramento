import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Progress } from "../ui/progress";
import type { MachineStatus } from "../../lib/types";

type EfficiencyMetricProps = {
    label: string;
    value: number;
    colorClass: string;
}

function EfficiencyMetric({ label, value, colorClass }: EfficiencyMetricProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold">{value.toFixed(1)}%</span>
            </div>
            <Progress value={value} className="h-2" indicatorClassName={colorClass} />
        </div>
    )
}

export function EfficiencyMetrics({ oee }: { oee: MachineStatus["oee"] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Métricas de Eficiência (OEE)</CardTitle>
        <CardDescription>
          Efetividade Geral do Equipamento e seus componentes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <span className="text-lg font-semibold">Geral</span>
                <span className="text-2xl font-bold text-primary">{oee.overall.toFixed(1)}%</span>
            </div>
             <Progress value={oee.overall} className="h-3" />
        </div>
        <div className="grid grid-cols-1 gap-4 pt-2">
            <EfficiencyMetric label="Disponibilidade" value={oee.availability} colorClass="bg-green-500" />
            <EfficiencyMetric label="Performance" value={oee.performance} colorClass="bg-blue-500" />
            <EfficiencyMetric label="Qualidade" value={oee.quality} colorClass="bg-purple-500" />
        </div>
      </CardContent>
    </Card>
  );
}
