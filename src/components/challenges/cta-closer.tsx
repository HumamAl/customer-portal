"use client";

import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaCloserProps {
  headline?: string;
  subtext?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export function CtaCloser({
  headline = "Ready to discuss the approach? Let\u2019s talk.",
  subtext = "Let\u2019s walk through how these solutions apply to your specific setup.",
  buttonLabel = "Let\u2019s Talk",
  buttonHref = "/proposal",
}: CtaCloserProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/8 via-primary/4 to-accent/8 border border-primary/20 shadow-lg p-8 md:p-10 text-center">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent/5 translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{headline}</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {subtext}
          </p>
        </div>

        <Button size="lg" className="mt-2" asChild>
          <a href={buttonHref}>
            {buttonLabel}
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>

        <p className="text-xs text-muted-foreground mt-2">
          Available to start within 48 hours
        </p>
      </div>
    </div>
  );
}
