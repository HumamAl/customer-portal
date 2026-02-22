import { TrendingUp } from "lucide-react";

interface OutcomeStatementProps {
  outcome: string;
  index?: number;
}

export function OutcomeStatement({ outcome }: OutcomeStatementProps) {
  return (
    <div
      className="flex items-start gap-2 rounded-lg px-3 py-2 animate-in fade-in slide-in-from-bottom-1 fill-mode-both"
      style={{
        backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
        borderColor: "color-mix(in oklch, var(--success) 25%, transparent)",
        borderWidth: "1px",
        borderStyle: "solid",
        animationDelay: "300ms",
        animationDuration: "500ms",
      }}
    >
      <TrendingUp className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--success)]" />
      <p className="text-sm font-medium text-[color:var(--success)]">
        {outcome}
      </p>
    </div>
  );
}
