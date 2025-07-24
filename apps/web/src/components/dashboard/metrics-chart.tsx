"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { MetricHistoryPoint } from "../../lib/types";

type MetricsChartProps = {
  data: MetricHistoryPoint[];
};

export function MetricsChart({ data }: MetricsChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Histórico de Métricas</CardTitle>
        <CardDescription>
          Dados de temperatura, RPM e eficiência em tempo real.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full p-2">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="timestamp"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="hsl(var(--primary))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}°C`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--accent))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis
              yAxisId="efficiency"
              orientation="left"
              stroke="hsl(var(--chart-2))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              domain={[85, 100]}
              dx={-25}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend iconSize={10} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              name="Temperatura"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rpm"
              name="RPM"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="efficiency"
              type="monotone"
              dataKey="efficiency"
              name="Eficiência"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}