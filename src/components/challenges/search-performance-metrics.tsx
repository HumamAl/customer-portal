import { MetricBar } from "./metric-bar";

const metrics = [
  {
    label: "Query Response Time",
    value: 180,
    max: 200,
    unit: "ms",
    color: "green" as const,
  },
  {
    label: "Filter Combinations",
    value: 50,
    max: 60,
    unit: "+",
    color: "blue" as const,
  },
  {
    label: "Page Load Time",
    value: 1.2,
    max: 1.5,
    unit: "s",
    color: "green" as const,
  },
  {
    label: "Index Coverage",
    value: 100,
    max: 100,
    unit: "%",
    color: "green" as const,
  },
];

export function SearchPerformanceMetrics() {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-4 space-y-3">
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
        Performance Targets
      </p>
      {metrics.map((metric) => (
        <MetricBar
          key={metric.label}
          label={metric.label}
          value={metric.value}
          max={metric.max}
          unit={metric.unit}
          color={metric.color}
        />
      ))}
    </div>
  );
}
