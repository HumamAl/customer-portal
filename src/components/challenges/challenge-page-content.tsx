"use client";

import type { ReactNode } from "react";
import { ChallengeList } from "./challenge-list";
import { MultiTenantArchitecture } from "./multi-tenant-architecture";
import { CleanArchitectureComparison } from "./clean-architecture-comparison";
import { EntityRelationshipFlow } from "./entity-relationship-flow";
import { SearchPerformanceMetrics } from "./search-performance-metrics";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "multi-tenant": <MultiTenantArchitecture />,
    "clean-architecture": <CleanArchitectureComparison />,
    "entity-relationships": <EntityRelationshipFlow />,
    "search-filter": <SearchPerformanceMetrics />,
  };

  return (
    <ChallengeList challenges={challenges} visualizations={visualizations} />
  );
}
