"use client";

import type { ReactNode } from "react";
import { ChallengeCard } from "./challenge-card";

interface ChallengeListChallenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

interface ChallengeListProps {
  challenges: ChallengeListChallenge[];
  visualizations?: Record<string, ReactNode>;
}

function CardConnector() {
  return (
    <div
      className="w-px h-6 mx-auto"
      style={{
        background:
          "linear-gradient(to bottom, transparent, var(--border), transparent)",
      }}
    />
  );
}

export function ChallengeList({
  challenges,
  visualizations = {},
}: ChallengeListProps) {
  return (
    <div className="flex flex-col">
      {challenges.map((challenge, index) => (
        <div key={challenge.id}>
          <ChallengeCard
            challenge={challenge}
            index={index}
            visualization={visualizations[challenge.id]}
          />
          {index < challenges.length - 1 && <CardConnector />}
        </div>
      ))}
    </div>
  );
}
