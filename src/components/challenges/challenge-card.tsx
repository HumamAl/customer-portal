import type { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OutcomeStatement } from "./outcome-statement";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
  visualization?: ReactNode;
}

export function ChallengeCard({
  challenge,
  index,
  visualization,
}: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <Card
      className="bg-gradient-to-br from-accent/5 to-background shadow-lg rounded-2xl border-primary/10 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
      style={{
        animationDelay: `${index * 150}ms`,
        animationDuration: "500ms",
      }}
    >
      <CardHeader>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-medium text-primary/70 w-6 shrink-0 tabular-nums">
            {stepNumber}
          </span>
          <h3 className="text-lg font-semibold">{challenge.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground pl-[calc(1.5rem+0.75rem)]">
          {challenge.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {visualization}
        <OutcomeStatement outcome={challenge.outcome} index={index} />
      </CardContent>
    </Card>
  );
}
