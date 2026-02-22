import { ArrowRight } from "lucide-react";

const layers = [
  {
    label: "Client App",
    description: "React SPA",
    type: "frontend" as const,
  },
  {
    label: "API Gateway",
    description: "Route & validate",
    type: "backend" as const,
  },
  {
    label: "Auth + RBAC",
    description: "Verify & scope",
    type: "highlight" as const,
  },
  {
    label: "Tenant Router",
    description: "Isolate context",
    type: "highlight" as const,
  },
  {
    label: "Isolated Data",
    description: "Per-tenant store",
    type: "database" as const,
  },
];

const typeStyles: Record<string, string> = {
  frontend: "bg-primary/10 border-primary/30",
  backend: "bg-accent/20 border-accent-foreground/20",
  highlight: "bg-primary/15 border-primary/40 ring-1 ring-primary/20",
  database: "bg-primary/5 border-primary/20",
};

export function MultiTenantArchitecture() {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-4">
      <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
        Request Flow
      </p>
      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-center gap-1.5">
        {layers.map((layer, i) => (
          <div key={layer.label} className="flex items-center gap-1.5">
            <div
              className={`flex flex-col items-center justify-center rounded-lg border px-3 py-2.5 min-w-[100px] text-center ${typeStyles[layer.type]}`}
            >
              <p className="text-xs font-semibold leading-tight">
                {layer.label}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {layer.description}
              </p>
            </div>
            {i < layers.length - 1 && (
              <ArrowRight className="w-3.5 h-3.5 text-primary/50 shrink-0" />
            )}
          </div>
        ))}
      </div>
      {/* Mobile: vertical */}
      <div className="flex sm:hidden flex-col items-center gap-1.5">
        {layers.map((layer, i) => (
          <div key={layer.label} className="flex flex-col items-center gap-1.5 w-full">
            <div
              className={`flex flex-col items-center justify-center rounded-lg border px-4 py-2.5 w-full max-w-[200px] text-center ${typeStyles[layer.type]}`}
            >
              <p className="text-xs font-semibold leading-tight">
                {layer.label}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {layer.description}
              </p>
            </div>
            {i < layers.length - 1 && (
              <ArrowRight className="w-3.5 h-3.5 text-primary/50 rotate-90" />
            )}
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-primary/15 border border-primary/40" />
          <span className="text-[10px] text-muted-foreground">Security layer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-primary/5 border border-primary/20" />
          <span className="text-[10px] text-muted-foreground">Data layer</span>
        </div>
      </div>
    </div>
  );
}
