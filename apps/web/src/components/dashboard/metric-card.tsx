import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDown, ArrowUp, Thermometer, Zap } from "lucide-react";
import type { ReactNode } from "react";

type MetricCardProps = {
  title: string;
  value: string;
  unit: string;
  trend: "up" | "down";
  goal: string;
};

const iconMap: Record<string, ReactNode> = {
    Temperatura: <Thermometer className="h-4 w-4 text-muted-foreground" />,
    RPM: <Zap className="h-4 w-4 text-muted-foreground" />,
}

export function MetricCard({ title, value, unit, trend, goal }: MetricCardProps) {
  const TrendIcon = trend === "up" ? ArrowUp : ArrowDown;
  const trendColor = trend === 'up' ? 'text-red-500' : 'text-green-500';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {iconMap[title]}
      </CardHeader>
      <CardContent>
        <div className="truncate text-2xl font-bold">
          {value}
          <span className="text-base font-normal text-muted-foreground">{unit}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <TrendIcon className={`h-4 w-4 mr-1 ${trendColor}`} />
          <span>{goal}</span>
        </div>
      </CardContent>
    </Card>
  );
}
